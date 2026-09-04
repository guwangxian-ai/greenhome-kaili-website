# 官网视觉资产与许可

检查日期：2026-09-04。

## 图片

以下图片均从 Unsplash 官方具体作品页核对了作者与 **Free to use under the Unsplash License**，未使用 Unsplash+ 素材。按官网需要下载为 WebP 后逐张查看真实画面；只做尺寸与压缩处理，没有生成或改造公司案例。

这些是第三方**空间灵感图片**，不是凯里绿色家装饰的完工项目、工地、门店或团队资料。前台应使用“空间灵感 / 非本公司案例”等明确说明，不给图片附加公司项目名称、施工地址、面积、预算、客户评价、交付时间等未经核实的信息。

| 本地文件 | 尺寸 | 画面 | 作者 / 作品来源 |
| --- | --- | --- | --- |
| `public/images/hero.webp` | 1600 × 1067 | 米白沙发、自然木色茶几与落地窗，横向采光客厅 | [Clay Banks — Modern living room with large windows overlooking trees](https://unsplash.com/photos/modern-living-room-with-large-windows-overlooking-trees-A9DmoCgM5iw) |
| `public/images/living.webp` | 1200 × 1800 | 米白沙发、木质茶几、纱帘，纵向挑高客厅 | [Jonathan Borba — A living room with a couch a chair and a table](https://unsplash.com/photos/a-living-room-with-a-couch-a-chair-and-a-table-9iljaLpo9uw) |
| `public/images/kitchen.webp` | 1200 × 1500 | 简约白色柜体、浅木色地板与绿色锅具 | [ONNO — A kitchen with white cabinets](https://unsplash.com/photos/a-kitchen-with-white-cabinets--kwhkrKLpII) |
| `public/images/bedroom.webp` | 1200 × 1800 | 自然木色床头背景、米白织物与枕头近景 | [Aleksandra Dementeva — Modern bedroom with neutral-toned pillows and bedding](https://unsplash.com/photos/modern-bedroom-with-neutral-toned-pillows-and-bedding-VotK70bRo0U) |
| `public/images/detail.webp` | 1000 × 1325 | 暖色落地灯、木桌与陶器细节 | [Mary Skrynnikova — A table with two vases and a lamp on it](https://unsplash.com/photos/a-table-with-two-vases-and-a-lamp-on-it-f9mpWX2a-QU) |

许可来源：[Unsplash License](https://unsplash.com/license)。该许可允许下载、复制、修改和商业使用，署名并非必需，但在此保留完整来源。不得将未经实质修改的图片作为图片产品出售，也不得集合素材复制同类图片服务；素材不构成摄影师、房产所有者或画面中品牌为本公司背书。

资源均自托管于本项目，无需网站访客连接 Unsplash 图片 CDN。原始资源标识（便于维护、替换）分别为：

```text
hero:    images.unsplash.com/photo-1774199679021-db3b421867c3
living:  images.unsplash.com/photo-1634822929277-0c51ca0e8846
kitchen: images.unsplash.com/photo-1657524497227-66242be7ee6e
bedroom: images.unsplash.com/photo-1766245456897-5c86726d084d
detail:  images.unsplash.com/photo-1642689703534-e41f29622078
```

## 字体

Satoshi 来源：[Fontshare 官方字体页](https://www.fontshare.com/fonts/satoshi)，发布方 Indian Type Foundry。当前许可为 [ITF Free Font License 2.0](https://www.fontshare.com/licenses/itf-ffl)（2026-08-17），允许免费个人与商业使用，**不是 SIL OFL 开源字体**。

公开仓库通过 [Fontshare 官方 CSS](https://api.fontshare.com/v2/css?f[]=satoshi@400,500,700&display=swap) 请求 400、500、700 三档字重，不包含 WOFF2 二进制文件。这样 Cloudflare 部署可以正常加载字体，也不会将字体作为公共模板或下载资源再次分发。中文使用用户设备的系统中文字体作为回退。

本地开发机保留的字体文件只用于本地预览，已由 `.gitignore` 排除。部署不依赖这些本地文件。完整许可文本保留在 `public/fonts/ITF-FFL-2.0.txt`。

## 标识

本资产包没有生成假公司 Logo。公司品牌标识应使用已有授权原稿，或在页面中采用公司名称文字排版。

## 站点标识

页头的房屋与叶片线条图形及 favicon 为本次网站提案绘制的 SVG 标识，不表示公司已经注册或正式使用该商标。可替换为公司确认的品牌资产。
