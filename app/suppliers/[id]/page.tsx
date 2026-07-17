'use client'

import { useParams, useRouter } from 'next/navigation'
import { useAuth } from '@/lib/AuthContext'
import { useEffect } from 'react'
import { Button } from '@/components/ui/button'
import Navigation from '@/components/Navigation'
import { MOCK_COMPANIES } from '@/lib/mockData'
import { PageHeader, SectionHeader, MetricCard } from '@/components/ui/enterprise'
import { Globe, Mail, Phone, MapPin, Users, BadgeCheck } from 'lucide-react'

export default function SupplierDetailPage() {
  const params = useParams()
  const router = useRouter()
  const { user, loading } = useAuth()
  const supplierId = params.id as string

  const supplier = MOCK_COMPANIES.find((s) => s.id === supplierId)

  useEffect(() => {
    if (!loading && !user) {
      router.push('/login')
    }
  }, [user, loading, router])

  if (loading || !user) {
    return <div className="flex min-h-screen items-center justify-center bg-slate-50"><div className="h-12 w-12 animate-spin rounded-full border-2 border-slate-200 border-t-slate-900" /></div>
  }

  if (!supplier) {
    return <div className="min-h-screen bg-slate-50"><Navigation /><main className="mx-auto max-w-7xl px-6 py-8"><div className="rounded-3xl border border-slate-200 bg-white p-8 text-center shadow-sm"><p className="text-slate-600">Supplier not found</p><Button className="mt-6" onClick={() => router.push('/suppliers')}>Back to suppliers</Button></div></main></div>
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <Navigation />
      <main className="mx-auto max-w-7xl px-6 py-8">
        <PageHeader eyebrow="Supplier profile" title={supplier.name} description={supplier.description} actions={<><Button variant="outline">Contact</Button><Button>Add to consortium</Button></>} />

        <div className="mt-8 grid gap-4 md:grid-cols-3">
          <MetricCard label="Local content" value={`${supplier.localContentPercentage}%`} trend="Meeting threshold" icon={<BadgeCheck className="h-4 w-4" />} accent="green" />
          <MetricCard label="Employees" value={supplier.employees.toString()} trend="Established team" icon={<Users className="h-4 w-4" />} accent="navy" />
          <MetricCard label="Certifications" value={supplier.certifications.length.toString()} trend="Verified" icon={<BadgeCheck className="h-4 w-4" />} accent="gold" />
        </div>

        <div className="mt-8 grid gap-6 xl:grid-cols-[1.1fr_0.9fr]">
          <div className="space-y-6">
            <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
              <SectionHeader title="Company overview" description="Operational profile and regulatory standing" />
              <div className="mt-5 grid gap-4 md:grid-cols-2">
                <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                  <p className="text-sm text-slate-500">Sector</p>
                  <p className="mt-2 font-semibold text-slate-900">{supplier.sector}</p>
                </div>
                <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                  <p className="text-sm text-slate-500">Location</p>
                  <p className="mt-2 font-semibold text-slate-900">{supplier.location}</p>
                </div>
                <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                  <p className="text-sm text-slate-500">Registration number</p>
                  <p className="mt-2 font-semibold text-slate-900">{supplier.registrationNumber}</p>
                </div>
                <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                  <p className="text-sm text-slate-500">Team size</p>
                  <p className="mt-2 font-semibold text-slate-900">{supplier.employees} employees</p>
                </div>
              </div>
            </div>

            <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
              <SectionHeader title="Core capabilities" description="Services this supplier can deliver" />
              <div className="mt-5 flex flex-wrap gap-2">
                {supplier.capabilities.map((cap) => (
                  <span key={cap} className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-sm font-medium text-slate-700">
                    {cap}
                  </span>
                ))}
              </div>
            </div>

            <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
              <SectionHeader title="Verified credentials" description="Certifications and compliance documents" />
              <div className="mt-5 flex flex-wrap gap-2">
                {supplier.certifications.map((cert) => (
                  <span key={cert} className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-sm font-medium text-slate-700">
                    <BadgeCheck className="h-3 w-3 inline mr-1" />
                    {cert}
                  </span>
                ))}
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
              <SectionHeader title="Contact information" description="Reach out to this supplier" />
              <div className="mt-5 space-y-4">
                <div>
                  <p className="text-sm text-slate-500">Primary contact</p>
                  <p className="mt-1 font-semibold text-slate-900">{supplier.contactPerson}</p>
                </div>
                <div className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-slate-50 p-3">
                  <Mail className="h-4 w-4 text-slate-600" />
                  <a href={`mailto:${supplier.contactEmail}`} className="text-sm font-medium text-slate-700 hover:text-slate-900">
                    {supplier.contactEmail}
                  </a>
                </div>
                <div className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-slate-50 p-3">
                  <Phone className="h-4 w-4 text-slate-600" />
                  <a href={`tel:${supplier.contactPhone}`} className="text-sm font-medium text-slate-700 hover:text-slate-900">
                    {supplier.contactPhone}
                  </a>
                </div>
                {supplier.website && (
                  <div className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-slate-50 p-3">
                    <Globe className="h-4 w-4 text-slate-600" />
                    <a href={supplier.website} target="_blank" rel="noopener noreferrer" className="text-sm font-medium text-slate-700 hover:text-slate-900 truncate">
                      {supplier.website}
                    </a>
                  </div>
                )}
              </div>
            </div>

            <div className="rounded-3xl border border-slate-200 bg-slate-900 p-6 text-slate-100 shadow-sm">
              <div className="flex items-center gap-2 mb-4">
                <BadgeCheck className="h-4 w-4 text-[#C78A2C]" />
                <p className="text-sm font-semibold">Compliance strength</p>
              </div>
              <div className="space-y-3 text-sm">
                <div className="rounded-2xl border border-slate-800 bg-slate-950/70 p-3">
                  <p className="text-slate-300">Local content position</p>
                  <p className="mt-1 font-semibold text-emerald-400">{supplier.localContentPercentage}% verified</p>
                </div>
                <div className="rounded-2xl border border-slate-800 bg-slate-950/70 p-3">
                  <p className="text-slate-300">Status</p>
                  <p className="mt-1 font-semibold text-emerald-400">Fully compliant</p>
                </div>
              </div>
            </div>

            <div className="space-y-3">
              <Button className="w-full bg-slate-900 text-white hover:bg-slate-800">Add to consortium</Button>
              <Button variant="outline" className="w-full">Request proposal</Button>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
