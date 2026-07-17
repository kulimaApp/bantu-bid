'use client'

import Link from 'next/link'
import { useState, useEffect } from 'react'
import { useAuth } from '@/lib/AuthContext'
import { useRouter } from 'next/navigation'
import { Filter, Search as SearchIcon } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import Navigation from '@/components/Navigation'
import { MOCK_TENDERS } from '@/lib/mockData'
import { Tender } from '@/lib/types'
import { PageHeader, SectionHeader, StatusBadge } from '@/components/ui/enterprise'

export default function TendersPage() {
  const { user, loading } = useAuth()
  const router = useRouter()
  const [search, setSearch] = useState('')
  const [sectorFilter, setSectorFilter] = useState('all')
  const [statusFilter, setStatusFilter] = useState('all')
  const [minBudget, setMinBudget] = useState('0')
  const [filteredTenders, setFilteredTenders] = useState<Tender[]>(MOCK_TENDERS)

  useEffect(() => {
    if (!loading && !user) {
      router.push('/login')
    }
  }, [user, loading, router])

  useEffect(() => {
    let results = MOCK_TENDERS
    if (search) {
      results = results.filter((t) => t.title.toLowerCase().includes(search.toLowerCase()) || t.description.toLowerCase().includes(search.toLowerCase()) || t.miningSite.toLowerCase().includes(search.toLowerCase()))
    }
    if (sectorFilter !== 'all') results = results.filter((t) => t.sector === sectorFilter)
    if (statusFilter !== 'all') results = results.filter((t) => t.status === statusFilter)
    results = results.filter((t) => t.budget >= parseInt(minBudget || '0'))
    setFilteredTenders(results)
  }, [search, sectorFilter, statusFilter, minBudget])

  if (loading || !user) {
    return <div className="flex min-h-screen items-center justify-center bg-slate-50"><div className="h-12 w-12 animate-spin rounded-full border-2 border-slate-200 border-t-slate-900" /></div>
  }

  const sectors = Array.from(new Set(MOCK_TENDERS.map((t) => t.sector)))
  const statusOptions = ['open', 'closing_soon', 'closed', 'awarded'] as const

  return (
    <div className="min-h-screen bg-slate-50">
      <Navigation />
      <main className="mx-auto max-w-7xl px-6 py-8">
        <PageHeader eyebrow="Procurement workspace" title="Tender pipeline" description="Search, assess, and prioritise procurement opportunities with a structured enterprise view." actions={<Button>Export list</Button>} />

        <div className="mt-8 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
          <SectionHeader title="Filters" description="Refine by sector, status and budget" action={<div className="flex items-center gap-2 text-sm text-slate-500"><Filter className="h-4 w-4" /> Live results</div>} />
          <div className="mt-5 grid gap-4 lg:grid-cols-5">
            <div className="lg:col-span-2">
              <label className="mb-2 block text-sm font-medium text-slate-700">Search</label>
              <div className="flex items-center gap-2 rounded-2xl border border-slate-200 bg-slate-50 px-3 py-2">
                <SearchIcon className="h-4 w-4 text-slate-400" />
                <Input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search by title or site" className="border-0 bg-transparent px-0 shadow-none" />
              </div>
            </div>
            <div>
              <label className="mb-2 block text-sm font-medium text-slate-700">Sector</label>
              <select value={sectorFilter} onChange={(e) => setSectorFilter(e.target.value)} className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-3 py-2 text-sm text-slate-700">
                <option value="all">All sectors</option>
                {sectors.map((sector) => <option key={sector} value={sector}>{sector}</option>)}
              </select>
            </div>
            <div>
              <label className="mb-2 block text-sm font-medium text-slate-700">Status</label>
              <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)} className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-3 py-2 text-sm text-slate-700">
                <option value="all">All statuses</option>
                {statusOptions.map((status) => <option key={status} value={status}>{status === 'closing_soon' ? 'Closing soon' : status.charAt(0).toUpperCase() + status.slice(1)}</option>)}
              </select>
            </div>
            <div>
              <label className="mb-2 block text-sm font-medium text-slate-700">Min budget (K)</label>
              <Input type="number" value={minBudget} onChange={(e) => setMinBudget(e.target.value)} placeholder="0" className="w-full" />
            </div>
          </div>
        </div>

        <div className="mt-8 space-y-4">
          {filteredTenders.map((tender) => (
            <div key={tender.id} className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
              <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
                <div>
                  <div className="flex flex-wrap items-center gap-3">
                    <h2 className="text-xl font-semibold text-slate-900">{tender.title}</h2>
                    <StatusBadge status={tender.status} />
                  </div>
                  <p className="mt-2 max-w-2xl text-sm text-slate-600">{tender.description}</p>
                </div>
                <Link href={`/tenders/${tender.id}`}><Button className="bg-slate-900 text-white hover:bg-slate-800">Review</Button></Link>
              </div>
              <div className="mt-5 grid gap-4 md:grid-cols-4">
                <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4"><p className="text-xs uppercase tracking-[0.2em] text-slate-500">Mining site</p><p className="mt-2 font-semibold text-slate-900">{tender.miningSite}</p></div>
                <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4"><p className="text-xs uppercase tracking-[0.2em] text-slate-500">Budget</p><p className="mt-2 font-semibold text-slate-900">K{(tender.budget / 1000000).toFixed(1)}M</p></div>
                <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4"><p className="text-xs uppercase tracking-[0.2em] text-slate-500">Local content</p><p className="mt-2 font-semibold text-slate-900">{tender.minLocalContent}%</p></div>
                <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4"><p className="text-xs uppercase tracking-[0.2em] text-slate-500">Deadline</p><p className="mt-2 font-semibold text-slate-900">{tender.deadline.toLocaleDateString()}</p></div>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  )
}
