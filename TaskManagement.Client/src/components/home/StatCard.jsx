import { cn } from '@/components/lib/utils'
import { Card, CardContent } from '@/components/ui/card'
import { glassCard } from '@/components/lib/style'

const StatCard = ({ label, value, icon: Icon, accent }) => {
    return (
        <Card className={cn(glassCard, 'ring-0')}>
            <CardContent className="flex items-center justify-between pt-6">
                <div>
                    <p className="text-sm text-muted-foreground">{label}</p>
                    <p className="text-3xl font-semibold tracking-tight">{value}</p>
                </div>
                <div className={cn('rounded-xl p-3', accent)}>
                    <Icon className="size-5" />
                </div>
            </CardContent>
        </Card>
    )
}

export default StatCard