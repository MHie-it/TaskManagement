import React from 'react'
import { cn } from '@/components/lib/utils'
import { Card, CardHeader } from '../ui/card'
import { glassCard } from '../lib/style'
import { Users } from 'lucide-react'

const TeamCard = ({ name, description, memberCount }) => {
    return (
        <Card className={cn(glassCard,
            'rounded-2xl border border-white/20 bg-white/70 shadow-lg backdrop-blur-xl',
            'hover:bg-blue-500/10',)}>
            <CardHeader className="pb-2">
                <div className="flex items-center justify-between gap-2">
                    <h3 className="text-lg font-semibold">{name}</h3>
                    <p className=" flex gap-3 text-xl font-bold text-foreground">
                        {memberCount}
                        <Users />
                    </p>
                </div>
                <p className="text-sm text-muted-foreground">
                    {description}
                </p>
            </CardHeader>
        </Card>
    )
}

export default TeamCard