'use client'

import Link from 'next/link'
import { useRouter, usePathname } from 'next/navigation'
import { Bell, Compass, HelpCircle, Search, Settings, ShieldCheck, LogOut, User } from 'lucide-react'
import { useAuth } from '@/lib/AuthContext'
import { Button } from '@/components/ui/button'
import { useState } from 'react'

const navItems = [
  { href: '/dashboard', label: 'Overview' },
  { href: '/tenders', label: 'Tenders' },
  { href: '/suppliers', label: 'Suppliers' },
  { href: '/consortia', label: 'Consortiums' },
  { href: '/compliance', label: 'Compliance' },
  { href: '/profile', label: 'Profile' },
  { href: '/reports', label: 'Reports' },
]

export default function Navigation() {
  const { user, logout } = useAuth()
  const router = useRouter()
  const pathname = usePathname()
  const [showDropdown, setShowDropdown] = useState(false)

  const handleLogout = () => {
    logout()
    router.push('/')
  }

  const isActive = (path: string) => pathname === path

  if (!user) {
    return (
      <nav className="border-b border-slate-200 bg-white/95 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          <Link href="/" className="flex items-center gap-3 font-semibold text-slate-900">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-slate-900 text-sm font-semibold text-white">
              BB
            </div>
            <div>
              <div className="text-sm font-semibold">Bantu Bid</div>
              <div className="text-xs font-medium text-slate-500">Enterprise Procurement</div>
            </div>
          </Link>
          <Link href="/login">
            <Button variant="outline" size="sm">
              Login
            </Button>
          </Link>
        </div>
      </nav>
    )
  }

  return (
    <div className="sticky top-0 z-30 border-b border-slate-200 bg-white/95 backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center gap-4 px-6 py-4">
        <Link href="/dashboard" className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-slate-900 text-sm font-semibold text-white">
            BB
          </div>
          <div>
            <div className="text-sm font-semibold text-slate-900">Bantu Bid</div>
            <div className="text-xs font-medium text-slate-500">Procurement Platform</div>
          </div>
        </Link>

        <div className="ml-4 flex flex-1 items-center gap-3 rounded-2xl border border-slate-200 bg-slate-50 px-3 py-2 text-sm text-slate-500">
          <Search className="h-4 w-4" />
          <span>Search suppliers, tenders, documents</span>
          <span className="ml-auto rounded border border-slate-200 px-2 py-1 text-[11px] font-semibold uppercase tracking-[0.2em] text-slate-400">Ctrl K</span>
        </div>

        <div className="flex items-center gap-2">
          <button className="rounded-xl border border-slate-200 bg-white p-2 text-slate-600 transition hover:border-slate-300 hover:bg-slate-50">
            <Bell className="h-4 w-4" />
          </button>
          <button className="rounded-xl border border-slate-200 bg-white p-2 text-slate-600 transition hover:border-slate-300 hover:bg-slate-50">
            <HelpCircle className="h-4 w-4" />
          </button>
          <div className="relative ml-2">
            <button 
              onClick={() => setShowDropdown(!showDropdown)}
              className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-white px-3 py-2 hover:border-slate-300 transition"
            >
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-slate-900 text-sm font-semibold text-white">
                {user.name.charAt(0)}
              </div>
              <div>
                <p className="text-sm font-semibold text-slate-900">{user.name}</p>
                <p className="text-xs text-slate-500">{user.role === 'admin' ? 'Administrator' : 'Supplier'}</p>
              </div>
            </button>
            {showDropdown && (
              <div className="absolute right-0 mt-2 w-48 rounded-2xl border border-slate-200 bg-white shadow-lg z-50">
                <Link href="/profile" className="flex items-center gap-3 px-4 py-3 text-sm text-slate-700 hover:bg-slate-50 first:rounded-t-2xl">
                  <User className="h-4 w-4" />
                  View profile
                </Link>
                <Link href="/settings" className="flex items-center gap-3 px-4 py-3 text-sm text-slate-700 hover:bg-slate-50">
                  <Settings className="h-4 w-4" />
                  Settings
                </Link>
                <button 
                  onClick={() => { handleLogout(); setShowDropdown(false); }}
                  className="w-full flex items-center gap-3 px-4 py-3 text-sm text-rose-600 hover:bg-slate-50 rounded-b-2xl"
                >
                  <LogOut className="h-4 w-4" />
                  Log out
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="border-t border-slate-200 bg-slate-50/80">
        <div className="mx-auto flex max-w-7xl items-center gap-2 px-6 py-3">
          {navItems.map((item) => {
            const active = isActive(item.href)
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`rounded-full px-3 py-1.5 text-sm font-medium transition ${active ? 'bg-slate-900 text-white' : 'text-slate-600 hover:bg-white hover:text-slate-900'}`}
              >
                {item.label}
              </Link>
            )
          })}
          <div className="ml-auto flex items-center gap-2 rounded-full border border-slate-200 bg-white px-3 py-1.5 text-sm text-slate-600">
            <ShieldCheck className="h-4 w-4 text-[#C78A2C]" />
            Secure workspace
          </div>
        </div>
      </div>
    </div>
  )
}
