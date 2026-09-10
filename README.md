# 凯里绿色家装饰官网

面向凯里及黔东南家庭的公司展示网站。采用 Astro 静态生成、React 局部交互与 GSAP 动画，可部署到 Cloudflare Workers Static Assets；构建产物也可上传 Cloudflare Pages。

图片、字体与第三方许可信息见 [ASSETS.md](./ASSETS.md)。

## 本地运行

使用 Node.js 22（至少 22.12.0）与 npm。已使用 nvm 时，可执行 `nvm use`。

```bash
npm ci
npm run dev
```

在浏览器打开终端显示的本地地址，通常为 `http://127.0.0.1:4321`。

```bash
npm run check
npm run build
npm run test:seo
npm run preview
```

Astro 7 的开发服务默认在后台运行，使用 `npx astro dev stop` 停止、`npx astro dev logs` 查看日志。

`check` 检查 Astro 与 TypeScript；`build` 输出到 `dist/`；`preview` 预览已经生成的静态网站。源代码修改后，需要重新构建才能在产物预览中看到更新。

## 内容与功能边界

- 页面包含公司首页、装修服务列表、四项服务详情、公司介绍、联系页、三篇装修指南与指南列表、HTML 网站地图、隐私说明及 404 页面。
- 电话咨询使用 `19885332380`，移动设备可调用拨号功能。
- 需求整理弹窗只在当前页面编辑、整理并复制需求，不向公司或其他服务提交信息，也没有后台收件接口。
- 公司介绍与业务范围应以确认的企业信息维护。图片应保留其素材来源与示意属性，不把示意图片表述为公司的已交付案例。
- 本目录是可独立发布的官网项目；不要将上级目录的原始知识库、内部资料或账户凭证加入仓库或 `public/`。

正式域名确定后，从 `.env.example` 创建本地 `.env`，填写 `SITE_URL`。Cloudflare Git 构建时在构建环境变量中填写同名变量。

`SITE_URL` 是站点完整 HTTPS 基础地址，需填写实际拥有并用于部署的域名。留空时不生成 canonical 与 sitemap；设置后重新构建才会生效。请勿为通过构建而填写虚构域名。静态 HTML 与结构化内容方便读取，但不代表搜索引擎或 AI 一定收录、引用或推荐。

## SEO 与内容维护

- 复用 `@astrojs/sitemap` 生成 XML sitemap，并在 `robots.txt` 与页面 head 中提供入口；404 不列入 sitemap，也不输出 canonical。`/sitemap/` 是可直接浏览的 HTML 网站地图，在未配置域名的本地环境同样可用。
- 企业名称、地址、电话由 `src/data/company.ts` 统一维护。`src/lib/seo.ts` 和 `Layout.astro` 将企业、网站、页面、面包屑、文章与服务关联到稳定的 JSON-LD 标识。未知的营业时间、资质、评价、服务承诺与官方账号链接不编造。
- 首页简介、公司介绍和服务页咨询摘要将业务、服务区域与电话一起呈现。`companyFaqItems` 提供公司业务与咨询方式两条问答，复用于首页正文、FAQ 结构化数据与 `llms.txt`；更新联系方式时同时检查这些公开信息。
- 四项服务的正文和问答维护在 `src/data/service-details.ts`；首页服务卡片、主导航、文章与相关服务使用普通 HTML 链接，正文直接输出到静态页面。
- 指南署名链接到公司介绍，发布日期依据 2026-09-04 首次公开提交记录。只在实际编辑内容时记录更新日期，不在每次部署时刷新日期。
- `llms.txt` 提供与页面一致的公开信息和链接索引，不将其作为 AI 推荐保证。未来发布真实案例时，应具备可公开的图片、项目事实和必要授权，继续区分方案效果图与完工实景。
- 正式域名由部署构建环境中的 `SITE_URL` 读取。缺失时构建会明确提示，但不会用预览地址或虚构域名替代正式域名。托管绑定域名不会自动写入 Astro 的构建配置。

`npm run test:seo` 使用 Node.js 测试运行器和仅用于开发验证的 `parse5`（MIT），检查已构建 HTML 的标题、正文、内部链接、锚点、图片、页面可达性和结构化数据。生产域名检查会核对 canonical、分享地址、robots 与 sitemap 是否一致。未配置域名的本地构建会明确跳过这一组检查。

可通过 `SEO_DIST_DIR` 指定独立的测试构建目录，通过 `SEO_SITE_URL` 指定该目录应使用的测试域名。验证产物不要部署或提交；正式产物始终使用实际的 `SITE_URL`。新增页面后运行类型检查、构建和 SEO 测试，并检查桌面及手机导航。

