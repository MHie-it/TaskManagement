import StatCard from '@/components/home/StatCard.jsx'
import { CheckCircle2, ListTodo, UserRoundCheck, Users } from 'lucide-react'

const StatsInfor = ({ statsInfor }) => {
    return (
        <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <StatCard
                label="Total Teams"
                value={statsInfor.totalTeam}
                icon={Users}
                accent="bg-blue-500/10 text-blue-600"
            />

            <StatCard
                label="Total Members"
                value={statsInfor.totalMembers}
                icon={UserRoundCheck}
                accent="bg-blue-500/10 text-blue-600"
            />

            <StatCard
                label="Total Task"
                value={statsInfor.totalTask}
                icon={ListTodo}
                accent="bg-blue-500/10 text-blue-600"
            />

            <StatCard
                label="Task Completed"
                value={statsInfor.taskCompleted}
                icon={CheckCircle2}
                accent="bg-blue-500/10 text-blue-600"
            />

        </section>
    )
}

export default StatsInfor