"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { translations } from "@/components/translations";

type Locale = keyof typeof translations;
type Theme = "light" | "dark";
type Copy = typeof translations["pt-BR"];
type CopyKey = keyof Copy;

const storageKeys = {
  theme: "finly-theme",
  lang: "finly-lang",
};

const getInitialTheme = (): Theme => {
  if (typeof window === "undefined") return "light";
  const storedTheme = localStorage.getItem(storageKeys.theme) as Theme | null;
  if (storedTheme) return storedTheme;
  return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
};

const getInitialLang = (): Locale => {
  if (typeof window === "undefined") return "pt-BR";
  const storedLang = localStorage.getItem(storageKeys.lang) as Locale | null;
  return storedLang ?? "pt-BR";
};

export default function LandingPage() {
  const reduceMotion = useReducedMotion();
  const [theme, setTheme] = useState<Theme>("light");
  const [lang, setLang] = useState<Locale>("pt-BR");
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { scrollY } = useScroll();
  const glowY = useTransform(scrollY, [0, 600], [0, -120]);
  const orbY = useTransform(scrollY, [0, 600], [0, 140]);

  useEffect(() => {
    setTheme(getInitialTheme());
    setLang(getInitialLang());
  }, []);

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem(storageKeys.theme, theme);
  }, [theme]);

  useEffect(() => {
    document.documentElement.lang = lang;
    localStorage.setItem(storageKeys.lang, lang);
  }, [lang]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const width = canvas.width;
    const height = canvas.height;
    ctx.clearRect(0, 0, width, height);
    ctx.strokeStyle = "rgba(77, 124, 254, 0.9)";
    ctx.lineWidth = 2;
    ctx.beginPath();
    const points = [12, 22, 18, 30, 24, 20, 34, 42, 38, 50, 44, 36, 54, 58, 64, 46];
    points.forEach((value, index) => {
      const x = (index / (points.length - 1)) * width;
      const y = height - (value / 64) * height;
      if (index === 0) ctx.moveTo(x, y);
      else ctx.lineTo(x, y);
    });
    ctx.stroke();
  }, [reduceMotion]);

  const copy = useMemo(() => translations[lang], [lang]);

  const nextThemeLabel =
    theme === "dark" ? copy["toggles.themeToLight"] : copy["toggles.themeToDark"];
  const themeValue =
    theme === "dark" ? copy["toggles.themeLight"] : copy["toggles.themeDark"];
  const nextLangLabel = lang === "pt-BR" ? copy["toggles.langToEn"] : copy["toggles.langToPt"];
  const langValue = lang === "pt-BR" ? copy["toggles.langEn"] : copy["toggles.langPt"];

  const fadeUp = {
    hidden: { opacity: 0, y: reduceMotion ? 0 : 18 },
    visible: { opacity: 1, y: 0 },
  };

  const stagger = {
    hidden: {},
    visible: { transition: { staggerChildren: reduceMotion ? 0 : 0.08 } },
  };

  const featureItems: { title: CopyKey; desc: CopyKey; icon: JSX.Element }[] = [
    {
      title: "features.item1.title",
      desc: "features.item1.desc",
      icon: (
        <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <path
            d="M4 7h16M4 12h10M4 17h7"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinecap="round"
          />
        </svg>
      ),
    },
    {
      title: "features.item2.title",
      desc: "features.item2.desc",
      icon: (
        <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <path
            d="M4 18V6M4 18h16M8 14v4M12 10v8M16 7v11"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinecap="round"
          />
        </svg>
      ),
    },
    {
      title: "features.item3.title",
      desc: "features.item3.desc",
      icon: (
        <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <path
            d="m6 12 4 4 8-8"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.6" />
        </svg>
      ),
    },
    {
      title: "features.item4.title",
      desc: "features.item4.desc",
      icon: (
        <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <path
            d="M5 12a7 7 0 1 0 14 0"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinecap="round"
          />
          <path
            d="M12 12V6"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinecap="round"
          />
        </svg>
      ),
    },
    {
      title: "features.item5.title",
      desc: "features.item5.desc",
      icon: (
        <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <rect x="4" y="6" width="16" height="12" rx="3" stroke="currentColor" strokeWidth="1.6" />
          <path
            d="M8 10h8M8 14h5"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinecap="round"
          />
        </svg>
      ),
    },
    {
      title: "features.item6.title",
      desc: "features.item6.desc",
      icon: (
        <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <path
            d="M12 3a7 7 0 0 0 0 14c3.4 0 6.2-2.4 6.8-5.6A6 6 0 1 1 12 3Z"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinecap="round"
          />
        </svg>
      ),
    },
  ];

  return (
    <>
      <header className="site-header">
        <div className="container header-inner">
          <div className="brand" aria-label="Finly">
            Finly
          </div>
          <p className="header-eyebrow">{copy["hero.eyebrow"]}</p>
          <div className="header-actions">
            <button
              className="toggle"
              type="button"
              aria-label={nextThemeLabel}
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            >
              {theme === "dark" ? (
                <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
                  <path
                    d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 1 0 9.8 9.8Z"
                    stroke="currentColor"
                    strokeWidth="1.6"
                  />
                </svg>
              ) : (
                <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
                  <circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="1.6" />
                  <path
                    d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"
                    stroke="currentColor"
                    strokeWidth="1.6"
                    strokeLinecap="round"
                  />
                </svg>
              )}
            </button>
            <button
              className="toggle"
              type="button"
              aria-label={nextLangLabel}
              onClick={() => setLang(lang === "pt-BR" ? "en" : "pt-BR")}
            >
              <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <path
                  d="M3 12h18M12 3a15 15 0 0 1 0 18M12 3a15 15 0 0 0 0 18M5 7h14M5 17h14"
                  stroke="currentColor"
                  strokeWidth="1.6"
                  strokeLinecap="round"
                />
              </svg>
              <span className="toggle-value">{langValue}</span>
            </button>
          </div>
        </div>
      </header>

      <main>
        <div className="background-glow" aria-hidden="true" />
        <div className="grain" aria-hidden="true" />
        <motion.div
          className="parallax-layer layer-one"
          style={{ y: glowY }}
          aria-hidden="true"
        />
        <motion.div
          className="parallax-layer layer-two"
          style={{ y: orbY }}
          aria-hidden="true"
        />
        <section className="hero">
          <div className="container hero-grid">
            <motion.div
              className="hero-copy"
              variants={stagger}
              initial="hidden"
              animate="visible"
            >
              <motion.div variants={fadeUp}>
                <span className="pill">
                  <span>{copy["hero.badge"]}</span>
                  {copy["hero.badgeText"]}
                </span>
              </motion.div>
              <motion.h1 variants={fadeUp}>{copy["hero.title"]}</motion.h1>
              <motion.p className="lead" variants={fadeUp}>
                {copy["hero.subtitle"]}
              </motion.p>
              <motion.div className="cta-row" variants={fadeUp}>
                <a className="btn primary" href="#cta">
                  {copy["hero.ctaPrimary"]}
                  <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
                    <path
                      d="M5 12h14M13 6l6 6-6 6"
                      stroke="currentColor"
                      strokeWidth="1.6"
                      strokeLinecap="round"
                    />
                  </svg>
                </a>
                <a className="btn ghost" href="#demo">
                  {copy["hero.ctaSecondary"]}
                </a>
              </motion.div>
              <motion.p className="hero-note" variants={fadeUp}>
                {copy["hero.note"]}
              </motion.p>
            </motion.div>
            <motion.div
              className="hero-mockup"
              aria-hidden="true"
              initial={{ opacity: 0, y: reduceMotion ? 0 : 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className="hero-media">
                <div className="hero-video">
                  <img src="/hero-loop.svg" alt="" aria-hidden="true" />
                </div>
                <div className="hero-device">
                  <svg viewBox="0 0 520 360" className="mockup-svg" aria-hidden="true">
                    <defs>
                      <linearGradient id="screen" x1="0" x2="1">
                        <stop offset="0%" stopColor="#4d7cfe" stopOpacity="0.15" />
                        <stop offset="100%" stopColor="#22c55e" stopOpacity="0.18" />
                      </linearGradient>
                    </defs>
                    <rect x="20" y="20" width="480" height="320" rx="24" fill="url(#screen)" />
                    <rect x="52" y="60" width="180" height="120" rx="16" fill="rgba(15, 23, 42, 0.12)" />
                    <rect x="258" y="60" width="210" height="60" rx="14" fill="rgba(15, 23, 42, 0.08)" />
                    <rect x="258" y="132" width="210" height="100" rx="16" fill="rgba(15, 23, 42, 0.12)" />
                    <rect x="52" y="200" width="180" height="100" rx="16" fill="rgba(15, 23, 42, 0.12)" />
                    <circle cx="88" cy="94" r="10" fill="#4d7cfe" />
                    <circle cx="120" cy="94" r="8" fill="#22c55e" />
                  </svg>
                  <div className="mockup-overlay">
                    <div className="mockup-card">
                      <p className="mockup-title">{copy["mockup.title"]}</p>
                  <p className="mockup-value">{lang === "pt-BR" ? "R$ 3.420" : "$ 3,420"}</p>
                      <canvas ref={canvasRef} width={240} height={80} className="mockup-canvas" />
                      <div className="mockup-tags">
                        <span>{copy["mockup.tag1"]}</span>
                        <span>{copy["mockup.tag2"]}</span>
                        <span>{copy["mockup.tag3"]}</span>
                      </div>
                    </div>
                    <div className="mockup-card subtle">
                      <p className="mockup-title">{copy["mockup.title2"]}</p>
                      <p className="mockup-value">65%</p>
                      <div className="mockup-progress">
                        <span className="progress-fill"></span>
                      </div>
                      <p className="mockup-caption">{copy["mockup.caption"]}</p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        <section className="trust">
          <div className="container trust-inner">
            <p>{copy["trust.title"]}</p>
            <div className="trust-logos">
              <span>Focus</span>
              <span>Clarity</span>
              <span>Habits</span>
              <span>Goals</span>
              <span>Insights</span>
            </div>
          </div>
        </section>

        <section className="section problem" id="demo">
          <div className="container">
            <h2>{copy["problem.title"]}</h2>
            <div className="problem-list">
              <p>{copy["problem.item1"]}</p>
              <p>{copy["problem.item2"]}</p>
              <p>{copy["problem.item3"]}</p>
            </div>
          </div>
        </section>

        <section className="section features">
          <div className="container">
            <h2>{copy["features.title"]}</h2>
            <div className="grid features-grid">
              {featureItems.map((feature) => (
                <article className="card" key={feature.title}>
                  <span className="icon-badge">{feature.icon}</span>
                  <h3>{copy[feature.title]}</h3>
                  <p>{copy[feature.desc]}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="section stats">
          <div className="container">
            <h2>{copy["stats.title"]}</h2>
            <div className="grid stats-grid">
              <div className="stat">
                <strong>{copy["stats.item1.value"]}</strong>
                <span>{copy["stats.item1.label"]}</span>
              </div>
              <div className="stat">
                <strong>{copy["stats.item2.value"]}</strong>
                <span>{copy["stats.item2.label"]}</span>
              </div>
              <div className="stat">
                <strong>{copy["stats.item3.value"]}</strong>
                <span>{copy["stats.item3.label"]}</span>
              </div>
            </div>
          </div>
        </section>

        <section className="section how-it-works">
          <div className="container">
            <h2>{copy["how.title"]}</h2>
            <ol className="steps">
              <li>{copy["how.step1"]}</li>
              <li>{copy["how.step2"]}</li>
              <li>{copy["how.step3"]}</li>
              <li>{copy["how.step4"]}</li>
            </ol>
          </div>
        </section>

        <section className="section preview">
          <div className="container preview-grid">
            <div className="preview-copy">
              <h2>{copy["preview.title"]}</h2>
              <p>{copy["preview.subtitle"]}</p>
              <div className="preview-tags">
                <span>{copy["preview.tag1"]}</span>
                <span>{copy["preview.tag2"]}</span>
                <span>{copy["preview.tag3"]}</span>
              </div>
            </div>
            <div className="preview-mockups" aria-hidden="true">
              <div className="screen light">
                <p>{copy["preview.screen1"]}</p>
                <span>R$ 8.240</span>
              </div>
              <div className="screen dark">
                <p>{copy["preview.screen2"]}</p>
                <span>3 em andamento</span>
              </div>
            </div>
          </div>
        </section>

        <section className="section benefits">
          <div className="container">
            <h2>{copy["benefits.title"]}</h2>
            <div className="grid benefits-grid">
              <div className="benefit">{copy["benefits.item1"]}</div>
              <div className="benefit">{copy["benefits.item2"]}</div>
              <div className="benefit">{copy["benefits.item3"]}</div>
              <div className="benefit">{copy["benefits.item4"]}</div>
            </div>
          </div>
        </section>

        <section className="section testimonials">
          <div className="container">
            <h2>{copy["testimonials.title"]}</h2>
            <div className="grid testimonial-grid">
              <div className="testimonial stack">
                <p>{copy["testimonials.item1.quote"]}</p>
                <div className="author">{copy["testimonials.item1.name"]}</div>
              </div>
              <div className="testimonial stack">
                <p>{copy["testimonials.item2.quote"]}</p>
                <div className="author">{copy["testimonials.item2.name"]}</div>
              </div>
              <div className="testimonial stack">
                <p>{copy["testimonials.item3.quote"]}</p>
                <div className="author">{copy["testimonials.item3.name"]}</div>
              </div>
            </div>
          </div>
        </section>

        <section className="section pricing">
          <div className="container">
            <h2>{copy["pricing.title"]}</h2>
            <div className="grid pricing-grid">
              <div className="price-card stack">
                <h3>{copy["pricing.tier1"]}</h3>
                <p className="price">{copy["pricing.tier1.price"]}</p>
                <ul>
                  <li>{copy["pricing.feature1"]}</li>
                  <li>{copy["pricing.feature2"]}</li>
                </ul>
              </div>
              <div className="price-card highlight stack">
                <h3>{copy["pricing.tier2"]}</h3>
                <p className="price">{copy["pricing.tier2.price"]}</p>
                <ul>
                  <li>{copy["pricing.feature1"]}</li>
                  <li>{copy["pricing.feature2"]}</li>
                  <li>{copy["pricing.feature3"]}</li>
                </ul>
              </div>
              <div className="price-card stack">
                <h3>{copy["pricing.tier3"]}</h3>
                <p className="price">{copy["pricing.tier3.price"]}</p>
                <ul>
                  <li>{copy["pricing.feature1"]}</li>
                  <li>{copy["pricing.feature2"]}</li>
                  <li>{copy["pricing.feature3"]}</li>
                  <li>{copy["pricing.feature4"]}</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        <section className="section faq">
          <div className="container">
            <h2>{copy["faq.title"]}</h2>
            <div className="faq">
              <details>
                <summary>{copy["faq.q1"]}</summary>
                <p>{copy["faq.a1"]}</p>
              </details>
              <details>
                <summary>{copy["faq.q2"]}</summary>
                <p>{copy["faq.a2"]}</p>
              </details>
              <details>
                <summary>{copy["faq.q3"]}</summary>
                <p>{copy["faq.a3"]}</p>
              </details>
            </div>
          </div>
        </section>

        <section className="cta" id="cta">
          <div className="container cta-inner">
            <h2>{copy["cta.title"]}</h2>
            <p>{copy["cta.subtitle"]}</p>
            <a className="btn primary" href="#">
              {copy["cta.button"]}
            </a>
          </div>
        </section>
      </main>

      <footer className="site-footer">
        <div className="container footer-inner">
          <span>{copy["footer.note"]}</span>
          <span>© 2026 Finly</span>
        </div>
      </footer>
    </>
  );
}
