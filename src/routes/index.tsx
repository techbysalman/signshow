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
  Menu,
  Shapes,
  Users,
  X,
} from "lucide-react";
import { Button, buttonVariants } from "@/components/ui/button";

const logoAsset = { url: "/assets/branding/signshow-logo.png" };
const taglineAsset = { url: "/assets/branding/tagline-cropped.png" };
const mobileTaglineAsset = { url: "/assets/branding/mobile-tagline.png" };

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
  "Air Balloon",
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
            {["Services", "Works", "Contact", "About"].map((x) => (
              <a
                key={x}
                href={`#${x.toLowerCase()}`}
                className="transition-colors hover:text-primary"
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
        <div className="fixed inset-0 z-50 flex flex-col bg-primary p-6 text-primary-foreground">
          <div className="flex items-center justify-between">
            <img
              src={logoAsset.url}
              alt="Signshow Advertising"
              width={1024}
              height={286}
              className="h-10 w-auto"
            />

            <Button
              variant="ghost"
              size="icon"
              onClick={() => setMenu(false)}
              aria-label="Close menu"
            >
              <X />
            </Button>
          </div>

          <nav className="my-auto flex flex-col font-display text-[13vw] font-black uppercase leading-[.9]">
            {["Services", "Works", "Contact", "About"].map((x) => (
              <a
                key={x}
                href={`#${x.toLowerCase()}`}
                onClick={() => setMenu(false)}
              >
                {x}
              </a>
            ))}
          </nav>
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
            />

            <img
              src={taglineAsset.url}
              alt="Begin with advertising — signshowadvertising.com"
              className="hero-title-in hidden w-full max-w-6xl object-contain md:block"
            />
          </div>
        </div>

        {/* Scrolling Project Image Strip */}
        <div className="hero-scroll-strip mt-10 rotate-[-1.5deg] border-y-4 border-background bg-foreground py-3 text-background">
          <div className="marquee-track flex w-max gap-3">
            {[...heroSlides, ...heroSlides].map((image, index) => (
              <div
                key={`${image}-${index}`}
                className="h-32 w-52 shrink-0 overflow-hidden"
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
            className="group flex size-36 items-center justify-center rounded-full border border-border bg-background text-foreground transition-colors duration-300 hover:border-primary hover:bg-primary hover:text-primary-foreground md:size-40"
          >
            <span className="text-left font-display text-xl font-medium leading-tight md:text-2xl">
              Visit Our
              <br />
              Work{" "}
              <ArrowUpRight className="inline size-5 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1 md:size-6" />
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

            <p className="mt-8 max-w-md text-base leading-7 text-muted-foreground md:mt-10 md:text-lg md:leading-8">
              Printing, display, signage, and custom promotional products
              created to help your brand stand out.
            </p>
          </div>

          <div className="border-t border-border">
            {services.map(({ title, icon: Icon }, index) => (
              <article
                key={title}
                className="scroll-reveal-item group grid gap-6 border-b border-border py-10 sm:grid-cols-[88px_1fr] md:py-14"
                style={{
                  transitionDelay: `${Math.min(index, 4) * 55}ms`,
                }}
              >
                <div className="flex size-20 items-center justify-center rounded-[24px] border-2 border-primary bg-background text-muted-foreground transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                  <Icon className="size-8" strokeWidth={1.5} />
                </div>

                <div>
                  <p className="text-xs font-bold text-primary">
                    {String(index + 1).padStart(2, "0")}/
                  </p>

                  <h3 className="mt-2 font-display text-2xl font-medium md:text-4xl">
                    {title}
                  </h3>

                  <a
                    href="#contact"
                    className="mt-7 inline-flex items-center gap-2 text-sm font-semibold transition-colors hover:text-primary"
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
            [10, "K+", "Happy clients"],
            [25, "K+", "Projects delivered"],
            [20, " Yrs", "In production"],
          ].map(([value, suffix, label], index) => (
            <div
              key={label}
              className="scroll-reveal-item border-b border-r border-border p-7 md:p-10"
              style={{ transitionDelay: `${index * 90}ms` }}
            >
              <strong className="font-display text-5xl font-black text-primary md:text-7xl">
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
            <h2 className="scroll-reveal font-display text-[16vw] font-black uppercase leading-[.86] sm:text-[14vw] md:text-[8vw]">
              Our
              <br />
              <span className="text-primary">Projects</span>
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
                  className={`team-card group relative h-full w-full overflow-hidden rounded-[1.5rem] border border-primary bg-card ${
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
                <div className="work-preview-frame overflow-hidden rounded-[1.5rem] border border-primary bg-card">
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
              About
              <br />
              Signshow
            </h2>

            <p className="mt-8 max-w-md text-base leading-7 text-muted-foreground md:mt-10 md:text-lg md:leading-8">
              Premium printing solutions built on quality, reliability,
              and customer satisfaction.
            </p>
          </div>

          <div className="border-t border-border">
            <article className="scroll-reveal-item border-b border-border py-10 md:py-14">
              <p className="text-xs font-bold uppercase text-primary">
                Our Story
              </p>

              <h3 className="mt-5 font-display text-2xl font-medium md:text-4xl">
                Nearly 20 years of trusted printing
              </h3>

              <p className="mt-5 max-w-3xl text-base leading-8 text-muted-foreground md:text-lg">
                Since 2007, Signshow Advertising has been delivering
                premium printing solutions with a commitment to quality,
                reliability, and customer satisfaction. Backed by nearly
                20 years of experience, we have proudly served{" "}
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
              <p className="text-xs font-bold uppercase text-primary">
                What We Deliver
              </p>

              <h3 className="mt-5 font-display text-2xl font-medium md:text-4xl">
                Defining Your Brand
              </h3>

              <p className="mt-5 max-w-3xl text-base leading-8 text-muted-foreground md:text-lg">
                Guided by our tagline,{" "}
                <strong className="font-bold text-primary">
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
              <p className="text-xs font-bold uppercase text-primary">
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
        className="scroll-reveal bg-primary px-5 py-24 text-center text-primary-foreground md:px-10 md:py-36"
      >
        <p className="text-[10px] font-bold uppercase md:text-xs">
          Have a project? Don’t be shy.
        </p>

        <h2 className="mx-auto mt-8 max-w-6xl font-display text-[14vw] font-black uppercase leading-[.82] md:text-[10vw]">
          Let’s work together
        </h2>

        <a
          href="https://wa.me/919562900720"
          target="_blank"
          rel="noopener noreferrer"
          className={buttonVariants({
            variant: "secondary",
            size: "lg",
            className: "mt-12",
          })}
        >
          Start a project <ArrowUpRight />
        </a>
      </section>

      {/* Footer */}
      <footer className="px-5 py-12 md:px-10">
        <div className="mx-auto max-w-[1600px]">
          <div className="flex flex-wrap gap-2">
            {[
              {
                label: "Instagram",
                href: "https://www.instagram.com/signshowadvertising?utm_source=ig_web_button_share_sheet&stkn=ZDNlZDc0MzIxNw==",
              },
              {
                label: "WhatsApp",
                href: "https://wa.me/919562900720",
              },
              {
                label: "signshowtsy@gmail.com",
                href: "mailto:signshowtsy@gmail.com",
              },
            ].map(({ label, href }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="border border-border px-4 py-2 text-xs font-bold uppercase transition-colors hover:border-primary hover:text-primary"
              >
                {label}
              </a>
            ))}
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
    </main>
  );
}

function SectionHead({ title }: { title: string }) {
  return (
    <div>
      <h2 className="font-display text-4xl font-black uppercase leading-none md:text-8xl">
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
          const progress = Math.min((time - startedAt) / 1400, 1);

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