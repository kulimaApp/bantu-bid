export type UserRole = 'supplier' | 'admin'

export interface User {
  id: string
  email: string
  name: string
  role: UserRole
  companyId?: string
  createdAt: Date
}

export interface Company {
  id: string
  name: string
  registrationNumber: string
  sector: string
  location: string
  employees: number
  description: string
  localContentPercentage: number
  certifications: string[]
  capabilities: string[]
  logo?: string
  website?: string
  contactPerson: string
  contactEmail: string
  contactPhone: string
  createdAt: Date
  updatedAt: Date
}

export interface Tender {
  id: string
  title: string
  description: string
  miningSite: string
  sector: string
  budget: number
  minLocalContent: number
  deadline: Date
  status: 'open' | 'closing_soon' | 'closed' | 'awarded'
  requirements: string[]
  specifications: string[]
  postedDate: Date
  awardedTo?: string
  postedBy: string
}

export interface Consortium {
  id: string
  name: string
  description: string
  members: ConsortiumMember[]
  leader: string
  status: 'forming' | 'active' | 'inactive'
  localContentPercentage: number
  combinedCapabilities: string[]
  createdAt: Date
  updatedAt: Date
}

export interface ConsortiumMember {
  companyId: string
  companyName: string
  role: 'leader' | 'member'
  capabilities: string[]
  localContent: number
  joinedAt: Date
}

export interface Match {
  id: string
  consortiumId: string
  tenderId: string
  score: number
  reason: string
  createdAt: Date
}

export interface ComplianceStatus {
  consortiumId: string
  localContentPercentage: number
  requiredPercentage: number
  compliant: boolean
  gap: number
  recommendations: string[]
  lastCalculated: Date
}

export interface SavedTender {
  userId: string
  tenderId: string
  savedAt: Date
}
