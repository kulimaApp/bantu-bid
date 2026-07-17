'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { ShieldCheck } from 'lucide-react'
import { useAuth } from '@/lib/AuthContext'
import { authenticate } from '@/lib/auth'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import Link from 'next/link'

export default function LoginPage() {
  const [email, setEmail] = useState('demo@bantu-bid.com')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const { login } = useAuth()
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    const user = authenticate(email, password)

    if (user) {
      login(user)
      router.push('/dashboard')
    } else {
      setError('Invalid email or password. Try demo@bantu-bid.com with any password.')
    }

    setLoading(false)
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-50 px-4 py-10">
      <div className="w-full max-w-5xl overflow-hidden rounded-[32px] border border-slate-200 bg-white shadow-sm">
        <div className="grid lg:grid-cols-[1.1fr_0.9fr]">
          <div className="bg-slate-900 p-8 text-slate-100 lg:p-12">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-[#C78A2C] text-sm font-semibold text-slate-950">BB</div>
              <div>
                <p className="text-lg font-semibold">Bantu Bid</p>
                <p className="text-sm text-slate-400">Enterprise procurement workspace</p>
              </div>
            </div>
            <h1 className="mt-10 text-3xl font-semibold tracking-tight">Secure access to procurement operations</h1>
            <p className="mt-4 max-w-md text-sm leading-6 text-slate-400">Review tenders, manage consortiums, and maintain compliance with a platform built for mining and infrastructure teams.</p>
            <div className="mt-8 rounded-2xl border border-slate-800 bg-slate-950/70 p-4 text-sm text-slate-300">
              <div className="flex items-center gap-2 font-medium text-white"><ShieldCheck className="h-4 w-4 text-[#C78A2C]" /> Governance ready</div>
              <p className="mt-2 text-sm text-slate-400">Role-based access and audit-friendly workflows for suppliers, consortium managers, and procurement leaders.</p>
            </div>
          </div>

          <div className="p-8 lg:p-12">
            <p className="text-sm font-semibold uppercase tracking-[0.24em] text-slate-500">Sign in</p>
            <h2 className="mt-3 text-2xl font-semibold text-slate-900">Welcome back</h2>
            <p className="mt-2 text-sm text-slate-600">Use your enterprise credentials to continue</p>

            {error && (
              <div className="mt-6 rounded-2xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-700">{error}</div>
            )}

            <form onSubmit={handleSubmit} className="mt-6 space-y-4">
              <div>
                <label className="mb-2 block text-sm font-medium text-slate-700">Email address</label>
                <Input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@company.com" disabled={loading} className="w-full" />
              </div>
              <div>
                <label className="mb-2 block text-sm font-medium text-slate-700">Password</label>
                <Input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Enter your password" disabled={loading} className="w-full" />
              </div>
              <Button type="submit" disabled={loading} className="w-full bg-slate-900 text-white hover:bg-slate-800">
                {loading ? 'Signing in...' : 'Continue'}
              </Button>
            </form>

            <div className="mt-6 rounded-2xl border border-slate-200 bg-slate-50 p-4 text-sm text-slate-600">
              <p className="font-semibold text-slate-800">Demo credentials</p>
              <p className="mt-2">demo@bantu-bid.com • any password</p>
              <p className="mt-1">test@supplier.zm • password</p>
            </div>

            <div className="mt-6 flex flex-wrap items-center gap-3 text-sm text-slate-600">
              <span>Need an account?</span>
              <Link href="/register" className="font-semibold text-slate-900">Create one</Link>
              <span>•</span>
              <Link href="/" className="font-semibold text-slate-900">Visit the overview</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
