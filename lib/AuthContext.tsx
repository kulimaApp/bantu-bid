'use client'

import React, { createContext, useContext, useEffect, useState } from 'react'
import { User } from './types'
import { getSession, saveSession, clearSession } from './auth'

interface AuthContextType {
  user: User | null
  loading: boolean
  login: (user: User) => void
  logout: () => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const session = getSession()
    setUser(session)
    setLoading(false)
  }, [])

  const login = (newUser: User) => {
    saveSession(newUser)
    setUser(newUser)
  }

  const logout = () => {
    clearSession()
    setUser(null)
  }

  return (
    <AuthContext.Provider value={{ user, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within AuthProvider')
  }
  return context
}
