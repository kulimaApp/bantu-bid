'use client'

import { useAuth } from '@/lib/AuthContext'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import Navigation from '@/components/Navigation'
import { MOCK_CONSORTIA, MOCK_COMPANIES } from '@/lib/mockData'
import { checkCompliance } from '@/lib/compliance'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { PageHeader, MetricCard, SectionHeader, StatusBadge } from '@/components/ui/enterprise'
import { ClipboardList, ShieldCheck, FileCheck2 } from 'lucide-react'

export default function CompliancePage() {
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

  const userCompany = MOCK_COMPANIES.find((c) => c.id === user.companyId)
  const userConsortia = MOCK_CONSORTIA.filter((c) => c.members.some((m) => m.companyId === user.companyId))

  return (
    <div className="min-h-screen bg-slate-50">
      <Navigation />
      <main className="mx-auto max-w-7xl px-6 py-8">
        <PageHeader eyebrow="Compliance center" title="Enterprise compliance status" description="Monitor your local content readiness and document standing across supplier and consortium activity." actions={<Button>Review evidence</Button>} />

        <div className="mt-8 grid gap-4 md:grid-cols-3">
          <MetricCard label="Compliance readiness" value="92%" trend="Ahead of target" icon={<ShieldCheck className="h-4 w-4" />} accent="green" />
          <MetricCard label="Active documents" value="18" trend="3 pending review" icon={<ClipboardList className="h-4 w-4" />} accent="navy" />
          <MetricCard label="Audit trail" value="Stable" trend="Updated today" icon={<FileCheck2 className="h-4 w-4" />} accent="gold" />
        </div>

        <div className="mt-8 grid gap-6 xl:grid-cols-[1.1fr_0.9fr]">
          <div className="space-y-6">
            {userCompany && (
              <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
                <SectionHeader title={`${userCompany.name} compliance`} description="Current local content position and required evidence" />
                <div className="mt-5 rounded-3xl border border-slate-200 bg-slate-50 p-5">
                  <div className="flex items-center justify-between"><div><p className="text-sm text-slate-500">Current local content</p><p className="mt-2 text-3xl font-semibold text-slate-900">{userCompany.localContentPercentage}%</p></div><StatusBadge status={userCompany.localContentPercentage >= 70 ? 'verified' : 'pending'} /></div>
                  <div className="mt-4 h-2 rounded-full bg-slate-200"><div className={`h-2 rounded-full ${userCompany.localContentPercentage >= 70 ? 'bg-emerald-500' : 'bg-amber-500'}`} style={{ width: `${Math.min(100, userCompany.localContentPercentage)}%` }} /></div>
                  <div className="mt-4 flex flex-wrap gap-2">{userCompany.certifications.map((cert) => <span key={cert} className="rounded-full border border-slate-200 bg-white px-3 py-1 text-xs font-medium text-slate-700">{cert}</span>)}</div>
                </div>
              </div>
            )}

            {userConsortia.length > 0 && (
              <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
                <SectionHeader title="Consortium compliance" description="Status of each active procurement collaboration" />
                <div className="mt-5 space-y-4">
                  {userConsortia.map((consortium) => {
                    const compliance = checkCompliance(consortium)
                    return (
                      <div key={consortium.id} className="rounded-3xl border border-slate-200 bg-slate-50 p-4">
                        <div className="flex items-start justify-between gap-3"><div><p className="font-semibold text-slate-900">{consortium.name}</p><p className="mt-1 text-sm text-slate-600">{consortium.members.length} members</p></div><StatusBadge status={compliance.compliant ? 'verified' : 'pending'} /></div>
                        <div className="mt-4 flex items-center justify-between text-sm text-slate-600"><span>Required threshold</span><span className="font-semibold text-slate-900">70%</span></div>
                        <div className="mt-2 h-2 rounded-full bg-slate-200"><div className={`h-2 rounded-full ${compliance.compliant ? 'bg-emerald-500' : 'bg-amber-500'}`} style={{ width: `${Math.min(100, consortium.localContentPercentage)}%` }} /></div>
                        <div className="mt-4 rounded-2xl border border-slate-200 bg-white p-3 text-sm text-slate-600">{compliance.recommendations[0] || 'Maintaining current evidence will keep this consortium compliant.'}</div>
                      </div>
                    )
                  })}
                </div>
              </div>
            )}
          </div>

          <div className="space-y-6">
            <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
              <SectionHeader title="Next actions" description="Focus areas for the next review window" />
              <div className="mt-5 space-y-3">
                <Link href="/consortia" className="block"><Button variant="outline" className="w-full justify-start">Align consortium evidence</Button></Link>
                <Link href="/profile" className="block"><Button variant="outline" className="w-full justify-start">Refresh company profile</Button></Link>
              </div>
            </div>
            <div className="rounded-3xl border border-slate-200 bg-slate-900 p-6 text-slate-100 shadow-sm">
              <p className="text-sm font-semibold text-white">Compliance posture</p>
              <p className="mt-3 text-3xl font-semibold">Ready</p>
              <p className="mt-2 text-sm text-slate-400">Your active records are aligned with procurement review expectations.</p>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
