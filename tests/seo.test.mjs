import assert from 'node:assert/strict';
import { existsSync, readFileSync, readdirSync } from 'node:fs';
import path from 'node:path';
import { test } from 'node:test';
import { parse } from 'parse5';

const dist = path.resolve(process.env.SEO_DIST_DIR || 'dist');
const expectedSite = process.env.SEO_SITE_URL;
const localOrigin = 'https://local-check.invalid';
const files = readdirSync(dist, { recursive: true }).filter((file) => file.endsWith('.html'));
assert.ok(files.length > 0, '先运行 npm run build，再检查生成的 HTML');

function descendants(node) {
  return [node, ...(node.childNodes || []).flatMap(descendants)];
}
const attr = (node, name) => node?.attrs?.find((item) => item.name === name)?.value;
function textContent(node) {
  if (['script', 'style'].includes(node.tagName)) return '';
  return node.nodeName === '#text' ? node.value : (node.childNodes || []).map(textContent).join('');
}
const pages = new Map(files.map((file) => {
  const html = readFileSync(path.join(dist, file), 'utf8');
  const nodes = descendants(parse(html));
  const route = `/${file.replace(/index\.html$/, '')}`;
  const meta = (name) => attr(nodes.find((node) => node.tagName === 'meta' && (attr(node, 'name') === name || attr(node, 'property') === name)), 'content');
  const graph = nodes.filter((node) => node.tagName === 'script' && attr(node, 'type') === 'application/ld+json')
    .flatMap((node) => {
      const json = JSON.parse(node.childNodes.map((child) => child.value || '').join(''));
      return json['@graph'] || [json];
    });
  return [route, {
    html, nodes, meta, graph,
    title: textContent(nodes.find((node) => node.tagName === 'title')),
    canonical: attr(nodes.find((node) => node.tagName === 'link' && attr(node, 'rel') === 'canonical'), 'href'),
    links: nodes.filter((node) => node.tagName === 'a').map((node) => attr(node, 'href')).filter(Boolean),
    ids: new Set(nodes.map((node) => attr(node, 'id')).filter(Boolean)),
  }];
}));
const indexedPages = [...pages].filter(([, page]) => !page.meta('robots')?.includes('noindex'));

test('每个静态页面包含可读正文、唯一标题、描述和单一 H1', () => {
  assert.equal(new Set([...pages.values()].map((page) => page.title)).size, pages.size);
  assert.equal(new Set(indexedPages.map(([, page]) => page.meta('description'))).size, indexedPages.length);
  for (const [route, page] of pages) {
    assert.ok(page.title?.includes('凯里绿色家装饰'), `${route}: 缺少品牌标题`);
    assert.ok(page.meta('description'), `${route}: 缺少 description`);
    assert.equal(page.nodes.filter((node) => node.tagName === 'h1').length, 1, `${route}: H1 数量`);
    const main = page.nodes.find((node) => node.tagName === 'main');
    assert.ok(main && textContent(main).trim().length > 20, `${route}: 静态正文为空`);
    assert.equal(attr(page.nodes.find((node) => node.tagName === 'html'), 'lang'), 'zh-CN');
    assert.ok(!page.html.includes('/Users/'), `${route}: 不应输出本机路径`);
  }
  assert.ok(pages.get('/404.html').meta('robots').includes('noindex'));
});

test('内部链接、页内锚点和图片均存在，所有可索引页面均可从首页访问', () => {
  const edges = new Map();
  for (const [route, page] of pages) {
    const base = new URL(route, expectedSite || localOrigin);
    const targets = [];
    for (const href of page.links) {
      const url = new URL(href, base);
      if (url.origin !== base.origin) continue;
      const target = pages.get(url.pathname);
      assert.ok(target || existsSync(path.join(dist, decodeURIComponent(url.pathname))), `${route}: 无效链接 ${href}`);
      if (target) {
        targets.push(url.pathname);
        if (url.hash) assert.ok(target.ids.has(decodeURIComponent(url.hash.slice(1))), `${route}: 无效锚点 ${href}`);
      }
    }
    edges.set(route, targets);
    for (const image of page.nodes.filter((node) => node.tagName === 'img')) {
      assert.notEqual(attr(image, 'alt'), undefined, `${route}: 图片缺少 alt`);
      const src = new URL(attr(image, 'src'), base);
      if (src.origin === base.origin) assert.ok(existsSync(path.join(dist, decodeURIComponent(src.pathname))), `${route}: 图片不存在`);
    }
  }
  const visited = new Set();
  const queue = ['/'];
  while (queue.length) {
    const route = queue.shift();
    if (visited.has(route)) continue;
    visited.add(route);
    queue.push(...edges.get(route) || []);
  }
  for (const [route] of indexedPages) assert.ok(visited.has(route), `${route}: 孤立页面`);
});

