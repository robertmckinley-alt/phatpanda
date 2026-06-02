import React, { useEffect, useRef, useState } from "react";

/*
  Phat Panda — single-component React site.
  Drop into any React 18+ project (Next.js, Vite, CRA).

  Styling: uses Tailwind utility classes. If you're not on Tailwind,
  either install Tailwind or replace classes with the equivalent CSS
  from /assets/css/styles.css in the sibling static build.

  Default export. No required props.
*/

const PHAT_GREEN = "#72BC44";

const BRANDS = [
  { name: "Phat Panda Flower", cat: "flower", blurb: "Our flagship. Hand-trimmed, single-strain top-shelf nugs grown in Spokane Valley." },
  { name: "Dabstract", cat: "concentrate", blurb: "High-terpene premium extracts. No additives, no fillers. Multiple Cannabis Cup wins." },
  { name: "Hot Sugar", cat: "edible", blurb: "Edibles made in-house from Phat Panda material. Real fruit, real flavor." },
  { name: "Sticky Frog", cat: "concentrate", blurb: "Phat Panda nug runs — superior taste, texture, terpene retention." },
  { name: "Panda Pen", cat: "vape", blurb: "Pure live-resin cartridges and disposables. Strain-specific, lab-tested." },
  { name: "Bangers", cat: "preroll", blurb: "Infused pre-rolls dipped, rolled, ready. Award-winning recipe." },
  { name: "Juice Box", cat: "edible", blurb: "Liquid edibles for cleaner, faster onset." },
  { name: "Cake House", cat: "edible", blurb: "Baked goods made fresh from premium cannabis material." },
  { name: "Kandy Shoppe", cat: "edible", blurb: "Classic candy nostalgia, perfectly dosed." },
  { name: "Snickle Fritz", cat: "flower", blurb: "Value-tier flower with the same Phat Panda quality bar." },
  { name: "Eluzion", cat: "vape", blurb: "Next-gen vape hardware for clean, consistent draws." },
  { name: "Firecracker", cat: "preroll", blurb: "Premium infused pre-rolls built for big effect." },
];

const AWARDS = [
  { year: "2018", name: "DOPE Cup WA", desc: "Best Infused Pre-Roll + Most Potent Flower" },
  { year: "2018", name: "Green Entrepreneur 100", desc: "Top Cannabis Leaders" },
  { year: "2019", name: "High Times Cannabis Cup", desc: "Seattle — Vape Pens (Dabstract)" },
  { year: "2019", name: "Seattle Cannabis Cup", desc: "Non-Solvent Hash (Live Rosin)" },
  { year: "2020", name: "Inlander Best of NW", desc: "Best Cannabis Brand (Reader-Voted)" },
  { year: "Ongoing", name: "#1 WA Producer", desc: "Top-selling Tier 3 (BDS / Headset)" },
];

const PRESS = [
  { pub: "High Times", title: "The 100 Most Influential People in Cannabis", url: "https://hightimes.com/culture/the-winners-of-the-high-times-100/" },
  { pub: "Cannabis Business Times", title: "Co-Founders: How They Got to No. 1", url: "https://www.cannabisbusinesstimes.com/packaging-branding/marketing-your-cannabis-business/news/15703496/phat-pandas-co-founders-share-how-they-got-to-no-1-in-washingtons-marijuana-marketplace" },
  { pub: "MG Retailer", title: "The Perfect Marijuana Strain Factory", url: "https://mgretailer.com/business/growing-horticulture/phat-panda-has-created-the-perfect-marijuana-strain-factory/" },
  { pub: "The Spokesman-Review", title: "Grow Op Farms expanding its already-huge cannabis business", url: "https://www.spokesman.com/stories/2018/apr/20/grow-op-farms-in-spokane-valley-expanding-its-alre/" },
  { pub: "Marijuana Venture", title: "Panda-Monium: State's First $1M Month", url: "https://www.marijuanaventure.com/panda-monium/" },
  { pub: "Cannabis Tech", title: "Inside Phat Panda — Sophisticated Seed-to-Sale", url: "https://www.cannabistech.com/articles/inside-phat-panda/" },
  { pub: "Hashtag Cannabis", title: "Know Your Grower: Phat Panda", url: "https://seattlehashtag.com/blog/2021/9/22/know-your-grower-phat-panda" },
  { pub: "Canna Cribs", title: "Inside a 60,000 Sq Ft Facility Tour", url: "https://www.youtube.com/watch?v=vWxKpn-pNRo" },
  { pub: "New Cannabis Ventures", title: "Washington's Top-Selling Producer", url: "https://www.newcannabisventures.com/washingtons-top-selling-producer-grow-op-farms-has-been-selling-phat-panda-products-like-crazy-and-could-have-the-states-first-1-million-month/" },
];

