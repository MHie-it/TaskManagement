import { Card, CardContent } from '@/components/ui/card'
import { cn } from '@/components/lib/utils'
import { glassCard } from '@/components/lib/style'
import TaskCard from '@/components/home/TaskCard.jsx'

const TaskGrid = ({ tasks, filter }) => {
    if (tasks.length === 0) {
        return (
            <Card className={cn(glassCard, 'col-span-full ring-0')}>
                <CardContent className="py-12 text-center text-muted-foreground">
                    No tasks found for &quot;{filter}&quot;.
                </CardContent>
            </Card>
        )
    }
    return (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {tasks.map((task) => (
                <TaskCard key={task.id} task={task} />
            ))}
        </div>
    )
}

export default TaskGrid