test('企业、服务、文章和面包屑结构化数据相互关联并匹配可见信息', () => {
  for (const [route, page] of indexedPages) {
    const byType = (type) => page.graph.find((item) => item['@type'] === type);
    const business = byType('HomeAndConstructionBusiness');
    assert.equal(business?.name, '凯里绿色家装饰');
    assert.equal(business?.telephone, '+86-19885332380');
    assert.ok(business?.logo?.endsWith('/favicon.png'));
    assert.ok(business?.address?.streetAddress);
    assert.equal(byType('WebSite')?.publisher?.['@id'], business['@id']);
    if (route !== '/') {
      const crumbs = byType('BreadcrumbList')?.itemListElement;
      assert.ok(crumbs?.length >= 2, `${route}: 缺少面包屑`);
      assert.equal(new URL(crumbs.at(-1).item, localOrigin).pathname, route);
    }
    if (/^\/services\/[^/]+\/$/.test(route)) {
      const service = byType('Service');
      assert.equal(service?.provider?.['@id'], business['@id']);
      assert.ok(textContent(page.nodes.find((node) => node.tagName === 'main')).includes(service.name));
      assert.ok(page.nodes.filter((node) => node.tagName === 'details').length >= 3);
    }
    if (/^\/guides\/[^/]+\/$/.test(route)) {
      const article = byType('Article');
      assert.equal(article?.publisher?.['@id'], business['@id']);
      assert.equal(article?.author?.['@id'], business['@id']);
      assert.ok(page.nodes.some((node) => node.tagName === 'time' && attr(node, 'datetime') === article.datePublished));
      assert.equal(page.meta('og:type'), 'article');
      assert.ok(article.image?.endsWith('.webp'));
    }
  }
});

test('正式域名下 canonical、分享图片、robots 与 sitemap 一致', {
  skip: !expectedSite && !pages.get('/').canonical ? '本地未配置 SITE_URL；域名验证需设置 SEO_SITE_URL' : false,
}, () => {
  const site = new URL(expectedSite || pages.get('/').canonical);
  for (const [route, page] of indexedPages) {
    assert.equal(page.canonical, new URL(route, site).href);
    assert.equal(page.meta('og:url'), page.canonical);
    assert.equal(new URL(page.meta('og:image')).origin, site.origin);
    assert.ok(page.meta('og:image:alt'));
    assert.ok(!page.meta('robots')?.includes('noindex'));
  }
  assert.equal(pages.get('/404.html').canonical, undefined);
  const robots = readFileSync(path.join(dist, 'robots.txt'), 'utf8');
  assert.ok(robots.includes(`Sitemap: ${new URL('/sitemap-index.xml', site).href}`));
  assert.ok(!/Disallow:\s*\/\s*(?:\n|$)/.test(robots));
  const sitemapFiles = readdirSync(dist).filter((file) => /^sitemap.*\.xml$/.test(file));
  assert.ok(sitemapFiles.includes('sitemap-index.xml'));
  const urls = sitemapFiles.flatMap((file) => {
    const nodes = descendants(parse(readFileSync(path.join(dist, file), 'utf8')));
    return nodes.filter((node) => node.tagName === 'loc').map(textContent);
  });
  for (const [route] of indexedPages) assert.ok(urls.includes(new URL(route, site).href), `${route}: 未列入 sitemap`);
  assert.ok(!urls.some((url) => new URL(url).pathname.startsWith('/404')));
  for (const url of urls) assert.equal(new URL(url).origin, site.origin);
});
