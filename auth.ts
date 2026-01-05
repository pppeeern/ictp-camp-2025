import NextAuth from 'next-auth';
import { authConfig } from '@/auth.config';
import Credentials from 'next-auth/providers/credentials';
import { z } from 'zod';
import bcrypt from 'bcryptjs';
import { supabase } from "@/app/lib/supabase"

export const { auth, signIn, signOut, handlers } = NextAuth({
  ...authConfig,
  providers: [
    Credentials({
      async authorize(credentials) {
        const parsedCredentials = z
          .object({ studentId: z.string(), pin: z.string().min(6) })
          .safeParse(credentials)

        if (parsedCredentials.success) {
          const { studentId, pin } = parsedCredentials.data
          
          const { data: user } = await supabase
            .from('students')
            .select('*')
            .eq('student_id', studentId)
            .single()

          if (!user) return null
          if (!user.pin) return null

          const passwordsMatch = await bcrypt.compare(pin, user.pin)
          if (passwordsMatch) return user
        }

        console.log('Invalid credentials')
        return null
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
        if (user) {
            token.studentId = (user as { student_id: string }).student_id;
        }
        return token;
    },
    async session({ session, token }) {
        if (token.studentId && session.user) {
            (session.user as { studentId: string }).studentId = token.studentId as string;
        }
        return session;
    }
  }
});