const PandaLogo = ({ size = 44, dark = true }) => (
  <svg viewBox="0 0 60 60" width={size} height={size} aria-hidden="true">
    <circle cx="30" cy="30" r="28" fill={dark ? "#000" : "#fff"} />
    <circle cx="21" cy="25" r="5.5" fill={PHAT_GREEN} />
    <circle cx="39" cy="25" r="5.5" fill={PHAT_GREEN} />
    <path d="M22 40 Q30 47 38 40" stroke={dark ? "#fff" : "#000"} strokeWidth="2.5" fill="none" strokeLinecap="round" />
  </svg>
);

function useReveal() {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el || !("IntersectionObserver" in window)) { setVisible(true); return; }
    const io = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setVisible(true); io.disconnect(); } }, { threshold: 0.1, rootMargin: "0px 0px -10% 0px" });
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return [ref, visible];
}

function AgeGate() {
  const [open, setOpen] = useState(false);
  useEffect(() => {
    const stored = (typeof window !== "undefined") && (sessionStorage.getItem("pp_age") || localStorage.getItem("pp_age"));
    if (!stored) setOpen(true);
  }, []);
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-[9000] flex items-center justify-center bg-black/95 backdrop-blur-md p-5">
      <div className="bg-zinc-950 border border-white/10 rounded-3xl max-w-lg w-full text-center p-10 text-white">
        <div className="flex justify-center mb-5"><PandaLogo size={80} /></div>
        <h2 className="text-3xl font-extrabold uppercase tracking-tight mb-3">Are you 21 or older?</h2>
        <p className="text-xs text-white/60 mb-6 leading-relaxed">This product has intoxicating effects and may be habit forming. Cannabis can impair concentration, coordination, and judgment. For use only by adults 21 and older. Keep out of reach of children. WAC 314-55-155(5)</p>
        <div className="flex gap-3 justify-center mb-3">
          <button
            onClick={() => { localStorage.setItem("pp_age","1"); setOpen(false); }}
            className="px-6 py-3 rounded-full font-bold uppercase tracking-wide text-sm transition-transform hover:-translate-y-0.5"
            style={{ background: PHAT_GREEN, color: "#000" }}
          >Yes, I'm 21+</button>
          <button
            onClick={() => { window.location.href = "https://www.google.com"; }}
            className="px-6 py-3 rounded-full font-bold uppercase tracking-wide text-sm border-2 border-white/70 text-white hover:bg-white hover:text-black transition-colors"
          >No</button>
        </div>
      </div>
    </div>
  );
}

