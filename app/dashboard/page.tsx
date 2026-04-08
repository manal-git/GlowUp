import { db } from '@/lib/db'
import { getSession } from '@/lib/session'
import { redirect } from 'next/navigation'
import Link from 'next/link'

export default async function DashboardPage() {
  const session = await getSession()
  if (!session) redirect('/login')

  const user = await db.user.findUnique({
    where: { id: session.id },
    include: {
      reservations: {
        include: { prestation: true },
        orderBy: { date: 'asc' },
      },
    },
  })

  if (!user) redirect('/login')

  const now = new Date()
  const upcoming = user.reservations.filter(r => new Date(r.date) >= now)
  const past = user.reservations.filter(r => new Date(r.date) < now)
  const totalSpent = past.reduce((sum, r) => sum + Number(r.prestation.price), 0)

  const formatDate = (date: Date) =>
    new Date(date).toLocaleDateString('fr-FR', {
      weekday: 'long', day: 'numeric', month: 'long', year: 'numeric',
    })

  const formatTime = (date: Date) =>
    new Date(date).toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' })

  const services = [
    { icon: '✦', label: 'Coiffure' },
    { icon: '◈', label: 'Manucure' },
    { icon: '◇', label: 'Soins Visage' },
    { icon: '◉', label: 'Épilation' },
    { icon: '✧', label: 'Massage' },
    { icon: '⬡', label: 'Maquillage' },
  ]

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;1,300;1,400&family=Montserrat:wght@300;400;500;600&display=swap');
        .font-display { font-family: 'Cormorant Garamond', serif; }
      `}</style>

      <div className="min-h-screen bg-[#0A0A0A] text-[#FAFAFA] pt-24 pb-16 px-6 md:px-16" style={{ fontFamily: "'Montserrat',sans-serif" }}>
        <div className="max-w-5xl mx-auto">

          {/* ── Header ── */}
          <div className="mb-12">
            <div className="flex items-center gap-3 mb-2">
              <span className="w-8 h-px bg-[#C9A84C]/50" />
              <span className="text-[0.6rem] tracking-[.35em] uppercase text-[#C9A84C]">Tableau de bord</span>
            </div>
            <h1 className="font-display font-light text-4xl md:text-5xl text-white">
              Bonjour, <em className="text-[#E8C97A]">{user.name.split(' ')[0]}</em>
            </h1>
            <p className="text-[0.75rem] text-white/40 mt-2 tracking-wide">
              Bienvenue dans votre espace beauté personnel
            </p>
          </div>

          {/* ── Stats ── */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-12">
            {[
              { label: 'RDV à venir', value: upcoming.length, unit: upcoming.length > 1 ? 'rendez-vous' : 'rendez-vous' },
              { label: 'RDV passés', value: past.length, unit: 'effectués' },
              { label: 'Total dépensé', value: `${totalSpent} €`, unit: 'en soins' },
            ].map((stat, i) => (
              <div key={i} className="border border-[#C9A84C]/10 bg-[#111111] p-6 hover:border-[#C9A84C]/25 transition-colors duration-300">
                <p className="text-[0.6rem] tracking-[.25em] uppercase text-[#C9A84C] mb-3">{stat.label}</p>
                <p className="font-display text-4xl font-light text-white mb-1">{stat.value}</p>
                <p className="text-[0.65rem] text-white/30 tracking-wide">{stat.unit}</p>
              </div>
            ))}
          </div>

          {/* ── Upcoming reservations ── */}
          <div className="mb-12">
            <div className="flex items-center justify-between mb-6">
              <div>
                <div className="flex items-center gap-3 mb-1">
                  <span className="text-[0.6rem] tracking-[.35em] uppercase text-[#C9A84C]">Prochains rendez-vous</span>
                  <span className="w-8 h-px bg-[#C9A84C]/40" />
                </div>
                <h2 className="font-display font-light text-2xl text-white">
                  Vos soins <em className="text-[#E8C97A]">à venir</em>
                </h2>
              </div>
              <Link href="/appointement"
                className="text-[0.6rem] tracking-[.2em] uppercase text-[#C9A84C] border border-[#C9A84C]/30 px-5 py-2.5 hover:bg-[#C9A84C]/10 transition-colors duration-300">
                + Réserver
              </Link>
            </div>

            {upcoming.length === 0 ? (
              <div className="border border-[#C9A84C]/10 bg-[#111111] p-10 text-center">
                <p className="font-display italic text-xl text-white/30 mb-4">Aucun rendez-vous à venir</p>
                <Link href="/appointment"
                  className="inline-block text-[0.62rem] tracking-[.2em] uppercase px-8 py-3 border border-[#C9A84C]/40 text-[#E8C97A] hover:bg-[#C9A84C] hover:text-black transition-all duration-300">
                  Prendre un rendez-vous
                </Link>
              </div>
            ) : (
              <div className="space-y-3">
                {upcoming.map((r) => (
                  <div key={r.id}
                    className="border border-[#C9A84C]/10 bg-[#111111] hover:border-[#C9A84C]/25 transition-colors duration-300 flex items-center justify-between px-6 py-5">
                    <div className="flex items-center gap-5">
                      <div className="w-10 h-10 rounded-full border border-[#C9A84C]/20 flex items-center justify-center text-[#C9A84C] text-sm">
                        ✦
                      </div>
                      <div>
                        <p className="font-display text-lg text-white">{r.prestation.name}</p>
                        <p className="text-[0.65rem] text-white/40 tracking-wide mt-0.5 capitalize">
                          {formatDate(r.date)} · {formatTime(r.date)}
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-[#E8C97A] font-display text-xl">{r.prestation.price} €</p>
                      <p className="text-[0.6rem] text-white/30 tracking-wide">{r.prestation.duration} min</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* ── Quick book services ── */}
          <div className="mb-12">
            <div className="flex items-center gap-3 mb-1">
              <span id="prestations" className="text-[0.6rem] tracking-[.35em] uppercase text-[#C9A84C]">Nos prestations</span>
              <span className="w-8 h-px bg-[#C9A84C]/40" />
            </div>
            <h2 className="font-display font-light text-2xl text-white mb-6">
              Réserver une <em className="text-[#E8C97A]">prestation</em>
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {services.map((s, i) => (
                <Link key={i} href="/appointement"
                  className="group border border-[#C9A84C]/10 bg-[#111111] hover:bg-[#13110a] hover:border-[#C9A84C]/30 transition-all duration-300 p-5 flex items-center gap-4">
                  <span className="text-xl text-[#C9A84C] group-hover:scale-110 transition-transform duration-300 inline-block">{s.icon}</span>
                  <span className="font-display text-lg text-white/80 group-hover:text-white transition-colors">{s.label}</span>
                </Link>
              ))}
            </div>
          </div>

          {/* ── Past reservations ── */}
          {past.length > 0 && (
            <div>
              <div className="flex items-center gap-3 mb-1">
                <span className="text-[0.6rem] tracking-[.35em] uppercase text-[#C9A84C]">Historique</span>
                <span className="w-8 h-px bg-[#C9A84C]/40" />
              </div>
              <h2 className="font-display font-light text-2xl text-white mb-6">
                Soins <em className="text-[#E8C97A]">passés</em>
              </h2>
              <div className="space-y-2">
                {past.slice(0, 5).map((r) => (
                  <div key={r.id}
                    className="border border-white/5 bg-[#0f0f0f] flex items-center justify-between px-6 py-4">
                    <div>
                      <p className="font-display text-base text-white/60">{r.prestation.name}</p>
                      <p className="text-[0.62rem] text-white/25 tracking-wide mt-0.5 capitalize">
                        {formatDate(r.date)}
                      </p>
                    </div>
                    <p className="text-white/40 font-display text-lg">{r.prestation.price} €</p>
                  </div>
                ))}
              </div>
            </div>
          )}

        </div>
      </div>
    </>
  )
}