'use client'

import Link from 'next/link'

export function Footer() {
  return (
    <footer className="bg-primary text-white">
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          {/* Company Info */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 font-bold text-xl">
              <div className="w-8 h-8 bg-secondary rounded-lg flex items-center justify-center text-sm">BB</div>
              <span>Bantu Bid</span>
            </div>
            <p className="text-sm text-gray-300">
              Enterprise consortium bidding platform for Zambian mining suppliers.
            </p>
          </div>

          {/* Product Links */}
          <div>
            <h4 className="font-semibold mb-4">Product</h4>
            <ul className="space-y-3 text-sm">
              <li>
                <Link href="#" className="text-gray-300 hover:text-secondary transition-colors">
                  Features
                </Link>
              </li>
              <li>
                <Link href="#" className="text-gray-300 hover:text-secondary transition-colors">
                  Pricing
                </Link>
              </li>
              <li>
                <Link href="#" className="text-gray-300 hover:text-secondary transition-colors">
                  Security
                </Link>
              </li>
              <li>
                <Link href="#" className="text-gray-300 hover:text-secondary transition-colors">
                  Roadmap
                </Link>
              </li>
            </ul>
          </div>

          {/* Company Links */}
          <div>
            <h4 className="font-semibold mb-4">Company</h4>
            <ul className="space-y-3 text-sm">
              <li>
                <Link href="#" className="text-gray-300 hover:text-secondary transition-colors">
                  About
                </Link>
              </li>
              <li>
                <Link href="#" className="text-gray-300 hover:text-secondary transition-colors">
                  Blog
                </Link>
              </li>
              <li>
                <Link href="#" className="text-gray-300 hover:text-secondary transition-colors">
                  Careers
                </Link>
              </li>
              <li>
                <Link href="#" className="text-gray-300 hover:text-secondary transition-colors">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal & Social */}
          <div>
            <h4 className="font-semibold mb-4">Connect</h4>
            <ul className="space-y-3 text-sm mb-6">
              <li>
                <Link href="#" className="text-gray-300 hover:text-secondary transition-colors">
                  Terms
                </Link>
              </li>
              <li>
                <Link href="#" className="text-gray-300 hover:text-secondary transition-colors">
                  Privacy
                </Link>
              </li>
              <li>
                <Link href="#" className="text-gray-300 hover:text-secondary transition-colors">
                  Compliance
                </Link>
              </li>
            </ul>
            <div className="flex gap-4">
              <a href="mailto:info@bantu-bid.com" className="text-gray-300 hover:text-secondary transition-colors text-sm">
                Email
              </a>
              <a href="#" className="text-gray-300 hover:text-secondary transition-colors text-sm">
                LinkedIn
              </a>
              <a href="#" className="text-gray-300 hover:text-secondary transition-colors text-sm">
                Twitter
              </a>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-700 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-gray-400">
            <p>&copy; 2026 Bantu Bid. All rights reserved.</p>
            <p>
              Built for the Zambian mining sector by industry professionals committed to transparent, compliant procurement.
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}
