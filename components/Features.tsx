'use client'

import { CheckCircle2, Users, BarChart3, Shield, Zap, TrendingUp } from 'lucide-react'

const features = [
  {
    icon: Users,
    title: 'Consortium Formation',
    description: 'Identify compatible suppliers and form powerful consortia with complementary capabilities.',
  },
  {
    icon: BarChart3,
    title: 'Smart Matching Engine',
    description: 'AI-powered algorithm matches consortia to tenders based on skills, compliance, and capacity.',
  },
  {
    icon: Shield,
    title: 'S.I. No. 68 Compliance',
    description: 'Automated local content calculation ensures compliance with Zambian procurement regulations.',
  },
  {
    icon: TrendingUp,
    title: 'Tender Discovery',
    description: 'Browse high-value mining tenders with advanced filtering and real-time updates.',
  },
  {
    icon: CheckCircle2,
    title: 'Supplier Verification',
    description: 'All suppliers vetted and certified, ensuring quality and reliability for mining operations.',
  },
  {
    icon: Zap,
    title: 'Real-Time Analytics',
    description: 'Comprehensive dashboards tracking consortia performance, compliance status, and opportunities.',
  },
]

export function Features() {
  return (
    <section id="solutions" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-4xl font-bold text-primary mb-4 font-geist">Enterprise Solutions for Mining Procurement</h2>
          <p className="text-gray-600 text-lg">
            Streamline your procurement process with industry-leading tools designed for the Zambian mining sector.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => {
            const Icon = feature.icon
            return (
              <div
                key={index}
                className="group bg-gray-50 border border-gray-200 rounded-xl p-8 hover:border-secondary hover:shadow-lg transition-all duration-300"
              >
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4 group-hover:bg-secondary/10 transition-colors">
                  <Icon size={24} className="text-primary group-hover:text-secondary transition-colors" />
                </div>
                <h3 className="font-semibold text-lg text-primary mb-2 font-geist">{feature.title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{feature.description}</p>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
