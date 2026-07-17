'use client'

import Link from 'next/link'
import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'
import { Zap, Target, Users, ShieldCheck } from 'lucide-react'

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="mx-auto max-w-7xl px-6 py-20">
        <div className="mx-auto max-w-3xl text-center mb-20">
          <h1 className="text-4xl md:text-5xl font-bold text-primary mb-6 font-geist">About Bantu Bid</h1>
          <p className="text-lg text-gray-600">
            Empowering Zambian SME suppliers in the mining sector through intelligent consortium formation and transparent bidding.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12 mb-20">
          <div>
            <h2 className="text-3xl font-bold text-primary mb-6 font-geist">Our Mission</h2>
            <p className="text-gray-600 mb-4">
              Bantu Bid is dedicated to transforming procurement in the Zambian mining sector by connecting verified suppliers, enabling strategic consortia formation, and ensuring transparent compliance with local content requirements.
            </p>
            <p className="text-gray-600">
              We believe that by democratizing access to high-value procurement opportunities, we can strengthen the entire mining supply chain ecosystem.
            </p>
          </div>
          <div className="bg-gradient-to-br from-primary/5 to-secondary/5 rounded-2xl p-8 border border-gray-200">
            <h2 className="text-3xl font-bold text-primary mb-6 font-geist">Our Vision</h2>
            <p className="text-gray-600">
              To build a thriving network of Zambian suppliers capable of winning and delivering world-class services to the mining industry, supported by transparent, compliance-driven procurement practices.
            </p>
          </div>
        </div>

        <div className="grid md:grid-cols-4 gap-6 mb-20">
          {[
            { icon: Target, title: 'Focused', description: 'Purpose-built for mining procurement' },
            { icon: Users, title: 'Connected', description: 'Intelligent consortia matching' },
            { icon: ShieldCheck, title: 'Compliant', description: 'Automated S.I. No. 68 verification' },
            { icon: Zap, title: 'Efficient', description: 'Streamlined bidding process' },
          ].map((item, idx) => (
            <div key={idx} className="rounded-2xl border border-gray-200 p-6 hover:shadow-lg transition-shadow">
              <item.icon className="h-8 w-8 text-secondary mb-4" />
              <h3 className="font-semibold text-slate-900 mb-2">{item.title}</h3>
              <p className="text-sm text-gray-600">{item.description}</p>
            </div>
          ))}
        </div>

        <div className="rounded-3xl bg-gradient-to-r from-primary/10 to-secondary/10 border border-gray-200 p-12 mb-20">
          <h2 className="text-3xl font-bold text-primary mb-6 font-geist">Why Bantu Bid</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div>
              <h3 className="font-semibold text-slate-900 mb-3">For Suppliers</h3>
              <ul className="space-y-2 text-sm text-gray-600">
                <li>✓ Access high-value tenders</li>
                <li>✓ Form strategic partnerships</li>
                <li>✓ Ensure compliance automatically</li>
                <li>✓ Track opportunities easily</li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-slate-900 mb-3">For Mining Companies</h3>
              <ul className="space-y-2 text-sm text-gray-600">
                <li>✓ Access verified suppliers</li>
                <li>✓ Streamlined procurement</li>
                <li>✓ Guaranteed compliance</li>
                <li>✓ Transparent process</li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-slate-900 mb-3">For Government</h3>
              <ul className="space-y-2 text-sm text-gray-600">
                <li>✓ Promote local industry</li>
                <li>✓ Ensure compliance</li>
                <li>✓ Boost SME participation</li>
                <li>✓ Transparent oversight</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="mb-20">
          <h2 className="text-3xl font-bold text-primary mb-8 font-geist text-center">The Bantu Bid Advantage</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="rounded-2xl border border-gray-200 p-6">
              <h3 className="font-semibold text-slate-900 mb-3">Intelligent Matching</h3>
              <p className="text-sm text-gray-600">
                Our algorithm identifies compatible suppliers and creates optimal consortia combinations based on capabilities, local content, and geographic distribution.
              </p>
            </div>
            <div className="rounded-2xl border border-gray-200 p-6">
              <h3 className="font-semibold text-slate-900 mb-3">Compliance Automation</h3>
              <p className="text-sm text-gray-600">
                Automated verification against S.I. No. 68 requirements ensures all bids meet regulatory thresholds before submission.
              </p>
            </div>
            <div className="rounded-2xl border border-gray-200 p-6">
              <h3 className="font-semibold text-slate-900 mb-3">Transparent Platform</h3>
              <p className="text-sm text-gray-600">
                Clear visibility into bid status, compliance metrics, and procurement activity for all stakeholders.
              </p>
            </div>
            <div className="rounded-2xl border border-gray-200 p-6">
              <h3 className="font-semibold text-slate-900 mb-3">Expert Support</h3>
              <p className="text-sm text-gray-600">
                Dedicated support team to help suppliers optimize their profiles and consortia for maximum competitiveness.
              </p>
            </div>
          </div>
        </div>

        <div className="text-center">
          <h2 className="text-3xl font-bold text-primary mb-6 font-geist">Ready to get started?</h2>
          <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
            Join the network of verified suppliers transforming procurement in the mining sector.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link href="/register" className="px-6 py-3 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors font-medium">
              Register now
            </Link>
            <Link href="/" className="px-6 py-3 border border-gray-200 text-slate-900 rounded-lg hover:bg-gray-50 transition-colors font-medium">
              Learn more
            </Link>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
