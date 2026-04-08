import { db } from '@/lib/db'
import { getSession } from '@/lib/session'
import { redirect } from 'next/navigation'
import AppointmentForm from './AppointmentForm'

export default async function AppointementPage() {
  const session = await getSession()
  if (!session) redirect('/login')

  const prestations = await db.prestation.findMany({
    orderBy: { createdAt: 'asc' }
  })

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;1,300;1,400&family=Montserrat:wght@300;400;500;600&display=swap');
        .font-display { font-family: 'Cormorant Garamond', serif; }
      `}</style>
      
      <div className="min-h-screen bg-[#0A0A0A] text-[#FAFAFA] pt-32 pb-24 px-6 md:px-16 overflow-hidden relative" style={{fontFamily:"'Montserrat',sans-serif"}}>
        
        {/* Background Gradients/Grids */}
        <div className="absolute inset-0 pointer-events-none opacity-[0.03] z-0"
          style={{
            backgroundImage: 'linear-gradient(rgba(201,168,76,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(201,168,76,0.5) 1px, transparent 1px)',
            backgroundSize: '80px 80px',
            maskImage: 'radial-gradient(ellipse at top center, black 20%, transparent 70%)',
            WebkitMaskImage: 'radial-gradient(ellipse at top center, black 20%, transparent 70%)'
          }}
        />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] pointer-events-none z-0"
          style={{ background: 'radial-gradient(ellipse 50% 50% at 50% 0%, rgba(201,168,76,0.06) 0%, transparent 100%)' }}
        />

        <div className="relative z-10 max-w-5xl mx-auto">
          {/* Header */}
          <div className="text-center mb-16">
            <div className="flex items-center justify-center gap-3 mb-4">
              <span className="w-12 h-px bg-[#C9A84C]/40" />
              <span className="text-[0.6rem] tracking-[.35em] uppercase text-[#C9A84C]">Réservation</span>
              <span className="w-12 h-px bg-[#C9A84C]/40" />
            </div>
            <h1 className="font-display font-light text-5xl md:text-6xl text-white mb-4">
              Prendre <em className="text-[#E8C97A]">rendez-vous</em>
            </h1>
            <p className="text-[0.75rem] text-white/40 tracking-wide max-w-lg mx-auto">
              Sélectionnez votre prestation d'exception et le créneau qui vous convient pour un moment de bien-être absolu.
            </p>
          </div>

          {/* Form wrapper */}
          <div 
            className="border border-[#C9A84C]/10 bg-[rgba(17,17,17,0.8)] backdrop-blur-sm p-8 md:p-12 shadow-2xl relative"
          >
            {/* Corner accents */}
            {['top-0 left-0 border-t border-l', 'top-0 right-0 border-t border-r', 'bottom-0 left-0 border-b border-l', 'bottom-0 right-0 border-b border-r'].map((cls, i) => (
              <span key={i} className={`absolute w-4 h-4 ${cls}`} style={{ borderColor: 'rgba(201,168,76,0.4)' }} />
            ))}

            <AppointmentForm prestations={prestations} />
          </div>

        </div>
      </div>
    </>
  )
}
