'use client'

import { useState } from 'react'
import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Mail, Phone, MapPin } from 'lucide-react'

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
  })
  const [submitted, setSubmitted] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    console.log('[v0] Contact form submitted:', formData)
    setSubmitted(true)
    setTimeout(() => {
      setFormData({ name: '', email: '', phone: '', subject: '', message: '' })
      setSubmitted(false)
    }, 3000)
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="mx-auto max-w-7xl px-6 py-20">
        <div className="mb-16 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-primary mb-6 font-geist">Get in touch</h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Have questions about Bantu Bid? Our team is here to help. Reach out to us through any of the channels below.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12 mb-16">
          <div className="space-y-8">
            <div>
              <h2 className="text-2xl font-bold text-primary mb-6 font-geist">Contact information</h2>
              <div className="space-y-6">
                <div className="flex gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary text-white flex-shrink-0">
                    <Mail className="h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-slate-900">Email</h3>
                    <p className="text-gray-600 text-sm">support@bantu-bid.com</p>
                    <p className="text-gray-600 text-sm">We&apos;ll respond within 24 hours</p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-secondary text-white flex-shrink-0">
                    <Phone className="h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-slate-900">Phone</h3>
                    <p className="text-gray-600 text-sm">+260 97 123 4567</p>
                    <p className="text-gray-600 text-sm">Monday - Friday, 9am - 5pm CAT</p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-accent text-white flex-shrink-0">
                    <MapPin className="h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-slate-900">Office</h3>
                    <p className="text-gray-600 text-sm">Cairo Road, Lusaka</p>
                    <p className="text-gray-600 text-sm">Zambia</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-primary/5 to-secondary/5 rounded-2xl p-6 border border-gray-200">
              <h3 className="font-semibold text-slate-900 mb-3">Quick responses</h3>
              <ul className="space-y-2 text-sm text-gray-600">
                <li>✓ Supplier registration support</li>
                <li>✓ Tender opportunity inquiries</li>
                <li>✓ Technical assistance</li>
                <li>✓ Compliance guidance</li>
              </ul>
            </div>
          </div>

          <div className="rounded-2xl border border-gray-200 bg-white p-8">
            <h2 className="text-2xl font-bold text-primary mb-6 font-geist">Send us a message</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="mb-2 block text-sm font-medium text-slate-700">Full name</label>
                <Input name="name" value={formData.name} onChange={handleChange} placeholder="Your name" required className="w-full" />
              </div>
              <div>
                <label className="mb-2 block text-sm font-medium text-slate-700">Email address</label>
                <Input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="your@email.com" required className="w-full" />
              </div>
              <div>
                <label className="mb-2 block text-sm font-medium text-slate-700">Phone (optional)</label>
                <Input type="tel" name="phone" value={formData.phone} onChange={handleChange} placeholder="+260 97 123 4567" className="w-full" />
              </div>
              <div>
                <label className="mb-2 block text-sm font-medium text-slate-700">Subject</label>
                <select name="subject" value={formData.subject} onChange={handleChange} required className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-3 py-2 text-sm text-slate-700">
                  <option value="">Select subject</option>
                  <option value="support">Technical support</option>
                  <option value="supplier">Supplier inquiry</option>
                  <option value="procurement">Procurement inquiry</option>
                  <option value="compliance">Compliance question</option>
                  <option value="other">Other</option>
                </select>
              </div>
              <div>
                <label className="mb-2 block text-sm font-medium text-slate-700">Message</label>
                <textarea name="message" value={formData.message} onChange={handleChange} placeholder="Tell us how we can help..." required rows={4} className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-3 py-2 text-sm text-slate-900 placeholder-slate-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-slate-900" />
              </div>
              <Button type="submit" className="w-full bg-primary text-white hover:bg-primary/90">
                {submitted ? 'Message sent!' : 'Send message'}
              </Button>
            </form>
            {submitted && <p className="mt-4 text-sm text-emerald-600 text-center">Thank you! We&apos;ll be in touch soon.</p>}
          </div>
        </div>

        <div className="bg-gradient-to-r from-primary/10 to-secondary/10 rounded-2xl border border-gray-200 p-8 text-center">
          <h2 className="text-2xl font-bold text-primary mb-4 font-geist">Have a quick question?</h2>
          <p className="text-gray-600 mb-6">Check out our FAQ or documentation for instant answers.</p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Button variant="outline">View FAQ</Button>
            <Button>Read documentation</Button>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
