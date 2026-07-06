import TeamCard from '@/components/team/TeamCard.jsx'
import { cn } from '@/components/lib/utils'
import { Card, CardContent } from '@/components/ui/card'
import { glassCard } from '@/components/lib/style'

const TeamGrid = ({ teams, emptyMessage, onTeamClick, onEditTeam }) => {
  if (!teams.length) {
    return (
      <Card className={cn(glassCard, 'ring-0')}>
        <CardContent className="py-12 text-center text-muted-foreground">
          {emptyMessage ?? 'No teams found.'}
        </CardContent>
      </Card>
    )
  }

  return (
    <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {teams.map((team) => (
        <TeamCard
          key={team.teamId}
          team={team}
          onClick={onTeamClick ? () => onTeamClick(team) : undefined}
          onEdit={onEditTeam ? () => onEditTeam(team) : undefined}
        />
      ))}
    </section>
  )
}

export default TeamGrid
