import { Clock, CheckCircle2, AlertCircle, ListTodo } from 'lucide-react'
import StatCard from '@/components/home/StatCard.jsx'

const StatSection = ({ stats }) => {
    return (
        <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <StatCard
                label="Total Tasks"
                value={stats.total}
                icon={ListTodo}
                accent="bg-blue-500/10 text-blue-600"
            />
            <StatCard
                label="In Progress"
                value={stats.inProgress}
                icon={Clock}
                accent="bg-blue-500/10 text-blue-600"
            />
            <StatCard
                label="Completed"
                value={stats.done}
                icon={CheckCircle2}
                accent="bg-green-500/10 text-green-600"
            />
            <StatCard
                label="Overdue"
                value={stats.overdue}
                icon={AlertCircle}
                accent="bg-destructive/10 text-destructive"
            />
        </section>
    )
}

export default StatSection