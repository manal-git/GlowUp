import NextAuth, { type NextAuthOptions } from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
import bcrypt from 'bcryptjs'
import { db } from '@/lib/db'

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email:    { label: 'Email',    type: 'email' },
        password: { label: 'Password', type: 'password' },
      },

      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null
        }

        // Look up the user by email using Prisma
        const user = await db.user.findUnique({
          where:  { email: credentials.email },
          select: { id: true, name: true, email: true, password: true },
        })

        if (!user) return null

        const isValid = await bcrypt.compare(credentials.password, user.password)
        if (!isValid) return null

        // Return shape must match the User type NextAuth expects
        return {
          id:    user.id,
          name:  user.name,
          email: user.email,
        }
      },
    }),
  ],

  session: { strategy: 'jwt' },
  pages:   { signIn: '/login' },
  secret:  process.env.NEXTAUTH_SECRET,

  callbacks: {
    // Persist the user id in the JWT token
    async jwt({ token, user }) {
      if (user) token.id = user.id
      return token
    },
    // Expose the id on the session object so you can read
    // it from useSession() or getServerSession() anywhere
    async session({ session, token }) {
      if (session.user) session.user.id = token.id as string
      return session
    },
  },
}

const handler = NextAuth(authOptions)
export { handler as GET, handler as POST }