import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import {
  ArrowUpRight,
  Clapperboard,
  Code2,
  Fingerprint,
  Gauge,
  Instagram,
  Megaphone,
  Mail,
  Menu,
  Shapes,
  Users,
  X,
} from "lucide-react";
import { Button, buttonVariants } from "@/components/ui/button";

const logoAsset = { url: "/assets/branding/signshow-logo.png" };
const taglineAsset = { url: "/assets/branding/tagline-cropped.png" };
const mobileTaglineAsset = { url: "/assets/branding/mobile-tagline.png" };

// Adjust these values to increase or decrease the tagline image size.
const TAGLINE_DESKTOP_MAX_WIDTH = "1400px";
const TAGLINE_MOBILE_MAX_WIDTH = "720px";

const dialogueLogo = { url: "/assets/clients/dialogue.jpg" };
const talenmarkLogo = { url: "/assets/clients/talenmark.jpg" };
const copperKitchenLogo = { url: "/assets/clients/copper-kitchen.jpg" };
const diyaLogo = { url: "/assets/clients/diya.jpg" };
const licLogo = { url: "/assets/clients/lic.png" };
const pittappillilLogo = { url: "/assets/clients/pittappillil.jpg" };
const myGLogo = { url: "/assets/clients/myg.png" };
const nestoLogo = { url: "/assets/clients/nesto.png" };
const rivershoreLogo = { url: "/assets/clients/rivershore.png" };

