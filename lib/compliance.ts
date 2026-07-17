import { Consortium, ComplianceStatus, ConsortiumMember } from './types'

const S1_68_THRESHOLD = 70

export function calculateLocalContent(members: ConsortiumMember[]): number {
  if (members.length === 0) return 0
  const totalLocalContent = members.reduce((sum, member) => sum + member.localContent, 0)
  return totalLocalContent / members.length
}

export function checkCompliance(
  consortium: Consortium,
  requiredPercentage: number = S1_68_THRESHOLD
): ComplianceStatus {
  const localContent = consortium.localContentPercentage
  const gap = Math.max(0, requiredPercentage - localContent)
  const compliant = localContent >= requiredPercentage

  const recommendations: string[] = []
  
  if (!compliant) {
    recommendations.push(`Add suppliers with higher local content to reach ${requiredPercentage}%`)
    recommendations.push(`Current gap: ${gap.toFixed(1)}% local content needed`)
  }
  
  if (localContent < 80) {
    recommendations.push('Consider including more Zambian suppliers for competitive advantage')
  }
  
  if (localContent >= 90) {
    recommendations.push('Excellent local content - very competitive for tenders')
  }

  return {
    consortiumId: consortium.id,
    localContentPercentage: localContent,
    requiredPercentage,
    compliant,
    gap,
    recommendations,
    lastCalculated: new Date(),
  }
}

export function getComplianceRating(percentage: number): {
  rating: 'low' | 'medium' | 'high' | 'excellent'
  color: string
  description: string
} {
  if (percentage >= 90) {
    return { rating: 'excellent', color: 'text-green-600', description: 'Excellent' }
  }
  if (percentage >= 80) {
    return { rating: 'high', color: 'text-blue-600', description: 'High' }
  }
  if (percentage >= 70) {
    return { rating: 'medium', color: 'text-amber-600', description: 'Medium' }
  }
  return { rating: 'low', color: 'text-red-600', description: 'Low' }
}

export function getComplianceStatusBadge(
  percentage: number,
  required: number = S1_68_THRESHOLD
): {
  status: 'compliant' | 'non-compliant' | 'warning'
  label: string
  variant: 'default' | 'secondary' | 'destructive' | 'outline'
} {
  if (percentage >= required) {
    return {
      status: 'compliant',
      label: '✓ Compliant',
      variant: 'default',
    }
  }
  if (percentage >= required - 5) {
    return {
      status: 'warning',
      label: '⚠ At Risk',
      variant: 'secondary',
    }
  }
  return {
    status: 'non-compliant',
    label: '✗ Non-Compliant',
    variant: 'destructive',
  }
}
