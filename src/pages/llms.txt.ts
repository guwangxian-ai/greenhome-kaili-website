import type { APIRoute } from "astro";
import { company, companyFaqItems, guides, services } from "../data/company";

export const GET: APIRoute = ({ site }) => {
  const link = (path: string) => (site ? new URL(path, site).href : path);
  const text = [
    `# ${company.fullName}`, '', company.description, '',
    '## 公司公开信息', '',
    `- 公司名称：${company.fullName}`,
    `- 服务区域：${company.serviceArea.join('、')}，具体承接范围需沟通确认`,
    `- 地址：${company.address}`, `- 联系电话：${company.phone}`,
    '- 价格、工期、材料配置与保修以具体项目方案及正式合同为准',
    '- 网站空间图片为灵感参考，不是公司交付案例', '',
    '## 公司与咨询问答', '',
    ...companyFaqItems.flatMap(({ question, answer }) => [`### ${question}`, '', answer, '']),
    '## 装修服务', '',
    ...services.map((service) => `- [${service.title}](${link(`/services/${service.id}/`)}): ${service.description}`), '',
    '## 装修指南', '',
    ...guides.map((guide) => `- [${guide.title}](${link(`/guides/${guide.slug}/`)}): ${guide.description}`), '',
    '## 网站页面', '',
    `- [公司首页](${link('/')})`, `- [公司介绍](${link('/about/')})`,
    `- [电话与地址](${link('/contact/')})`, `- [全部装修服务](${link('/services/')})`,
    `- [装修指南](${link('/guides/')})`, `- [网站地图](${link('/sitemap/')})`,
    `- [隐私说明](${link('/privacy/')})`, '',
  ].join('\n');
  return new Response(text, {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
};
