import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { cn } from '@/components/lib/utils'
import { glassCard } from '@/components/lib/style'
import { Mail, Pencil, Users } from 'lucide-react'

function getInitials(name) {
  return name
    .split(' ')
    .map((part) => part[0])
    .join('')
    .slice(0, 2)
    .toUpperCase()
}

const TeamMembersDialog = ({ open, onOpenChange, team, members, onEdit }) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-lg">
        <DialogHeader>
          <DialogTitle>{team?.name ?? 'Team Members'}</DialogTitle>
          <DialogDescription>{team?.description}</DialogDescription>
        </DialogHeader>

        <div className="flex items-center justify-between gap-3">
          <p className="flex items-center gap-2 text-sm text-muted-foreground">
            <Users className="size-4" />
            {members.length} member{members.length !== 1 ? 's' : ''}
          </p>
          {onEdit && (
            <Button variant="outline" size="sm" className="gap-1.5" onClick={onEdit}>
              <Pencil className="size-3.5" />
              Edit Team
            </Button>
          )}
        </div>

        <div className="max-h-80 space-y-2 overflow-y-auto pr-1">
          {members.length > 0 ? (
            members.map((member) => (
              <div
                key={member.UserId}
                className={cn(glassCard, 'flex items-center gap-3 p-3 ring-0')}
              >
                <Avatar size="sm">
                  <AvatarFallback className="bg-blue-500/10 text-blue-700 text-xs font-medium">
                    {getInitials(member.FullName)}
                  </AvatarFallback>
                </Avatar>
                <div className="min-w-0 flex-1">
                  <p className="truncate font-medium">{member.FullName}</p>
                  <p className="flex items-center gap-1 truncate text-sm text-muted-foreground">
                    <Mail className="size-3.5 shrink-0" />
                    {member.Email}
                  </p>
                </div>
              </div>
            ))
          ) : (
            <div className={cn(glassCard, 'py-8 text-center text-sm text-muted-foreground ring-0')}>
              No members in this team yet.
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  )
}

export default TeamMembersDialog
