import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import {
  websiteImages,
  topCarouselImages,
  bottomCarouselImages,
  selectedWorkImages,
} from "@/config/images";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from "@/components/ui/carousel";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Signshow — Advertising & Printing Agency" },
      { name: "description", content: "Large-scale printing, fabricated signage, and vehicle wraps. We materialize big ideas with precision ink and raw steel." },
      { property: "og:title", content: "Signshow — Advertising & Printing Agency" },
      { property: "og:description", content: "Large-scale printing, fabricated signage, and vehicle wraps." },
    ],
    links: [{ rel: "canonical", href: "/" }],
  }),
  component: Index,
});

function useCountUp(target: number, duration = 2000) {
  const [value, setValue] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const started = useRef(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    let raf = 0;
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting && !started.current) {
          started.current = true;
          setValue(0);
          const start = performance.now();
          const step = (now: number) => {
            const p = Math.min((now - start) / duration, 1);
            const eased = 1 - Math.pow(1 - p, 3);
            setValue(Math.floor(eased * target));
            if (p < 1) raf = requestAnimationFrame(step);
          };
          raf = requestAnimationFrame(step);
        } else if (!e.isIntersecting) {
          started.current = false;
          cancelAnimationFrame(raf);
          setValue(0);
        }
      });
    }, { threshold: 0.3 });
    io.observe(el);
    return () => {
      io.disconnect();
      cancelAnimationFrame(raf);
    };
  }, [target, duration]);
  return { value, ref };
}

function Counter({ target, suffix = "", label }: { target: number; suffix?: string; label: string }) {
  const { value, ref } = useCountUp(target);
  const pct = Math.min((value / target) * 100, 100);
  return (
    <div ref={ref} className="flex flex-col items-center gap-2 text-center">
      <div className="flex items-baseline gap-1">
        <span className="font-display text-5xl md:text-6xl lg:text-7xl font-bold text-signal-deep tabular-nums">{value}</span>
        <span className="font-display text-5xl md:text-6xl lg:text-7xl font-bold text-signal-deep">{suffix}</span>
      </div>
      <div className="h-1 w-full bg-zinc-200 overflow-hidden rounded-full">
        <div className="h-full bg-signal transition-[width] duration-100 ease-out" style={{ width: `${pct}%` }} />
      </div>
      <span className="font-display text-xs md:text-sm font-medium text-zinc-500 uppercase tracking-widest">{label}</span>
    </div>
  );
}

