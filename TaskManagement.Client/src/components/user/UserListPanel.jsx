import { Card, CardContent } from '../ui/card'
import { Sparkles } from 'lucide-react'
import UserListItem from './UserListItem'

const UserListPanel = ({
    filteredUsers,
    teams,
    activeUserId,
    setActiveUserId,
    searchTerm,
    getInitials,
}) => {
    return (
        <Card className="overflow-hidden border border-slate-200/80 dark:border-zinc-800 bg-white dark:bg-zinc-900 shadow-sm rounded-2xl">
            <CardContent className="p-0">
                <div className="max-h-[640px] overflow-y-auto divide-y divide-slate-100 dark:divide-zinc-800/80">
                    {filteredUsers.length > 0 ? (
                        filteredUsers.map((user) => {
                            const team = teams.find((t) => t.TeamId === user.TeamId || t.teamId === user.TeamId)
                            return (
                                <UserListItem
                                    key={user.UserId}
                                    user={user}
                                    team={team}
                                    isSelected={activeUserId === user.UserId}
                                    onSelect={setActiveUserId}
                                    avatarText={getInitials(user.FullName)}
                                />
                            )
                        })
                    ) : (
                        <div className="flex flex-col items-center justify-center px-6 py-16 text-center">
                            <div className="flex size-14 items-center justify-center rounded-full bg-slate-100 dark:bg-zinc-800 text-slate-400 mb-3">
                                <Sparkles className="size-7" />
                            </div>
                            <p className="font-semibold text-slate-800 dark:text-zinc-200 text-base">
                                User not found!
                            </p>
                            <p className="mt-1 text-xs text-slate-500 dark:text-zinc-400 max-w-xs">
                                No account matches the keyword."{searchTerm}".
                            </p>
                        </div>
                    )}
                </div>
            </CardContent>
        </Card>
    )
}

export default UserListPanel
