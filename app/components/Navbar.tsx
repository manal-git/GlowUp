"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { User } from "../types/User";

export default function Navbar({ initialUser }: { initialUser: User | null }) {
    console.log("🚀 ~ Navbar ~ initialUser:", initialUser)
    const [scrolled, setScrolled] = useState(false);
    const [user, setUser] = useState<User | null>(initialUser);
    const router = useRouter();

    // scroll effect
    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 60);
        window.addEventListener("scroll", onScroll);
        return () => window.removeEventListener("scroll", onScroll);
    }, []);

    // sync user if layout passes a new one
    useEffect(() => {
        setUser(initialUser);
    }, [initialUser]);

    const handleLogout = async () => {
        await fetch("/api/auth/logout", { method: "POST" });
        setUser(null);
        router.refresh(); // re-fetch layout
        router.push("/");
    };

    const isLoggedIn = !!user;

    return (
        <nav className={`fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-8 md:px-16 py-5 transition-all duration-500
      ${scrolled ? "bg-[#0A0A0A]/95 backdrop-blur-md border-b border-[#C9A84C]/10" : "bg-transparent"}`}>

            {/* Logo — dashboard si connecté, accueil sinon */}
            <Link href={isLoggedIn ? "/dashboard" : "/"}
                className="font-display text-3xl font-light tracking-widest text-[#E8C97A]"
                style={{ fontFamily: "'Cormorant Garamond', serif" }}>
                Glow<span className="italic text-white">Up</span>
            </Link>

            {/* Links */}
            <ul className="hidden md:flex gap-10 list-none">
                {isLoggedIn ? (
                    <>
                        <li>
                            <Link href="/dashboard"
                                className="text-[0.65rem] font-medium tracking-[.2em] uppercase text-white/60 hover:text-[#E8C97A] transition-colors duration-300">
                                Tableau de bord
                            </Link>
                        </li>
                    </>
                ) : (
                    <>
                        <li>
                            <Link href="/#services"
                                className="text-[0.65rem] font-medium tracking-[.2em] uppercase text-white/60 hover:text-[#E8C97A] transition-colors duration-300">
                                Services
                            </Link>
                        </li>
                        <li>
                            <Link href="/#how"
                                className="text-[0.65rem] font-medium tracking-[.2em] uppercase text-white/60 hover:text-[#E8C97A] transition-colors duration-300">
                                Comment ça marche
                            </Link>
                        </li>
                    </>
                )}
            </ul>

            {/* Right side */}
            {isLoggedIn ? (
                <div className="flex items-center gap-4">
                    <span className="hidden md:block text-[0.65rem] text-white/40 tracking-wide">
                        {user.name.split(" ")[0]}
                    </span>
                    <button onClick={handleLogout}
                        className="text-[0.65rem] font-semibold tracking-[.18em] cursor-pointer uppercase px-6 py-3 border border-white/10 text-white/50 hover:border-red-500/40 hover:text-red-400 transition-all duration-300">
                        Déconnexion
                    </button>
                </div>
            ) : (
                <Link href="/login"
                    className="text-[0.65rem] font-semibold tracking-[.18em] cursor-pointer uppercase px-6 py-3 border border-[#C9A84C] text-[#E8C97A] hover:bg-[#C9A84C] hover:text-black transition-all duration-300">
                    Se connecter
                </Link>
            )}
        </nav>
    );
}