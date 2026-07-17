'use client'

import { Header } from '@/components/Header'
import { Hero } from '@/components/Hero'
import { Features } from '@/components/Features'
import { Footer } from '@/components/Footer'
import Link from 'next/link'

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      <Header />

      <Hero />

      <Features />

      {/* How It Works Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-4xl font-bold text-primary mb-4 font-geist">How Bantu Bid Works</h2>
            <p className="text-gray-600 text-lg">
              Streamlined process from supplier registration to successful bid submission.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                step: 1,
                title: 'Register & Profile',
                description: 'Create your company profile with capabilities, certifications, and local content information.',
              },
              {
                step: 2,
                title: 'Form Consortia',
                description: 'Identify compatible partners and form consortia with complementary strengths.',
              },
              {
                step: 3,
                title: 'Find & Win Tenders',
                description: 'Discover matching opportunities and submit winning bids with compliance assurance.',
              },
            ].map((item) => (
              <div key={item.step} className="relative">
                <div className="flex flex-col items-center">
                  <div className="w-16 h-16 bg-primary text-white rounded-full flex items-center justify-center font-bold text-2xl mb-6">
                    {item.step}
                  </div>
                  <h3 className="text-xl font-semibold text-primary mb-2 text-center font-geist">{item.title}</h3>
                  <p className="text-gray-600 text-center text-sm">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Use Cases Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-4xl font-bold text-primary mb-4 font-geist">For Suppliers & Mining Companies</h2>
            <p className="text-gray-600 text-lg">
              Bantu Bid empowers all participants in the mining procurement ecosystem.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {/* Suppliers */}
            <div className="bg-gradient-to-br from-primary/5 to-secondary/5 rounded-2xl p-8 border border-gray-200 hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 bg-primary rounded-lg flex items-center justify-center mb-6">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292m0 0H8.646m3.354 0H16m-4-8a4 4 0 100 8 4 4 0 000-8z" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-primary mb-4 font-geist">For SME Suppliers</h3>
              <ul className="space-y-3 text-gray-700 mb-8">
                <li className="flex gap-3">
                  <span className="text-secondary font-bold flex-shrink-0">✓</span>
                  <span>Access high-value mining tenders</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-secondary font-bold flex-shrink-0">✓</span>
                  <span>Form consortia with complementary capabilities</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-secondary font-bold flex-shrink-0">✓</span>
                  <span>Ensure S.I. No. 68 compliance automatically</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-secondary font-bold flex-shrink-0">✓</span>
                  <span>Win larger contracts through partnerships</span>
                </li>
              </ul>
              <Link
                href="/register"
                className="inline-block px-6 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors font-medium"
              >
                Register as Supplier
              </Link>
            </div>

            {/* Mining Companies */}
            <div className="bg-gradient-to-br from-accent/5 to-secondary/5 rounded-2xl p-8 border border-gray-200 hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 bg-accent rounded-lg flex items-center justify-center mb-6">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-primary mb-4 font-geist">For Mining Companies</h3>
              <ul className="space-y-3 text-gray-700 mb-8">
                <li className="flex gap-3">
                  <span className="text-accent font-bold flex-shrink-0">✓</span>
                  <span>Access verified, vetted suppliers</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-accent font-bold flex-shrink-0">✓</span>
                  <span>Automated S.I. No. 68 compliance checking</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-accent font-bold flex-shrink-0">✓</span>
                  <span>Intelligent consortia matching</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-accent font-bold flex-shrink-0">✓</span>
                  <span>Transparent, fair procurement process</span>
                </li>
              </ul>
              <Link
                href="/register"
                className="inline-block px-6 py-2 bg-accent text-white rounded-lg hover:bg-accent/90 transition-colors font-medium"
              >
                Register as Mining Company
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-primary text-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-5xl font-bold mb-2 font-geist">500+</div>
              <p className="text-gray-200">Verified Suppliers</p>
            </div>
            <div>
              <div className="text-5xl font-bold mb-2 font-geist">K2.5B+</div>
              <p className="text-gray-200">Tender Value</p>
            </div>
            <div>
              <div className="text-5xl font-bold mb-2 font-geist">50+</div>
              <p className="text-gray-200">Active Consortia</p>
            </div>
            <div>
              <div className="text-5xl font-bold mb-2 font-geist">95%</div>
              <p className="text-gray-200">Compliance Rate</p>
            </div>
          </div>
        </div>
      </section>

      {/* S.I. No. 68 Trust Section */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-6">
          <div className="bg-gradient-to-r from-accent/10 to-secondary/10 border border-gray-200 rounded-2xl p-12">
            <h2 className="text-3xl font-bold text-primary mb-6 font-geist">Zambian Local Content Compliance</h2>
            <p className="text-gray-600 mb-6 text-lg">
              Bantu Bid ensures all consortia and bids comply with statutory instrument S.I. No. 68 of 2008, requiring minimum local content thresholds for mining procurement.
            </p>
            <div className="space-y-4">
              <div className="flex gap-4">
                <div className="text-2xl text-secondary flex-shrink-0">✓</div>
                <div>
                  <h4 className="font-semibold text-gray-900">Automatic Verification</h4>
                  <p className="text-gray-600 text-sm">Real-time compliance checking against regulatory requirements</p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="text-2xl text-secondary flex-shrink-0">✓</div>
                <div>
                  <h4 className="font-semibold text-gray-900">Transparent Calculation</h4>
                  <p className="text-gray-600 text-sm">Clear breakdown of local content percentages across consortia members</p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="text-2xl text-secondary flex-shrink-0">✓</div>
                <div>
                  <h4 className="font-semibold text-gray-900">Compliance Support</h4>
                  <p className="text-gray-600 text-sm">Recommendations and guidance for improving compliance status</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
