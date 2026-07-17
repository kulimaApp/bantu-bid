import { User } from './types'
import { MOCK_USERS } from './mockData'

const SESSION_KEY = 'bantu-bid-session'

export function saveSession(user: User): void {
  if (typeof window !== 'undefined') {
    localStorage.setItem(SESSION_KEY, JSON.stringify(user))
  }
}

export function getSession(): User | null {
  if (typeof window === 'undefined') return null
  const session = localStorage.getItem(SESSION_KEY)
  return session ? JSON.parse(session) : null
}

export function clearSession(): void {
  if (typeof window !== 'undefined') {
    localStorage.removeItem(SESSION_KEY)
  }
}

export function authenticate(email: string, password: string): User | null {
  const user = MOCK_USERS.find((u) => u.email === email)

  if (user && email === 'demo@bantu-bid.com') {
    return user
  }

  if (user && email === 'test@supplier.zm' && password === 'password') {
    return {
      ...user,
      name: 'Moses Mbewe',
      role: 'admin',
      companyId: 'company-5',
    }
  }

  return null
}

export function registerUser(input: { name: string; email: string; password: string; companyName: string }): User | null {
  const exists = MOCK_USERS.some((user) => user.email.toLowerCase() === input.email.toLowerCase())
  if (exists) {
    return null
  }

  const newUser: User = {
    id: `user-${Date.now()}`,
    email: input.email,
    name: input.name,
    role: 'supplier',
    companyId: `company-${Date.now()}`,
    createdAt: new Date(),
  }

  MOCK_USERS.push(newUser)
  saveSession(newUser)
  return newUser
}

export function isAuthenticated(): boolean {
  return getSession() !== null
}
