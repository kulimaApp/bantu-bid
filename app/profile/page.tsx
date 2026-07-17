'use client'

import { useAuth } from '@/lib/AuthContext'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import Navigation from '@/components/Navigation'
import { MOCK_COMPANIES } from '@/lib/mockData'
import { Button } from '@/components/ui/button'
import { PageHeader, MetricCard, SectionHeader } from '@/components/ui/enterprise'
import { FileText, ShieldCheck, BadgeCheck } from 'lucide-react'

export default function ProfilePage() {
  const { user, loading } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!loading && !user) {
      router.push('/login')
    }
  }, [user, loading, router])

  if (loading || !user) {
    return <div className="flex min-h-screen items-center justify-center bg-slate-50"><div className="h-12 w-12 animate-spin rounded-full border-2 border-slate-200 border-t-slate-900" /></div>
  }

  const company = MOCK_COMPANIES.find((c) => c.id === user.companyId)

  if (!company) {
    return <div className="min-h-screen bg-slate-50"><Navigation /><main className="mx-auto max-w-7xl px-6 py-8"><div className="rounded-3xl border border-slate-200 bg-white p-8 text-center shadow-sm"><p className="text-slate-600">Company profile not found</p><Button className="mt-6" onClick={() => router.push('/dashboard')}>Back to dashboard</Button></div></main></div>
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <Navigation />
      <main className="mx-auto max-w-7xl px-6 py-8">
        <PageHeader eyebrow="Supplier profile" title={company.name} description={company.description} actions={<Button>Edit profile</Button>} />

        <div className="mt-8 grid gap-4 md:grid-cols-3">
          <MetricCard label="Profile completion" value="100%" trend="All core fields captured" icon={<BadgeCheck className="h-4 w-4" />} accent="green" />
          <MetricCard label="Local content" value={`${company.localContentPercentage}%`} trend="Meets threshold" icon={<ShieldCheck className="h-4 w-4" />} accent="gold" />
          <MetricCard label="Documents" value={company.certifications.length} trend="Ready for review" icon={<FileText className="h-4 w-4" />} accent="navy" />
        </div>

        <div className="mt-8 grid gap-6 xl:grid-cols-[1.2fr_0.8fr]">
          <div className="space-y-6">
            <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
              <SectionHeader title="Company overview" description="Operational and regulatory profile" />
              <div className="mt-5 grid gap-4 md:grid-cols-2">
                <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4"><p className="text-sm text-slate-500">Sector</p><p className="mt-2 font-semibold text-slate-900">{company.sector}</p></div>
                <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4"><p className="text-sm text-slate-500">Location</p><p className="mt-2 font-semibold text-slate-900">{company.location}</p></div>
                <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4"><p className="text-sm text-slate-500">Employees</p><p className="mt-2 font-semibold text-slate-900">{company.employees}</p></div>
                <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4"><p className="text-sm text-slate-500">Registration</p><p className="mt-2 font-semibold text-slate-900">{company.registrationNumber}</p></div>
              </div>
            </div>

            <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
              <SectionHeader title="Capabilities" description="Services available for procurement consideration" />
              <div className="mt-5 flex flex-wrap gap-2">{company.capabilities.map((cap) => <span key={cap} className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-sm font-medium text-slate-700">{cap}</span>)}</div>
            </div>
          </div>

          <div className="space-y-6">
            <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
              <SectionHeader title="Contact" description="Primary contacts for procurement and compliance" />
              <div className="mt-5 space-y-4 text-sm text-slate-600">
                <div><p className="text-slate-500">Primary contact</p><p className="mt-1 font-semibold text-slate-900">{company.contactPerson}</p></div>
                <div><p className="text-slate-500">Email</p><p className="mt-1 font-semibold text-slate-900">{company.contactEmail}</p></div>
                <div><p className="text-slate-500">Phone</p><p className="mt-1 font-semibold text-slate-900">{company.contactPhone}</p></div>
              </div>
            </div>
            <div className="rounded-3xl border border-slate-200 bg-slate-900 p-6 text-slate-100 shadow-sm">
              <p className="text-sm font-semibold text-white">Verified content</p>
              <div className="mt-4 flex flex-wrap gap-2">{company.certifications.map((cert) => <span key={cert} className="rounded-full border border-slate-700 bg-slate-950/70 px-3 py-1 text-xs font-medium text-slate-300">{cert}</span>)}</div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
