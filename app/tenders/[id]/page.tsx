'use client'

import { useParams, useRouter } from 'next/navigation'
import { useAuth } from '@/lib/AuthContext'
import { useEffect } from 'react'
import { Button } from '@/components/ui/button'
import Navigation from '@/components/Navigation'
import { MOCK_TENDERS, MOCK_CONSORTIA } from '@/lib/mockData'
import { getTenderMatches } from '@/lib/matching'
import { PageHeader, SectionHeader, StatusBadge } from '@/components/ui/enterprise'
import { ClipboardList, ShieldCheck } from 'lucide-react'

export default function TenderDetailPage() {
  const params = useParams()
  const router = useRouter()
  const { user, loading } = useAuth()
  const tenderId = params.id as string

  const tender = MOCK_TENDERS.find((t) => t.id === tenderId)
  const matches = tender ? getTenderMatches(tender.id, MOCK_CONSORTIA) : []

  useEffect(() => {
    if (!loading && !user) {
      router.push('/login')
    }
  }, [user, loading, router])

  if (loading || !user) {
    return <div className="flex min-h-screen items-center justify-center bg-slate-50"><div className="h-12 w-12 animate-spin rounded-full border-2 border-slate-200 border-t-slate-900" /></div>
  }

  if (!tender) {
    return <div className="min-h-screen bg-slate-50"><Navigation /><main className="mx-auto max-w-7xl px-6 py-8"><div className="rounded-3xl border border-slate-200 bg-white p-8 text-center shadow-sm"><p className="text-slate-600">Tender not found</p><Button className="mt-6" onClick={() => router.push('/tenders')}>Back to tenders</Button></div></main></div>
  }

  const daysRemaining = Math.ceil((tender.deadline.getTime() - Date.now()) / (1000 * 60 * 60 * 24))

  return (
    <div className="min-h-screen bg-slate-50">
      <Navigation />
      <main className="mx-auto max-w-7xl px-6 py-8">
        <PageHeader eyebrow="Tender workspace" title={tender.title} description={tender.description} actions={<><Button variant="outline">Save</Button><Button>Submit review</Button></>} />

        <div className="mt-8 grid gap-6 xl:grid-cols-[1.1fr_0.9fr]">
          <div className="space-y-6">
            <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
              <div className="flex flex-wrap items-center gap-3">
                <h2 className="text-xl font-semibold text-slate-900">Tender overview</h2>
                <StatusBadge status={tender.status} />
              </div>
              <div className="mt-5 grid gap-4 md:grid-cols-2">
                <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4"><p className="text-sm text-slate-500">Mining site</p><p className="mt-2 font-semibold text-slate-900">{tender.miningSite}</p></div>
                <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4"><p className="text-sm text-slate-500">Sector</p><p className="mt-2 font-semibold text-slate-900">{tender.sector}</p></div>
                <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4"><p className="text-sm text-slate-500">Budget</p><p className="mt-2 font-semibold text-slate-900">K{(tender.budget / 1000000).toFixed(1)}M</p></div>
                <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4"><p className="text-sm text-slate-500">Days remaining</p><p className="mt-2 font-semibold text-slate-900">{daysRemaining}</p></div>
              </div>
            </div>

            <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
              <SectionHeader title="Requirements" description="Minimum conditions for submission" />
              <ul className="mt-5 space-y-3 text-sm text-slate-600">
                {tender.requirements.map((req) => <li key={req} className="flex items-start gap-2"><span className="mt-0.5 text-slate-900">•</span><span>{req}</span></li>)}
              </ul>
            </div>

            <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
              <SectionHeader title="Evaluation criteria" description="Points of assessment for this opportunity" />
              <ul className="mt-5 space-y-3 text-sm text-slate-600">
                {tender.specifications.map((spec) => <li key={spec} className="flex items-start gap-2"><span className="mt-0.5 text-slate-900">•</span><span>{spec}</span></li>)}
              </ul>
            </div>
          </div>

          <div className="space-y-6">
            <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
              <SectionHeader title="Quick actions" description="Recommended next steps" />
              <div className="mt-5 space-y-3">
                <Button className="w-full bg-slate-900 text-white hover:bg-slate-800">Prepare submission</Button>
                <Button variant="outline" className="w-full">Share with consortium</Button>
              </div>
            </div>
            <div className="rounded-3xl border border-slate-200 bg-slate-900 p-6 text-slate-100 shadow-sm">
              <div className="flex items-center gap-2"><ShieldCheck className="h-4 w-4 text-[#C78A2C]" /><p className="text-sm font-semibold">Compliance alignment</p></div>
              <p className="mt-4 text-sm text-slate-400">This tender requires {tender.minLocalContent}% local content and is aligned to the current compliance framework.</p>
              <div className="mt-4 rounded-2xl border border-slate-800 bg-slate-950/70 p-4"><div className="flex items-center gap-2 text-sm text-slate-300"><ClipboardList className="h-4 w-4" /> Review evidence package</div></div>
            </div>
            <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
              <SectionHeader title="Compatible consortia" description="Groups that may align well to this tender" />
              <div className="mt-5 space-y-3">
                {matches.slice(0, 3).map((match) => {
                  const consortium = MOCK_CONSORTIA.find((c) => c.id === match.consortiumId)
                  return <div key={match.id} className="rounded-2xl border border-slate-200 bg-slate-50 p-4"><p className="font-semibold text-slate-900">{consortium?.name}</p><p className="mt-1 text-sm text-slate-600">{match.reason}</p></div>
                })}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
