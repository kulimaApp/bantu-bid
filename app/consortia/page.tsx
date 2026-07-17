'use client'

import Link from 'next/link'
import { useAuth } from '@/lib/AuthContext'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import { Users2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import Navigation from '@/components/Navigation'
import { MOCK_CONSORTIA } from '@/lib/mockData'
import { checkCompliance } from '@/lib/compliance'
import { MetricCard, PageHeader, SectionHeader, StatusBadge } from '@/components/ui/enterprise'

export default function ConsortiaPage() {
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

  const userConsortia = MOCK_CONSORTIA.filter((c) => c.members.some((m) => m.companyId === user.companyId))

  return (
    <div className="min-h-screen bg-slate-50">
      <Navigation />
      <main className="mx-auto max-w-7xl px-6 py-8">
        <PageHeader eyebrow="Collaborative delivery" title="Consortium management" description="Coordinate members, track readiness and align on tender opportunities with a structured operating model." actions={<Link href="/consortia/create"><Button>Create consortium</Button></Link>} />

        <div className="mt-8 grid gap-4 md:grid-cols-3">
          <MetricCard label="Active consortia" value={userConsortia.length} trend="Two in progress" icon={<Users2 className="h-4 w-4" />} accent="navy" />
          <MetricCard label="Shared capability" value="92%" trend="Strong alignment" icon={<Users2 className="h-4 w-4" />} accent="gold" />
          <MetricCard label="Compliance posture" value="High" trend="Ready for review" icon={<Users2 className="h-4 w-4" />} accent="green" />
        </div>

        <div className="mt-8 space-y-6">
          <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
            <SectionHeader title="Your active consortia" description="Working groups currently aligned to procurement activity" />
            <div className="mt-5 grid gap-5 lg:grid-cols-2">
              {userConsortia.map((consortium) => {
                const compliance = checkCompliance(consortium)
                return (
                  <div key={consortium.id} className="rounded-3xl border border-slate-200 bg-slate-50 p-5">
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <h3 className="text-lg font-semibold text-slate-900">{consortium.name}</h3>
                        <p className="mt-1 text-sm text-slate-600">{consortium.description}</p>
                      </div>
                      <StatusBadge status={consortium.status} />
                    </div>
                    <div className="mt-4 flex flex-wrap gap-2">
                      {consortium.members.map((member) => <span key={member.companyId} className="rounded-full border border-slate-200 bg-white px-2.5 py-1 text-xs font-medium text-slate-700">{member.companyName}</span>)}
                    </div>
                    <div className="mt-4 rounded-2xl border border-slate-200 bg-white p-4">
                      <div className="flex items-center justify-between text-sm text-slate-600"><span>Local content</span><span className="font-semibold text-slate-900">{consortium.localContentPercentage}%</span></div>
                      <div className="mt-3 h-2 rounded-full bg-slate-100"><div className={`h-2 rounded-full ${compliance.compliant ? 'bg-emerald-500' : 'bg-amber-500'}`} style={{ width: `${Math.min(100, consortium.localContentPercentage)}%` }} /></div>
                    </div>
                    <div className="mt-4 flex gap-3">
                      <Link href={`/consortia/${consortium.id}`} className="flex-1"><Button variant="outline" className="w-full">Open</Button></Link>
                      <Button variant="ghost" className="flex-1">Coordinate</Button>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
