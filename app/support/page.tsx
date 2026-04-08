export default function SupportPage() {
    return (
        <div className="min-h-screen bg-black text-white flex items-center justify-center px-8">
            <div className="max-w-lg text-center">
                <p className="text-yellow-500/60 text-xs tracking-[0.3em] uppercase mb-3">Aide & Support</p>
                <h1 className="text-3xl font-medium uppercase tracking-widest mb-6">
                    Besoin d'<span className="text-amber-300">aide</span> ?
                </h1>
                <p className="text-white/40 text-sm leading-relaxed tracking-wide">
                    Notre équipe est disponible pour répondre à toutes vos questions.
                    N'hésitez pas à nous contacter par email à{" "}
                    <a href="mailto:contact@glowup.fr" className="text-amber-300 hover:text-amber-300 transition-colors">
                        contact@glowup.fr
                    </a>{" "}
                    ou par téléphone au{" "}
                    <a href="tel:+33600000000" className="text-amber-300 hover:text-amber-300 transition-colors">
                        +33 6 00 00 00 00
                    </a>
                    . Nous vous répondrons dans les plus brefs délais.
                </p>
            </div>
        </div>
    )
}