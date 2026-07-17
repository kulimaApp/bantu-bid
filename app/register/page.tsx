'use client'

import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { ShieldCheck } from 'lucide-react'
import { useAuth } from '@/lib/AuthContext'
import { registerUser } from '@/lib/auth'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

export default function RegisterPage() {
  const router = useRouter()
  const { login } = useAuth()
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [company, setCompany] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault()
    setError('')

    if (!name.trim() || !email.trim() || !password || !confirmPassword) {
      setError('Please fill in all required fields.')
      return
    }

    if (password.length < 6) {
      setError('Password must be at least 6 characters long.')
      return
    }

    if (password !== confirmPassword) {
      setError('Passwords do not match.')
      return
    }

    setLoading(true)
    const user = registerUser({
      name: name.trim(),
      email: email.trim(),
      password,
      companyName: company.trim() || 'New supplier',
    })

    if (user) {
      login(user)
      router.push('/dashboard')
    } else {
      setError('An account with this email already exists.')
    }

    setLoading(false)
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-50 px-4 py-10">
      <div className="w-full max-w-5xl overflow-hidden rounded-[32px] border border-slate-200 bg-white shadow-sm">
        <div className="grid lg:grid-cols-[1.05fr_0.95fr]">
          <div className="bg-slate-900 p-8 text-slate-100 lg:p-12">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-[#C78A2C] text-sm font-semibold text-slate-950">BB</div>
              <div>
                <p className="text-lg font-semibold">Bantu Bid</p>
                <p className="text-sm text-slate-400">Create your secure procurement workspace</p>
              </div>
            </div>
            <h1 className="mt-10 text-3xl font-semibold tracking-tight">Join the enterprise bidding network</h1>
            <p className="mt-4 max-w-md text-sm leading-6 text-slate-400">Register as a supplier or consortium lead and gain access to tenders, compliance dashboards, and collaborative planning tools.</p>
            <div className="mt-8 rounded-2xl border border-slate-800 bg-slate-950/70 p-4 text-sm text-slate-300">
              <div className="flex items-center gap-2 font-medium text-white"><ShieldCheck className="h-4 w-4 text-[#C78A2C]" /> Trusted onboarding</div>
              <p className="mt-2 text-sm text-slate-400">Your account is ready for immediate review and dashboard access.</p>
            </div>
          </div>

          <div className="p-8 lg:p-12">
            <p className="text-sm font-semibold uppercase tracking-[0.24em] text-slate-500">Create account</p>
            <h2 className="mt-3 text-2xl font-semibold text-slate-900">Set up your profile</h2>
            <p className="mt-2 text-sm text-slate-600">Use your work email to begin managing procurement opportunities.</p>

            {error ? <div className="mt-6 rounded-2xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-700">{error}</div> : null}

            <form onSubmit={handleSubmit} className="mt-6 space-y-4">
              <div>
                <label className="mb-2 block text-sm font-medium text-slate-700">Full name</label>
                <Input value={name} onChange={(e) => setName(e.target.value)} placeholder="Jane Mupeta" disabled={loading} className="w-full" />
              </div>
              <div>
                <label className="mb-2 block text-sm font-medium text-slate-700">Work email</label>
                <Input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@company.com" disabled={loading} className="w-full" />
              </div>
              <div>
                <label className="mb-2 block text-sm font-medium text-slate-700">Company</label>
                <Input value={company} onChange={(e) => setCompany(e.target.value)} placeholder="Your company name" disabled={loading} className="w-full" />
              </div>
              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <label className="mb-2 block text-sm font-medium text-slate-700">Password</label>
                  <Input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Create a password" disabled={loading} className="w-full" />
                </div>
                <div>
                  <label className="mb-2 block text-sm font-medium text-slate-700">Confirm password</label>
                  <Input type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} placeholder="Repeat password" disabled={loading} className="w-full" />
                </div>
              </div>
              <Button type="submit" disabled={loading} className="w-full bg-slate-900 text-white hover:bg-slate-800">
                {loading ? 'Creating account...' : 'Create account'}
              </Button>
            </form>

            <div className="mt-6 text-sm text-slate-600">
              Already have an account? <Link href="/login" className="font-semibold text-slate-900">Sign in</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
