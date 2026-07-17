'use client'

import { useRouter } from 'next/navigation'
import { useAuth } from '@/lib/AuthContext'
import { useEffect } from 'react'
import Navigation from '@/components/Navigation'
import { Button } from '@/components/ui/button'
import { PageHeader, SectionHeader, MetricCard } from '@/components/ui/enterprise'
import { MOCK_TENDERS, MOCK_COMPANIES, MOCK_CONSORTIA } from '@/lib/mockData'
import { BarChart3, PieChart, TrendingUp, Download } from 'lucide-react'

export default function ReportsPage() {
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

  const totalBudget = MOCK_TENDERS.reduce((sum, t) => sum + t.budget, 0)
  const openTenders = MOCK_TENDERS.filter((t) => t.status === 'open').length
  const verifiedSuppliers = MOCK_COMPANIES.length
  const activeConsortia = MOCK_CONSORTIA.length

  return (
    <div className="min-h-screen bg-slate-50">
      <Navigation />
      <main className="mx-auto max-w-7xl px-6 py-8">
        <PageHeader eyebrow="Analytics center" title="Procurement reports" description="Comprehensive insights into procurement activity, supplier performance, and tender metrics." actions={<Button className="gap-2"><Download className="h-4 w-4" /> Export report</Button>} />

        <div className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          <MetricCard label="Total tender value" value={`K ${(totalBudget / 1000000).toFixed(1)}M`} trend="Year to date" icon={<TrendingUp className="h-4 w-4" />} accent="navy" />
          <MetricCard label="Open tenders" value={openTenders} trend="Active opportunities" icon={<BarChart3 className="h-4 w-4" />} accent="gold" />
          <MetricCard label="Verified suppliers" value={verifiedSuppliers} trend="Registered & active" icon={<PieChart className="h-4 w-4" />} accent="green" />
          <MetricCard label="Active consortia" value={activeConsortia} trend="Collaborative groups" icon={<BarChart3 className="h-4 w-4" />} accent="slate" />
        </div>

        <div className="mt-8 grid gap-6 xl:grid-cols-2">
          <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
            <SectionHeader title="Tender distribution by status" description="Pipeline overview across all procurement stages" />
            <div className="mt-5 space-y-3">
              {[
                { label: 'Open', count: openTenders, color: 'bg-emerald-500' },
                { label: 'Closing soon', count: MOCK_TENDERS.filter((t) => t.status === 'closing_soon').length, color: 'bg-amber-500' },
                { label: 'Closed', count: MOCK_TENDERS.filter((t) => t.status === 'closed').length, color: 'bg-slate-500' },
                { label: 'Awarded', count: MOCK_TENDERS.filter((t) => t.status === 'awarded').length, color: 'bg-blue-500' },
              ].map((item) => (
                <div key={item.label} className="flex items-center justify-between rounded-2xl border border-slate-200 bg-slate-50 p-4">
                  <div className="flex items-center gap-3">
                    <div className={`h-3 w-3 rounded-full ${item.color}`} />
                    <span className="text-sm font-medium text-slate-700">{item.label}</span>
                  </div>
                  <span className="font-semibold text-slate-900">{item.count}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
            <SectionHeader title="Supplier sector breakdown" description="Companies by industry specialization" />
            <div className="mt-5 space-y-3">
              {Array.from(new Set(MOCK_COMPANIES.map((c) => c.sector)))
                .map((sector) => ({
                  sector,
                  count: MOCK_COMPANIES.filter((c) => c.sector === sector).length,
                }))
                .sort((a, b) => b.count - a.count)
                .map((item) => (
                  <div key={item.sector} className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium text-slate-700">{item.sector}</span>
                      <span className="font-semibold text-slate-900">{item.count}</span>
                    </div>
                    <div className="mt-2 h-2 rounded-full bg-slate-200">
                      <div className="h-2 rounded-full bg-slate-900" style={{ width: `${(item.count / MOCK_COMPANIES.length) * 100}%` }} />
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </div>

        <div className="mt-8 grid gap-6 xl:grid-cols-2">
          <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
            <SectionHeader title="Budget analysis" description="Tender values and distribution" />
            <div className="mt-5 space-y-4">
              <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                <div className="flex items-center justify-between text-sm text-slate-600 mb-2">
                  <span>Total budget allocated</span>
                  <span className="font-semibold text-slate-900">K {(totalBudget / 1000000).toFixed(1)}M</span>
                </div>
                <div className="h-2 rounded-full bg-slate-200">
                  <div className="h-2 rounded-full bg-slate-900" style={{ width: '65%' }} />
                </div>
              </div>
              <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                <div className="flex items-center justify-between text-sm text-slate-600 mb-2">
                  <span>Average tender value</span>
                  <span className="font-semibold text-slate-900">K {(totalBudget / MOCK_TENDERS.length / 1000000).toFixed(1)}M</span>
                </div>
              </div>
            </div>
          </div>

          <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
            <SectionHeader title="Compliance metrics" description="Local content and regulatory alignment" />
            <div className="mt-5 space-y-4">
              <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                <div className="flex items-center justify-between text-sm text-slate-600 mb-2">
                  <span>Average local content</span>
                  <span className="font-semibold text-slate-900">{Math.round(MOCK_COMPANIES.reduce((sum, c) => sum + c.localContentPercentage, 0) / MOCK_COMPANIES.length)}%</span>
                </div>
                <div className="h-2 rounded-full bg-slate-200">
                  <div className="h-2 rounded-full bg-emerald-500" style={{ width: '82%' }} />
                </div>
              </div>
              <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                <div className="flex items-center justify-between text-sm text-slate-600 mb-2">
                  <span>Compliant consortia</span>
                  <span className="font-semibold text-slate-900">{MOCK_CONSORTIA.filter((c) => c.localContentPercentage >= 70).length} / {MOCK_CONSORTIA.length}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
