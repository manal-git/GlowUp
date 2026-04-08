'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { login } from '@/lib/auth-client'

export default function LoginPage() {
  const router = useRouter()
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const [focused, setFocused] = useState<string | null>(null)

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setError(null)
    setLoading(true)

    const form = e.currentTarget
    const email = (form.elements.namedItem('email') as HTMLInputElement).value
    const password = (form.elements.namedItem('password') as HTMLInputElement).value

    try {
      await login(email, password)
      router.refresh()
      router.push('/dashboard')
    } catch (err: any) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  const inputClass = (name: string) =>
    `w-full bg-transparent text-white text-sm font-light py-3 outline-none transition-all duration-300 border-b ${
      focused === name ? 'border-[#D4AF37]' : 'border-white/15'
    } placeholder-white/20 tracking-widest`

  return (
    <div className="min-h-screen bg-black flex items-center justify-center px-4">

      <div
        className="absolute  inset-0 pointer-events-none opacity-[0.03]"
        style={{
          backgroundImage:
            'linear-gradient(rgba(212,175,55,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(212,175,55,0.5) 1px, transparent 1px)',
          backgroundSize: '60px 60px',
        }}
      />

      {/* Top glow */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[500px] h-52 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse, rgba(212,175,55,0.10) 0%, transparent 70%)' }}
      />

      <div className="relative w-full max-w-sm">

        {/* Header */}
        <div className="text-center mb-12">
          <div className="mx-auto mb-4 w-px h-10"/>
          <p className="text-[#D4AF37] text-[10px] tracking-[0.45em] uppercase font-light">Connexion</p>
        </div>

        {/* Card */}
        <div
          className="relative px-8 py-10"
          style={{
            background: 'rgba(255,255,255,0.02)',
            border: '0.5px solid rgba(212,175,55,0.2)',
            boxShadow: '0 0 60px rgba(212,175,55,0.05), inset 0 0 40px rgba(0,0,0,0.2)',
          }}
        >
          {/* Corner accents */}
          {['top-0 left-0 border-t border-l', 'top-0 right-0 border-t border-r', 'bottom-0 left-0 border-b border-l', 'bottom-0 right-0 border-b border-r'].map((cls, i) => (
            <span key={i} className={`absolute w-3.5 h-3.5 ${cls}`} style={{ borderColor: 'rgba(212,175,55,0.55)' }} />
          ))}

          <form onSubmit={handleSubmit} className="space-y-8">

            {/* Email */}
            <div className="space-y-2">
              <label className="block text-[10px] tracking-[0.3em] uppercase font-light transition-colors duration-300"
                style={{ color: focused === 'email' ? '#D4AF37' : 'rgba(255,255,255,0.3)' }}>
                Email
              </label>
              <input
                name="email"
                type="email"
                required
                autoComplete="email"
                placeholder=""
                className={inputClass('email')}
                style={{ caretColor: '#D4AF37' }}
                onFocus={() => setFocused('email')}
                onBlur={() => setFocused(null)}
              />
            </div>

            {/* Password */}
            <div className="space-y-2">
              <label className="block text-[10px] tracking-[0.3em] uppercase font-light transition-colors duration-300"
                style={{ color: focused === 'password' ? '#D4AF37' : 'rgba(255,255,255,0.3)' }}>
                Mot de passe
              </label>
              <input
                name="password"
                type="password"
                required
                autoComplete="current-password"
                placeholder=""
                className={inputClass('password')}
                style={{ caretColor: '#D4AF37' }}
                onFocus={() => setFocused('password')}
                onBlur={() => setFocused(null)}
              />
            </div>

            {/* Error */}
            {error && (
              <p className="text-[11px] tracking-wide text-center py-2 px-3"
                style={{ color: '#E8C4A0', background: 'rgba(212,100,55,0.08)', border: '0.5px solid rgba(212,100,55,0.2)' }}>
                {error}
              </p>
            )}

            {/* Submit */}
            <div className="pt-2">
              <button
                type="submit"
                disabled={loading}
                className="relative hover:cursor-pointer w-full py-3.5 text-[11px] tracking-[0.35em] uppercase font-light overflow-hidden transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed group"
                style={{
                  background: loading ? 'transparent' : 'linear-gradient(135deg, #C9A227 0%, #F0D060 50%, #C9A227 100%)',
                  color: loading ? '#D4AF37' : '#0a0a0a',
                  border: '0.5px solid #D4AF37',
                  boxShadow: loading ? 'none' : '0 0 24px rgba(212,175,55,0.15)',
                }}
              >
                <span className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                  style={{ background: 'linear-gradient(105deg, transparent 35%, rgba(255,255,255,0.28) 50%, transparent 65%)', transform: 'skewX(-15deg)' }} />
                <span className="relative flex items-center justify-center gap-2">
                  {loading && <span className="w-3.5 h-3.5 border border-current border-t-transparent rounded-full animate-spin" />}
                  {loading ? 'Connexion en cours…' : 'Se connecter'}
                </span>
              </button>
            </div>

          </form>
        </div>

        <div className="mt-8 flex items-center gap-4 pb-8">
          <div className="flex-1 h-px" style={{ background: 'linear-gradient(to right, transparent, rgba(212,175,55,0.15))' }} />
          <span className="text-[9px] tracking-[0.3em] uppercase" style={{ color: 'rgba(255,255,255,0.1)' }}>GlowUp</span>
          <div className="flex-1 h-px" style={{ background: 'linear-gradient(to left, transparent, rgba(212,175,55,0.15))' }} />
        </div>

      </div>
    </div>
  )
}