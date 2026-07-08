import StatCard from '@/components/home/StatCard.jsx'
import { Building2, UserPlus, UserRoundCheck, Users } from 'lucide-react'

const TeamStatSection = ({ stats }) => {
  return (
    <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      <StatCard
        label="Total Teams"
        value={stats.totalTeams}
        icon={Building2}
        accent="bg-blue-500/10 text-blue-600"
      />
      <StatCard
        label="Total Members"
        value={stats.totalMembers}
        icon={Users}
        accent="bg-blue-500/10 text-blue-600"
      />
      <StatCard
        label="Avg Members / Team"
        value={stats.avgMembers}
        icon={UserRoundCheck}
        accent="bg-green-500/10 text-green-600"
      />
      <StatCard
        label="Largest Team"
        value={stats.largestTeam}
        icon={UserPlus}
        accent="bg-destructive/10 text-destructive"
      />
    </section>
  )
}

export default TeamStatSection
