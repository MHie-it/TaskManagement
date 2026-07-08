import { Calendar, Mail, MapPin, Phone, UserCheck } from 'lucide-react'

const InforCard = ({ user }) => {
    return (
        <div className="space-y-6">
            <h3 className="text-base font-bold text-foreground uppercase tracking-wider border-b border-gray-100 dark:border-zinc-800 pb-2">
                My Profile
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="flex items-start gap-3">
                    <div className="p-2 rounded-lg bg-gray-50 dark:bg-zinc-800 text-muted-foreground">
                        <Mail className="size-5" />
                    </div>
                    <div>
                        <p className="text-xs text-muted-foreground font-medium">Email Address</p>
                        <p className="text-sm font-semibold text-foreground break-all">{user.Email}</p>
                    </div>
                </div>
                <div className="flex items-start gap-3">
                    <div className="p-2 rounded-lg bg-gray-50 dark:bg-zinc-800 text-muted-foreground">
                        <Phone className="size-5" />
                    </div>
                    <div>
                        <p className="text-xs text-muted-foreground font-medium">Phone Number</p>
                        <p className="text-sm font-semibold text-foreground">
                            {user.Phone || <span className="text-muted-foreground/60 italic font-normal">Not provided</span>}
                        </p>
                    </div>
                </div>
                <div className="flex items-start gap-3">
                    <div className="p-2 rounded-lg bg-gray-50 dark:bg-zinc-800 text-muted-foreground">
                        <UserCheck className="size-5" />
                    </div>
                    <div>
                        <p className="text-xs text-muted-foreground font-medium">Gender</p>
                        <p className="text-sm font-semibold text-foreground">
                            {user.Gende === 'Male' ? 'Male' : user.Gende === 'Female' ? 'Female' : user.Gende === 'Other' ? 'Other' : (user.Gende || <span className="text-muted-foreground/60 italic font-normal">Not provided</span>)}
                        </p>
                    </div>
                </div>
                <div className="flex items-start gap-3">
                    <div className="p-2 rounded-lg bg-gray-50 dark:bg-zinc-800 text-muted-foreground">
                        <Calendar className="size-5" />
                    </div>
                    <div>
                        <p className="text-xs text-muted-foreground font-medium">Date of Birth</p>
                        <p className="text-sm font-semibold text-foreground">
                            {user.Bod || <span className="text-muted-foreground/60 italic font-normal">Not provided</span>}
                        </p>
                    </div>
                </div>
            </div>
            <div className="flex items-start gap-3 border-t border-gray-50 dark:border-zinc-850 pt-4">
                <div className="p-2 rounded-lg bg-gray-50 dark:bg-zinc-800 text-muted-foreground shrink-0">
                    <MapPin className="size-5" />
                </div>
                <div>
                    <p className="text-xs text-muted-foreground font-medium">Email Address</p>
                    <p className="text-sm font-semibold text-foreground mt-1 whitespace-pre-line leading-relaxed">
                        {user.Email || <span className="text-muted-foreground/60 italic font-normal">Not provided</span>}
                    </p>
                </div>
            </div>
        </div>
    )
}

export default InforCard