import { useEffect, useState } from "react";
import { ArrowUpRightIcon, ListIcon, XIcon } from "@phosphor-icons/react";

import { company } from "../data/company";

const links = [
  ["装修服务", "/#services"],
  ["空间灵感", "/#inspiration"],
  ["走近我们", "/#approach"],
  ["装修指南", "/guides/"],
];

export default function Header() {
  const [open, setOpen] = useState(false);
  useEffect(() => {
    const handleKey = (event: KeyboardEvent) =>
      event.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, []);

  return (
    <header className="site-header">
      <div className="header-inner">
        <a
          className="brand"
          href="/"
          aria-label={`${company.displayName}首页`}
          onClick={() => setOpen(false)}
        >
          <span className="brand-mark company-logo-mask" aria-hidden="true" />
          <span className="brand-wordmark">
            {company.displayName}
            <span>{company.englishName}</span>
          </span>
          <span className="brand-divider" />
          <span className="brand-local">凯里 · 家装</span>
        </a>
        <nav aria-label="主导航" className="desktop-nav">
          {links.map(([label, href]) => (
            <a key={href} href={href}>
              {label}
            </a>
          ))}
        </nav>
        <a
          className="header-contact"
          href="/#contact"
          onClick={() => setOpen(false)}
        >
          聊聊你的家 <ArrowUpRightIcon size={17} aria-hidden="true" />
        </a>
        <button
          className="menu-toggle"
          type="button"
          aria-label={open ? "关闭导航" : "打开导航"}
          aria-expanded={open}
          aria-controls="mobile-navigation"
          onClick={() => setOpen(!open)}
        >
          {open ? <XIcon size={24} /> : <ListIcon size={24} />}
        </button>
      </div>
      <nav
        id="mobile-navigation"
        className="mobile-nav"
        aria-label="手机导航"
        hidden={!open}
      >
        {links.map(([label, href]) => (
          <a key={href} href={href} onClick={() => setOpen(false)}>
            {label}
            <ArrowUpRightIcon size={19} aria-hidden="true" />
          </a>
        ))}
        <a href="/#contact" onClick={() => setOpen(false)}>
          联系我们
          <ArrowUpRightIcon size={19} aria-hidden="true" />
        </a>
      </nav>
    </header>
  );
}
