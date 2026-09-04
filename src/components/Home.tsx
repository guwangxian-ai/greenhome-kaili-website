import { useEffect, useRef, useState, type SubmitEvent } from "react";
import {
  ArrowUpRightIcon,
  ArrowRightIcon,
  ArrowDownIcon,
  CheckIcon,
  CopyIcon,
  MapPinIcon,
  PhoneIcon,
  PlusIcon,
  XIcon,
  PauseIcon,
  PlayIcon,
  LeafIcon,
  HouseLineIcon,
  RulerIcon,
  PencilSimpleIcon,
} from "@phosphor-icons/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { company, faqItems, guides } from "../data/company";

gsap.registerPlugin(ScrollTrigger, useGSAP);

const spaces = [
  {
    title: "把自然，留在家里",
    name: "温暖原木",
    image: "/images/living.webp",
    description: "自然木色、柔和织物与恰到好处的留白，让日常多一点松弛。",
    ideas: ["保留自然采光", "木色与米白搭配", "给常用物品留位置"],
  },
  {
    title: "让下厨，成为享受",
    name: "清爽日常",
    image: "/images/kitchen.webp",
    description: "把备餐、烹饪与收纳的顺序理清楚，让厨房更顺手，也更容易打理。",
    ideas: ["按习惯规划操作顺序", "兼顾收纳与清洁", "提前确认电器尺寸"],
  },
  {
    title: "给自己，一点安静",
    name: "柔和栖居",
    image: "/images/bedroom.webp",
    description: "用柔和的色彩与有层次的照明，为一天的结束留一个舒服的角落。",
    ideas: ["柔和、分层的光线", "舒适的床边动线", "符合生活节奏的收纳"],
  },
];

const processSteps = [
  {
    title: "先聊生活，再聊设计。",
    text: "从户型、预算和一家人的生活习惯聊起。想多一个阅读角，还是让厨房更顺手？把真正的需要放在前面。",
    label: "需求沟通",
    detail: "带上户型图，也带上你对家的想法。",
    icon: HouseLineIcon,
  },
  {
    title: "把想法，放进具体方案。",
    text: "结合现场尺寸，讨论空间布局与材料选择。哪些要做、哪些可以保留，让设计和预算一起往前走。",
    label: "设计与选材",
    detail: "一起梳理布局、材料与预算清单。",
    icon: PencilSimpleIcon,
  },
  {
    title: "看得见过程，才更安心。",
    text: "施工前明确范围与节点，施工中关注材料、工序和现场沟通。水电、防水等隐蔽工程，要在覆盖前核验。",
    label: "施工与验收",
    detail: "具体施工安排与验收方式写进约定。",
    icon: RulerIcon,
  },
  {
    title: "住进新日常，也有据可依。",
    text: "完工时核对施工项目与材料，保留预算、变更和验收记录。保修范围、期限与响应方式，以正式合同为准。",
    label: "交付与售后",
    detail: "重要约定留下记录，后续沟通更清楚。",
    icon: LeafIcon,
  },
];

type Brief = {
  type: string;
  area: string;
  location: string;
  budget: string;
  wish: string;
};
const initialBrief: Brief = {
  type: "新房装修",
  area: "",
  location: "凯里",
  budget: "还想先了解一下",
  wish: "",
};

