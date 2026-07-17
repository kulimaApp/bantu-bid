'use client'

import Link from 'next/link'
import { useState, useEffect } from 'react'
import { useAuth } from '@/lib/AuthContext'
import { useRouter } from 'next/navigation'
import { Search as SearchIcon, Filter, MapPin, Users, TrendingUp } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import Navigation from '@/components/Navigation'
import { MOCK_COMPANIES } from '@/lib/mockData'
import { PageHeader, SectionHeader } from '@/components/ui/enterprise'

export default function SuppliersPage() {
  const { user, loading } = useAuth()
  const router = useRouter()
  const [search, setSearch] = useState('')
  const [sectorFilter, setSectorFilter] = useState('all')
  const [locationFilter, setLocationFilter] = useState('all')
  const [filteredSuppliers, setFilteredSuppliers] = useState(MOCK_COMPANIES)

  useEffect(() => {
    if (!loading && !user) {
      router.push('/login')
    }
  }, [user, loading, router])

  useEffect(() => {
    let results = MOCK_COMPANIES
    if (search) {
      results = results.filter((s) => s.name.toLowerCase().includes(search.toLowerCase()) || s.sector.toLowerCase().includes(search.toLowerCase()))
    }
    if (sectorFilter !== 'all') results = results.filter((s) => s.sector === sectorFilter)
    if (locationFilter !== 'all') results = results.filter((s) => s.location === locationFilter)
    setFilteredSuppliers(results)
  }, [search, sectorFilter, locationFilter])

  if (loading || !user) {
    return <div className="flex min-h-screen items-center justify-center bg-slate-50"><div className="h-12 w-12 animate-spin rounded-full border-2 border-slate-200 border-t-slate-900" /></div>
  }

  const sectors = Array.from(new Set(MOCK_COMPANIES.map((s) => s.sector)))
  const locations = Array.from(new Set(MOCK_COMPANIES.map((s) => s.location)))

  return (
    <div className="min-h-screen bg-slate-50">
      <Navigation />
      <main className="mx-auto max-w-7xl px-6 py-8">
        <PageHeader eyebrow="Procurement workspace" title="Verified suppliers" description="Browse and connect with vetted suppliers across the mining sector with transparent local content data." actions={<Button>Invite supplier</Button>} />

        <div className="mt-8 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
          <SectionHeader title="Filters" description="Refine by sector, location, and capabilities" action={<div className="flex items-center gap-2 text-sm text-slate-500"><Filter className="h-4 w-4" /> {filteredSuppliers.length} results</div>} />
          <div className="mt-5 grid gap-4 lg:grid-cols-4">
            <div className="lg:col-span-2">
              <label className="mb-2 block text-sm font-medium text-slate-700">Search</label>
              <div className="flex items-center gap-2 rounded-2xl border border-slate-200 bg-slate-50 px-3 py-2">
                <SearchIcon className="h-4 w-4 text-slate-400" />
                <Input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search by name or sector" className="border-0 bg-transparent px-0 shadow-none" />
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
              <label className="mb-2 block text-sm font-medium text-slate-700">Location</label>
              <select value={locationFilter} onChange={(e) => setLocationFilter(e.target.value)} className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-3 py-2 text-sm text-slate-700">
                <option value="all">All locations</option>
                {locations.map((loc) => <option key={loc} value={loc}>{loc}</option>)}
              </select>
            </div>
          </div>
        </div>

        <div className="mt-8 grid gap-4 lg:grid-cols-2">
          {filteredSuppliers.map((supplier) => (
            <Link key={supplier.id} href={`/suppliers/${supplier.id}`}>
              <div className="group h-full rounded-3xl border border-slate-200 bg-white p-6 shadow-sm transition hover:shadow-md hover:border-slate-300">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <h3 className="text-lg font-semibold text-slate-900 group-hover:text-slate-700">{supplier.name}</h3>
                    <p className="mt-1 text-sm text-slate-600">{supplier.sector}</p>
                  </div>
                  <span className="rounded-full bg-emerald-100 px-3 py-1 text-xs font-semibold text-emerald-800">Verified</span>
                </div>

                <div className="mt-4 flex flex-wrap gap-2">
                  {supplier.capabilities.slice(0, 3).map((cap) => (
                    <span key={cap} className="rounded-full border border-slate-200 bg-slate-50 px-2.5 py-1 text-xs font-medium text-slate-700">
                      {cap}
                    </span>
                  ))}
                  {supplier.capabilities.length > 3 && <span className="rounded-full border border-slate-200 bg-slate-50 px-2.5 py-1 text-xs font-medium text-slate-600">+{supplier.capabilities.length - 3}</span>}
                </div>

                <div className="mt-4 grid gap-3 sm:grid-cols-3">
                  <div className="rounded-2xl border border-slate-200 bg-slate-50 p-3">
                    <div className="flex items-center gap-2 text-xs text-slate-500"><MapPin className="h-3 w-3" /> Location</div>
                    <p className="mt-1 text-sm font-semibold text-slate-900">{supplier.location}</p>
                  </div>
                  <div className="rounded-2xl border border-slate-200 bg-slate-50 p-3">
                    <div className="flex items-center gap-2 text-xs text-slate-500"><Users className="h-3 w-3" /> Team</div>
                    <p className="mt-1 text-sm font-semibold text-slate-900">{supplier.employees}</p>
                  </div>
                  <div className="rounded-2xl border border-slate-200 bg-slate-50 p-3">
                    <div className="flex items-center gap-2 text-xs text-slate-500"><TrendingUp className="h-3 w-3" /> Local content</div>
                    <p className="mt-1 text-sm font-semibold text-slate-900">{supplier.localContentPercentage}%</p>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </main>
    </div>
  )
}
