import { defineConfig } from "astro/config";
import react from "@astrojs/react";
import sitemap from "@astrojs/sitemap";
import { loadEnvFile } from "node:process";

try {
  loadEnvFile();
} catch (error) {
  if (error.code !== "ENOENT") throw error;
}
const configuredSite = process.env.SITE_URL?.trim();
if (!configuredSite && process.argv.includes('build')) {
  console.warn('[SEO] 未配置 SITE_URL：本次保留本地相对网址，不生成 canonical 和 XML sitemap。正式构建请使用部署环境中的 HTTPS 域名。');
}
if (configuredSite) {
  const parsed = new URL(configuredSite);
  if (parsed.protocol !== "https:")
    throw new Error("SITE_URL 必须是正式部署的 HTTPS 地址");
  if (
    parsed.pathname !== "/" ||
    parsed.search ||
    parsed.hash ||
    parsed.username ||
    parsed.password
  )
    throw new Error("SITE_URL 只填写网站根域名，不包含路径、查询参数或凭证");
}

export default defineConfig({
  site: configuredSite || undefined,
  output: "static",
  trailingSlash: "always",
  devToolbar: { enabled: false },
  integrations: [react(), ...(configuredSite ? [sitemap({
    filter: (page) => !/^\/404(?:\.html|\/)?$/.test(new URL(page).pathname),
  })] : [])],
  server: { port: 4321, host: "127.0.0.1" },
});
