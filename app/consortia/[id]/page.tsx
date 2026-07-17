'use client'

import { useParams, useRouter } from 'next/navigation'
import { useAuth } from '@/lib/AuthContext'
import { useEffect } from 'react'
import { Button } from '@/components/ui/button'
import Navigation from '@/components/Navigation'
import { MOCK_CONSORTIA, MOCK_COMPANIES } from '@/lib/mockData'
import { checkCompliance } from '@/lib/compliance'
import { PageHeader, SectionHeader, StatusBadge } from '@/components/ui/enterprise'
import { Users2, ShieldCheck, TrendingUp } from 'lucide-react'

export default function ConsortiaDetailPage() {
  const params = useParams()
  const router = useRouter()
  const { user, loading } = useAuth()
  const consortiaId = params.id as string

  const consortium = MOCK_CONSORTIA.find((c) => c.id === consortiaId)
  const compliance = consortium ? checkCompliance(consortium) : null

  useEffect(() => {
    if (!loading && !user) {
      router.push('/login')
    }
  }, [user, loading, router])

  if (loading || !user) {
    return <div className="flex min-h-screen items-center justify-center bg-slate-50"><div className="h-12 w-12 animate-spin rounded-full border-2 border-slate-200 border-t-slate-900" /></div>
  }

  if (!consortium || !compliance) {
    return <div className="min-h-screen bg-slate-50"><Navigation /><main className="mx-auto max-w-7xl px-6 py-8"><div className="rounded-3xl border border-slate-200 bg-white p-8 text-center shadow-sm"><p className="text-slate-600">Consortium not found</p><Button className="mt-6" onClick={() => router.push('/consortia')}>Back to consortia</Button></div></main></div>
  }

  const leader = consortium.members.find((m) => m.role === 'leader')

  return (
    <div className="min-h-screen bg-slate-50">
      <Navigation />
      <main className="mx-auto max-w-7xl px-6 py-8">
        <PageHeader eyebrow="Consortium workspace" title={consortium.name} description={consortium.description} actions={<><Button variant="outline">Edit</Button><Button>Update members</Button></>} />

        <div className="mt-8 grid gap-4 md:grid-cols-3">
          <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="flex items-center gap-2 text-sm text-slate-500"><Users2 className="h-4 w-4" /> Total members</div>
            <p className="mt-2 text-3xl font-semibold text-slate-900">{consortium.members.length}</p>
            <div className="mt-4 flex flex-wrap gap-1">{consortium.members.slice(0, 3).map((m) => <span key={m.companyId} className="rounded-full bg-slate-100 px-2 py-1 text-xs font-medium text-slate-700">{m.companyName}</span>)}</div>
          </div>
          <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="flex items-center gap-2 text-sm text-slate-500"><ShieldCheck className="h-4 w-4" /> Local content</div>
            <p className="mt-2 text-3xl font-semibold text-slate-900">{consortium.localContentPercentage}%</p>
            <div className="mt-4 h-2 rounded-full bg-slate-100"><div className={`h-2 rounded-full ${compliance.compliant ? 'bg-emerald-500' : 'bg-amber-500'}`} style={{ width: `${Math.min(100, consortium.localContentPercentage)}%` }} /></div>
          </div>
          <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="flex items-center gap-2 text-sm text-slate-500"><TrendingUp className="h-4 w-4" /> Status</div>
            <p className="mt-2"><StatusBadge status={consortium.status} /></p>
            <p className="mt-4 text-xs text-slate-600">Compliance: <span className={compliance.compliant ? 'text-emerald-600 font-semibold' : 'text-amber-600 font-semibold'}>{compliance.compliant ? 'Compliant' : 'At risk'}</span></p>
          </div>
        </div>

        <div className="mt-8 grid gap-6 xl:grid-cols-[1.1fr_0.9fr]">
          <div className="space-y-6">
            <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
              <SectionHeader title="Member companies" description="Active participants and their contributions" />
              <div className="mt-5 space-y-4">
                {consortium.members.map((member) => {
                  const company = MOCK_COMPANIES.find((c) => c.id === member.companyId)
                  return (
                    <div key={member.companyId} className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                      <div className="flex items-start justify-between gap-3">
                        <div>
                          <div className="flex items-center gap-2">
                            <p className="font-semibold text-slate-900">{member.companyName}</p>
                            {member.role === 'leader' && <span className="rounded-full bg-amber-100 px-2 py-1 text-xs font-semibold text-amber-800">Lead</span>}
                          </div>
                          <p className="mt-1 text-sm text-slate-600">{company?.sector || 'Supplier'}</p>
                        </div>
                        <div className="text-right">
                          <p className="text-sm text-slate-500">Local content</p>
                          <p className="font-semibold text-slate-900">{member.localContent}%</p>
                        </div>
                      </div>
                      <div className="mt-3 flex flex-wrap gap-1">
                        {member.capabilities.map((cap) => <span key={cap} className="rounded-full border border-slate-200 bg-white px-2 py-1 text-xs font-medium text-slate-600">{cap}</span>)}
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>

            <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
              <SectionHeader title="Shared capabilities" description="Combined service offerings for tender bids" />
              <div className="mt-5 flex flex-wrap gap-2">
                {consortium.combinedCapabilities.map((cap) => (
                  <span key={cap} className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-sm font-medium text-slate-700">{cap}</span>
                ))}
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
              <SectionHeader title="Quick actions" description="Manage this consortium" />
              <div className="mt-5 space-y-3">
                <Button className="w-full bg-slate-900 text-white hover:bg-slate-800">Find matching tenders</Button>
                <Button variant="outline" className="w-full">Invite member</Button>
                <Button variant="outline" className="w-full">Download profile</Button>
              </div>
            </div>

            <div className="rounded-3xl border border-slate-200 bg-slate-900 p-6 text-slate-100 shadow-sm">
              <div className="flex items-center gap-2">
                <ShieldCheck className="h-4 w-4 text-[#C78A2C]" />
                <p className="text-sm font-semibold">Compliance status</p>
              </div>
              <div className="mt-4 space-y-3 text-sm">
                <div className="rounded-2xl border border-slate-800 bg-slate-950/70 p-3">
                  <p className="text-slate-300">Required local content: <span className="font-semibold text-slate-100">{compliance.requiredPercentage}%</span></p>
                </div>
                <div className="rounded-2xl border border-slate-800 bg-slate-950/70 p-3">
                  <p className="text-slate-300">Current position: <span className={compliance.compliant ? 'font-semibold text-emerald-400' : 'font-semibold text-amber-400'}>{consortium.localContentPercentage}%</span></p>
                </div>
                {!compliance.compliant && <div className="rounded-2xl border border-slate-800 bg-slate-950/70 p-3"><p className="text-amber-400">Gap to meet: <span className="font-semibold">{compliance.gap}%</span></p></div>}
              </div>
            </div>

            {compliance.recommendations.length > 0 && (
              <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
                <SectionHeader title="Recommendations" description="Steps to strengthen this consortium" />
                <ul className="mt-5 space-y-3">
                  {compliance.recommendations.map((rec, idx) => (
                    <li key={idx} className="flex gap-3 rounded-2xl border border-slate-200 bg-slate-50 p-3 text-sm text-slate-600">
                      <span className="text-slate-900 font-bold flex-shrink-0">{idx + 1}.</span>
                      <span>{rec}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  )
}
