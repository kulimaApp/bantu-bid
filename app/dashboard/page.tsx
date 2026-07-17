'use client'

import Link from 'next/link'
import { useEffect, useMemo, useState } from 'react'
import { useRouter } from 'next/navigation'
import {
  Activity,
  ArrowRight,
  BellRing,
  BriefcaseBusiness,
  CalendarDays,
  ClipboardList,
  FileText,
  Plus,
  ShieldCheck,
  Sparkles,
  TrendingUp,
  Users2,
} from 'lucide-react'

import { useAuth } from '@/lib/AuthContext'
import { Button } from '@/components/ui/button'
import Navigation from '@/components/Navigation'
import { MOCK_COMPANIES, MOCK_CONSORTIA, MOCK_TENDERS } from '@/lib/mockData'
import { getRecommendedTenders } from '@/lib/matching'
import {
  ActionLink,
  ActivityFeed,
  AnalyticsCard,
  ApprovalCard,
  ChartCard,
  ComplianceBadge,
  DocumentCard,
  EnterpriseTable,
  FilterBar,
  MetricCard,
  NotificationPanel,
  PageHeader,
  QuickActionButton,
  SearchBar,
  SectionHeader,
  StatusBadge,
  TenderCard,
  TrendSparkline,
} from '@/components/ui/enterprise'

type TenderFilter = 'all' | 'open' | 'closing_soon' | 'awarded'

const pipelineSteps = [
  { label: 'Draft', count: 3, value: 1240000, progress: 35 },
  { label: 'Published', count: 7, value: 4100000, progress: 72 },
  { label: 'Evaluation', count: 5, value: 2870000, progress: 58 },
  { label: 'Awarded', count: 2, value: 1760000, progress: 84 },
]

const notifications = [
  {
    title: 'Today',
    items: [
      { title: 'Approval request pending', detail: 'Consortium review requires director sign-off', tone: 'warning' as const },
      { title: 'Supplier question received', detail: 'New clarification on local content documentation', tone: 'default' as const },
    ],
  },
  {
    title: 'Yesterday',
    items: [
      { title: 'Compliance renewal due', detail: 'Safety certification expires in 5 days', tone: 'danger' as const },
    ],
  },
  {
    title: 'Earlier',
    items: [{ title: 'Tender deadline reminder', detail: 'Konkola assets package closes tomorrow', tone: 'default' as const }],
  },
]

const activityItems = [
  { title: 'Tender published', description: 'Copper processing package published to verified suppliers.', time: '08:10' },
  { title: 'Supplier registered', description: 'Northstar Logistics completed verification and profile update.', time: '09:45' },
  { title: 'Consortium approved', description: 'Integrated Works consortium received procurement director approval.', time: '11:20' },
  { title: 'Contract signed', description: 'Maintenance agreement was finalised and archived.', time: '14:05' },
]

const complianceItems = [
  { label: 'ESG score', value: '92 / 100', tone: 'success' as const },
  { label: 'S.I. No. 68', value: 'Compliant', tone: 'success' as const },
  { label: 'Safety certifications', value: '3 expiring', tone: 'warning' as const },
  { label: 'Tax clearance', value: 'Pending', tone: 'danger' as const },
]

const supplierActivity = [
  { name: 'Northstar Logistics', verification: 'verified', province: 'Copperbelt', specialization: 'Transport & warehousing', rating: '4.8', activity: 'Uploaded insurance certificate 2h ago' },
  { name: 'Mupeta Civil Works', verification: 'pending', province: 'Lusaka', specialization: 'Roads & earthworks', rating: '4.3', activity: 'Requested tender clarification' },
  { name: 'Apex Safety Systems', verification: 'suspended', province: 'Southern', specialization: 'Safety compliance', rating: '3.9', activity: 'Compliance review overdue' },
]

const documents = [
  { title: 'Tender pack', description: 'Scope, submission criteria and Q&A', meta: 'Updated 2h ago' },
  { title: 'Supplier certificates', description: 'ISO, ESG and tax documents', meta: 'Shared with panel' },
  { title: 'Contract draft', description: 'Award conditions and milestone schedule', meta: 'Version 4.2' },
]

