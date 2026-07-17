import Link from 'next/link'
import type { ReactNode } from 'react'
import {
  ArrowRight,
  BadgeCheck,
  CircleAlert,
  Clock3,
  Download,
  Eye,
  FileCheck2,
  FileText,
  Filter,
  Search,
  ShieldCheck,
  Sparkles,
  UserRoundCheck,
} from 'lucide-react'

import { cn } from '@/lib/utils'

interface PageHeaderProps {
  title: string
  description?: string
  eyebrow?: string
  actions?: ReactNode
}

export function PageHeader({ title, description, eyebrow, actions }: PageHeaderProps) {
  return (
    <div className="flex flex-col gap-4 border-b border-slate-200 pb-6 lg:flex-row lg:items-end lg:justify-between">
      <div>
        {eyebrow ? (
          <p className="mb-2 text-sm font-semibold uppercase tracking-[0.24em] text-slate-500">{eyebrow}</p>
        ) : null}
        <h1 className="text-3xl font-semibold tracking-tight text-slate-900">{title}</h1>
        {description ? <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-600">{description}</p> : null}
      </div>
      {actions ? <div className="flex flex-wrap items-center gap-3">{actions}</div> : null}
    </div>
  )
}

interface SectionHeaderProps {
  title: string
  description?: string
  action?: ReactNode
}

export function SectionHeader({ title, description, action }: SectionHeaderProps) {
  return (
    <div className="flex items-start justify-between gap-3">
      <div>
        <h2 className="text-lg font-semibold text-slate-900">{title}</h2>
        {description ? <p className="mt-1 text-sm text-slate-600">{description}</p> : null}
      </div>
      {action ? <div>{action}</div> : null}
    </div>
  )
}

interface MetricCardProps {
  label: string
  value: string | number
  trend?: string
  icon?: ReactNode
  accent?: 'navy' | 'gold' | 'green' | 'slate'
  href?: string
}

export function MetricCard({ label, value, trend, icon, accent = 'slate', href }: MetricCardProps) {
  const accentClasses = {
    navy: 'border-slate-200 bg-white text-slate-900',
    gold: 'border-[#F3E4BF] bg-[#FFF8E8] text-slate-900',
    green: 'border-emerald-100 bg-emerald-50 text-slate-900',
    slate: 'border-slate-200 bg-white text-slate-900',
  }

  const content = (
    <div className={cn('rounded-2xl border p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md', accentClasses[accent])}>
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-sm font-medium text-slate-600">{label}</p>
          <p className="mt-3 text-3xl font-semibold tracking-tight text-slate-900">{value}</p>
        </div>
        {icon ? <div className="rounded-xl bg-slate-100 p-2 text-slate-700">{icon}</div> : null}
      </div>
      {trend ? <p className="mt-4 text-sm font-medium text-slate-600">{trend}</p> : null}
    </div>
  )

  if (href) {
    return <Link href={href}>{content}</Link>
  }

  return content
}

interface StatusBadgeProps {
  status: string
  className?: string
}

export function StatusBadge({ status, className }: StatusBadgeProps) {
  const normalized = status.toLowerCase()
  const config = {
    verified: { label: 'Verified', className: 'bg-emerald-50 text-emerald-700 ring-emerald-200' },
    pending: { label: 'Pending', className: 'bg-amber-50 text-amber-700 ring-amber-200' },
    rejected: { label: 'Rejected', className: 'bg-rose-50 text-rose-700 ring-rose-200' },
    draft: { label: 'Draft', className: 'bg-slate-100 text-slate-700 ring-slate-200' },
    awarded: { label: 'Awarded', className: 'bg-[#FFF8E8] text-[#A46B00] ring-[#F3E4BF]' },
    active: { label: 'Active', className: 'bg-emerald-50 text-emerald-700 ring-emerald-200' },
    open: { label: 'Open', className: 'bg-emerald-50 text-emerald-700 ring-emerald-200' },
    closing_soon: { label: 'Closing soon', className: 'bg-amber-50 text-amber-700 ring-amber-200' },
    closed: { label: 'Closed', className: 'bg-slate-100 text-slate-700 ring-slate-200' },
    suspended: { label: 'Suspended', className: 'bg-rose-50 text-rose-700 ring-rose-200' },
    expired: { label: 'Expired', className: 'bg-amber-50 text-amber-700 ring-amber-200' },
  } as const

  const resolved = config[normalized as keyof typeof config] ?? config.draft

  return (
    <span className={cn('inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-semibold ring-1 ring-inset', resolved.className, className)}>
      {['verified', 'active', 'open', 'awarded'].includes(normalized) ? <BadgeCheck className="h-3.5 w-3.5" /> : null}
      {['pending', 'closing_soon'].includes(normalized) ? <Clock3 className="h-3.5 w-3.5" /> : null}
      {['rejected', 'suspended'].includes(normalized) ? <CircleAlert className="h-3.5 w-3.5" /> : null}
      {['draft', 'closed', 'expired'].includes(normalized) ? <FileCheck2 className="h-3.5 w-3.5" /> : null}
      {resolved.label}
    </span>
  )
}

interface ActionLinkProps {
  href: string
  label: string
  icon?: ReactNode
}

export function ActionLink({ href, label, icon }: ActionLinkProps) {
  return (
    <Link href={href} className="flex items-center justify-between rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm font-medium text-slate-700 transition hover:border-slate-300 hover:bg-slate-50">
      <span className="flex items-center gap-2">
        {icon ? <span className="text-slate-500">{icon}</span> : <ShieldCheck className="h-4 w-4 text-slate-500" />}
        {label}
      </span>
      <ArrowRight className="h-4 w-4 text-slate-400" />
    </Link>
  )
}

interface SearchBarProps {
  value: string
  onChange: (value: string) => void
  placeholder?: string
}

export function SearchBar({ value, onChange, placeholder = 'Search' }: SearchBarProps) {
  return (
    <label className="flex items-center gap-2 rounded-2xl border border-slate-200 bg-slate-50 px-3 py-2 text-sm text-slate-500">
      <Search className="h-4 w-4" />
      <input value={value} onChange={(event) => onChange(event.target.value)} placeholder={placeholder} className="w-full border-none bg-transparent outline-none placeholder:text-slate-400" />
    </label>
  )
}

interface FilterBarProps {
  filters: Array<{ label: string; value: string }>
  activeValue: string
  onChange: (value: string) => void
}

export function FilterBar({ filters, activeValue, onChange }: FilterBarProps) {
  return (
    <div className="flex flex-wrap items-center gap-2">
      {filters.map((filter) => {
        const active = filter.value === activeValue
        return (
          <button key={filter.value} type="button" onClick={() => onChange(filter.value)} className={cn('rounded-full border px-3 py-1.5 text-sm font-medium transition', active ? 'border-slate-900 bg-slate-900 text-white' : 'border-slate-200 bg-white text-slate-600 hover:border-slate-300 hover:bg-slate-50')}>
            {filter.label}
          </button>
        )
      })}
    </div>
  )
}

interface QuickActionButtonProps {
  href: string
  label: string
  icon?: ReactNode
}

export function QuickActionButton({ href, label, icon }: QuickActionButtonProps) {
  return (
    <Link href={href} className="inline-flex items-center gap-2 rounded-2xl border border-slate-200 bg-white px-3 py-2 text-sm font-medium text-slate-700 transition hover:border-slate-300 hover:bg-slate-50">
      {icon ? <span className="text-slate-500">{icon}</span> : <Sparkles className="h-4 w-4 text-slate-500" />}
      {label}
    </Link>
  )
}

interface EnterpriseTableProps {
  columns: Array<{ key: string; label: string; className?: string }>
  rows: Array<Record<string, ReactNode>>
  emptyMessage?: string
}

export function EnterpriseTable({ columns, rows, emptyMessage = 'No records available.' }: EnterpriseTableProps) {
  if (rows.length === 0) {
    return <div className="rounded-2xl border border-dashed border-slate-200 p-6 text-sm text-slate-600">{emptyMessage}</div>
  }

  return (
    <div className="overflow-hidden rounded-2xl border border-slate-200">
      <table className="min-w-full divide-y divide-slate-200 text-sm">
        <thead className="bg-slate-50">
          <tr>
            {columns.map((column) => (
              <th key={column.key} className={cn('px-4 py-3 text-left font-semibold text-slate-700', column.className)}>{column.label}</th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-200 bg-white">
          {rows.map((row, rowIndex) => (
            <tr key={rowIndex} className="align-top">
              {columns.map((column) => (
                <td key={column.key} className="px-4 py-3 text-slate-600">{row[column.key]}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

interface ActivityFeedProps {
  items: Array<{ title: string; description: string; time: string }>
}

export function ActivityFeed({ items }: ActivityFeedProps) {
  return (
    <div className="space-y-3">
      {items.map((item, index) => (
        <div key={`${item.title}-${index}`} className="flex gap-3 rounded-2xl border border-slate-200 bg-slate-50 p-3">
          <div className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-white text-slate-700">
            <Clock3 className="h-4 w-4" />
          </div>
          <div>
            <p className="text-sm font-semibold text-slate-900">{item.title}</p>
            <p className="mt-1 text-sm text-slate-600">{item.description}</p>
            <p className="mt-2 text-xs font-medium uppercase tracking-[0.2em] text-slate-400">{item.time}</p>
          </div>
        </div>
      ))}
    </div>
  )
}

interface NotificationPanelProps {
  groups: Array<{ title: string; items: Array<{ title: string; detail: string; tone?: 'default' | 'warning' | 'danger' }> }>
}

export function NotificationPanel({ groups }: NotificationPanelProps) {
  return (
    <div className="space-y-4">
      {groups.map((group) => (
        <div key={group.title}>
          <p className="mb-2 text-xs font-semibold uppercase tracking-[0.24em] text-slate-400">{group.title}</p>
          <div className="space-y-2">
            {group.items.map((item, index) => {
              const toneClasses = {
                default: 'border-slate-200 bg-white',
                warning: 'border-amber-200 bg-amber-50',
                danger: 'border-rose-200 bg-rose-50',
              }
              return (
                <div key={`${group.title}-${index}`} className={cn('rounded-2xl border p-3', toneClasses[item.tone ?? 'default'])}>
                  <p className="text-sm font-semibold text-slate-900">{item.title}</p>
                  <p className="mt-1 text-sm text-slate-600">{item.detail}</p>
                </div>
              )
            })}
          </div>
        </div>
      ))}
    </div>
  )
}

interface AnalyticsCardProps {
  title: string
  description?: string
  value?: string
  children?: ReactNode
}

export function AnalyticsCard({ title, description, value, children }: AnalyticsCardProps) {
  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
      <div className="flex items-start justify-between gap-3">
        <div>
          <h3 className="text-base font-semibold text-slate-900">{title}</h3>
          {description ? <p className="mt-1 text-sm text-slate-600">{description}</p> : null}
        </div>
        {value ? <div className="text-sm font-semibold text-slate-900">{value}</div> : null}
      </div>
      {children ? <div className="mt-4">{children}</div> : null}
    </div>
  )
}

interface ChartCardProps {
  title: string
  description?: string
  value?: string
  children?: ReactNode
}

export function ChartCard({ title, description, value, children }: ChartCardProps) {
  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
      <div className="flex items-start justify-between gap-3">
        <div>
          <h3 className="text-base font-semibold text-slate-900">{title}</h3>
          {description ? <p className="mt-1 text-sm text-slate-600">{description}</p> : null}
        </div>
        {value ? <div className="text-sm font-semibold text-slate-900">{value}</div> : null}
      </div>
      {children ? <div className="mt-4">{children}</div> : null}
    </div>
  )
}

interface ComplianceBadgeProps {
  label: string
  value: string
  tone?: 'success' | 'warning' | 'danger'
}

export function ComplianceBadge({ label, value, tone = 'success' }: ComplianceBadgeProps) {
  const toneClasses = {
    success: 'border-emerald-200 bg-emerald-50 text-emerald-700',
    warning: 'border-amber-200 bg-amber-50 text-amber-700',
    danger: 'border-rose-200 bg-rose-50 text-rose-700',
  }

  return (
    <div className={cn('flex items-center justify-between rounded-2xl border px-3 py-3', toneClasses[tone])}>
      <span className="text-sm font-medium">{label}</span>
      <span className="text-sm font-semibold">{value}</span>
    </div>
  )
}

interface DocumentCardProps {
  title: string
  description: string
  meta: string
}

export function DocumentCard({ title, description, meta }: DocumentCardProps) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-3">
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-start gap-2">
          <div className="mt-0.5 rounded-xl bg-slate-100 p-2 text-slate-700">
            <FileText className="h-4 w-4" />
          </div>
          <div>
            <p className="text-sm font-semibold text-slate-900">{title}</p>
            <p className="mt-1 text-sm text-slate-600">{description}</p>
          </div>
        </div>
        <button className="rounded-full border border-slate-200 bg-slate-50 p-2 text-slate-600">
          <Eye className="h-4 w-4" />
        </button>
      </div>
      <div className="mt-3 flex items-center justify-between text-xs font-medium uppercase tracking-[0.2em] text-slate-400">
        <span>{meta}</span>
        <button className="inline-flex items-center gap-1 text-slate-600"><Download className="h-3.5 w-3.5" /> Export</button>
      </div>
    </div>
  )
}

interface ApprovalCardProps {
  title: string
  description: string
  actionLabel?: string
}

export function ApprovalCard({ title, description, actionLabel = 'Review' }: ApprovalCardProps) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-slate-50 p-3">
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-sm font-semibold text-slate-900">{title}</p>
          <p className="mt-1 text-sm text-slate-600">{description}</p>
        </div>
        <button className="rounded-full border border-slate-200 bg-white px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-slate-700">
          {actionLabel}
        </button>
      </div>
    </div>
  )
}

interface SupplierCardProps {
  name: string
  verification: string
  province: string
  specialization: string
  rating: string
  activity: string
}

export function SupplierCard({ name, verification, province, specialization, rating, activity }: SupplierCardProps) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-4">
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-sm font-semibold text-slate-900">{name}</p>
          <p className="mt-1 text-sm text-slate-600">{specialization}</p>
        </div>
        <StatusBadge status={verification} />
      </div>
      <div className="mt-3 flex flex-wrap gap-3 text-sm text-slate-600">
        <span>{province}</span>
        <span>•</span>
        <span>Rating {rating}</span>
      </div>
      <p className="mt-3 text-sm text-slate-500">{activity}</p>
    </div>
  )
}

interface TenderCardProps {
  title: string
  category: string
  budget: string
  deadline: string
  status: string
}

export function TenderCard({ title, category, budget, deadline, status }: TenderCardProps) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-4">
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-sm font-semibold text-slate-900">{title}</p>
          <p className="mt-1 text-sm text-slate-600">{category}</p>
        </div>
        <StatusBadge status={status} />
      </div>
      <div className="mt-4 flex items-center justify-between text-sm text-slate-600">
        <span>{budget}</span>
        <span>{deadline}</span>
      </div>
    </div>
  )
}

export function TrendSparkline({ data, color = '#0B1F35' }: { data: number[]; color?: string }) {
  const width = 240
  const height = 80
  const max = Math.max(...data)
  const min = Math.min(...data)
  const range = max - min || 1

  const points = data.map((value, index) => {
    const x = (index / Math.max(data.length - 1, 1)) * width
    const y = height - ((value - min) / range) * height
    return `${x},${y}`
  })

  return (
    <svg viewBox={`0 0 ${width} ${height}`} className="h-24 w-full">
      <polyline fill="none" stroke={color} strokeWidth="3" points={points.join(' ')} strokeLinecap="round" strokeLinejoin="round" />
      <polyline fill="rgba(11,31,53,0.08)" stroke="none" points={`${points[0]} ${width},${height} ${points[points.length - 1]} ${width},${height}`} />
    </svg>
  )
}
