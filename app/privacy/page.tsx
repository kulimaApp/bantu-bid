'use client'

import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="mx-auto max-w-4xl px-6 py-20">
        <div className="mb-12">
          <h1 className="text-4xl font-bold text-primary mb-4 font-geist">Privacy Policy</h1>
          <p className="text-gray-600">Last updated: July 2026</p>
        </div>

        <div className="space-y-12 text-slate-800">
          <section>
            <h2 className="text-2xl font-bold text-primary mb-4 font-geist">1. Introduction</h2>
            <p className="text-gray-600 mb-4">
              Bantu Bid (&quot;we&quot;, &quot;our&quot;, or &quot;us&quot;) is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our website and services.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-primary mb-4 font-geist">2. Information We Collect</h2>
            <h3 className="font-semibold text-slate-900 mb-2">Personal Information</h3>
            <p className="text-gray-600 mb-4">
              We may collect personal information including your name, email address, phone number, company name, and other business information when you register, create a profile, or interact with our platform.
            </p>
            <h3 className="font-semibold text-slate-900 mb-2">Business Information</h3>
            <p className="text-gray-600">
              For supplier profiles, we collect information about your company's capabilities, certifications, local content percentage, and financial data as required for compliance verification.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-primary mb-4 font-geist">3. How We Use Your Information</h2>
            <ul className="space-y-2 text-gray-600">
              <li>• Facilitate procurement matching and consortia formation</li>
              <li>• Verify compliance with S.I. No. 68 requirements</li>
              <li>• Communicate about tenders and opportunities</li>
              <li>• Provide customer support and account management</li>
              <li>• Generate reports and analytics</li>
              <li>• Comply with legal and regulatory obligations</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-primary mb-4 font-geist">4. Data Security</h2>
            <p className="text-gray-600 mb-4">
              We implement appropriate technical and organizational measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction. All data transmission is encrypted using industry-standard SSL/TLS protocols.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-primary mb-4 font-geist">5. Data Sharing</h2>
            <p className="text-gray-600 mb-4">
              We do not sell your personal information. We may share information with:
            </p>
            <ul className="space-y-2 text-gray-600">
              <li>• Mining companies and procurement teams (supplier profiles)</li>
              <li>• Consortium members (as part of group participation)</li>
              <li>• Regulatory authorities (for compliance verification)</li>
              <li>• Third-party service providers (for platform operations)</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-primary mb-4 font-geist">6. Retention</h2>
            <p className="text-gray-600">
              We retain your personal information for as long as your account is active or as needed to provide services. You can request deletion of your account and data at any time, subject to legal retention requirements.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-primary mb-4 font-geist">7. Your Rights</h2>
            <p className="text-gray-600 mb-4">
              You have the right to:
            </p>
            <ul className="space-y-2 text-gray-600">
              <li>• Access your personal information</li>
              <li>• Correct inaccurate data</li>
              <li>• Request deletion of your data</li>
              <li>• Opt-out of communications</li>
              <li>• Request a copy of your data</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-primary mb-4 font-geist">8. Contact Us</h2>
            <p className="text-gray-600">
              If you have questions about this Privacy Policy or our data practices, please contact us at privacy@bantu-bid.com or through the contact form on our website.
            </p>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  )
}
