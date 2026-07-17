'use client'

import Link from 'next/link'
import { ArrowRight, BarChart3, CheckCircle2 } from 'lucide-react'
import { useEffect, useState } from 'react'

export function Hero() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  return (
    <section className="min-h-screen bg-background pt-24 pb-16 flex items-center">
      <div className="max-w-7xl mx-auto px-6 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className={`space-y-8 ${mounted ? 'opacity-100' : 'opacity-0'} transition-opacity duration-700`}>
            <div className="space-y-4">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-50 border border-emerald-200 rounded-lg">
                <CheckCircle2 size={16} className="text-accent" />
                <span className="text-sm font-medium text-accent">Trusted by Zambian Mining Industry</span>
              </div>

              <h1 className="text-5xl lg:text-6xl font-bold text-primary leading-tight font-geist">
                Enterprise-Grade Consortium Bidding
              </h1>

              <p className="text-lg text-gray-600 max-w-lg leading-relaxed">
                Connect verified local suppliers with mining companies. Form powerful consortia, ensure S.I. No. 68 compliance, and win high-value tenders through intelligent matching.
              </p>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Link
                href="/register"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors font-medium"
              >
                Start for Free
                <ArrowRight size={18} />
              </Link>
              <Link
                href="#demo"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 border border-primary text-primary rounded-lg hover:bg-gray-50 transition-colors font-medium"
              >
                Watch Demo
              </Link>
            </div>

            {/* Trust Elements */}
            <div className="pt-8 border-t border-gray-200 grid grid-cols-2 gap-6">
              <div>
                <div className="text-2xl font-bold text-primary">500+</div>
                <p className="text-sm text-gray-600">Verified Suppliers</p>
              </div>
              <div>
                <div className="text-2xl font-bold text-primary">K2.5B+</div>
                <p className="text-sm text-gray-600">Tender Value</p>
              </div>
            </div>
          </div>

          {/* Right: Dashboard Preview */}
          <div className={`relative ${mounted ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'} transition-all duration-700 delay-300`}>
            <div className="bg-white rounded-2xl border border-gray-200 shadow-2xl overflow-hidden">
              {/* Dashboard Preview */}
              <div className="bg-gradient-to-br from-primary/5 to-secondary/5 p-8">
                <div className="space-y-4">
                  {/* Header */}
                  <div className="flex items-center justify-between pb-4 border-b border-gray-200">
                    <div className="font-semibold text-primary">Tender Matching Engine</div>
                    <div className="w-8 h-8 bg-secondary rounded-lg"></div>
                  </div>

                  {/* Stats Grid */}
                  <div className="grid grid-cols-2 gap-4 pt-4">
                    <div className="bg-white rounded-lg p-3 border border-gray-200">
                      <div className="text-2xl font-bold text-primary">92%</div>
                      <div className="text-xs text-gray-600">Match Score</div>
                    </div>
                    <div className="bg-white rounded-lg p-3 border border-gray-200">
                      <div className="text-2xl font-bold text-accent">✓</div>
                      <div className="text-xs text-gray-600">SI 68 Compliant</div>
                    </div>
                  </div>

                  {/* Consortium Cards */}
                  <div className="space-y-3 pt-4">
                    {[
                      { name: 'Northern Mining Solutions', match: 92, local: 75 },
                      { name: 'Construction & Safety', match: 88, local: 87 },
                    ].map((item) => (
                      <div key={item.name} className="bg-white rounded-lg p-3 border border-gray-200 hover:shadow-md transition-shadow">
                        <div className="flex items-start justify-between mb-2">
                          <div className="text-sm font-medium text-gray-900">{item.name}</div>
                          <div className="text-xs font-semibold bg-emerald-100 text-accent px-2 py-1 rounded">
                            {item.match}%
                          </div>
                        </div>
                        <div className="w-full h-1.5 bg-gray-200 rounded-full overflow-hidden">
                          <div className="h-full bg-secondary" style={{ width: `${item.local}%` }}></div>
                        </div>
                        <div className="text-xs text-gray-500 mt-1">{item.local}% Local Content</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Floating decorative elements */}
            <div className="absolute top-4 right-4 w-20 h-20 bg-secondary/10 rounded-full blur-2xl"></div>
            <div className="absolute bottom-4 left-4 w-32 h-32 bg-accent/10 rounded-full blur-3xl"></div>
          </div>
        </div>
      </div>
    </section>
  )
}