function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  const Link = ({ href, children }) => (
    <a href={href} onClick={() => setOpen(false)} className="uppercase tracking-widest text-xs font-medium relative hover:text-[color:var(--pp-green,#72BC44)] transition-colors">{children}</a>
  );
  return (
    <header className={`sticky top-0 z-50 transition-all ${scrolled ? "bg-white/95 shadow" : "bg-white/85"} backdrop-blur-md border-b border-black/5`}>
      <div className="max-w-7xl mx-auto px-6 h-[72px] flex items-center justify-between">
        <a href="#top" className="flex items-center gap-2.5 font-bold tracking-widest text-sm uppercase">
          <PandaLogo size={44} />
          <span>PHAT PANDA</span>
        </a>
        <button className="md:hidden w-8 h-8 flex flex-col gap-1 items-center justify-center" onClick={() => setOpen(!open)} aria-label="Menu">
          <span className="w-5 h-0.5 bg-black"></span>
          <span className="w-5 h-0.5 bg-black"></span>
          <span className="w-5 h-0.5 bg-black"></span>
        </button>
        <nav className={`${open ? "block" : "hidden"} md:block absolute md:static top-[72px] left-0 right-0 md:top-0 bg-white md:bg-transparent border-b md:border-0 border-black/5 p-6 md:p-0`}>
          <ul className="flex flex-col md:flex-row gap-4 md:gap-7 items-start md:items-center">
            <li><Link href="#about">About</Link></li>
            <li><Link href="#brands">Brands</Link></li>
            <li><Link href="#tech">Technology</Link></li>
            <li><Link href="#press">Press</Link></li>
            <li><Link href="/careers.html">Careers</Link></li>
            <li><Link href="/contact.html">Contact</Link></li>
            <li><a href="https://phatpandastore.com/" target="_blank" rel="noopener" className="bg-black text-white px-5 py-2.5 rounded-full uppercase tracking-widest text-xs font-medium hover:bg-[color:var(--pp-green,#72BC44)] hover:text-black transition-colors">Shop →</a></li>
          </ul>
        </nav>
      </div>
    </header>
  );
}

function Hero() {
  const phrases = ["Panda family.", "state of the art.", "best in the West.", "relentless craft."];
  const [idx, setIdx] = useState(0);
  useEffect(() => {
    const id = setInterval(() => setIdx((i) => (i + 1) % phrases.length), 3000);
    return () => clearInterval(id);
  }, []);
  return (
    <section id="top" className="relative min-h-[92vh] flex items-center overflow-hidden py-32">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute -top-32 -right-40 w-[600px] h-[600px] rounded-full blur-3xl opacity-40 animate-pulse" style={{ background: PHAT_GREEN }} />
        <div className="absolute -bottom-32 -left-32 w-[420px] h-[420px] rounded-full blur-3xl opacity-30" style={{ background: "#b9eb8a" }} />
      </div>
      <div className="relative max-w-7xl mx-auto px-6">
        <p className="uppercase tracking-[.2em] text-xs font-semibold text-[color:var(--pp-green-dark,#5DA035)] mb-6">Spokane Valley, WA · Est. 2014</p>
        <h1 className="text-5xl md:text-7xl lg:text-8xl font-extrabold uppercase tracking-tight leading-[1.05] mb-6 max-w-[18ch]">
          Premium <span style={{ color: PHAT_GREEN }}>cannabis</span><br />
          cultivated by the<br />
          <span className="italic" style={{ color: PHAT_GREEN }}>{phrases[idx]}</span>
        </h1>
        <p className="text-lg md:text-xl max-w-2xl text-zinc-600 mb-8">A vertically integrated cannabis company producing award-winning flower, concentrates, vapes, and edibles across Washington, California, and Massachusetts.</p>
        <div className="flex gap-3 flex-wrap">
          <a href="#brands" className="px-6 py-3.5 rounded-full font-bold uppercase tracking-wide text-sm transition-transform hover:-translate-y-0.5" style={{ background: PHAT_GREEN, color: "#000" }}>Meet the family</a>
          <a href="https://phatpandastore.com/" target="_blank" rel="noopener" className="px-6 py-3.5 rounded-full font-bold uppercase tracking-wide text-sm border-2 border-black hover:bg-black hover:text-white transition-colors">Shop →</a>
        </div>
      </div>
    </section>
  );
}

function Stats() {
  const stats = [
    { num: "2014", label: "Founded" },
    { num: "550+", label: "Team members" },
    { num: "12", label: "Brands & sub-brands" },
    { num: "3", label: "States and growing" },
  ];
  return (
    <section className="bg-black text-white py-16">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
        {stats.map((s) => (
          <div key={s.label}>
            <div className="text-5xl md:text-6xl font-extrabold" style={{ color: PHAT_GREEN }}>{s.num}</div>
            <div className="uppercase tracking-widest text-xs opacity-70 mt-3 font-medium">{s.label}</div>
          </div>
        ))}
      </div>
    </section>
  );
}

