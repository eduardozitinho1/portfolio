"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { site } from "@/lib/site";

const NAV = [
  { href: "/projects", label: "Projetos" },
  { href: "/about", label: "Sobre" },
  { href: "/briefing", label: "Criar site" },
  { href: "/contact", label: "Contato" },
];

export function SiteHeader() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [open]);

  return (
    <>
      <header className="site-header">
        <div className="container site-header__inner">
          <Link
            href="/"
            className="site-header__brand"
            aria-label="Eduardo Amorim Pereira — início"
          >
            <span className="site-header__brand-name">{site.name}</span>
            <span className="site-header__brand-meta">
              <span className="dot" aria-hidden />
              <span>{site.role}</span>
            </span>
          </Link>

          <nav className="site-header__nav" aria-label="Navegação principal">
            {NAV.map((item) => {
              const active =
                pathname === item.href || pathname.startsWith(item.href + "/");
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  aria-current={active ? "page" : undefined}
                  className={`nav-link${active ? " nav-link--active" : ""}`}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>

          <button
            type="button"
            className="site-header__menu-btn"
            aria-expanded={open}
            aria-controls="mobile-nav"
            aria-label={open ? "Fechar menu" : "Abrir menu"}
            onClick={() => setOpen((v) => !v)}
          >
            <span
              className={`menu-icon${open ? " menu-icon--open" : ""}`}
              aria-hidden
            >
              <span />
              <span />
            </span>
          </button>
        </div>
      </header>

      {open && (
        <div
          id="mobile-nav"
          className="mobile-nav"
          role="dialog"
          aria-label="Menu"
        >
          <nav className="mobile-nav__inner" aria-label="Navegação mobile">
            {NAV.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="mobile-nav__link"
                onClick={() => setOpen(false)}
              >
                <span className="mobile-nav__label">{item.label}</span>
                <span aria-hidden className="mobile-nav__arrow">
                  →
                </span>
              </Link>
            ))}
            <div className="mobile-nav__footer">
              <a href={`mailto:${site.email}`} className="mono mono--sm">
                {site.email}
              </a>
            </div>
          </nav>
        </div>
      )}
    </>
  );
}
