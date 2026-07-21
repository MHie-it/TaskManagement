import { ArrowRight, Mail, Users } from 'lucide-react'

const UserListItem = ({ user, team, isSelected, onSelect, avatarText }) => {
    return (

        <>
            <div className="flex items-center gap-3.5 min-w-0">
                <div
                    className={`flex size-11 shrink-0 items-center justify-center rounded-full font-bold text-white shadow-xs transition-transform duration-200 group-hover:scale-105 ${isSelected
                        ? 'bg-gradient-to-br from-blue-600 to-indigo-600 ring-2 ring-blue-500/30'
                        : 'bg-gradient-to-br from-slate-600 to-slate-800 dark:from-zinc-700 dark:to-zinc-800'
                        }`}
                >
                    {avatarText}
                </div>

                <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2">
                        <p className={`truncate font-semibold text-sm ${isSelected ? 'text-blue-950 dark:text-blue-200 font-bold' : 'text-slate-900 dark:text-zinc-100'}`}>
                            {user.FullName}
                        </p>
                        <span className={`shrink-0 rounded-full px-2 py-0.5 text-[10px] font-semibold ${user.TeamId
                            ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-300'
                            : 'bg-amber-100 text-amber-700 dark:bg-amber-950/60 dark:text-amber-300'
                            }`}>
                            {user.TeamId ? 'Đã có team' : 'Tự do'}
                        </span>
                    </div>

                    <p className="mt-0.5 truncate text-xs text-slate-500 dark:text-zinc-400 flex items-center gap-1">
                        <Mail className="size-3 text-slate-400 shrink-0" />
                        <span className="truncate">{user.Email}</span>
                    </p>

                    <div className="mt-2 flex flex-wrap items-center gap-2 text-[11px] text-slate-500 dark:text-zinc-400">
                        <span className="inline-flex items-center gap-1 rounded-md bg-slate-100 dark:bg-zinc-800 px-2 py-0.5 font-medium">
                            <Users className="size-3 text-slate-400" />
                            {team?.Name || team?.name || 'Chưa vào team'}
                        </span>
                    </div>
                </div>
            </div>

            <div className="shrink-0 flex items-center">
                <span className={`p-1.5 rounded-full transition-colors ${isSelected ? 'bg-blue-600 text-white' : 'text-slate-300 group-hover:text-slate-400'}`}>
                    <ArrowRight className="size-4" />
                </span>
            </div>
        </>
        // <button
        //   type="button"
        //   onClick={() => onSelect(user.UserId)}
        //   className={`relative flex w-full items-center justify-between gap-3 p-4 text-left transition-all duration-200 group ${isSelected
        //     ? 'bg-blue-50/70 dark:bg-blue-950/30'
        //     : 'hover:bg-slate-50/80 dark:hover:bg-zinc-800/40'
        //   }`}
        // >
        //   {isSelected && (
        //     <span className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-blue-600 to-indigo-600 rounded-r-full"></span>
        //   )}


        // </button>
    )
}

export default UserListItem