export default function DashboardPage() {
  const { user, loading } = useAuth()
  const router = useRouter()
  const [searchTerm, setSearchTerm] = useState('')
  const [filter, setFilter] = useState<TenderFilter>('all')

  useEffect(() => {
    if (!loading && !user) {
      router.push('/login')
    }
  }, [user, loading, router])

  const company = MOCK_COMPANIES.find((companyItem) => companyItem.id === user?.companyId)
  const userConsortia = MOCK_CONSORTIA.filter((consortium) => consortium.members.some((member) => member.companyId === user?.companyId))
  const recommendations = userConsortia.length > 0 ? getRecommendedTenders(userConsortia[0], MOCK_TENDERS) : []
  const openTenders = MOCK_TENDERS.filter((tender) => tender.status === 'open')
  const closingSoonTenders = MOCK_TENDERS.filter((tender) => tender.status === 'closing_soon')

  const filteredTenders = useMemo(() => {
    const term = searchTerm.toLowerCase()
    return MOCK_TENDERS.filter((tender) => {
      const matchesFilter = filter === 'all' ? true : tender.status === filter
      const matchesSearch = [tender.title, tender.miningSite, tender.sector].some((value) => value.toLowerCase().includes(term))
      return matchesFilter && matchesSearch
    })
  }, [filter, searchTerm])

  const tenderTableRows = filteredTenders.map((tender) => ({
    id: tender.id,
    title: <div><p className="font-semibold text-slate-900">{tender.title}</p><p className="mt-1 text-sm text-slate-500">{tender.miningSite}</p></div>,
    category: <span className="text-slate-600">{tender.sector}</span>,
    budget: <span className="font-semibold text-slate-900">K {tender.budget.toLocaleString()}</span>,
    closing: <span className="text-slate-600">{tender.deadline.toLocaleDateString('en-ZM')}</span>,
    applications: <span className="font-semibold text-slate-900">{Math.max(6, Math.round(tender.budget / 400000))}</span>,
    status: <StatusBadge status={tender.status} />,
    owner: <span className="text-slate-600">{tender.postedBy}</span>,
    actions: <div className="flex items-center gap-2"><Link href={`/tenders/${tender.id}`} className="rounded-full border border-slate-200 bg-white px-2.5 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-slate-700">View</Link><button className="rounded-full border border-slate-200 bg-slate-50 px-2.5 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-slate-700">Export</button></div>,
  }))

  if (loading || !user) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-50">
        <div className="h-12 w-12 animate-spin rounded-full border-2 border-slate-200 border-t-slate-900" />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#F8FAFC]">
      <Navigation />

      <div className="mx-auto flex max-w-7xl gap-6 px-6 py-8 lg:px-8">
        <aside className="hidden w-64 shrink-0 lg:block">
          <div className="sticky top-28 space-y-4">
            <div className="rounded-3xl border border-slate-200 bg-white p-4 shadow-sm">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-[#0B1F35] text-sm font-semibold text-white">BB</div>
                <div>
                  <p className="text-sm font-semibold text-slate-900">{company?.name || 'Mining Company'}</p>
                  <p className="text-xs text-slate-500">Procurement command centre</p>
                </div>
              </div>
              <div className="mt-4 rounded-2xl border border-slate-200 bg-slate-50 p-3 text-sm text-slate-600">
                <div className="flex items-center justify-between">
                  <span className="font-medium">Compliance posture</span>
                  <span className="font-semibold text-emerald-600">92%</span>
                </div>
              </div>
            </div>

            <nav className="rounded-3xl border border-slate-200 bg-white p-3 shadow-sm">
              <p className="px-3 py-2 text-xs font-semibold uppercase tracking-[0.24em] text-slate-400">Workspace</p>
              {[
                ['Overview', '/dashboard'],
                ['Active Tenders', '/tenders'],
                ['Verified Suppliers', '/profile'],
                ['Consortium Requests', '/consortia'],
                ['ESG Dashboard', '/compliance'],
                ['Contracts', '/dashboard'],
                ['Reports', '/dashboard'],
                ['Settings', '/profile'],
              ].map(([label, href]) => (
                <Link key={label} href={href as string} className="mt-1 flex items-center justify-between rounded-2xl px-3 py-2 text-sm font-medium text-slate-600 transition hover:bg-slate-50 hover:text-slate-900">
                  <span>{label}</span>
                  <ArrowRight className="h-4 w-4 text-slate-400" />
                </Link>
              ))}
            </nav>
          </div>
        </aside>

        <main className="flex-1">
          <PageHeader
            eyebrow="Mining Company Dashboard"
            title="Mining operations overview"
            description="Manage tenders, supplier relationships, consortiums, compliance, and procurement intelligence from a single secure workspace."
            actions={
              <>
                <QuickActionButton href="/tenders" label="Create Tender" icon={<Plus className="h-4 w-4" />} />
                <QuickActionButton href="/consortia" label="Approve Consortium" icon={<Users2 className="h-4 w-4" />} />
                <QuickActionButton href="/compliance" label="Generate Report" icon={<FileText className="h-4 w-4" />} />
              </>
            }
          />

          <div className="mt-6 flex flex-wrap items-center justify-between gap-3 rounded-3xl border border-slate-200 bg-white px-4 py-3 shadow-sm">
            <div className="flex items-center gap-2 text-sm text-slate-600">
              <ShieldCheck className="h-4 w-4 text-[#C78A2C]" />
              <span>Last updated 2 minutes ago • Audit trail enabled • Role-based access active</span>
            </div>
            <div className="flex items-center gap-2 text-sm font-medium text-slate-700">
              <BellRing className="h-4 w-4" />
              <span>8 approvals pending</span>
            </div>
          </div>

          <div className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            <MetricCard label="Active tenders" value={openTenders.length} trend="3 closing soon" icon={<BriefcaseBusiness className="h-4 w-4" />} accent="navy" />
            <MetricCard label="Pending evaluations" value={closingSoonTenders.length + 2} trend="High priority review" icon={<Activity className="h-4 w-4" />} accent="gold" />
            <MetricCard label="Verified suppliers" value={MOCK_COMPANIES.length} trend="4.8 average rating" icon={<Users2 className="h-4 w-4" />} accent="green" />
            <MetricCard label="Active consortiums" value={userConsortia.length} trend="Cross-functional collaboration" icon={<ClipboardList className="h-4 w-4" />} accent="slate" />
          </div>

          <div className="mt-8 grid gap-6 xl:grid-cols-[1.15fr_0.85fr]">
            <section className="space-y-6">
              <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
                <SectionHeader title="Procurement pipeline" description="Operational oversight across the tender lifecycle" />
                <div className="mt-5 grid gap-3 md:grid-cols-2 xl:grid-cols-4">
                  {pipelineSteps.map((step) => (
                    <div key={step.label} className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                      <div className="flex items-center justify-between gap-3">
                        <p className="text-sm font-semibold text-slate-900">{step.label}</p>
                        <span className="rounded-full bg-white px-2.5 py-1 text-xs font-semibold text-slate-600">{step.count}</span>
                      </div>
                      <p className="mt-3 text-xl font-semibold text-slate-900">K {step.value.toLocaleString()}</p>
                      <div className="mt-3 h-2 rounded-full bg-slate-200">
                        <div className="h-2 rounded-full bg-[#0B1F35]" style={{ width: `${step.progress}%` }} />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
                <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
                  <SectionHeader title="Active tender table" description="Search, filter and act on live procurement activity" />
                  <div className="flex flex-col gap-3 sm:flex-row">
                    <SearchBar value={searchTerm} onChange={setSearchTerm} placeholder="Search tenders" />
                    <FilterBar filters={[{ label: 'All', value: 'all' }, { label: 'Open', value: 'open' }, { label: 'Closing', value: 'closing_soon' }, { label: 'Awarded', value: 'awarded' }]} activeValue={filter} onChange={(value) => setFilter(value as TenderFilter)} />
                  </div>
                </div>
                <div className="mt-5">
                  <EnterpriseTable columns={[{ key: 'id', label: 'Tender ID' }, { key: 'title', label: 'Tender Title' }, { key: 'category', label: 'Category' }, { key: 'budget', label: 'Budget' }, { key: 'closing', label: 'Closing Date' }, { key: 'applications', label: 'Applications' }, { key: 'status', label: 'Status' }, { key: 'owner', label: 'Assigned Officer' }, { key: 'actions', label: 'Actions' }]} rows={tenderTableRows} emptyMessage="No tenders match the selected filters." />
                </div>
              </div>
            </section>

            <aside className="space-y-6">
              <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
                <SectionHeader title="Compliance center" description="Critical controls and deadlines" />
                <div className="mt-5 space-y-3">
                  {complianceItems.map((item) => (
                    <ComplianceBadge key={item.label} label={item.label} value={item.value} tone={item.tone} />
                  ))}
                </div>
              </div>

              <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
                <SectionHeader title="Approvals" description="Actions requiring attention" />
                <div className="mt-5 space-y-3">
                  <ApprovalCard title="Consortium request" description="Northstar + Apex joint bid pending review" />
                  <ApprovalCard title="Supplier application" description="Three new suppliers need onboarding checks" />
                </div>
              </div>

              <div className="rounded-3xl border border-slate-200 bg-slate-900 p-6 text-slate-100 shadow-sm">
                <div className="flex items-center gap-2">
                  <Sparkles className="h-4 w-4 text-[#C78A2C]" />
                  <p className="text-sm font-semibold">Smart procurement insights</p>
                </div>
                <div className="mt-4 space-y-3 text-sm text-slate-300">
                  <div className="rounded-2xl border border-slate-800 bg-slate-950/70 p-3">Recommended suppliers matched to the next tender window.</div>
                  <div className="rounded-2xl border border-slate-800 bg-slate-950/70 p-3">Risk alerts are trending down after recent compliance updates.</div>
                  <div className="rounded-2xl border border-slate-800 bg-slate-950/70 p-3">Budget utilization remains within approved thresholds.</div>
                </div>
              </div>
            </aside>
          </div>

          <div className="mt-8 grid gap-6 xl:grid-cols-[1.1fr_0.9fr]">
            <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
              <SectionHeader title="Procurement intelligence" description="Operational performance and spend patterns" />
              <div className="mt-5 grid gap-4 md:grid-cols-2">
                <ChartCard title="Monthly spend" description="Procurement expenditure trend" value="K 12.4M">
                  <TrendSparkline data={[24, 28, 32, 30, 35, 40]} color="#0B1F35" />
                </ChartCard>
                <ChartCard title="Supplier participation" description="Registered suppliers per month" value="+18%">
                  <div className="flex items-end gap-2 pt-2">
                    {[42, 58, 53, 69, 74, 81].map((value, index) => (
                      <div key={value} className="flex-1 rounded-t-xl bg-slate-100" style={{ height: `${value / 1.2}px` }}>
                        <div className="h-full rounded-t-xl bg-[#0B1F35]" style={{ height: `${(value / 90) * 100}%` }} />
                      </div>
                    ))}
                  </div>
                </ChartCard>
                <ChartCard title="Average response time" description="Supplier cycle times" value="4.2 days">
                  <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4 text-sm text-slate-600">Average response time improved by 12% after the latest onboarding workflow.</div>
                </ChartCard>
                <ChartCard title="Budget utilization" description="Current approved usage" value="84%">
                  <div className="mt-2 flex items-center gap-3">
                    <div className="h-3 flex-1 rounded-full bg-slate-200">
                      <div className="h-3 rounded-full bg-[#0E8A62]" style={{ width: '84%' }} />
                    </div>
                    <span className="text-sm font-semibold text-slate-700">K 8.4M / K 10M</span>
                  </div>
                </ChartCard>
              </div>
            </div>

            <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
              <SectionHeader title="Notifications" description="Field and executive updates" />
              <div className="mt-5">
                <NotificationPanel groups={notifications} />
              </div>
            </div>
          </div>

          <div className="mt-8 grid gap-6 xl:grid-cols-[1.05fr_0.95fr]">
            <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
              <SectionHeader title="Supplier activity" description="Recent supplier behaviour and verification health" />
              <div className="mt-5 grid gap-3">
                {supplierActivity.map((supplier) => (
                  <div key={supplier.name} className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <p className="text-sm font-semibold text-slate-900">{supplier.name}</p>
                        <p className="mt-1 text-sm text-slate-600">{supplier.specialization}</p>
                      </div>
                      <StatusBadge status={supplier.verification} />
                    </div>
                    <div className="mt-3 flex flex-wrap gap-3 text-sm text-slate-600">
                      <span>{supplier.province}</span>
                      <span>•</span>
                      <span>Rating {supplier.rating}</span>
                    </div>
                    <p className="mt-3 text-sm text-slate-500">{supplier.activity}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-6">
              <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
                <SectionHeader title="Consortium workspace" description="Active collaboration and document readiness" />
                <div className="mt-5 space-y-3">
                  {MOCK_CONSORTIA.slice(0, 2).map((consortium) => (
                    <div key={consortium.id} className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                      <div className="flex items-start justify-between gap-3">
                        <div>
                          <p className="text-sm font-semibold text-slate-900">{consortium.name}</p>
                          <p className="mt-1 text-sm text-slate-600">{consortium.members.length} members • {consortium.combinedCapabilities.slice(0, 2).join(', ')}</p>
                        </div>
                        <StatusBadge status={consortium.status} />
                      </div>
                      <div className="mt-3 flex flex-wrap gap-2">
                        <span className="rounded-full bg-white px-2.5 py-1 text-xs font-medium text-slate-600">Compliance healthy</span>
                        <span className="rounded-full bg-white px-2.5 py-1 text-xs font-medium text-slate-600">Tender assigned</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
                <SectionHeader title="Documents center" description="Contracts, certificates and evidence packs" />
                <div className="mt-5 space-y-3">
                  {documents.map((document) => (
                    <DocumentCard key={document.title} title={document.title} description={document.description} meta={document.meta} />
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="mt-8 grid gap-6 xl:grid-cols-[1.05fr_0.95fr]">
            <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
              <SectionHeader title="Recent activity" description="Operational timeline for the last 24 hours" />
              <div className="mt-5">
                <ActivityFeed items={activityItems} />
              </div>
            </div>

            <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
              <SectionHeader title="Upcoming deadlines" description="Calendar-driven procurement milestones" />
              <div className="mt-5 space-y-3">
                <div className="flex items-center justify-between rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3">
                  <div className="flex items-center gap-3">
                    <div className="rounded-2xl bg-white p-2 text-slate-700"><CalendarDays className="h-4 w-4" /></div>
                    <div><p className="text-sm font-semibold text-slate-900">Tender closure</p><p className="text-sm text-slate-600">Konkola equipment package</p></div>
                  </div>
                  <span className="text-sm font-semibold text-slate-700">Tomorrow</span>
                </div>
                <div className="flex items-center justify-between rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3">
                  <div className="flex items-center gap-3">
                    <div className="rounded-2xl bg-white p-2 text-slate-700"><CalendarDays className="h-4 w-4" /></div>
                    <div><p className="text-sm font-semibold text-slate-900">Compliance renewal</p><p className="text-sm text-slate-600">Safety certificates review</p></div>
                  </div>
                  <span className="text-sm font-semibold text-slate-700">5 days</span>
                </div>
                <div className="flex items-center justify-between rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3">
                  <div className="flex items-center gap-3">
                    <div className="rounded-2xl bg-white p-2 text-slate-700"><CalendarDays className="h-4 w-4" /></div>
                    <div><p className="text-sm font-semibold text-slate-900">Supplier meeting</p><p className="text-sm text-slate-600">Northstar Logistics onboarding</p></div>
                  </div>
                  <span className="text-sm font-semibold text-slate-700">Next week</span>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}
