'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Prestation } from '../types/Prestation'

export default function AppointmentForm({ prestations }: { prestations: Prestation[] }) {
  const router = useRouter()
  const [selectedPrestation, setSelectedPrestation] = useState<string | null>(null)
  const [date, setDate] = useState<string>('')
  const [time, setTime] = useState<string>('')

  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const timeSlots = [
    '09:00', '09:30', '10:00', '10:30', '11:00', '11:30',
    '12:00', '12:30', '13:00', '13:30', '14:00', '14:30',
    '15:00', '15:30', '16:00', '16:30', '17:00', '17:30'
  ]

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError(null)

    if (!selectedPrestation || !date || !time) {
      setError('Veuillez sélectionner une prestation, une date et une heure.')
      return
    }

    setLoading(true)

    try {
      // Combine date and time
      const dateTime = new Date(`${date}T${time}`)

      const res = await fetch('/api/reservations', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          prestationId: selectedPrestation,
          date: dateTime.toISOString(),
        }),
      })

      const data = await res.json()

      if (!res.ok) {
        setError(data.error ?? 'Une erreur est survenue.')
        return
      }

      router.push('/dashboard')
      router.refresh()
    } catch (err) {
      setError('Impossible de se connecter au serveur.')
    } finally {
      setLoading(false)
    }
  }

  // Get tomorrow's date for the min date attribute
  const tomorrow = new Date()
  tomorrow.setDate(tomorrow.getDate() + 1)
  const minDate = tomorrow.toISOString().split('T')[0]

  return (
    <div className="w-full max-w-4xl mx-auto">
      <form onSubmit={handleSubmit} className="space-y-12">

        {/* Step 1: Prestation Selection */}
        <div>
          <div className="flex items-center gap-3 mb-6">
            <span className="w-8 h-px bg-[#C9A84C]/40" />
            <span className="text-[0.6rem] tracking-[.35em] uppercase text-[#C9A84C]">Étape 1</span>
          </div>
          <h2 className="font-display font-light text-3xl text-white mb-6">
            Choisissez votre <em className="text-[#E8C97A]">prestation</em>
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {prestations.length === 0 ? (
              <p className="text-white/40 text-sm font-light italic col-span-full">Aucun soin disponible pour le moment.</p>
            ) : (
              prestations.map((p) => (
                <div
                  key={p.id}
                  onClick={() => setSelectedPrestation(p.id)}
                  className={`relative cursor-pointer border p-6 transition-all duration-300 ${selectedPrestation === p.id
                      ? 'border-[#C9A84C] bg-[#C9A84C]/10 shadow-[0_0_30px_rgba(201,168,76,0.15)]'
                      : 'border-[#C9A84C]/10 bg-[#111111] hover:border-[#C9A84C]/30 hover:bg-[#13110a]'
                    }`}
                >
                  {selectedPrestation === p.id && (
                    <div className="absolute top-0 right-0 w-0 h-0 border-t-[30px] border-l-[30px] border-t-[#C9A84C] border-l-transparent">
                      <span className="absolute -top-[25px] -left-[14px] text-black text-[10px] font-bold">✓</span>
                    </div>
                  )}
                  <h3 className="font-display text-xl text-white mb-2">{p.name}</h3>
                  <div className="flex items-center gap-4 text-[0.65rem] tracking-wide text-white/50">
                    <span>{p.duration} min</span>
                    <span className="w-1 h-1 rounded-full bg-[#C9A84C]/30" />
                    <span className="text-[#E8C97A]">{p.price} €</span>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Step 2: Date & Time */}
        <div className={`transition-all duration-500 ${!selectedPrestation ? 'opacity-30 pointer-events-none' : 'opacity-100'}`}>
          <div className="flex items-center gap-3 mb-6">
            <span className="w-8 h-px bg-[#C9A84C]/40" />
            <span className="text-[0.6rem] tracking-[.35em] uppercase text-[#C9A84C]">Étape 2</span>
          </div>
          <h2 className="font-display font-light text-3xl text-white mb-6">
            Date & <em className="text-[#E8C97A]">Heure</em>
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            {/* Date Picker */}
            <div className="space-y-4">
              <label className="block text-[0.65rem] tracking-[.3em] uppercase text-[#C9A84C]">SÉLECTIONNEZ UNE DATE</label>
              <input
                type="date"
                min={minDate}
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="w-full bg-transparent border-b border-[#C9A84C]/30 text-white font-light py-3 outline-none focus:border-[#C9A84C] transition-colors"
                style={{ colorScheme: 'dark' }}
              />
            </div>

            {/* Time Slot Picker */}
            <div className="space-y-4">
              <label className="block text-[0.65rem] tracking-[.3em] uppercase text-[#C9A84C]">SÉLECTIONNEZ UNE HEURE</label>
              <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
                {timeSlots.map((ts) => (
                  <button
                    key={ts}
                    type="button"
                    onClick={() => setTime(ts)}
                    className={`py-2 text-[0.7rem] tracking-widest border transition-colors ${time === ts
                        ? 'bg-[#C9A84C] text-black border-[#C9A84C]'
                        : 'bg-transparent text-white/60 border-[#C9A84C]/20 hover:border-[#C9A84C]/50 hover:text-white'
                      }`}
                  >
                    {ts}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Step 3: Confirmation */}
        <div className={`pt-8 border-t border-[#C9A84C]/10 transition-all duration-500 ${(!selectedPrestation || !date || !time) ? 'opacity-30 pointer-events-none' : 'opacity-100'}`}>
          {error && (
            <p className="text-[11px] tracking-wide text-center py-3 px-4 mb-6"
              style={{ color: '#E8C4A0', background: 'rgba(212,100,55,0.08)', border: '0.5px solid rgba(212,100,55,0.2)' }}>
              {error}
            </p>
          )}

          <div className="flex justify-center">
            <button
              type="submit"
              disabled={loading || !selectedPrestation || !date || !time}
              className="relative hover:cursor-pointer w-full md:w-auto px-16 py-4 text-[0.65rem] tracking-[.35em] uppercase font-bold overflow-hidden transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed group"
              style={{
                background: loading ? 'transparent' : 'linear-gradient(135deg, #C9A227 0%, #F0D060 50%, #C9A227 100%)',
                color: loading ? '#D4AF37' : '#0a0a0a',
                border: '0.5px solid #D4AF37',
                boxShadow: loading ? 'none' : '0 0 30px rgba(212,175,55,0.2)',
              }}
            >
              <span className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                style={{ background: 'linear-gradient(105deg, transparent 35%, rgba(255,255,255,0.3) 50%, transparent 65%)', transform: 'skewX(-15deg)' }} />
              <span className="relative flex items-center justify-center gap-3">
                {loading && <span className="w-3.5 h-3.5 border border-current border-t-transparent rounded-full animate-spin" />}
                {loading ? 'CONFIRMATION...' : 'CONFIRMER LA RÉSERVATION'}
              </span>
            </button>
          </div>
        </div>

      </form>
    </div>
  )
}
