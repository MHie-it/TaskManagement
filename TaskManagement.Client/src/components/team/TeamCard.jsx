import { cn } from '@/components/lib/utils'
import { Card, CardHeader } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { glassCard } from '@/components/lib/style'
import { Pencil, Users } from 'lucide-react'

const TeamCard = ({ team, onClick, onEdit }) => {
  const clickable = Boolean(onClick)

  return (
    <Card
      className={cn(
        glassCard,
        'relative ring-0 transition hover:bg-blue-500/10 hover:shadow-xl',
        clickable && 'cursor-pointer'
      )}
      onClick={onClick}
    >
      {onEdit && (
        <Button
          variant="ghost"
          size="icon-sm"
          className="absolute top-2 right-2 z-10 text-muted-foreground hover:text-foreground"
          onClick={(e) => {
            e.stopPropagation()
            onEdit()
          }}
        >
          <Pencil className="size-4" />
          <span className="sr-only">Edit team</span>
        </Button>
      )}

      <CardHeader className="pb-2">
        <div className="flex items-center justify-between gap-2 pr-8">
          <h3 className="text-lg font-semibold">{team.name}</h3>
          <p className="flex items-center gap-2 text-xl font-bold text-foreground">
            {team.memberCount}
            <Users className="size-5" />
          </p>
        </div>
        <p className="text-sm text-muted-foreground line-clamp-2">
          {team.description}
        </p>
      </CardHeader>
    </Card>
  )
}

export default TeamCard
