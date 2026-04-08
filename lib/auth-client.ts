export async function login(email: string, password: string) {
    const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
    })

    const data = await res.json()

    if (!res.ok) {
        // Throw so the calling component can catch & show the error
        throw new Error(data.error ?? 'Login failed')
    }

    // Cookie is set automatically by the server response —
    // no need to handle the token here
    return data.user
}