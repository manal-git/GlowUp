import { redirect } from "next/navigation"
import { cookies } from "next/headers"
import { jwtVerify } from "jose"
import { db } from "@/lib/db"

async function getUser() {
    const token = (await cookies()).get("session")?.value
    if (!token) return null

    try {
        const { payload } = await jwtVerify(
            token,
            new TextEncoder().encode(process.env.JWT_SECRET!)
        )
        return payload
    } catch {
        return null
    }
}

export default async function AdminPage() {
    const user = await getUser()

    if (!user || user.email !== process.env.ADMIN_EMAIL) {
        redirect("/login")
    }

    const reservations = await db.reservation.findMany({
        orderBy: { date: "asc" },
        include: {
            user: true,
            prestation: true,
        },
    })

    const now = new Date()

    return (
        <div className="min-h-screen bg-black text-white px-8 py-12">

            {/* Header */}
            <div className="mb-10 border-b border-yellow-600/30 py-8">
                <h1 className="text-2xl font-medium tracking-widest uppercase text-white">
                    Réservations <span className="text-amber-300">Clients</span>
                </h1>
            </div>

            {/* Table */}
            <div className="overflow-x-auto rounded-sm border border-yellow-600/20 shadow-[0_0_40px_rgba(202,138,4,0.05)]">
                <table className="w-full text-sm">
                    <thead>
                        <tr className="bg-yellow-500/10 border-b border-yellow-600/20">
                            {["Client", "Service", "Date", "Heure", "Statut"].map((col) => (
                                <th key={col} className="p-4 text-left text-yellow-400 font-semibold tracking-[0.15em] uppercase text-xs">
                                    {col}
                                </th>
                            ))}
                        </tr>
                    </thead>

                    <tbody>
                        {reservations.length === 0 ? (
                            <tr>
                                <td colSpan={5} className="p-12 text-center text-white/30 tracking-widest uppercase text-xs">
                                    Aucune réservation
                                </td>
                            </tr>
                        ) : (
                            reservations.map((resv: any, i: number) => {
                                const isPast = new Date(resv.date) < now

                                return (
                                    <tr
                                        key={resv.id}
                                        className={`
                                            border-b transition-all duration-200
                                            ${isPast
                                                ? "border-white/5 opacity-40 hover:opacity-60"
                                                : "border-yellow-600/10 hover:bg-yellow-500/5 hover:border-yellow-500/30"
                                            }
                                            ${i % 2 === 0 ? "bg-neutral-500/10" : "bg-transparent"}
                                        `}
                                    >
                                        <td className={`p-4 font-medium tracking-wide ${isPast ? "text-white/50" : "text-white"}`}>
                                            {resv.user.name}
                                        </td>
                                        <td className="p-4">
                                            <span className={`px-2 py-0.5 rounded-sm text-xs tracking-wider uppercase
                                                ${isPast
                                                    ? "text-white/30 bg-white/5"
                                                    : "text-yellow-400/80 bg-yellow-500/10"
                                                }`}>
                                                {resv.prestation.name}
                                            </span>
                                        </td>
                                        <td className="p-4 text-white/60 tracking-wider">
                                            {new Date(resv.date).toLocaleDateString("fr-FR", {
                                                day: "2-digit", month: "short", year: "numeric"
                                            })}
                                        </td>
                                        <td className="p-4 text-white/60 tracking-wider">
                                            {new Date(resv.date).toLocaleTimeString([], {
                                                hour: "2-digit", minute: "2-digit"
                                            })}
                                        </td>
                                        <td className="p-4">
                                            {isPast ? (
                                                <span className="text-[0.6rem] tracking-[.2em] uppercase text-white/25">
                                                    Passé
                                                </span>
                                            ) : (
                                                <span className="text-[0.6rem] tracking-[.2em] uppercase text-yellow-400/70">
                                                    ✦ À venir
                                                </span>
                                            )}
                                        </td>
                                    </tr>
                                )
                            })
                        )}
                    </tbody>
                </table>
            </div>

            {/* Footer count */}
            {reservations.length > 0 && (
                <p className="mt-4 text-right text-yellow-600/40 text-xs tracking-widest uppercase">
                    {reservations.length} réservation{reservations.length > 1 ? "s" : ""}
                </p>
            )}
        </div>
    )
}