const majorWork01 = { url: "/assets/works/work-01.jpeg" };
const majorWork02 = { url: "/assets/works/work-02.png" };
const majorWork03 = { url: "/assets/works/work-03.png" };
const majorWork04 = { url: "/assets/works/work-04.png" };
const majorWork05 = { url: "/assets/works/work-05.jpeg" };
const majorWork06 = { url: "/assets/works/work-06.png" };
const majorWork07 = { url: "/assets/works/work-07.png" };
const majorWork08 = { url: "/assets/works/work-02.png" };
const majorWork09 = { url: "/assets/works/work-03.png" };
const majorWork10 = { url: "/assets/works/work-04.png" };

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Signshow Advertising — Define Your Brand" },
      {
        name: "description",
        content:
          "Signshow Advertising defines brands through strategy, content, design and culture.",
      },
      {
        property: "og:title",
        content: "Signshow Advertising — Define Your Brand",
      },
      {
        property: "og:description",
        content:
          "Strategy, content and culture for brands ready to make noise.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

const serviceIcons = [
  Shapes,
  Gauge,
  Megaphone,
  Fingerprint,
  Users,
  Clapperboard,
  Code2,
];

const services = [
  "Acrylic Standees",
  "Banner Print",
  "Business Card",
  "Button Badge",
  "Canvas Print",
  "Digital Seal",
  "Hoarding Print",
  "ID Card Set",
  "Inauguration Ribbon",
  "Keychain",
  "Laser Print",
  "LED Slim Board",
  "Light Board",
  "Memento",
  "Menu Card",
  "Mouse Pad",
  "Mug Printing",
  "Name Badge",
  "Photo Frame",
  "Promotion Table",
  "Roll Up Standee",
  "Sticker Print",
  "Umbrella",
  "UV DTF Sticker",
].map((title, index) => ({
  title,
  icon: serviceIcons[index % serviceIcons.length] ?? Shapes,
}));

const projectImages = [
  majorWork01.url,
  majorWork02.url,
  majorWork03.url,
  majorWork04.url,
  majorWork05.url,
  majorWork06.url,
  majorWork07.url,
  majorWork08.url,
  majorWork09.url,
  majorWork10.url,
];

const team = Array.from({ length: 20 }, (_, index) => ({
  image: `/assets/team/team-${String(index + 1).padStart(2, "0")}.png`,
}));

const heroSlides = projectImages;

const clientLogos = [
  { src: dialogueLogo.url, alt: "Dialogue Digital Gallery" },
  { src: talenmarkLogo.url, alt: "Talenmark Developers" },
  { src: copperKitchenLogo.url, alt: "Copper Kitchen" },
  { src: diyaLogo.url, alt: "Diya Gold and Diamonds" },
  { src: licLogo.url, alt: "Life Insurance Corporation of India" },
  { src: pittappillilLogo.url, alt: "Pittappillil Agencies" },
  { src: myGLogo.url, alt: "myG" },
  { src: nestoLogo.url, alt: "Nesto" },
  { src: rivershoreLogo.url, alt: "Rivershore Hospital" },
];

function Index() {
  const [menu, setMenu] = useState(false);
  const [solidNav, setSolidNav] = useState(false);
  const [hoveredWork, setHoveredWork] = useState<number | null>(null);
  const [contactVisible, setContactVisible] = useState(false);
  const [contactPosition, setContactPosition] = useState({ left: 0, top: 0 });
  const [pageReady, setPageReady] = useState(false);
  const cursorRef = useRef<HTMLDivElement>(null);

  // Let the initial page content reveal finish before starting WhatsApp motion.
  useEffect(() => {
    const readyTimer = window.setTimeout(() => setPageReady(true), 3400);
    return () => window.clearTimeout(readyTimer);
  }, []);

  useEffect(() => {
    let frame = 0;

    const onScroll = () => {
      if (frame) return;

      frame = window.requestAnimationFrame(() => {
        const scrollY = window.scrollY;
        const scrollRange = Math.max(
          document.documentElement.scrollHeight - window.innerHeight,
          1,
        );

        document.documentElement.style.setProperty(
          "--page-progress",
          String(Math.min(scrollY / scrollRange, 1)),
        );

        document.documentElement.style.setProperty(
          "--hero-lift",
          `${Math.min(scrollY * 0.12, 72)}px`,
        );

        document.documentElement.style.setProperty(
          "--hero-strip-shift",
          `${Math.min(scrollY * 0.035, 24)}px`,
        );

        setSolidNav(scrollY > 40);
        frame = 0;
      });
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", onScroll);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, []);

  useEffect(() => {
    const contactSection = document.getElementById("contact");
    if (!contactSection) {
      setContactVisible(false);
      return;
    }

    // Keep the WhatsApp control confined to the blue Contact section.
    // When that section enters the viewport, animate the control to its center.
    let frame = 0;
    const updateContactPosition = () => {
      if (frame) return;
      frame = window.requestAnimationFrame(() => {
        const rect = contactSection.getBoundingClientRect();
        const viewportHeight = window.innerHeight;
        const visibleTop = Math.max(rect.top, 0);
        const visibleBottom = Math.min(rect.bottom, viewportHeight);
        const isInView = visibleBottom > visibleTop && rect.right > 0 && rect.left < window.innerWidth;
        // Center the expanded widget within the part of the blue Contact section
        // that is actually on screen. Outside that section, keep it at the corner.
        const centerLeft = rect.left + rect.width / 2;
        const centerTop = (visibleTop + visibleBottom) / 2;
        const showInContact = isInView;
        setContactPosition({
          left: showInContact ? centerLeft : window.innerWidth - 51,
          top: showInContact ? centerTop : viewportHeight - 51,
        });
        setContactVisible(showInContact);
        frame = 0;
      });
    };

    updateContactPosition();
    window.addEventListener("scroll", updateContactPosition, { passive: true });
    window.addEventListener("resize", updateContactPosition);

    return () => {
      window.removeEventListener("scroll", updateContactPosition);
      window.removeEventListener("resize", updateContactPosition);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, [pageReady]);

  // A subtle branded cursor accent on pointer devices; the native cursor remains available.
  useEffect(() => {
    const cursor = cursorRef.current;
    if (!cursor || window.matchMedia("(pointer: coarse)").matches) return;

    const moveCursor = (event: PointerEvent) => {
      cursor.style.left = `${event.clientX}px`;
      cursor.style.top = `${event.clientY}px`;
      cursor.style.opacity = "1";
    };
    const handleHover = (event: PointerEvent) => {
      const target = event.target;
      if (target instanceof Element) {
        cursor.classList.toggle(
          "cursor-accent--active",
          Boolean(target.closest("a, button, [role='button'], input, textarea, select")),
        );
      }
    };
    const hideCursor = () => { cursor.style.opacity = "0"; };

    window.addEventListener("pointermove", moveCursor, { passive: true });
    window.addEventListener("pointerover", handleHover, { passive: true });
    window.addEventListener("pointerout", hideCursor, { passive: true });
    return () => {
      window.removeEventListener("pointermove", moveCursor);
      window.removeEventListener("pointerover", handleHover);
      window.removeEventListener("pointerout", hideCursor);
    };
  }, []);

  useEffect(() => {
    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    );

    if (reducedMotion.matches) return;

    document.documentElement.classList.add("reveal-ready");

    const revealItems = Array.from(
      document.querySelectorAll<HTMLElement>(
        ".scroll-reveal, .scroll-reveal-item",
      ),
    );

    const revealObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          entry.target.classList.toggle(
            "is-visible",
            entry.isIntersecting,
          );
        });
      },
      { rootMargin: "0px 0px -10%", threshold: 0 },
    );

    revealItems.forEach((item) => revealObserver.observe(item));

    return () => {
      revealObserver.disconnect();
      document.documentElement.classList.remove("reveal-ready");
    };
  }, []);

  return (
    <main className="overflow-x-clip bg-background text-foreground">
      <div ref={cursorRef} className="cursor-accent" aria-hidden="true" />
      <style>{`.cursor-accent { position: fixed; left: 0; top: 0; z-index: 100; width: 26px; height: 26px; border: 1.5px solid #42c2d5; border-radius: 9999px; pointer-events: none; opacity: 0; transform: translate(-50%, -50%); transition: width .22s ease, height .22s ease, border-color .22s ease, background-color .22s ease, opacity .15s ease; } .cursor-accent::before { content: ""; position: absolute; inset: 7px; border-radius: 9999px; background: #42c2d5; opacity: .8; } .cursor-accent::after { content: ""; position: absolute; inset: -6px; border: 1px solid #42c2d5; border-radius: 9999px; opacity: .2; } .cursor-accent--active { width: 42px; height: 42px; background: rgba(66,194,213,.12); border-color: #0aaec4; } .cursor-accent--active::before { inset: 13px; } @media (pointer: coarse), (prefers-reduced-motion: reduce) { .cursor-accent { display: none; } } @keyframes whatsapp-jiggle { 0%, 100% { transform: rotate(0deg); } 15% { transform: rotate(-12deg); } 30% { transform: rotate(12deg); } 45% { transform: rotate(-8deg); } 60% { transform: rotate(8deg); } 75% { transform: rotate(0deg); } } @keyframes services-line-sweep { 0% { transform: scaleX(0); transform-origin: left; } 45% { transform: scaleX(1); transform-origin: left; } 55% { transform: scaleX(1); transform-origin: right; } 100% { transform: scaleX(0); transform-origin: right; } } @keyframes service-orbit { 0%, 100% { transform: translateY(0) rotate(0deg); } 50% { transform: translateY(-9px) rotate(8deg); } } @keyframes service-glow { 0%, 100% { opacity: .35; transform: scale(.85); } 50% { opacity: .9; transform: scale(1.15); } } @media (prefers-reduced-motion: reduce) { .animate-\[whatsapp-jiggle_1\.2s_ease-in-out_infinite\] { animation: none; } }`}</style>
      {/* Header */}
      <header
        className={`fixed inset-x-0 top-0 z-40 border-b transition-all duration-300 ${
          solidNav
            ? "border-border bg-background/95 backdrop-blur"
            : "border-transparent bg-transparent"
        }`}
      >
        <div className="scroll-progress" aria-hidden="true" />

        <div className="mx-auto flex h-20 max-w-[1600px] items-center justify-between px-5 md:px-10">
          <a href="#top">
            <img
              src={logoAsset.url}
              alt="Signshow Advertising"
              width={1024}
              height={286}
              className="h-10 w-auto"
            />
          </a>

          <nav className="hidden items-center gap-7 text-xs font-bold uppercase md:flex">
            {["About", "Services", "Works", "Contact"].map((x) => (
              <a
                key={x}
                href={`#${x.toLowerCase()}`}
                className="transition-colors hover:text-[#42c2d5]"
              >
                {x}
              </a>
            ))}
          </nav>

          <div className="hidden items-center gap-3 md:flex">
            <a
              href="https://www.instagram.com/signshowadvertising?utm_source=ig_web_button_share_sheet&stkn=ZDNlZDc0MzIxNw=="
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              className={buttonVariants({
                variant: "ghost",
                size: "icon",
              })}
            >
              <Instagram />
            </a>

            <a href="#contact" className={buttonVariants({ size: "lg" })}>
              Get started <ArrowUpRight />
            </a>
          </div>

          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setMenu(true)}
            aria-label="Open menu"
          >
            <Menu />
          </Button>
        </div>
      </header>

      {/* Mobile Menu */}
      {menu && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/35 px-4 py-6 backdrop-blur-sm md:hidden">
          <div className="flex max-h-[88dvh] w-full max-w-xl flex-col overflow-y-auto rounded-[2rem] border border-white/70 bg-white px-6 pb-6 pt-5 text-slate-800 shadow-2xl sm:px-10 sm:pb-8 sm:pt-7">
            <div className="flex items-center justify-between rounded-full border border-slate-200 bg-slate-50 px-5 py-4">
              <img
                src={logoAsset.url}
                alt="Signshow Advertising"
                width={1024}
                height={286}
                className="h-8 w-auto"
              />
              <Button
                variant="ghost"
                size="icon"
                className="rounded-full text-slate-700 hover:bg-slate-200"
                onClick={() => setMenu(false)}
                aria-label="Close menu"
              >
                <X className="size-6" />
              </Button>
            </div>

            <nav className="my-7 flex flex-1 flex-col justify-center gap-2 px-2 sm:my-9 sm:px-4">
              {[
                { label: "About Us", href: "#about" },
                { label: "Home", href: "#top" },
                { label: "Services", href: "#services" },
                { label: "Works", href: "#works" },
                { label: "Contact", href: "#contact" },
              ].map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  onClick={() => setMenu(false)}
                  className="rounded-xl px-3 py-3 font-display text-2xl font-medium tracking-tight text-slate-700 transition-colors hover:bg-[#42c2d5]/10 hover:text-[#239daf] sm:py-4 sm:text-3xl"
                >
                  {item.label}
                </a>
              ))}
            </nav>

            <a
              href="https://wa.me/919946100720?text=Hello%20Signshow%20Advertising%2C%20I%20would%20like%20to%20know%20more."
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setMenu(false)}
              className="flex min-h-16 items-center justify-center gap-3 rounded-2xl bg-gradient-to-r from-[#42c2d5] to-[#239daf] px-5 py-4 text-center text-lg font-semibold text-white shadow-lg shadow-[#42c2d5]/25 transition-transform hover:scale-[1.01]"
            >
              <svg viewBox="0 0 32 32" className="size-6 shrink-0" fill="currentColor" aria-hidden="true">
                <path d="M16.04 3.2a12.8 12.8 0 0 0-10.9 19.5L3.2 28.8l6.3-1.65A12.8 12.8 0 1 0 16.04 3.2Zm0 23.3a10.5 10.5 0 0 1-5.35-1.46l-.38-.23-3.75.98 1-3.65-.25-.4a10.5 10.5 0 1 1 8.73 4.76Zm5.76-7.87c-.32-.16-1.9-.94-2.2-1.05-.3-.1-.52-.16-.74.16-.22.32-.84 1.05-1.03 1.27-.19.21-.38.24-.7.08-.32-.16-1.35-.5-2.57-1.58-.95-.85-1.6-1.9-1.79-2.22-.19-.32-.02-.5.14-.66.14-.14.32-.38.48-.57.16-.19.21-.32.32-.54.1-.22.05-.4-.03-.57-.08-.16-.74-1.78-1.02-2.44-.27-.64-.54-.55-.74-.56l-.63-.01c-.22 0-.57.08-.87.4-.3.32-1.14 1.1-1.14 2.7s1.17 3.13 1.33 3.35c.16.22 2.3 3.51 5.57 4.92.78.34 1.39.54 1.87.69.79.25 1.5.21 2.07.13.63-.1 1.9-.78 2.17-1.54.27-.75.27-1.4.19-1.54-.08-.13-.3-.21-.63-.37Z" />
              </svg>
              Book Now on WhatsApp
            </a>
          </div>
        </div>
      )}

      {/* Hero Section — large hero image removed */}
      <section
        id="top"
        className="relative min-h-[94vh] border-b border-border pt-28"
      >
        <div className="mx-auto max-w-[1600px] px-5 md:px-10">
          <div className="hero-scroll-title flex min-h-[38vh] items-center justify-center py-4 md:min-h-[46vh]">
            <h1 className="sr-only">
              Signshow Advertising — Defining Your Brand
            </h1>

            <img
              src={mobileTaglineAsset.url}
              alt="Begin with advertising — signshowadvertising.com"
              className="hero-title-in w-full object-contain md:hidden"
              style={{ maxWidth: TAGLINE_MOBILE_MAX_WIDTH, transform: "scale(1.08)" }}
            />

            <img
              src={taglineAsset.url}
              alt="Begin with advertising — signshowadvertising.com"
              className="hero-title-in hidden w-full object-contain md:block"
              style={{ maxWidth: TAGLINE_DESKTOP_MAX_WIDTH, transform: "scale(1.08)" }}
            />
          </div>
        </div>

        {/* Scrolling Project Image Strip */}
        <div className="hero-scroll-strip mt-10 rotate-[-1.5deg] border-y-4 border-background bg-foreground py-3 text-background">
          <div className="marquee-track flex w-max gap-3">
            {[...heroSlides, ...heroSlides].map((image, index) => (
              <div
                key={`${image}-${index}`}
                className="h-[144px] w-[108px] shrink-0 overflow-hidden"
                style={{ aspectRatio: "3 / 4" }}
              >
                <img
                  src={image}
                  alt=""
                  loading={index < 6 ? "eager" : "lazy"}
                  className="h-full w-full object-cover"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Visit Work Button */}
        <div className="flex justify-center px-5 py-8">
          <a
            href="https://catlo.ai/org/signshow-advertising-mmx5o1o2"
            target="_blank"
            rel="noopener noreferrer"
            className="group flex size-36 items-center justify-center rounded-full border border-border bg-background text-foreground transition-colors duration-300 hover:border-[#42c2d5] hover:bg-[#42c2d5] hover:text-primary-foreground md:size-40"
          >
            <span className="flex flex-col items-center justify-center text-center font-display text-xl font-semibold leading-tight md:text-2xl">
              <span>Order</span>
              <span className="flex items-center justify-center gap-1">Now <ArrowUpRight className="size-5 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1 md:size-6" /></span>
            </span>
          </a>
        </div>
      </section>

      {/* Services Section */}
      <section
        id="services"
        className="scroll-reveal border-y border-border bg-background px-5 py-24 md:px-10 md:py-36"
      >
        <div className="mx-auto grid max-w-[1600px] gap-16 lg:grid-cols-[.72fr_1.28fr] lg:gap-24">
          <div className="lg:sticky lg:top-28 lg:self-start">
            <p className="text-xs font-bold uppercase text-muted-foreground">
              Services
            </p>

            <h2 className="mt-7 max-w-xl font-display text-4xl font-medium leading-[.95] md:text-6xl lg:text-7xl">
              What We
              <br />
              Do
            </h2>
            <div
              aria-hidden="true"
              className="mt-5 h-[3px] w-28 overflow-hidden rounded-full bg-[#42c2d5]/20"
            >
              <div
                className="h-full w-full rounded-full bg-[#42c2d5]"
                style={{ animation: "services-line-sweep 2.4s ease-in-out infinite" }}
              />
            </div>

            <p className="mt-8 max-w-md text-base leading-7 text-muted-foreground md:mt-10 md:text-lg md:leading-8">
              Printing, display, signage, and custom promotional products
              created to help your brand stand out.
            </p>

            <div className="mt-0 w-full max-w-md overflow-hidden rounded-2xl">
              <img
                src="/assets/branding/log.png"
                alt="Signshow Advertising branding"
                className="block h-auto w-full object-contain"
                loading="lazy"
              />
            </div>
          </div>

          <div className="border-t border-border">
            {services.map(({ title, icon: Icon }, index) => (
              <article
                key={title}
                className="scroll-reveal-item group flex items-center justify-start gap-6 border-b border-border py-10 text-left md:gap-8 md:py-14"
                style={{
                  transitionDelay: `${Math.min(index, 4) * 55}ms`,
                }}
              >
                <div className="flex size-20 items-center justify-center rounded-[24px] border-2 border-[#42c2d5] bg-background text-muted-foreground transition-colors group-hover:bg-[#42c2d5] group-hover:text-primary-foreground">
                  <Icon className="size-8" strokeWidth={1.5} />
                </div>

                <div>
                  <h3 className="mt-2 text-left font-display text-2xl font-medium md:text-4xl">
                    {title}
                  </h3>

                  <a
                    href="#contact"
                    className="mt-7 inline-flex items-center gap-2 text-sm font-semibold transition-colors hover:text-[#42c2d5]"
                  >
                    Contact <ArrowUpRight className="size-4" />
                  </a>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Statistics Section */}
      <section className="scroll-reveal mx-auto max-w-[1600px] px-5 py-24 md:px-10 md:py-36">
        <SectionHead title="Proof, not promises" />

        <div className="mt-16 grid border-l border-t border-border sm:grid-cols-3">
          {[
            [100, "K+", "Happy Clients"],
            [250, "K+", "Projects Delivered"],
            [20, "+", "Years in Production"],
          ].map(([value, suffix, label], index) => (
            <div
              key={label}
              className="scroll-reveal-item flex flex-col items-center border-b border-r border-border p-7 text-center md:p-10"
              style={{ transitionDelay: `${index * 90}ms` }}
            >
              <strong className="font-display text-5xl font-semibold text-[#42c2d5] md:text-7xl">
                <CountUp
                  value={Number(value)}
                  suffix={String(suffix)}
                />
              </strong>

              <p className="mt-4 text-xs font-bold uppercase md:mt-5 md:text-sm">
                {label}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Projects Section */}
      <section
        id="works"
        className="bg-team-stage py-24 text-team-stage-foreground md:py-32"
      >
        <div className="mx-auto grid max-w-[1600px] gap-14 px-5 md:grid-cols-[.72fr_1.28fr] md:px-10">
          <div className="flex flex-col justify-center">
            <h2 className="scroll-reveal font-display text-[16vw] font-semibold uppercase leading-[.86] sm:text-[14vw] md:text-[8vw]">
              Our
              <br />
              <span className="text-[#42c2d5]">Projects</span>
            </h2>
          </div>

          <div
            className="works-stage relative grid grid-cols-2 gap-4 overflow-hidden p-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-5"
            onMouseLeave={() => setHoveredWork(null)}
          >
            {team.map((member, index) => (
              <div
                key={`${member.image}-${index}`}
                className="scroll-reveal-item aspect-[3/4]"
                style={{
                  transitionDelay: `${(index % 5) * 55}ms`,
                }}
              >
                <article
                  className={`team-card group relative h-full w-full overflow-hidden rounded-[1.5rem] border border-[#42c2d5] bg-card ${
                    index % 2 === 0 ? "-rotate-3" : "rotate-3"
                  }`}
                  style={{ animationDelay: `${index * -0.7}s` }}
                  onMouseEnter={() => setHoveredWork(index)}
                >
                  <img
                    src={member.image}
                    alt={`Signshow major work ${index + 1}`}
                    loading="lazy"
                    className="h-full w-full object-cover"
                  />
                </article>
              </div>
            ))}

            {hoveredWork !== null && team[hoveredWork] && (
              <div
                className="work-preview pointer-events-none fixed inset-0 z-50 hidden items-center justify-center md:flex"
                aria-hidden="true"
              >
                <div className="work-preview-frame overflow-hidden rounded-[1.5rem] border border-[#42c2d5] bg-card">
                  <img
                    src={team[hoveredWork].image}
                    alt=""
                    className="h-full w-full object-contain"
                  />
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section
        id="about"
        className="scroll-reveal border-b border-border bg-background px-5 py-24 md:px-10 md:py-36"
      >
        <div className="mx-auto grid max-w-[1600px] gap-16 lg:grid-cols-[.72fr_1.28fr] lg:gap-24">
          <div className="lg:sticky lg:top-28 lg:self-start">
            <p className="text-xs font-bold uppercase text-muted-foreground">
              Since 2007
            </p>

            <h2 className="mt-7 max-w-xl font-display text-4xl font-medium leading-[.95] md:text-6xl lg:text-7xl">
              About us
            </h2>

            <p className="mt-8 max-w-md text-base leading-7 text-muted-foreground md:mt-10 md:text-lg md:leading-8">
              Premium printing solutions built on quality, reliability,
              and customer satisfaction.
            </p>

            <div className="mt-0 w-full max-w-md overflow-hidden rounded-2xl">
              <img
                src="/assets/branding/log.png"
                alt="Signshow Advertising branding"
                className="block h-auto w-full object-contain"
                loading="lazy"
              />
            </div>
          </div>

          <div className="border-t border-border">
            <article className="scroll-reveal-item border-b border-border py-10 md:py-14">
              <p className="text-xs font-bold uppercase text-[#42c2d5]">
                Our Story
              </p>

              <h3 className="mt-5 font-display text-2xl font-medium md:text-4xl">
                20+ years of trusted printing
              </h3>

              <p className="mt-5 max-w-3xl text-base leading-8 text-muted-foreground md:text-lg">
                Since 2007, Signshow Advertising has been delivering
                premium printing solutions with a commitment to quality,
                reliability, and customer satisfaction. Backed by 20+
                years of experience, we have proudly served{" "}
                <strong className="font-bold text-foreground">
                  2,00,000+ customers
                </strong>{" "}
                and successfully completed{" "}
                <strong className="font-bold text-foreground">
                  3,50,000+ printing projects
                </strong>
                , earning the trust of businesses, institutions, and
                individuals alike.
              </p>
            </article>

            <article className="scroll-reveal-item border-b border-border py-10 md:py-14">
              <p className="text-xs font-bold uppercase text-[#42c2d5]">
                What We Deliver
              </p>

              <h3 className="mt-5 font-display text-2xl font-medium md:text-4xl">
                Defining Your Brand
              </h3>

              <p className="mt-5 max-w-3xl text-base leading-8 text-muted-foreground md:text-lg">
                Guided by our tagline,{" "}
                <strong className="font-bold text-[#42c2d5]">
                  “Defining Your Brand,”
                </strong>{" "}
                we specialize in providing high-quality printing services
                with a seamless doorstep experience. From business
                essentials to large-format prints and customized print
                solutions, we combine advanced technology, skilled
                craftsmanship, and timely delivery to help every customer
                make a lasting impression.
              </p>
            </article>

            <article className="scroll-reveal-item border-b border-border py-10 md:py-14">
              <p className="text-xs font-bold uppercase text-[#42c2d5]">
                Our Vision
              </p>

              <p className="mt-5 max-w-3xl font-display text-xl font-medium leading-tight text-foreground md:text-3xl">
                Our vision is to become the world&apos;s most trusted name
                in printing by consistently delivering excellence in
                every project we undertake.
              </p>
            </article>
          </div>
        </div>
      </section>

      {/* Client Logos */}
      <section className="scroll-reveal border-y border-border py-12 md:py-16">
        <p className="mb-8 text-center text-[10px] font-bold uppercase text-muted-foreground md:mb-10 md:text-xs">
          Trusted by teams at
        </p>

        <div className="marquee-track flex w-max items-center gap-8 md:gap-16">
          {[...clientLogos, ...clientLogos].map((logo, index) => (
            <div
              key={`${logo.alt}-${index}`}
              className="flex h-16 w-32 shrink-0 items-center justify-center md:h-24 md:w-48"
            >
              <img
                src={logo.src}
                alt={index < clientLogos.length ? logo.alt : ""}
                loading="lazy"
                className="max-h-full max-w-full object-contain"
              />
            </div>
          ))}
        </div>
      </section>

      {/* Contact Section */}
      <section
        id="contact"
        className="scroll-reveal bg-[#42c2d5] px-5 py-24 text-center text-primary-foreground md:px-10 md:py-36"
      >
        <p className="text-[10px] font-bold uppercase md:text-xs">
          Have a project? Don’t be shy.
        </p>

        <h2 className="mx-auto mt-8 max-w-6xl font-display text-[14vw] font-semibold uppercase leading-[.82] md:text-[10vw]">
          Let’s work together
        </h2>


      </section>

      {/* Footer */}
      <footer className="px-5 py-12 md:px-10">
        <div className="mx-auto max-w-[1600px]">
          <div className="flex flex-col items-center justify-center gap-5 text-center md:flex-row md:justify-between md:text-center">
            <div className="flex flex-wrap items-center justify-center gap-1 md:justify-center">
              <a
                href="https://www.instagram.com/signshowadvertising?utm_source=ig_web_button_share_sheet&stkn=ZDNlZDc0MzIxNw=="
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                title="Instagram"
                className="inline-flex items-center justify-center p-2 text-black transition-transform hover:scale-110"
              >
                <Instagram className="size-7" aria-hidden="true" />
              </a>
              <a
                href="mailto:signshowtsy@gmail.com"
                aria-label="Email signshowtsy@gmail.com"
                title="signshowtsy@gmail.com"
                className="inline-flex items-center justify-center p-2 text-black transition-transform hover:scale-110"
              >
                <Mail className="size-7" aria-hidden="true" />
              </a>
              <a
                href="https://wa.me/919946100720"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="WhatsApp 9946100720"
                title="WhatsApp 9946100720"
                className="inline-flex items-center justify-center p-2 text-black transition-transform hover:scale-110"
              >
                <svg viewBox="0 0 32 32" className="size-7" fill="currentColor" aria-hidden="true">
                  <path d="M16.04 3.2c-7.08 0-12.84 5.75-12.84 12.83 0 2.26.59 4.46 1.72 6.4L3.1 28.8l6.53-1.71a12.82 12.82 0 0 0 6.4 1.7h.01c7.08 0 12.84-5.75 12.84-12.83 0-3.43-1.34-6.65-3.76-9.07a12.76 12.76 0 0 0-9.08-3.69Zm0 23.43h-.01c-1.98 0-3.92-.53-5.62-1.54l-.4-.24-3.88 1.02 1.04-3.78-.26-.42a10.58 10.58 0 0 1-1.63-5.64c0-5.84 4.76-10.59 10.6-10.59 2.83 0 5.49 1.1 7.49 3.1a10.52 10.52 0 0 1 3.1 7.49c0 5.84-4.75 10.6-10.43 10.6Zm5.81-7.93c-.32-.16-1.88-.93-2.17-1.03-.29-.11-.5-.16-.71.16-.21.32-.82 1.03-1 1.24-.19.21-.37.24-.69.08-.32-.16-1.35-.5-2.57-1.59-.95-.84-1.59-1.88-1.78-2.2-.18-.32-.02-.49.14-.65.14-.14.32-.37.48-.55.16-.19.21-.32.32-.53.1-.21.05-.4-.03-.56-.08-.16-.71-1.72-.98-2.35-.26-.62-.52-.54-.71-.55h-.61c-.21 0-.56.08-.85.4-.29.32-1.11 1.08-1.11 2.64s1.14 3.06 1.3 3.27c.16.21 2.24 3.42 5.43 4.8.76.33 1.35.52 1.81.67.76.24 1.45.21 2 .13.61-.09 1.88-.77 2.14-1.51.27-.74.27-1.37.19-1.51-.08-.13-.29-.21-.61-.37Z" />
                </svg>
              </a>
            </div>
            <address className="max-w-md text-right text-sm font-medium not-italic leading-relaxed text-muted-foreground md:text-base">
              Opp.Govt School, Karadi,<br />Thamarassery, Calicut,<br />Kerala, India - 673573 | Ph: 9946100720
            </address>
          </div>

          <div className="mt-16 flex flex-col justify-between gap-5 border-t border-border pt-8 md:flex-row">
            <img
              src={logoAsset.url}
              alt="Signshow Advertising"
              width={1024}
              height={286}
              loading="lazy"
              className="h-12 w-auto object-contain object-left"
            />

            <span className="text-xs uppercase text-muted-foreground">
              © 2026 Signshow Advertising. Define your brand.
            </span>
          </div>
        </div>
      </footer>

      {/* Floating WhatsApp contact widget */}
      <a
        href="https://wa.me/919946100720?text=Hello%20Signshow%20Advertising%2C%20I%20would%20like%20to%20know%20more."
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat with Signshow Advertising on WhatsApp"
        className={`fixed z-[60] flex items-center justify-center text-white shadow-xl transition-[left,top,width,height,padding,border-radius,background] duration-[900ms] ease-[cubic-bezier(0.22,1,0.36,1)] focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[#42c2d5]/50 ${contactVisible ? "pointer-events-auto h-[86px] w-[230px] rounded-full bg-[#25D366] px-5 opacity-100" : "pointer-events-auto size-[62px] rounded-full bg-gradient-to-br from-[#55ed65] to-[#16ad24] opacity-100"}`}
        style={{
          left: `${contactPosition.left}px`,
          top: `${contactPosition.top}px`,
          transform: "translate(-50%, -50%)",
        }}
      >
        <span className={`flex shrink-0 items-center justify-center rounded-full ${contactVisible ? "size-14 bg-white/20" : "size-11 border-[3px] border-white bg-transparent"} animate-[whatsapp-jiggle_1.2s_ease-in-out_infinite]`}>
          <svg
            viewBox="0 0 32 32"
            className={contactVisible ? "size-8" : "size-8"}
            fill="currentColor"
            aria-hidden="true"
          >
            <path d="M16.04 3.2c-7.08 0-12.84 5.75-12.84 12.83 0 2.26.59 4.46 1.72 6.4L3.1 28.8l6.53-1.71a12.82 12.82 0 0 0 6.4 1.7h.01c7.08 0 12.84-5.75 12.84-12.83 0-3.43-1.34-6.65-3.76-9.07a12.76 12.76 0 0 0-9.08-3.69Zm0 23.43h-.01c-1.98 0-3.92-.53-5.62-1.54l-.4-.24-3.88 1.02 1.04-3.78-.26-.42a10.58 10.58 0 0 1-1.63-5.64c0-5.84 4.76-10.59 10.6-10.59 2.83 0 5.49 1.1 7.49 3.1a10.52 10.52 0 0 1 3.1 7.49c0 5.84-4.75 10.6-10.43 10.6Zm5.81-7.93c-.32-.16-1.88-.93-2.17-1.03-.29-.11-.5-.16-.71.16-.21.32-.82 1.03-1 1.24-.19.21-.37.24-.69.08-.32-.16-1.35-.5-2.57-1.59-.95-.84-1.59-1.88-1.78-2.2-.18-.32-.02-.49.14-.65.14-.14.32-.37.48-.55.16-.19.21-.32.32-.53.1-.21.05-.4-.03-.56-.08-.16-.71-1.72-.98-2.35-.26-.62-.52-.54-.71-.55h-.61c-.21 0-.56.08-.85.4-.29.32-1.11 1.08-1.11 2.64s1.14 3.06 1.3 3.27c.16.21 2.24 3.42 5.43 4.8.76.33 1.35.52 1.81.67.76.24 1.45.21 2 .13.61-.09 1.88-.77 2.14-1.51.27-.74.27-1.37.19-1.51-.08-.13-.29-.21-.61-.37Z" />
          </svg>
        </span>
        {contactVisible && (
          <span className="ml-4 flex flex-col text-left leading-tight">
            <span className="text-base font-semibold">Chat with us</span>
            <span className="mt-1 text-sm text-white/80">WhatsApp</span>
          </span>
        )}
      </a>
    </main>
  );
}

function SectionHead({ title }: { title: string }) {
  return (
    <div>
      <h2 className="font-display text-4xl font-semibold uppercase leading-none md:text-8xl">
        {title}
      </h2>
    </div>
  );
}

function CountUp({
  value,
  suffix,
}: {
  value: number;
  suffix: string;
}) {
  const [count, setCount] = useState(0);
  const elementRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    let frame = 0;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry?.isIntersecting) {
          cancelAnimationFrame(frame);

          if (
            !window.matchMedia("(prefers-reduced-motion: reduce)").matches
          ) {
            setCount(0);
          }

          return;
        }

        if (
          window.matchMedia("(prefers-reduced-motion: reduce)").matches
        ) {
          setCount(value);
          return;
        }

        cancelAnimationFrame(frame);
        setCount(0);

        const startedAt = performance.now();

        const animate = (time: number) => {
          const progress = Math.min((time - startedAt) / 1600, 1);

          setCount(
            Math.round(value * (1 - Math.pow(1 - progress, 3))),
          );

          if (progress < 1) {
            frame = requestAnimationFrame(animate);
          }
        };

        frame = requestAnimationFrame(animate);
      },
      { rootMargin: "0px 0px -10%", threshold: 0 },
    );

    observer.observe(element);

    return () => {
      observer.disconnect();
      cancelAnimationFrame(frame);
    };
  }, [value]);

  return (
    <span ref={elementRef}>
      {count}
      {suffix}
    </span>
  );
}