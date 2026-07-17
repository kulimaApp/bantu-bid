'use client'

import { useRouter } from 'next/navigation'
import { useAuth } from '@/lib/AuthContext'
import { useEffect, useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import Navigation from '@/components/Navigation'
import { PageHeader, SectionHeader } from '@/components/ui/enterprise'
import { Shield, Bell, Lock, LogOut } from 'lucide-react'

export default function SettingsPage() {
  const router = useRouter()
  const { user, loading, logout } = useAuth()
  const [formData, setFormData] = useState({
    email: '',
    fullName: '',
    notifications: true,
    twoFactor: false,
  })

  useEffect(() => {
    if (!loading && !user) {
      router.push('/login')
    } else if (user) {
      setFormData((prev) => ({
        ...prev,
        email: user.email,
        fullName: user.name,
      }))
    }
  }, [user, loading, router])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, type, checked, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }))
  }

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault()
    console.log('[v0] Settings saved:', formData)
  }

  const handleLogout = async () => {
    logout()
    router.push('/login')
  }

  if (loading || !user) {
    return <div className="flex min-h-screen items-center justify-center bg-slate-50"><div className="h-12 w-12 animate-spin rounded-full border-2 border-slate-200 border-t-slate-900" /></div>
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <Navigation />
      <main className="mx-auto max-w-4xl px-6 py-8">
        <PageHeader eyebrow="Account management" title="Settings" description="Manage your account preferences, security, and notification settings." />

        <div className="mt-8 space-y-6">
          <form onSubmit={handleSave} className="space-y-6">
            <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
              <SectionHeader title="Personal information" description="Update your profile details" />
              <div className="mt-5 space-y-4">
                <div>
                  <label className="mb-2 block text-sm font-medium text-slate-700">Full name</label>
                  <Input name="fullName" value={formData.fullName} onChange={handleChange} placeholder="Your name" className="w-full" />
                </div>
                <div>
                  <label className="mb-2 block text-sm font-medium text-slate-700">Email address</label>
                  <Input name="email" type="email" value={formData.email} onChange={handleChange} placeholder="your@email.com" disabled className="w-full" />
                  <p className="mt-2 text-sm text-slate-500">Email cannot be changed. Contact support to update.</p>
                </div>
              </div>
            </div>

            <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
              <SectionHeader title="Notifications" description="Choose how you receive updates" />
              <div className="mt-5 space-y-4">
                <div className="flex items-center justify-between rounded-2xl border border-slate-200 bg-slate-50 p-4">
                  <div className="flex items-center gap-3">
                    <Bell className="h-5 w-5 text-slate-600" />
                    <div>
                      <p className="font-medium text-slate-900">Email notifications</p>
                      <p className="text-sm text-slate-600">Receive updates on tenders, consortia, and compliance</p>
                    </div>
                  </div>
                  <input type="checkbox" name="notifications" checked={formData.notifications} onChange={handleChange} className="h-4 w-4 cursor-pointer rounded border-slate-300" />
                </div>
              </div>
            </div>

            <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
              <SectionHeader title="Security" description="Protect your account" />
              <div className="mt-5 space-y-4">
                <div className="flex items-center justify-between rounded-2xl border border-slate-200 bg-slate-50 p-4">
                  <div className="flex items-center gap-3">
                    <Lock className="h-5 w-5 text-slate-600" />
                    <div>
                      <p className="font-medium text-slate-900">Change password</p>
                      <p className="text-sm text-slate-600">Update your account password</p>
                    </div>
                  </div>
                  <Button type="button" variant="outline" size="sm">Change</Button>
                </div>
                <div className="flex items-center justify-between rounded-2xl border border-slate-200 bg-slate-50 p-4">
                  <div className="flex items-center gap-3">
                    <Shield className="h-5 w-5 text-slate-600" />
                    <div>
                      <p className="font-medium text-slate-900">Two-factor authentication</p>
                      <p className="text-sm text-slate-600">Add an extra layer of security</p>
                    </div>
                  </div>
                  <input type="checkbox" name="twoFactor" checked={formData.twoFactor} onChange={handleChange} className="h-4 w-4 cursor-pointer rounded border-slate-300" />
                </div>
              </div>
            </div>

            <div className="flex gap-3">
              <Button type="submit" className="flex-1 bg-slate-900 text-white hover:bg-slate-800">Save changes</Button>
              <Button type="button" variant="outline" className="flex-1">Reset</Button>
            </div>
          </form>

          <div className="rounded-3xl border border-rose-200 bg-rose-50 p-6">
            <div className="flex items-start justify-between gap-4">
              <div>
                <h3 className="font-semibold text-rose-900">Danger zone</h3>
                <p className="mt-1 text-sm text-rose-700">Signed in as <span className="font-medium">{user.email}</span></p>
              </div>
              <Button onClick={handleLogout} variant="destructive" size="sm">Log out</Button>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
