'use client'

import { useRouter } from 'next/navigation'
import { useAuth } from '@/lib/AuthContext'
import { useEffect, useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import Navigation from '@/components/Navigation'
import { PageHeader, SectionHeader } from '@/components/ui/enterprise'
import { Plus, X } from 'lucide-react'

export default function CreateTenderPage() {
  const router = useRouter()
  const { user, loading } = useAuth()
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    miningSite: '',
    sector: '',
    budget: '',
    minLocalContent: 70,
    deadline: '',
    requirements: [''],
    specifications: [''],
  })

  useEffect(() => {
    if (!loading && !user) {
      router.push('/login')
    }
  }, [user, loading, router])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleArrayChange = (field: 'requirements' | 'specifications', index: number, value: string) => {
    const newArray = [...formData[field]]
    newArray[index] = value
    setFormData((prev) => ({
      ...prev,
      [field]: newArray,
    }))
  }

  const addArrayField = (field: 'requirements' | 'specifications') => {
    setFormData((prev) => ({
      ...prev,
      [field]: [...prev[field], ''],
    }))
  }

  const removeArrayField = (field: 'requirements' | 'specifications', index: number) => {
    setFormData((prev) => ({
      ...prev,
      [field]: prev[field].filter((_, i) => i !== index),
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    console.log('[v0] Tender created:', formData)
    router.push('/tenders')
  }

  if (loading || !user) {
    return <div className="flex min-h-screen items-center justify-center bg-slate-50"><div className="h-12 w-12 animate-spin rounded-full border-2 border-slate-200 border-t-slate-900" /></div>
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <Navigation />
      <main className="mx-auto max-w-4xl px-6 py-8">
        <PageHeader eyebrow="Tender management" title="Create new tender" description="Define procurement opportunity, requirements, and evaluation criteria for supplier bidding." actions={<Button variant="outline" onClick={() => router.push('/tenders')}>Cancel</Button>} />

        <form onSubmit={handleSubmit} className="mt-8 space-y-6">
          <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
            <SectionHeader title="Basic information" description="Core tender details and context" />
            <div className="mt-5 space-y-4">
              <div>
                <label className="mb-2 block text-sm font-medium text-slate-700">Tender title</label>
                <Input name="title" value={formData.title} onChange={handleChange} placeholder="e.g., Copper Processing Equipment Supply" required className="w-full" />
              </div>
              <div>
                <label className="mb-2 block text-sm font-medium text-slate-700">Description</label>
                <textarea name="description" value={formData.description} onChange={handleChange} placeholder="Detailed description of the tender scope..." required className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-3 py-2 text-sm text-slate-900 placeholder-slate-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-slate-900" rows={4} />
              </div>
              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <label className="mb-2 block text-sm font-medium text-slate-700">Mining site</label>
                  <Input name="miningSite" value={formData.miningSite} onChange={handleChange} placeholder="e.g., Konkola Copper Mines" required className="w-full" />
                </div>
                <div>
                  <label className="mb-2 block text-sm font-medium text-slate-700">Sector</label>
                  <select name="sector" value={formData.sector} onChange={handleChange} required className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-3 py-2 text-sm text-slate-700 focus:bg-white focus:outline-none focus:ring-2 focus:ring-slate-900">
                    <option value="">Select sector</option>
                    <option value="Mining Equipment">Mining Equipment</option>
                    <option value="Logistics">Logistics</option>
                    <option value="Civil Works">Civil Works</option>
                    <option value="Maintenance">Maintenance</option>
                  </select>
                </div>
              </div>
              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <label className="mb-2 block text-sm font-medium text-slate-700">Budget (K)</label>
                  <Input name="budget" type="number" value={formData.budget} onChange={handleChange} placeholder="e.g., 5000000" required className="w-full" />
                </div>
                <div>
                  <label className="mb-2 block text-sm font-medium text-slate-700">Application deadline</label>
                  <Input name="deadline" type="date" value={formData.deadline} onChange={handleChange} required className="w-full" />
                </div>
              </div>
              <div>
                <label className="mb-2 block text-sm font-medium text-slate-700">Minimum local content (%)</label>
                <Input name="minLocalContent" type="number" value={formData.minLocalContent} onChange={handleChange} min="0" max="100" required className="w-full" />
              </div>
            </div>
          </div>

          <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
            <SectionHeader title="Requirements" description="Mandatory conditions for bid submission" />
            <div className="mt-5 space-y-3">
              {formData.requirements.map((req, idx) => (
                <div key={idx} className="flex gap-3">
                  <Input value={req} onChange={(e) => handleArrayChange('requirements', idx, e.target.value)} placeholder="Requirement description" className="flex-1" />
                  {formData.requirements.length > 1 && <Button type="button" variant="outline" size="icon" onClick={() => removeArrayField('requirements', idx)}><X className="h-4 w-4" /></Button>}
                </div>
              ))}
              <Button type="button" variant="outline" className="w-full" onClick={() => addArrayField('requirements')}><Plus className="h-4 w-4 mr-2" /> Add requirement</Button>
            </div>
          </div>

          <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
            <SectionHeader title="Evaluation criteria" description="Points used to assess and rank bids" />
            <div className="mt-5 space-y-3">
              {formData.specifications.map((spec, idx) => (
                <div key={idx} className="flex gap-3">
                  <Input value={spec} onChange={(e) => handleArrayChange('specifications', idx, e.target.value)} placeholder="Evaluation criterion" className="flex-1" />
                  {formData.specifications.length > 1 && <Button type="button" variant="outline" size="icon" onClick={() => removeArrayField('specifications', idx)}><X className="h-4 w-4" /></Button>}
                </div>
              ))}
              <Button type="button" variant="outline" className="w-full" onClick={() => addArrayField('specifications')}><Plus className="h-4 w-4 mr-2" /> Add criterion</Button>
            </div>
          </div>

          <div className="flex gap-3">
            <Button type="submit" className="flex-1 bg-slate-900 text-white hover:bg-slate-800">Create tender</Button>
            <Button type="button" variant="outline" className="flex-1" onClick={() => router.push('/tenders')}>Discard</Button>
          </div>
        </form>
      </main>
    </div>
  )
}