function Index() {
  function PortraitCarousel({ direction, images }: { direction?: "left" | "right"; images: { src: string; title: string }[] }) {
    const [api, setApi] = useState<CarouselApi>(undefined);
    useEffect(() => {
      if (!api) return;
      const interval = setInterval(() => {
        if (direction === "left") {
          api.scrollPrev();
        } else {
          api.scrollNext();
        }
      }, 2000);
      return () => clearInterval(interval);
    }, [api, direction]);
    return (
      <section className="py-8 px-6 bg-white">
        <div className="max-w-4xl mx-auto">
          <Carousel opts={{ loop: true, align: "start" }} setApi={setApi} className="px-8">
            <CarouselContent>
              {images.map((p) => (
                <CarouselItem key={p.title} className="basis-1/2 sm:basis-1/3 md:basis-1/4 lg:basis-1/5">
                  <div className="overflow-hidden rounded-md">
                    <img
                      src={p.src}
                      alt={p.title}
                      loading="lazy"
                      className="w-full aspect-[2/3] object-cover"
                    />
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="left-0" />
            <CarouselNext className="right-0" />
          </Carousel>
        </div>
      </section>
    );
  }
  return (
    <div className="bg-white text-zinc-900 font-body selection:bg-signal selection:text-ink min-h-screen">
      <nav className="fixed top-0 w-full z-50 bg-white/80 backdrop-blur-md border-b border-zinc-200">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <a href="#" className="flex items-center transition-transform hover:scale-105">
            <img src={websiteImages.logo} alt="Signshow" className="h-8 w-auto" />
          </a>
          <div className="hidden md:flex gap-8 text-sm font-medium uppercase tracking-widest text-zinc-900">
            <a href="#" className="hover:text-signal transition-colors">Home</a>
            <a href="https://catlo.ai/org/signshow-advertising-mmx5o1o2" target="_blank" rel="noopener noreferrer" className="hover:text-signal transition-colors">Catalog</a>
            <a href="#work" className="hover:text-signal transition-colors">Work</a>
            <a href="#services" className="hover:text-signal transition-colors">Services</a>
            <a href="#contact" className="hover:text-signal transition-colors">Contact</a>
          </div>
        </div>
      </nav>

      <section className="relative pt-16 bg-white overflow-hidden animate-fade-in">
        <div className="relative">
          <img
            src={websiteImages.heroBanner}
            alt="Signshow — Defining your Brand"
            className="w-full h-auto block"
          />
          <img
            src={websiteImages.logo3d}
            alt="Signshow 3D Logo"
            className="absolute top-1/2 left-[73%] -translate-x-1/2 -translate-y-1/2 w-40 h-40 sm:w-56 sm:h-56 md:w-72 md:h-72 lg:w-[28rem] lg:h-[28rem] object-contain drop-shadow-2xl"
            style={{ animation: "float-up-down 3s ease-in-out infinite" }}
          />
          <div className="absolute bottom-4 sm:bottom-6 left-0 right-0 flex justify-center px-6">
            <a
              href="https://catlo.ai/org/signshow-advertising-mmx5o1o2"
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center bg-white text-ink py-2 px-4 sm:py-3 sm:pr-5 sm:pl-4 ring-1 ring-white font-medium text-xs sm:text-sm rounded-sm hover:bg-ink hover:text-white hover:ring-ink hover:scale-105 transition-all duration-200 uppercase tracking-wider shadow-lg"
            >
              <span className="mr-2 shrink-0">
                <svg className="size-3 sm:size-4" fill="none" viewBox="0 0 24 24" strokeWidth="2.5" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
                </svg>
              </span>
              Visit our work
            </a>
          </div>
        </div>
      </section>

      <PortraitCarousel direction="left" images={topCarouselImages} />

      <section className="py-20 px-6 bg-zinc-50 border-y border-zinc-200">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-wrap justify-center gap-10">
            <Counter target={10} suffix="K+" label="Happy Clients" />
            <Counter target={20} suffix="K+" label="Projects Delivered" />
            <Counter target={20} suffix="yrs" label="In Production" />
          </div>
        </div>
      </section>

      <PortraitCarousel direction="right" images={bottomCarouselImages} />

      <section id="work" className="py-24 px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <h2 className="font-display text-4xl font-medium mb-16 tracking-tight uppercase text-zinc-900">Our Works</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {selectedWorkImages.map((w) => (
              <div key={w.title} className={`space-y-4 group ${w.offset}`}>
                <div className="overflow-hidden rounded-[min(1vw,12px)]">
                  <img src={w.src} alt={w.title} width={1024} height={1344} loading="lazy" className="w-full aspect-[3/4] object-cover transition-transform duration-700 group-hover:scale-105" />
                </div>
                <div className="flex justify-center items-start">
                  <h3 className="font-medium text-lg text-zinc-900 text-center">
                    {w.title}
                  </h3>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="services" className="py-24 px-6 bg-zinc-50 border-y border-zinc-200">
        <div className="max-w-7xl mx-auto">
          <h2 className="font-display text-4xl font-medium mb-16 tracking-tight uppercase text-zinc-900">Services</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-px bg-zinc-200">
            {[
              { n: "01/", t: "Acrylic Standees" },
              { n: "02/", t: "Air Balloon" },
              { n: "03/", t: "Banner Print" },
              { n: "04/", t: "Business Card" },
              { n: "05/", t: "Button Badge" },
              { n: "06/", t: "Canvas Print" },
              { n: "07/", t: "Digital Seal" },
              { n: "08/", t: "Hoarding Print" },
              { n: "09/", t: "ID Card Set" },
              { n: "10/", t: "Inauguration Ribbon" },
              { n: "11/", t: "Keychain" },
              { n: "12/", t: "Laser Print" },
              { n: "13/", t: "LED Slim Board" },
              { n: "14/", t: "Light Board" },
              { n: "15/", t: "Memento" },
              { n: "16/", t: "Menu Card" },
              { n: "17/", t: "Mouse Pad" },
              { n: "18/", t: "Mug Printing" },
              { n: "19/", t: "Name Badge" },
              { n: "20/", t: "Photo Frame" },
              { n: "21/", t: "Promotion Table" },
              { n: "22/", t: "Roll Up Standee" },
              { n: "23/", t: "Sticker Print" },
              { n: "24/", t: "Umbrella" },
              { n: "25/", t: "UV DTF Sticker" },
            ].map((s, i) => (
              <div key={s.n} className="bg-white p-6 hover:bg-zinc-50 transition-colors duration-300 group flex flex-col justify-between">
                <div>
                  <span className="text-signal-deep font-mono text-xs mb-3 block">{s.n}</span>
                  <h4 className="font-display text-lg font-medium uppercase text-zinc-900 group-hover:text-signal-deep transition-colors">{s.t}</h4>
                </div>
                <a
                  href={`https://wa.me/919946100720?text=${encodeURIComponent(`Hi Signshow, I'd like to enquire about your ${s.t} service. Please share details and pricing.`)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-xs font-medium uppercase tracking-widest text-signal-deep border border-signal/60 px-3 py-2 rounded-sm hover:bg-signal hover:text-ink transition-colors mt-4 self-start"
                >
                  Contact
                  <svg className="size-3" fill="none" viewBox="0 0 24 24" strokeWidth="2.5" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" /></svg>
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="about" className="py-24 px-6 bg-white border-t border-zinc-200">
        <div className="max-w-4xl mx-auto">
          <h2 className="font-display text-4xl md:text-5xl font-medium mb-10 tracking-tight uppercase text-zinc-900">
            About <span className="text-signal-deep font-bold">Signshow</span> Advertising
          </h2>
          <div className="space-y-6 text-lg text-zinc-700 leading-relaxed">
            <p>
              Since 2007, Signshow Advertising has been delivering premium printing solutions with a commitment to quality, reliability, and customer satisfaction. Backed by nearly 20 years of experience, we have proudly served <span className="font-semibold text-zinc-900">2,00,000+ customers</span> and successfully completed <span className="font-semibold text-zinc-900">3,50,000+ printing projects</span>, earning the trust of businesses, institutions, and individuals alike.
            </p>
            <p>
              Guided by our tagline, <span className="italic text-signal-deep">"Defining Your Brand,"</span> we specialize in providing high-quality printing services with a seamless doorstep experience. From business essentials to large-format prints and customized print solutions, we combine advanced technology, skilled craftsmanship, and timely delivery to help every customer make a lasting impression.
            </p>
            <p>
              Our vision is to become the world's most trusted name in printing by consistently delivering excellence in every project we undertake.
            </p>
          </div>
        </div>
      </section>

      <section id="contact" className="py-32 px-6 bg-white">
        <div className="max-w-7xl mx-auto flex flex-col items-center text-center">
          <h2 className="font-display text-5xl md:text-7xl font-semibold tracking-tighter uppercase mb-8 text-zinc-900">
            CONNECT US
          </h2>
          <p className="max-w-[48ch] text-zinc-600 text-lg mb-12 text-pretty">
            We specialize in the impossible. From one-off installations to global rollouts, our shop is ready for your specific fabrication needs.
          </p>
          <div className="flex flex-wrap justify-center gap-6">
            <div className="flex flex-col items-center p-6 border border-zinc-200 rounded-sm hover:border-signal hover:-translate-y-1 transition-all duration-300">
              <span className="text-xs font-mono text-zinc-500 mb-2 uppercase">Direct Line</span>
              <a href="tel:+919946100720" className="text-xl font-medium text-zinc-900">9946100720 | 9562900720</a>
            </div>
            <div className="flex flex-col items-center p-6 border border-zinc-200 rounded-sm hover:border-signal hover:-translate-y-1 transition-all duration-300">
              <span className="text-xs font-mono text-zinc-500 mb-2 uppercase">Inquiries</span>
              <a href="mailto:signshowtsy@gmail.com" className="text-xl font-medium text-zinc-900">signshowtsy@gmail.com</a>
            </div>
          </div>
        </div>
      </section>

      <footer className="py-12 px-6 border-t border-zinc-200 bg-zinc-50">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex items-center gap-3">
            <img src={websiteImages.logo} alt="Signshow" className="h-6 w-auto" />
            <div className="size-2 rounded-full bg-signal animate-pulse"></div>
            <span className="text-xs font-mono text-zinc-600 uppercase tracking-widest">Press active</span>
          </div>
          <div className="text-[10px] text-zinc-500 uppercase tracking-widest">
            © {new Date().getFullYear()} Signshow Fabrications. All physical rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}