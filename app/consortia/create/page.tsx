'use client'

import { useRouter } from 'next/navigation'
import { useAuth } from '@/lib/AuthContext'
import { useEffect, useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import Navigation from '@/components/Navigation'
import { PageHeader, SectionHeader } from '@/components/ui/enterprise'
import { MOCK_COMPANIES } from '@/lib/mockData'
import { Plus, X } from 'lucide-react'

export default function CreateConsortiaPage() {
  const router = useRouter()
  const { user, loading } = useAuth()
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    members: [{ companyId: '', role: 'leader' as const }],
  })

  useEffect(() => {
    if (!loading && !user) {
      router.push('/login')
    }
  }, [user, loading, router])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleMemberChange = (index: number, field: 'companyId' | 'role', value: string) => {
    const newMembers = [...formData.members]
    newMembers[index] = { ...newMembers[index], [field]: value }
    setFormData((prev) => ({
      ...prev,
      members: newMembers,
    }))
  }

  const addMember = () => {
    setFormData((prev) => ({
      ...prev,
      members: [...prev.members, { companyId: '', role: 'member' as const }],
    }))
  }

  const removeMember = (index: number) => {
    if (formData.members.length > 1) {
      setFormData((prev) => ({
        ...prev,
        members: prev.members.filter((_, i) => i !== index),
      }))
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    console.log('[v0] Consortium created:', formData)
    router.push('/consortia')
  }

  if (loading || !user) {
    return <div className="flex min-h-screen items-center justify-center bg-slate-50"><div className="h-12 w-12 animate-spin rounded-full border-2 border-slate-200 border-t-slate-900" /></div>
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <Navigation />
      <main className="mx-auto max-w-4xl px-6 py-8">
        <PageHeader eyebrow="Consortium management" title="Form new consortium" description="Assemble complementary suppliers to strengthen bidding capacity and meet local content requirements." actions={<Button variant="outline" onClick={() => router.push('/consortia')}>Cancel</Button>} />

        <form onSubmit={handleSubmit} className="mt-8 space-y-6">
          <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
            <SectionHeader title="Consortium details" description="Core information about this partnership" />
            <div className="mt-5 space-y-4">
              <div>
                <label className="mb-2 block text-sm font-medium text-slate-700">Consortium name</label>
                <Input name="name" value={formData.name} onChange={handleChange} placeholder="e.g., North Star Logistics Alliance" required className="w-full" />
              </div>
              <div>
                <label className="mb-2 block text-sm font-medium text-slate-700">Description</label>
                <textarea name="description" value={formData.description} onChange={handleChange} placeholder="Describe the consortium's focus and value proposition..." required className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-3 py-2 text-sm text-slate-900 placeholder-slate-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-slate-900" rows={4} />
              </div>
            </div>
          </div>

          <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
            <SectionHeader title="Member companies" description="Add participating suppliers to this consortium" />
            <div className="mt-5 space-y-4">
              {formData.members.map((member, idx) => (
                <div key={idx} className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                  <div className="flex gap-3 mb-3">
                    <select value={member.companyId} onChange={(e) => handleMemberChange(idx, 'companyId', e.target.value)} required className="flex-1 rounded-2xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-slate-900">
                      <option value="">Select company</option>
                      {MOCK_COMPANIES.map((company) => (
                        <option key={company.id} value={company.id}>
                          {company.name}
                        </option>
                      ))}
                    </select>
                    <select value={member.role} onChange={(e) => handleMemberChange(idx, 'role', e.target.value)} className="rounded-2xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-slate-900">
                      <option value="leader">Lead</option>
                      <option value="member">Member</option>
                    </select>
                    {formData.members.length > 1 && <Button type="button" variant="outline" size="icon" onClick={() => removeMember(idx)}><X className="h-4 w-4" /></Button>}
                  </div>
                </div>
              ))}
              <Button type="button" variant="outline" className="w-full" onClick={addMember}><Plus className="h-4 w-4 mr-2" /> Add member</Button>
            </div>
          </div>

          <div className="rounded-3xl border border-slate-200 bg-slate-900 p-6 text-slate-100 shadow-sm">
            <p className="text-sm font-semibold text-white">Compliance note</p>
            <p className="mt-2 text-sm text-slate-400">Ensure the combined local content of all members meets or exceeds the 70% threshold required for mining sector tenders in Zambia.</p>
          </div>

          <div className="flex gap-3">
            <Button type="submit" className="flex-1 bg-slate-900 text-white hover:bg-slate-800">Create consortium</Button>
            <Button type="button" variant="outline" className="flex-1" onClick={() => router.push('/consortia')}>Discard</Button>
          </div>
        </form>
      </main>
    </div>
  )
}
