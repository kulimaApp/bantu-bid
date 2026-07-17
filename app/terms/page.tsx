'use client'

import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="mx-auto max-w-4xl px-6 py-20">
        <div className="mb-12">
          <h1 className="text-4xl font-bold text-primary mb-4 font-geist">Terms of Service</h1>
          <p className="text-gray-600">Last updated: July 2026</p>
        </div>

        <div className="space-y-12 text-slate-800">
          <section>
            <h2 className="text-2xl font-bold text-primary mb-4 font-geist">1. Acceptance of Terms</h2>
            <p className="text-gray-600">
              By accessing and using the Bantu Bid platform, you accept and agree to be bound by the terms and provision of this agreement. If you do not agree to abide by the above, please do not use this service.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-primary mb-4 font-geist">2. Use License</h2>
            <p className="text-gray-600 mb-4">
              Permission is granted to temporarily download one copy of the materials (information or software) on Bantu Bid for personal, non-commercial transitory viewing only. This is the grant of a license, not a transfer of title, and under this license you may not:
            </p>
            <ul className="space-y-2 text-gray-600">
              <li>• Modify or copy the materials</li>
              <li>• Use the materials for any commercial purpose or for any public display</li>
              <li>• Attempt to decompile or reverse engineer any software contained on the platform</li>
              <li>• Remove any copyright or other proprietary notations from the materials</li>
              <li>• Transfer the materials to another person or &quot;mirror&quot; the materials on any other server</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-primary mb-4 font-geist">3. Disclaimer</h2>
            <p className="text-gray-600">
              The materials on Bantu Bid are provided on an 'as is' basis. Bantu Bid makes no warranties, expressed or implied, and hereby disclaims and negates all other warranties including, without limitation, implied warranties or conditions of merchantability, fitness for a particular purpose, or non-infringement of intellectual property or other violation of rights.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-primary mb-4 font-geist">4. Limitations</h2>
            <p className="text-gray-600">
              In no event shall Bantu Bid or its suppliers be liable for any damages (including, without limitation, damages for loss of data or profit, or due to business interruption) arising out of the use or inability to use the materials on Bantu Bid.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-primary mb-4 font-geist">5. Accuracy of Materials</h2>
            <p className="text-gray-600">
              The materials appearing on Bantu Bid could include technical, typographical, or photographic errors. Bantu Bid does not warrant that any of the materials on its website are accurate, complete, or current. Bantu Bid may make changes to the materials contained on its website at any time without notice.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-primary mb-4 font-geist">6. User Responsibilities</h2>
            <p className="text-gray-600 mb-4">
              Users agree to:
            </p>
            <ul className="space-y-2 text-gray-600">
              <li>• Provide accurate and complete information in their profiles</li>
              <li>• Maintain confidentiality of their account credentials</li>
              <li>• Comply with all applicable laws and regulations</li>
              <li>• Not engage in fraudulent or misleading conduct</li>
              <li>• Respect the intellectual property rights of others</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-primary mb-4 font-geist">7. Compliance Verification</h2>
            <p className="text-gray-600">
              Users acknowledge that information provided on Bantu Bid may be verified against regulatory requirements, including S.I. No. 68 of 2008. Users grant Bantu Bid permission to conduct necessary compliance checks and audits.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-primary mb-4 font-geist">8. Limitation of Liability</h2>
            <p className="text-gray-600">
              Except in cases of gross negligence or willful misconduct, Bantu Bid shall not be liable for any indirect, incidental, special, or consequential damages arising from the use of or inability to use the service.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-primary mb-4 font-geist">9. Governing Law</h2>
            <p className="text-gray-600">
              These terms and conditions are governed by and construed in accordance with the laws of the Republic of Zambia, and you irrevocably submit to the exclusive jurisdiction of the courts in that location.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-primary mb-4 font-geist">10. Contact Information</h2>
            <p className="text-gray-600">
              If you have any questions about these Terms of Service, please contact us at legal@bantu-bid.com.
            </p>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  )
}