function Brands() {
  const [filter, setFilter] = useState("all");
  const filters = ["all", "flower", "concentrate", "vape", "edible", "preroll"];
  const visible = filter === "all" ? BRANDS : BRANDS.filter((b) => b.cat === filter);
  return (
    <section id="brands" className="bg-zinc-950 text-white py-28">
      <div className="max-w-7xl mx-auto px-6">
        <p className="uppercase tracking-[.18em] text-xs font-semibold mb-4" style={{ color: PHAT_GREEN }}>The family</p>
        <h2 className="text-4xl md:text-6xl font-extrabold uppercase tracking-tight mb-3">A house of brands.</h2>
        <p className="text-lg text-white/60 mb-10 max-w-2xl">Twelve brands. One obsession with quality.</p>
        <div className="flex gap-2 flex-wrap mb-10">
          {filters.map((f) => (
            <button key={f} onClick={() => setFilter(f)} className={`px-5 py-2.5 rounded-full uppercase tracking-widest text-xs font-medium transition-colors ${filter === f ? "text-black" : "text-white/70 bg-white/5 hover:bg-white/10"}`} style={filter === f ? { background: PHAT_GREEN } : {}}>{f}</button>
          ))}
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {visible.map((b) => (
            <article key={b.name} className="p-7 bg-white/5 border border-white/10 rounded-2xl hover:bg-[rgba(114,188,68,0.07)] hover:border-[color:var(--pp-green,#72BC44)] hover:-translate-y-1.5 transition-all">
              <div className="rounded-xl py-8 mb-5 text-center font-extrabold uppercase tracking-wide" style={{ background: PHAT_GREEN, color: "#000" }}>{b.name}</div>
              <h3 className="text-xl font-bold uppercase mb-2">{b.name}</h3>
              <p className="text-white/65 text-sm mb-3">{b.blurb}</p>
              <span className="inline-block px-3 py-1 text-[10px] uppercase tracking-widest font-semibold rounded-full" style={{ background: "rgba(114,188,68,0.15)", color: "#8FD45F" }}>{b.cat}</span>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function Press() {
  return (
    <section id="press" className="py-28 bg-stone-50">
      <div className="max-w-7xl mx-auto px-6">
        <p className="uppercase tracking-[.18em] text-xs font-semibold mb-4" style={{ color: PHAT_GREEN }}>Recognition</p>
        <h2 className="text-4xl md:text-6xl font-extrabold uppercase tracking-tight mb-3">Award-winning, decade after decade.</h2>
        <p className="text-lg text-zinc-600 mb-12 max-w-2xl">From Cannabis Cup wins to industry leadership lists — the work speaks for itself.</p>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 mb-16">
          {AWARDS.map((a) => (
            <div key={a.name} className="p-5 border border-black/10 rounded-2xl bg-white hover:border-[color:var(--pp-green,#72BC44)] hover:-translate-y-1 transition-all">
              <div className="uppercase text-xs tracking-widest font-semibold" style={{ color: "#5DA035" }}>{a.year}</div>
              <div className="font-bold uppercase mt-1 leading-tight">{a.name}</div>
              <div className="text-xs text-zinc-600 mt-2">{a.desc}</div>
            </div>
          ))}
        </div>

        <h3 className="text-2xl font-extrabold uppercase mb-6">In the press</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {PRESS.map((p) => (
            <a key={p.url} href={p.url} target="_blank" rel="noopener" className="group block p-6 border border-black/10 rounded-2xl bg-white hover:bg-black hover:text-white hover:-translate-y-1 transition-all relative">
              <div className="uppercase text-xs tracking-widest font-semibold mb-2 group-hover:text-[color:var(--pp-green,#72BC44)]" style={{ color: "#5DA035" }}>{p.pub}</div>
              <div className="font-bold uppercase leading-tight">{p.title}</div>
              <span className="absolute top-5 right-5 opacity-50 group-hover:opacity-100">↗</span>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="bg-black text-white pt-20">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10 pb-16">
        <div>
          <div className="flex items-center gap-3 mb-4">
            <PandaLogo size={48} dark={false} />
            <span className="font-bold tracking-widest">PHAT PANDA</span>
          </div>
          <p className="text-white/50 max-w-[22ch]">Premium cannabis since 2014.</p>
        </div>
        <div>
          <h3 className="uppercase tracking-widest text-xs mb-4" style={{ color: PHAT_GREEN }}>Visit</h3>
          <address className="not-italic text-white/70 text-sm">2611 N Woodruff Rd<br />Spokane Valley, WA 99206</address>
        </div>
        <div>
          <h3 className="uppercase tracking-widest text-xs mb-4" style={{ color: PHAT_GREEN }}>Explore</h3>
          <ul className="grid gap-2 text-sm text-white/70">
            <li><a href="#about" className="hover:text-[color:var(--pp-green,#72BC44)]">About</a></li>
            <li><a href="#brands" className="hover:text-[color:var(--pp-green,#72BC44)]">Brands</a></li>
            <li><a href="#press" className="hover:text-[color:var(--pp-green,#72BC44)]">Press</a></li>
            <li><a href="/careers.html" className="hover:text-[color:var(--pp-green,#72BC44)]">Careers</a></li>
            <li><a href="/contact.html" className="hover:text-[color:var(--pp-green,#72BC44)]">Contact</a></li>
            <li><a href="/brand-guide.html" className="hover:text-[color:var(--pp-green,#72BC44)]">Brand Guide</a></li>
          </ul>
        </div>
        <div>
          <h3 className="uppercase tracking-widest text-xs mb-4" style={{ color: PHAT_GREEN }}>Follow</h3>
          <ul className="grid gap-2 text-sm text-white/70">
            <li><a href="https://www.instagram.com/phatpanda/" target="_blank" rel="noopener">Instagram</a></li>
            <li><a href="https://www.facebook.com/phatpandastore/" target="_blank" rel="noopener">Facebook</a></li>
            <li><a href="https://twitter.com/phatpanda" target="_blank" rel="noopener">X / Twitter</a></li>
            <li><a href="https://www.youtube.com/channel/UCqo7FtH5laZXTYvu8_jVYcw" target="_blank" rel="noopener">YouTube</a></li>
          </ul>
        </div>
      </div>
      <div className="bg-zinc-950 border-t border-white/5 py-6">
        <div className="max-w-7xl mx-auto px-6 text-xs text-white/50">
          <p className="mb-2"><strong>Warning:</strong> For use only by adults 21 and older. Keep out of reach of children.</p>
          <p className="text-white/40">Licensee: CDXX Virtuosi Group, LLC · License #: C12-0000319-LIC</p>
          <p className="mt-2">© {new Date().getFullYear()} Phat Panda LLC. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}

export default function PhatPandaSite() {
  return (
    <div className="font-sans antialiased text-zinc-900 bg-stone-50">
      <AgeGate />
      <Header />
      <main>
        <Hero />
        <Stats />
        <section id="about" className="py-28">
          <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-16 items-center">
            <div>
              <p className="uppercase tracking-[.18em] text-xs font-semibold mb-4" style={{ color: PHAT_GREEN }}>Who we are</p>
              <h2 className="text-4xl md:text-5xl font-extrabold uppercase tracking-tight mb-6">From a 30-Panda crew to a family of 550+.</h2>
              <p className="text-zinc-600 mb-4">Phat Panda was founded in 2014 by Robert &amp; Katrina McKinley with a simple mission — bring the highest-quality, most affordable cannabis to market.</p>
              <p className="text-zinc-600">A decade later, we're the parent of a multi-state family of brands, recognized as one of the top cannabis producers in the Pacific Northwest.</p>
            </div>
            <div className="aspect-[4/5] rounded-3xl relative overflow-hidden" style={{ background: `linear-gradient(135deg, ${PHAT_GREEN}, #5DA035)` }}>
              <div className="absolute inset-[12%] border-2 border-dashed border-white/40 rounded-2xl" />
            </div>
          </div>
        </section>
        <Brands />
        <Press />
      </main>
      <Footer />
    </div>
  );
}