官方参考：[Astro sitemap](https://docs.astro.build/en/guides/integrations-guide/sitemap/)、[Google AI 搜索与 SEO](https://developers.google.com/search/docs/fundamentals/ai-optimization-guide)、[Bing Webmaster Guidelines](https://www.bing.com/webmasters/help/webmaster-guidelines-30fba23a)。

## Cloudflare 本地验证

此项目只部署静态资源，不需要 Worker 入口、Cloudflare Astro adapter、数据库或账户密钥。

```bash
npm run deploy:check
npm run cf:dev
```

`deploy:check` 先构建，再通过 `wrangler deploy --dry-run` 检查部署配置，不发布网站。`cf:dev` 使用本地 Cloudflare 运行时，默认地址为 `http://127.0.0.1:8787`；运行前应已有 `dist/`。

测试首页、指南、隐私说明和不存在的地址。不存在的地址应显示自定义 404 并返回 HTTP 404。`public/_headers` 负责静态资源的响应头；若以后添加 Worker API，API 响应需自行设置相应响应头。

## 部署到 Cloudflare Workers

项目已经准备部署配置；本次开发并不代表已登录 Cloudflare、公开发布、绑定域名或验证线上访问。实际发布需获得项目所有者授权，并使用有权限的 Cloudflare 账户。

### 使用 Git 自动构建

在 Cloudflare 的 Workers & Pages 中创建应用并导入仓库，使用以下配置：

| 设置 | 值 |
| --- | --- |
| 根目录 | `website`（如果仓库仅包含本目录内容，则使用仓库根目录） |
| 构建命令 | `npm run build` |
| 部署命令 | `npx wrangler deploy` |
| Node.js | 22，至少 22.12.0 |
| 构建环境变量 | `SITE_URL` 填写最终部署地址 |

部署名称默认是 `greenhome-kaili`，可在 `wrangler.jsonc` 中修改。新建或连接现有 Worker 时，保持平台项目名称与此配置一致。设置正式域名前可以先不填写 `SITE_URL`；拿到实际地址后再更新构建变量并重新部署。

### 本地命令部署

仅在授权发布后执行：

```bash
npx wrangler login
npm run deploy
```

`deploy` 会先构建再发布。已有有效登录时，无需重复登录。不要将 API Token、账户密钥或 `.env` 提交到 Git。部署后再检查实际网址的页面、链接、图片、404 和移动端交互；本地验证与 dry-run 不等于线上验证。

## Cloudflare Pages 兼容方式

`npm run build` 生成的 `dist/` 是普通静态网站，可直接在 Pages 的 Direct Upload 流程上传。只上传 `dist/` 的内容，不上传源代码、`node_modules/` 或上级知识库。

若使用 Pages Git 构建，根目录同样设为 `website`，构建命令设为 `npm run build`，输出目录设为 `dist`。当前 `wrangler.jsonc` 用于 Workers，不能作为 Pages 配置；不要向其中混入 `pages_build_output_dir`。Pages 的构建配置在平台单独填写。

## 复用与许可

使用官方框架与成熟库，静态托管不引入自建服务器或付费表单服务。依赖版本以 `package-lock.json` 为准。

| 项目 | 用途 | 许可 |
| --- | --- | --- |
| [Astro](https://github.com/withastro/astro/blob/main/LICENSE) | 静态页面与构建 | MIT |
| [React](https://github.com/react/react/blob/main/LICENSE) 与 [Astro React integration](https://github.com/withastro/astro/tree/main/packages/integrations/react) | 局部交互 | MIT |
| [GSAP](https://gsap.com/community/standard-license/) | 页面动画 | Standard No Charge，允许公司官网商业使用，非 MIT |
| [Wrangler](https://github.com/cloudflare/workers-sdk/tree/main/packages/wrangler) | Cloudflare 本地验证与部署 | MIT OR Apache-2.0 |

分发时保留依赖许可与版权声明。图片、字体及其他素材的授权和来源单独以项目素材记录为准，不由上述代码库许可证覆盖。

官方依据：[Astro Cloudflare 部署](https://docs.astro.build/en/guides/deploy/cloudflare/)、[静态站点路由与 404](https://developers.cloudflare.com/workers/static-assets/routing/static-site-generation/)、[静态资源响应头](https://developers.cloudflare.com/workers/static-assets/headers/)、[Wrangler 命令](https://developers.cloudflare.com/workers/wrangler/commands/workers/)、[Pages Astro 构建配置](https://developers.cloudflare.com/pages/framework-guides/deploy-an-astro-site/)。
