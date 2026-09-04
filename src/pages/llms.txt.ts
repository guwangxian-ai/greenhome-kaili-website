import type { APIRoute } from "astro";
import { company, guides } from "../data/company";

export const GET: APIRoute = ({ site }) => {
  const link = (path: string) => (site ? new URL(path, site).href : path);
  const text = `# ${company.fullName}\n\n${company.description}\n\n## 公司公开信息\n\n- 品牌简称：${company.shortName}\n- 服务区域：${company.serviceArea.join("、")}，具体承接范围需沟通确认\n- 地址：${company.address}\n- 联系电话：${company.phone}\n- 业务：住宅设计、新房装修、旧房翻新、局部改造、材料选配、施工与工程管理、售后服务\n- 价格、工期、材料配置与保修以具体项目方案及正式合同为准\n- 网站空间图片为灵感参考，不是公司交付案例\n\n## 装修指南\n\n${guides.map((guide) => `- [${guide.title}](${link(`/guides/${guide.slug}/`)}): ${guide.description}`).join("\n")}\n\n## 网站页面\n\n- [公司介绍与服务](${link("/")})\n- [装修指南](${link("/guides/")})\n- [隐私说明](${link("/privacy/")})\n`;
  return new Response(text, {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
};
