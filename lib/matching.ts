import { Tender, Consortium, Match } from './types'
import { MOCK_TENDERS } from './mockData'

interface MatchingScore {
  consortiumId: string
  tenderId: string
  score: number
  reason: string
  skillMatch: number
  localContentMatch: number
  experienceMatch: number
}

function calculateSkillMatch(consortiumCapabilities: string[], tenderRequirements: string[]): number {
  if (tenderRequirements.length === 0) return 50
  
  const matches = tenderRequirements.filter((req) =>
    consortiumCapabilities.some((cap) => cap.toLowerCase().includes(req.toLowerCase()) || req.toLowerCase().includes(cap.toLowerCase()))
  )
  
  return (matches.length / tenderRequirements.length) * 40
}

function calculateLocalContentMatch(
  consortiumLocalContent: number,
  requiredLocalContent: number
): number {
  if (consortiumLocalContent >= requiredLocalContent) {
    return 30
  }
  
  const gap = requiredLocalContent - consortiumLocalContent
  const score = Math.max(0, 30 - (gap * 0.5))
  return score
}

function calculateExperienceMatch(
  sectorAlignments: number,
  consortiumSize: number
): number {
  const sizeScore = Math.min(10, consortiumSize * 5)
  const experienceScore = Math.min(20, sectorAlignments * 5)
  return sizeScore + experienceScore
}

export function matchConsortiaToTender(
  tender: Tender,
  consortia: Consortium[]
): { matches: Match[]; scoreDetails: MatchingScore[] } {
  const scoreDetails: MatchingScore[] = consortia
    .map((consortium) => {
      const skillMatch = calculateSkillMatch(
        consortium.combinedCapabilities,
        tender.requirements
      )
      
      const localContentMatch = calculateLocalContentMatch(
        consortium.localContentPercentage,
        tender.minLocalContent
      )
      
      const experienceMatch = calculateExperienceMatch(
        0,
        consortium.members.length
      )
      
      const score = Math.round(skillMatch + localContentMatch + experienceMatch)
      
      let reason = 'Match based on '
      const reasons: string[] = []
      
      if (skillMatch > 20) reasons.push('capabilities')
      if (localContentMatch > 20) reasons.push('local content')
      if (experienceMatch > 10) reasons.push('consortium strength')
      
      reason += reasons.join(', ')
      
      return {
        consortiumId: consortium.id,
        tenderId: tender.id,
        score: Math.min(100, score),
        reason,
        skillMatch,
        localContentMatch,
        experienceMatch,
      }
    })
    .filter((detail) => detail.score >= 70)
    .sort((a, b) => b.score - a.score)
    .slice(0, 5)

  const matches: Match[] = scoreDetails.map((detail) => ({
    id: `match-${detail.consortiumId}-${detail.tenderId}`,
    consortiumId: detail.consortiumId,
    tenderId: detail.tenderId,
    score: detail.score,
    reason: detail.reason,
    createdAt: new Date(),
  }))

  return { matches, scoreDetails }
}

export function getTenderMatches(tenderId: string, consortia: Consortium[]): Match[] {
  const tender = MOCK_TENDERS.find((t) => t.id === tenderId)
  if (!tender) return []

  const { matches } = matchConsortiaToTender(tender, consortia)
  return matches
}

export function getConsortiumMatches(consortiumId: string, tenders: Tender[]): Match[] {
  const matches: Match[] = []

  tenders.forEach((tender) => {
    matches.push({
      id: `match-${consortiumId}-${tender.id}`,
      consortiumId,
      tenderId: tender.id,
      score: 0,
      reason: '',
      createdAt: new Date(),
    })
  })

  return matches
}

export function getRecommendedTenders(
  consortium: Consortium,
  tenders: Tender[]
): Array<{ tender: Tender; score: number; reason: string }> {
  const recommendations = tenders
    .map((tender) => {
      const skillMatch = calculateSkillMatch(
        consortium.combinedCapabilities,
        tender.requirements
      )
      
      const localContentMatch = calculateLocalContentMatch(
        consortium.localContentPercentage,
        tender.minLocalContent
      )
      
      const score = Math.round(skillMatch + localContentMatch)
      
      let reason = 'Recommended based on '
      const reasons: string[] = []
      
      if (skillMatch > 20) reasons.push('your capabilities')
      if (localContentMatch > 20) reasons.push('compliance status')
      if (!reasons.length) reasons.push('relevance')
      
      reason += reasons.join(' and ')

      return {
        tender,
        score: Math.min(100, score),
        reason,
      }
    })
    .filter((rec) => rec.score >= 70)
    .sort((a, b) => b.score - a.score)
    .slice(0, 5)

  return recommendations
}
