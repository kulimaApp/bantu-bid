'use client'

import { AuthProvider } from '@/lib/AuthContext'

export function AppWrapper({ children }: { children: React.ReactNode }) {
  return <AuthProvider>{children}</AuthProvider>
}
