"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function HomePage() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const router = useRouter();

  const Prestations = [
    { icon: "✦", title: "Coiffure", desc: "Coupes, colorations & soins capillaires d'exception" },
    { icon: "◈", title: "Manucure", desc: "Nail art & poses gel par des artistes certifiés" },
    { icon: "◇", title: "Soins Visage", desc: "Rituels luminosité & anti-âge sur mesure" },
    { icon: "◉", title: "Épilation", desc: "Techniques douces & résultats durables" },
    { icon: "✧", title: "Massage", desc: "Modelages corps & bien-être profond" },
    { icon: "⬡", title: "Maquillage", desc: "Looks quotidiens ou grandes occasions" },
  ];

  const steps = [
    { num: "01", title: "Créez votre compte", desc: "Inscription rapide en moins de 2 minutes" },
    { num: "02", title: "Choisissez votre soin", desc: "Parcourez nos prestations et nos artistes" },
    { num: "03", title: "Confirmez & profitez", desc: "Réservation instantanée, rappel automatique" },
  ];

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;1,300;1,400&family=Montserrat:wght@300;400;500;600&display=swap');
        .font-display { font-family: 'Cormorant Garamond', serif; }
        .font-body   { font-family: 'Montserrat', sans-serif; }

        @keyframes rotateSlow {
          from { transform: translate(-50%,-50%) rotate(0deg); }
          to   { transform: translate(-50%,-50%) rotate(360deg); }
        }
        @keyframes fadeUp {
          from { opacity:0; transform:translateY(28px); }
          to   { opacity:1; transform:translateY(0); }
        }
        @keyframes scrollPulse {
          0%,100% { opacity:.3; }
          50%      { opacity:1; }
        }

        .animate-fade-up   { animation: fadeUp 1.1s ease forwards; }
        .animate-fade-up-2 { animation: fadeUp 1.1s .2s ease both; }
        .animate-fade-up-3 { animation: fadeUp 1.1s .4s ease both; }
        .animate-rotate    { animation: rotateSlow 30s linear infinite; }
        .animate-scroll    { animation: scrollPulse 2s ease-in-out infinite; }

        .shimmer-btn::before {
          content:'';
          position:absolute;
          top:0; left:-100%;
          width:100%; height:100%;
          background: linear-gradient(90deg,transparent,rgba(255,255,255,.25),transparent);
          transition: left .5s;
        }
        .shimmer-btn:hover::before { left:100%; }

        .service-card-line::after {
          content:'';
          position:absolute;
          bottom:0; left:0; right:0;
          height:2px;
          background: linear-gradient(90deg,#C9A84C,#E8C97A);
          transform: scaleX(0);
          transform-origin:left;
          transition: transform .4s ease;
        }
        .service-card-line:hover::after { transform:scaleX(1); }

        .gold-grid-bg {
          background-image:
            linear-gradient(rgba(201,168,76,.04) 1px, transparent 1px),
            linear-gradient(90deg,rgba(201,168,76,.04) 1px, transparent 1px);
          background-size:80px 80px;
          -webkit-mask-image: radial-gradient(ellipse at center,black 30%,transparent 80%);
          mask-image: radial-gradient(ellipse at center,black 30%,transparent 80%);
        }
      `}</style>

      <div className="font-body bg-[#0A0A0A] text-[#FAFAFA] overflow-x-hidden">


        {/* ── HERO ── */}
        <section className="relative h-screen flex items-center justify-center overflow-hidden text-center">
          {/* bg */}
          <div className="absolute inset-0"
            style={{ background: "radial-gradient(ellipse 80% 60% at 50% 100%,rgba(201,168,76,.12) 0%,transparent 70%),radial-gradient(ellipse 50% 40% at 20% 20%,rgba(201,168,76,.06) 0%,transparent 60%),linear-gradient(180deg,#0A0A0A 0%,#0f0d08 50%,#0A0A0A 100%)" }} />
          <div className="absolute inset-0 gold-grid-bg" />

          {/* rings */}
          <div className="animate-rotate absolute w-[600px] h-[600px] border border-[#C9A84C]/[.07] rounded-full top-1/2 left-1/2">
            <div className="absolute inset-[30px] border border-[#C9A84C]/[.05] rounded-full" />
            <div className="absolute inset-[60px] border border-[#C9A84C]/[.03] rounded-full" />
          </div>

          {/* content */}
          <div className="relative z-10 max-w-3xl px-6">
            <div className="animate-fade-up flex items-center justify-center gap-4 mb-6">
              <span className="w-10 h-px bg-[#C9A84C]/50" />
              <span className="text-[0.6rem] font-medium tracking-[.4em] uppercase text-[#C9A84C]">L'excellence beauté</span>
              <span className="w-10 h-px bg-[#C9A84C]/50" />
            </div>

            <h1 className="animate-fade-up-2 font-display font-light leading-[1.05] tracking-wide mb-3"
              style={{ fontSize: "clamp(3.5rem,8vw,6.5rem)" }}>
              Révélez votre<br />
              <em className="text-[#E8C97A]">éclat naturel</em>
            </h1>

            <p className="animate-fade-up-2 font-display italic text-white/45 mb-6 tracking-wide"
              style={{ fontSize: "clamp(1rem,2vw,1.3rem)" }}>
              La beauté sur mesure, à portée de main
            </p>

            <p className="animate-fade-up-3 text-[0.75rem] font-light tracking-wide text-white/35 max-w-md mx-auto mb-10 leading-relaxed">
              Réservez vos soins dans les meilleurs salons en quelques secondes.
              Une expérience beauté pensée pour vous.
            </p>

            <div className="animate-fade-up-3 flex flex-wrap gap-4 justify-center">
              <Link href="/register"
                className="shimmer-btn relative overflow-hidden inline-block px-10 py-4 text-[0.62rem] font-bold tracking-[.25em] uppercase transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_8px_30px_rgba(201,168,76,.35)]"
                style={{ background: "linear-gradient(135deg,#C9A84C 0%,#E8C97A 100%)", color: "#0A0A0A" }}>
                Réserver maintenant
              </Link>
              <a href="#prestations"
                className="inline-block px-10 py-4 border border-[#C9A84C]/40 text-[#F5E6C0] text-[0.62rem] font-medium tracking-[.25em] uppercase hover:border-[#C9A84C] hover:bg-[#C9A84C]/5 transition-all duration-300">
                Découvrir
              </a>
            </div>
          </div>

          {/* scroll indicator */}
          <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-10">
            <span className="text-[0.52rem] tracking-[.3em] uppercase text-[#C9A84C]/50">Défiler</span>
            <div className="animate-scroll w-px h-12 bg-linear-to-b from-[#C9A84C] to-transparent" />
          </div>
        </section>

        {/* ── PRESTATIONS ── */}
        <section id="prestations" className="relative bg-[#111111] py-32 px-8 md:px-16 overflow-hidden">
          <div className="absolute -top-48 -right-48 w-[500px] h-[500px] rounded-full pointer-events-none"
            style={{ background: "radial-gradient(circle,rgba(201,168,76,.05) 0%,transparent 70%)" }} />

          <div className="max-w-6xl mx-auto">
            <div className="flex flex-col md:flex-row justify-between items-end gap-8 mb-16">
              <div>
                <div className="flex items-center gap-3 mb-3">
                  <span className="text-[0.58rem] font-semibold tracking-[.35em] uppercase text-[#C9A84C]">Nos prestations</span>
                  <span className="w-10 h-px bg-[#C9A84C]/40" />
                </div>
                <h2 className="font-display font-light leading-tight text-white"
                  style={{ fontSize: "clamp(2rem,4vw,3rem)" }}>
                  Des soins <em className="text-[#E8C97A]">d'exception</em><br />pour chaque envie
                </h2>
              </div>
              <p className="text-[0.72rem] font-light leading-relaxed text-white/40 max-w-xs tracking-wide">
                Sélectionnez parmi une gamme complète de prestations, dispensés par des artistes passionnés et certifiés.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 divide-x divide-y divide-[#C9A84C]/10 border border-[#C9A84C]/10">
              {Prestations.map((s, i) => (
                <div key={i}
                  onClick={() => router.push("/appointement")}
                  className="service-card-line relative group bg-[#111111] hover:bg-[#13110a] p-10 transition-all duration-300 cursor-pointer overflow-hidden">
                  <span className="block text-3xl text-[#C9A84C] mb-6 transition-transform duration-300 group-hover:scale-110 group-hover:rotate-12">
                    {s.icon}
                  </span>
                  <h3 className="font-display text-2xl font-normal text-white mb-3 tracking-wide">{s.title}</h3>
                  <p className="text-[0.72rem] font-light leading-relaxed text-white/40 tracking-wide">{s.desc}</p>
                  <span className="inline-block mt-5 text-[0.58rem] tracking-[.2em] uppercase text-[#C9A84C] opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300">
                    Réserver →
                  </span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── HOW IT WORKS ── */}
        <section id="how" className="bg-[#0A0A0A] py-32 px-8 md:px-16 text-center">
          <div className="max-w-2xl mx-auto mb-20">
            <div className="flex items-center justify-center gap-3 mb-4">
              <span className="w-10 h-px bg-[#C9A84C]/40" />
              <span className="text-[0.58rem] font-semibold tracking-[.35em] uppercase text-[#C9A84C]">Simplicité & élégance</span>
              <span className="w-10 h-px bg-[#C9A84C]/40" />
            </div>
            <h2 className="font-display font-light text-white mb-4"
              style={{ fontSize: "clamp(2rem,4vw,3rem)" }}>
              Beauté en <em className="text-[#E8C97A]">trois étapes</em>
            </h2>
            <p className="text-[0.72rem] font-light leading-relaxed text-white/35 tracking-wide">
              De la sélection à la confirmation, votre expérience est pensée pour être fluide, rapide et sans friction.
            </p>
          </div>

          <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-3 relative">
            <div className="hidden md:block absolute top-8 left-[22%] right-[22%] h-px"
              style={{ background: "linear-gradient(90deg,transparent,rgba(201,168,76,.25),transparent)" }} />
            {steps.map((s, i) => (
              <div key={i} className="px-8 mb-12 md:mb-0 flex flex-col items-center">
                <p className="font-display text-[5rem] font-light leading-none text-[#C9A84C]/10 mb-1">{s.num}</p>
                <div className="w-2.5 h-2.5 rounded-full bg-[#C9A84C] mb-6 shadow-[0_0_14px_rgba(201,168,76,.45)]" />
                <h3 className="font-display text-[1.3rem] font-normal text-white mb-3">{s.title}</h3>
                <p className="text-[0.72rem] font-light leading-relaxed text-white/40 tracking-wide">{s.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ── CTA ── */}
        <section className="relative bg-[#0A0A0A] py-36 px-8 text-center overflow-hidden">
          <div className="absolute inset-0 pointer-events-none"
            style={{ background: "radial-gradient(ellipse 70% 70% at 50% 50%,rgba(201,168,76,.07) 0%,transparent 70%)" }} />
          <div className="absolute inset-12 md:inset-16 border border-[#C9A84C]/[.07] pointer-events-none" />

          <div className="relative z-10 max-w-xl mx-auto">
            <div className="flex items-center justify-center gap-3 mb-4">
              <span className="w-10 h-px bg-[#C9A84C]/40" />
              <span className="text-[0.58rem] font-semibold tracking-[.35em] uppercase text-[#C9A84C]">Rejoignez GlowUp</span>
              <span className="w-10 h-px bg-[#C9A84C]/40" />
            </div>
            <h2 className="font-display font-light text-white mb-3"
              style={{ fontSize: "clamp(2rem,4vw,3rem)" }}>
              Prête à sublimer<br />votre <em className="text-[#E8C97A]">beauté</em>&nbsp;?
            </h2>
            <p className="font-display italic text-white/30 text-lg mb-10 tracking-wide">
              Inscription gratuite · Annulation flexible
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Link href="/register"
                className="shimmer-btn relative overflow-hidden inline-block px-10 py-4 text-[0.62rem] font-bold tracking-[.25em] uppercase transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_8px_30px_rgba(201,168,76,.3)]"
                style={{ background: "linear-gradient(135deg,#C9A84C 0%,#E8C97A 100%)", color: "#0A0A0A" }}>
                Créer mon compte
              </Link>
              <Link href="/login"
                className="inline-block px-10 py-4 border border-[#C9A84C]/40 text-[#F5E6C0] text-[0.62rem] font-medium tracking-[.25em] uppercase hover:border-[#C9A84C] hover:bg-[#C9A84C]/5 transition-all duration-300">
                Se connecter
              </Link>
            </div>
          </div>
        </section>

        {/* ── FOOTER ── */}
        <footer className="bg-[#050505] border-t border-[#C9A84C]/10 px-8 md:px-16 pt-16 pb-8">
          <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-10 mb-12">
            <div className="col-span-2 md:col-span-1">
              <span className="font-display text-3xl font-light text-[#E8C97A] tracking-widest block mb-4">
                Glow<span className="italic text-white">Up</span>
              </span>
              <p className="text-[0.7rem] font-light leading-relaxed text-white/25 tracking-wide max-w-[220px]">
                L'application beauté qui connecte les clients aux meilleurs salons. Élégance, simplicité, excellence.
              </p>
            </div>

            {[
              {
                title: "Application",
                links: [
                  { label: "S'inscrire", href: "/register" },
                  { label: "Se connecter", href: "/login" },
                ],
              },
              {
                title: "Contact",
                links: [
                  { label: "Aide & Support", href: "/support" },
                ],
              },
            ].map((col, i) => (
              <div key={i}>
                <h4 className="text-[0.58rem] font-semibold tracking-[.3em] uppercase text-[#C9A84C] mb-5">
                  {col.title}
                </h4>
                <ul className="space-y-3">
                  {col.links.map((l, j) => (
                    <li key={j}>
                      <Link
                        href={l.href}
                        className="text-[0.7rem] font-light text-white/30 hover:text-[#E8C97A] transition-colors tracking-wide"
                      >
                        {l.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}

          </div>
          <div className="max-w-6xl mx-auto pt-6 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-3">
            <p className="text-[0.6rem] tracking-widest text-white/20">
              © 2026 <span className="text-[#C9A84C]/60">GlowUp</span>. Tous droits réservés.
            </p>
            <p className="text-[0.6rem] tracking-widest text-white/20">
              Conçu avec <span className="text-[#C9A84C]/60">✦</span> pour sublimer votre beauté
            </p>
          </div>
        </footer>

      </div>
    </>
  );
}