export default function Home() {
  const root = useRef<HTMLElement>(null);
  const dialog = useRef<HTMLDialogElement>(null);
  const [activeSpace, setActiveSpace] = useState(0);
  const [dialogType, setDialogType] = useState<"brief" | "space" | null>(null);
  const [brief, setBrief] = useState<Brief>(initialBrief);
  const [briefReady, setBriefReady] = useState(false);
  const [copyStatus, setCopyStatus] = useState("");
  const [addressCopyStatus, setAddressCopyStatus] = useState("");
  const [marqueePaused, setMarqueePaused] = useState(false);

  useEffect(() => {
    if (!dialogType) return;
    const node = dialog.current;
    if (!node) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    if (!node.open) node.showModal();
    return () => {
      node.close();
      document.body.style.overflow = previousOverflow;
    };
  }, [dialogType]);

  useGSAP(
    () => {
      const media = gsap.matchMedia();
      media.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.from(".hero-enter", {
          y: 26,
          opacity: 0,
          duration: 0.9,
          stagger: 0.1,
          ease: "power2.out",
        });
        gsap.from(".philosophy-word", {
          opacity: 0.14,
          stagger: 0.14,
          ease: "none",
          scrollTrigger: {
            trigger: ".philosophy-statement",
            start: "top 82%",
            end: "bottom 48%",
            scrub: 0.7,
          },
        });
        gsap.utils
          .toArray<HTMLElement>(".section-heading")
          .forEach((element) => {
            gsap.from(element, {
              y: 25,
              opacity: 0,
              duration: 0.75,
              scrollTrigger: { trigger: element, start: "top 92%", once: true },
            });
          });
      });
      media.add(
        "(min-width: 1000px) and (min-height: 640px) and (prefers-reduced-motion: no-preference)",
        () => {
          const cards = gsap.utils.toArray<HTMLElement>(".process-card");
          cards.slice(0, -1).forEach((card, index) => {
            ScrollTrigger.create({
              trigger: card,
              start: `top ${130 + index * 20}`,
              endTrigger: ".process-stack",
              end: "bottom 600",
              pin: true,
              pinSpacing: false,
              invalidateOnRefresh: true,
            });
            gsap.to(card, {
              scale: 0.95,
              ease: "none",
              scrollTrigger: {
                trigger: cards[index + 1],
                start: "top 90%",
                end: `top ${150 + index * 20}`,
                scrub: true,
              },
            });
          });
        },
      );
      return () => media.revert();
    },
    { scope: root },
  );

  const openBrief = (type?: string) => {
    if (type) setBrief((current) => ({ ...current, type }));
    setCopyStatus("");
    setBriefReady(false);
    setDialogType("brief");
  };

  const briefText = `你好，我想咨询凯里绿色家装饰。\n装修类型：${brief.type}\n房屋位置：${brief.location.trim()}\n房屋面积：${brief.area}㎡\n计划预算：${brief.budget}\n主要想法：${brief.wish.trim() || "希望先沟通户型、装修范围和预算。"}\n想了解适合我家的方案，以及后续量房与报价方式。`;

  async function copyText(text: string, target: "brief" | "address" = "brief") {
    const updateStatus =
      target === "address" ? setAddressCopyStatus : setCopyStatus;
    try {
      await navigator.clipboard.writeText(text);
      updateStatus(
        target === "address"
          ? "门店地址已复制。"
          : "已复制，可粘贴给装修顾问。",
      );
    } catch {
      updateStatus(
        target === "address"
          ? "请选中上方地址复制。"
          : "请长按下方文字或选中后复制。",
      );
    }
  }

  function submitBrief(event: SubmitEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!brief.location.trim()) return;
    setBriefReady(true);
    setCopyStatus("");
  }

  return (
    <main ref={root} id="main-content" className="site-main">
      <section className="hero container" aria-labelledby="hero-title">
        <div className="hero-copy">
          <div className="hero-location hero-enter">
            <span className="tiny-line" />
            立足凯里，服务黔东南
          </div>
          <h1 id="hero-title" className="hero-enter">
            <span>把日子，</span>
            <span>住成喜欢的样子。</span>
          </h1>
          <p className="hero-description hero-enter">
            从一张户型图，到一家人的好生活。
            <br />
            凯里绿色家装饰，陪你把关于家的想法慢慢落地。
          </p>
          <div className="hero-actions hero-enter">
            <button
              className="button button-primary"
              onClick={() => openBrief()}
            >
              聊聊我的家
              <ArrowUpRightIcon size={20} aria-hidden="true" />
            </button>
            <a className="text-link" href="#inspiration">
              寻找空间灵感
              <ArrowDownIcon size={18} aria-hidden="true" />
            </a>
          </div>
          <div className="hero-footnote hero-enter">
            <LeafIcon size={19} weight="light" aria-hidden="true" />
            <span>环保选材 · 实用设计 · 本地服务</span>
          </div>
        </div>
        <figure className="hero-visual hero-enter">
          <div className="hero-image-wrap">
            <img
              src="/images/hero.webp"
              width="1600"
              height="1067"
              alt="自然光洒入木色与米白搭配的客厅，展示温暖的居住空间灵感"
              fetchPriority="high"
            />
          </div>
          <figcaption>
            <span>让家，成为最想回去的地方。</span>
            <span>空间灵感 · 非实拍案例</span>
          </figcaption>
          <span className="hero-image-rule" aria-hidden="true" />
        </figure>
      </section>

      <div className="values-marquee" aria-label="凯里绿色家装饰服务理念">
        <div
          className="marquee-track"
          style={{ animationPlayState: marqueePaused ? "paused" : "running" }}
        >
          {[0, 1, 2, 3].map((repeat) => (
            <div
              className="marquee-set"
              aria-hidden={repeat > 0 ? true : undefined}
              key={repeat}
            >
              <span>懂空间</span>
              <span className="marquee-dot" />
              <span>更懂生活</span>
              <span className="marquee-dot" />
              <span>从你的日常出发</span>
              <span className="marquee-dot" />
            </div>
          ))}
        </div>
        <button
          className="marquee-pause"
          onClick={() => setMarqueePaused(!marqueePaused)}
          aria-label={marqueePaused ? "继续文字滚动" : "暂停文字滚动"}
        >
          {marqueePaused ? (
            <PlayIcon size={15} weight="fill" />
          ) : (
            <PauseIcon size={15} weight="fill" />
          )}
        </button>
      </div>

      <section
        id="services"
        className="section-space container"
        aria-labelledby="services-title"
      >
        <div className="section-heading section-heading-split">
          <div>
            <p className="section-kicker">适合你家的，才是好方案</p>
            <h2 id="services-title">
              每一种家的改变，
              <br />
              都值得认真对待。
            </h2>
          </div>
          <p className="section-intro">
            新房的期待，旧居的焕新，或一个角落的小改变。
            <br className="desktop-break" />
            从设计、选材到施工与售后，按你的需要来。
          </p>
        </div>
        <div className="services-bento">
          <button
            className="service-card service-card-large"
            onClick={() => openBrief("新房装修")}
            aria-label="了解新房装修并整理我的需求"
          >
            <img
              src="/images/living.webp"
              width="1200"
              height="1800"
              loading="lazy"
              alt="米白与木色客厅的空间灵感"
            />
            <span className="service-photo-shade" />
            <span className="service-card-content">
              <span className="service-small-title">从毛坯到理想的家</span>
              <span className="service-card-title">新房装修</span>
              <span className="service-card-description">
                把布局、材料与预算，一起考虑周全。
              </span>
            </span>
            <span className="service-arrow">
              <ArrowUpRightIcon size={26} />
            </span>
            <span className="photo-reference">空间灵感</span>
          </button>
          <button
            className="service-card service-card-renovation"
            onClick={() => openBrief("旧房翻新")}
          >
            <span className="service-card-content">
              <span className="service-small-title">留住熟悉，换来舒适</span>
              <span className="service-card-title">旧房翻新</span>
              <span className="service-card-description">
                从房屋现状出发，梳理更适合当下的生活。
              </span>
            </span>
            <span className="service-arrow">
              <ArrowUpRightIcon size={25} aria-hidden="true" />
            </span>
            <span className="architectural-lines" aria-hidden="true">
              <i />
              <i />
              <i />
            </span>
          </button>
          <button
            className="service-card service-card-partial"
            onClick={() => openBrief("局部改造")}
          >
            <span className="service-card-content">
              <span className="service-small-title">让日常，再顺手一点</span>
              <span className="service-card-title">局部改造</span>
              <span className="service-card-description">
                厨房、卫生间与收纳空间，回应具体需求。
              </span>
            </span>
            <span className="service-arrow">
              <ArrowUpRightIcon size={25} aria-hidden="true" />
            </span>
            <img
              className="service-detail-image"
              src="/images/detail.webp"
              width="1000"
              height="1325"
              loading="lazy"
              alt="家居材质细节示意"
            />
          </button>
        </div>
        <div className="service-note">
          <span>也可先从设计和材料选配聊起，具体服务范围以项目沟通为准。</span>
          <a href="#contact" className="text-link">
            了解适合我的服务
            <ArrowRightIcon size={18} aria-hidden="true" />
          </a>
        </div>
      </section>

      <section
        id="approach"
        className="philosophy section-space"
        aria-labelledby="philosophy-title"
      >
        <div className="container philosophy-inner">
          <p className="section-kicker">家，是生活本来的样子</p>
          <h2
            id="philosophy-title"
            className="philosophy-statement"
            aria-label="好的装修，始于对生活的理解。让每一寸空间，都与日常相处得刚刚好。"
          >
            <span className="philosophy-word" aria-hidden="true">
              好的装修，
            </span>
            <span className="philosophy-word" aria-hidden="true">
              始于对生活的理解。
            </span>
            <br />
            <span className="philosophy-word" aria-hidden="true">
              让每一寸
            </span>
            <span className="inline-photo" aria-hidden="true">
              <img
                src="/images/detail.webp"
                alt=""
                loading="lazy"
                width="150"
                height="75"
              />
            </span>
            <span className="philosophy-word" aria-hidden="true">
              空间，
            </span>
            <br />
            <span className="philosophy-word" aria-hidden="true">
              都与日常
            </span>
            <span className="philosophy-word" aria-hidden="true">
              相处得刚刚好。
            </span>
          </h2>
          <p className="philosophy-description">
            凯里绿色家装饰立足凯里，面向黔东南家庭提供住宅装修服务。
            <br className="desktop-break" />
            我们关注环保与品质，也关心你回家后的每一个平常日子。
          </p>
          <a className="text-link" href="#process">
            认识我们的服务思路
            <ArrowDownIcon size={18} aria-hidden="true" />
          </a>
        </div>
      </section>

      <section
        id="inspiration"
        className="section-space container"
        aria-labelledby="inspiration-title"
      >
        <div className="section-heading section-heading-split">
          <div>
            <p className="section-kicker">收藏你喜欢的生活</p>
            <h2 id="inspiration-title">
              家的样子，
              <br />
              从一点心动开始。
            </h2>
          </div>
          <p className="section-intro">
            不急着给风格下定义。
            <br />
            先看看，什么样的空间让你感到舒服。
          </p>
        </div>
        <div className="space-accordion">
          {spaces.map((space, index) => (
            <article
              className={`space-panel ${activeSpace === index ? "is-active" : ""}`}
              key={space.name}
              onMouseEnter={() => setActiveSpace(index)}
            >
              <img
                src={space.image}
                alt={`${space.name}家居空间灵感`}
                width="1200"
                height="1000"
                loading="lazy"
              />
              <button
                className="space-panel-action"
                onFocus={() => setActiveSpace(index)}
                onClick={() => {
                  setActiveSpace(index);
                  setDialogType("space");
                }}
                aria-label={`查看${space.name}空间灵感`}
              >
                <span className="space-number" aria-hidden="true">
                  0{index + 1}
                </span>
                <span className="space-panel-caption">
                  <span>{space.name}</span>
                  <strong>{space.title}</strong>
                  <span className="space-more">
                    看看这个空间
                    <ArrowUpRightIcon size={18} aria-hidden="true" />
                  </span>
                </span>
                <span className="space-circle">
                  <ArrowUpRightIcon size={24} aria-hidden="true" />
                </span>
              </button>
            </article>
          ))}
        </div>
        <p className="image-disclosure">
          图片用于呈现风格与空间灵感，不代表凯里绿色家装饰已交付项目。实际方案根据户型、预算与需求确定。
        </p>
      </section>

      <section
        id="process"
        className="process-section section-space"
        aria-labelledby="process-title"
      >
        <div className="container process-layout">
          <div className="process-intro section-heading">
            <p className="section-kicker">把每一步，聊得更清楚</p>
            <h2 id="process-title">
              从你的想法，
              <br />
              走向你的家。
            </h2>
            <p>
              装修涉及很多选择。
              <br />
              我们把沟通的重点梳理出来，
              <br />
              陪你一步一步，做适合自己的决定。
            </p>
            <a href="#contact" className="text-link">
              从一次交流开始
              <ArrowUpRightIcon size={18} aria-hidden="true" />
            </a>
          </div>
          <div className="process-stack">
            {processSteps.map((step, index) => (
              <article
                className="process-card"
                key={step.label}
                style={{ zIndex: index + 1 }}
              >
                <div className="process-card-top">
                  <span>{step.label}</span>
                  <span className="process-number">0{index + 1}</span>
                </div>
                <step.icon
                  className="process-icon"
                  size={44}
                  weight="light"
                  aria-hidden="true"
                />
                <h3>{step.title}</h3>
                <p>{step.text}</p>
                <div className="process-detail">
                  <span className="tiny-line" />
                  {step.detail}
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section
        id="guides"
        className="section-space container"
        aria-labelledby="guides-title"
      >
        <div className="section-heading section-heading-split">
          <div>
            <p className="section-kicker">多了解一点，决定从容一点</p>
            <h2 id="guides-title">装修之前，值得读一读。</h2>
          </div>
          <a href="/guides/" className="text-link">
            全部装修指南
            <ArrowUpRightIcon size={19} aria-hidden="true" />
          </a>
        </div>
        <div className="guide-grid">
          {guides.map((guide, index) => (
            <a
              className="guide-card"
              href={`/guides/${guide.slug}/`}
              key={guide.slug}
            >
              <div className="guide-image">
                <img
                  src={
                    [
                      "/images/detail.webp",
                      "/images/living.webp",
                      "/images/kitchen.webp",
                    ][index]
                  }
                  width="1000"
                  height="700"
                  loading="lazy"
                  alt={`${guide.category}的家居场景示意`}
                />
                <span className="guide-image-label">{guide.category}</span>
              </div>
              <div className="guide-meta">
                <span>装修指南</span>
                <span>约 {guide.readingMinutes} 分钟阅读</span>
              </div>
              <h3>{guide.title}</h3>
              <p>{guide.description}</p>
              <span className="guide-read">
                展开阅读
                <ArrowUpRightIcon size={19} aria-hidden="true" />
              </span>
            </a>
          ))}
        </div>
      </section>

      <section
        id="faq"
        className="faq-section section-space container"
        aria-labelledby="faq-title"
      >
        <div className="section-heading">
          <p className="section-kicker">你可能还想知道</p>
          <h2 id="faq-title">先把疑问，说清楚。</h2>
          <p className="faq-intro">
            关于范围、预算与装修安排，
            <br />
            这里有一些可以先了解的答案。
          </p>
          <a className="text-link" href="#contact">
            还有问题，直接聊聊
            <ArrowUpRightIcon size={19} aria-hidden="true" />
          </a>
        </div>
        <div className="faq-list">
          {faqItems.map((faq) => (
            <details key={faq.question}>
              <summary>
                {faq.question}
                <PlusIcon size={20} aria-hidden="true" />
              </summary>
              <p>{faq.answer}</p>
            </details>
          ))}
        </div>
      </section>

      <section
        id="contact"
        className="contact-section"
        aria-labelledby="contact-title"
      >
        <div className="contact-orbit" aria-hidden="true" />
        <div className="container contact-inner">
          <div className="contact-copy">
            <p className="section-kicker">你的理想生活，值得好好聊聊</p>
            <h2 id="contact-title">
              家里的下一页，
              <br />
              我们一起写。
            </h2>
            <p>
              带上户型图，或只是一个关于家的想法。
              <br />
              从你的真实需要开始，把装修这件事聊清楚。
            </p>
            <button className="button button-light" onClick={() => openBrief()}>
              整理我的装修需求
              <ArrowUpRightIcon size={20} aria-hidden="true" />
            </button>
          </div>
          <div className="contact-details">
            <a className="contact-phone" href={company.tel}>
              <span>
                <PhoneIcon size={19} aria-hidden="true" />
                直接和我们聊聊
              </span>
              <strong>198 8533 2380</strong>
              <span>
                点击拨打
                <ArrowUpRightIcon size={17} aria-hidden="true" />
              </span>
            </a>
            <div className="contact-address">
              <MapPinIcon size={20} aria-hidden="true" />
              <div>
                <h3>在凯里，等你来坐坐。</h3>
                <p>
                  凯里市城西街道迎宾大道77号
                  <br />
                  隆源公馆商铺11-2-202
                </p>
                <button
                  className="contact-copy-address"
                  onClick={() => copyText(company.address, "address")}
                >
                  复制门店地址
                  <CopyIcon size={16} aria-hidden="true" />
                </button>
                <span className="copy-feedback" role="status">
                  {addressCopyStatus}
                </span>
              </div>
            </div>
            <p className="contact-service-area">
              主要服务凯里及黔东南地区，具体承接范围请提前沟通。
            </p>
          </div>
        </div>
      </section>

      <dialog
        ref={dialog}
        className={`site-dialog ${dialogType === "space" ? "space-dialog" : ""}`}
        onCancel={() => setDialogType(null)}
        onClick={(event) => {
          if (event.target === event.currentTarget) {
            const rect = event.currentTarget.getBoundingClientRect();
            if (
              event.clientX < rect.left ||
              event.clientX > rect.right ||
              event.clientY < rect.top ||
              event.clientY > rect.bottom
            )
              setDialogType(null);
          }
        }}
        aria-labelledby="dialog-title"
      >
        <button
          className="dialog-close"
          aria-label="关闭窗口"
          onClick={() => setDialogType(null)}
        >
          <XIcon size={24} />
        </button>
        {dialogType === "space" ? (
          <div className="space-dialog-content">
            <img
              src={spaces[activeSpace].image}
              alt={`${spaces[activeSpace].name}空间灵感大图`}
              width="1200"
              height="1000"
            />
            <div>
              <p className="section-kicker">
                {spaces[activeSpace].name} · 空间灵感
              </p>
              <h2 id="dialog-title">{spaces[activeSpace].title}</h2>
              <p>{spaces[activeSpace].description}</p>
              <ul>
                {spaces[activeSpace].ideas.map((idea) => (
                  <li key={idea}>
                    <CheckIcon size={17} aria-hidden="true" />
                    {idea}
                  </li>
                ))}
              </ul>
              <p className="image-disclosure">
                图片为风格参考，非公司实拍案例。
              </p>
              <button
                className="button button-primary"
                onClick={() => {
                  setBrief((current) => ({
                    ...current,
                    wish: `喜欢“${spaces[activeSpace].name}”的空间感觉，希望结合我的户型聊聊。`,
                  }));
                  setBriefReady(false);
                  setDialogType("brief");
                }}
              >
                把灵感放进我的需求
                <ArrowRightIcon size={18} aria-hidden="true" />
              </button>
            </div>
          </div>
        ) : (
          <div className="brief-dialog-content">
            <p className="section-kicker">让第一次交流，更有方向</p>
            <h2 id="dialog-title">
              {briefReady ? "你的装修沟通清单" : "先聊聊，你心里的家。"}
            </h2>
            {briefReady ? (
              <div className="brief-result">
                <p>清单已经整理好。复制后可发给顾问，或直接来电沟通。</p>
                <textarea
                  aria-label="装修沟通清单"
                  value={briefText}
                  readOnly
                  rows={9}
                />
                <p className="copy-feedback" role="status">
                  {copyStatus}
                </p>
                <div className="brief-result-actions">
                  <button
                    className="button button-primary"
                    onClick={() => copyText(briefText)}
                  >
                    <CopyIcon size={18} aria-hidden="true" />
                    复制沟通清单
                  </button>
                  <a className="button button-outline" href={company.tel}>
                    <PhoneIcon size={18} aria-hidden="true" />
                    电话咨询
                  </a>
                </div>
                <button
                  className="text-link brief-back"
                  onClick={() => setBriefReady(false)}
                >
                  返回修改
                </button>
              </div>
            ) : (
              <form onSubmit={submitBrief}>
                <fieldset>
                  <legend>你希望做哪种改变？</legend>
                  <div className="brief-type-options">
                    {["新房装修", "旧房翻新", "局部改造"].map((type) => (
                      <label
                        className={brief.type === type ? "is-selected" : ""}
                        key={type}
                      >
                        <input
                          type="radio"
                          name="type"
                          value={type}
                          checked={brief.type === type}
                          onChange={() => setBrief({ ...brief, type })}
                        />
                        {type}
                      </label>
                    ))}
                  </div>
                </fieldset>
                <div className="brief-form-grid">
                  <label>
                    房屋所在区域
                    <input
                      name="location"
                      value={brief.location}
                      onChange={(event) =>
                        setBrief({ ...brief, location: event.target.value })
                      }
                      maxLength={60}
                      required
                      placeholder="例如：凯里市"
                    />
                  </label>
                  <label>
                    房屋面积（㎡）
                    <input
                      type="number"
                      name="area"
                      min="1"
                      max="3000"
                      step="0.1"
                      inputMode="decimal"
                      value={brief.area}
                      onChange={(event) =>
                        setBrief({ ...brief, area: event.target.value })
                      }
                      required
                      placeholder="例如：100"
                    />
                  </label>
                </div>
                <label>
                  计划预算
                  <select
                    name="budget"
                    value={brief.budget}
                    onChange={(event) =>
                      setBrief({ ...brief, budget: event.target.value })
                    }
                  >
                    {[
                      "还想先了解一下",
                      "5万元以内",
                      "5—10万元",
                      "10—20万元",
                      "20万元以上",
                    ].map((value) => (
                      <option key={value}>{value}</option>
                    ))}
                  </select>
                </label>
                <label>
                  最想改变什么？
                  <textarea
                    name="wish"
                    rows={3}
                    maxLength={300}
                    value={brief.wish}
                    onChange={(event) =>
                      setBrief({ ...brief, wish: event.target.value })
                    }
                    placeholder="例如：想增加收纳，让厨房更容易打理……"
                  />
                </label>
                <p className="brief-privacy">
                  填写内容仅用于生成你的沟通清单，不会自动提交。预算为你的计划范围，具体报价另行沟通。
                </p>
                <button
                  className="button button-primary brief-submit"
                  type="submit"
                >
                  生成沟通清单
                  <ArrowRightIcon size={19} aria-hidden="true" />
                </button>
              </form>
            )}
          </div>
        )}
      </dialog>
    </main>
  );
}
