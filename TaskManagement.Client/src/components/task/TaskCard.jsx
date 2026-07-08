import { Calendar, Flag } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { cn } from '@/components/lib/utils'
import { glassCard } from '@/components/lib/style'    
import { StatusConfig } from '@/constracts/StatusConfig.jsx'
import { PriorityConfig } from '@/constracts/PriorityConfig.jsx'

const TaskCard = ({ task }) => {
    const status = StatusConfig[task.status] ?? StatusConfig.Todo
    const StatusIcon = status.icon
    return (
        <Card className={cn(glassCard, 'ring-0 transition hover:shadow-xl')}>
            <CardHeader className="pb-2">
                <div className="flex items-start justify-between gap-2">
                    <CardTitle className="text-base">{task.title}</CardTitle>
                    <Badge variant={PriorityConfig[task.priority] ?? 'outline'}>
                        <Flag className="size-3" />
                        {task.priority}
                    </Badge>
                </div>
                <CardDescription className="line-clamp-2">
                    {task.description}
                </CardDescription>
            </CardHeader>
            <CardContent className="flex items-center justify-between">
                <Badge variant={status.variant} className={status.color}>
                    <StatusIcon className="size-3" />
                    {task.status}
                </Badge>
                <span className="flex items-center gap-1 text-xs text-muted-foreground">
                    <Calendar className="size-3.5" />
                    {task.dueDate}
                </span>
            </CardContent>
        </Card>
    )
}

export default TaskCard