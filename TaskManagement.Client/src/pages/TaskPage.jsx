import StatSection from '@/components/home/StatSection'
import TaskFilterBar from '@/components/home/TaskFilterBar'
import TaskGrid from '@/components/home/TaskGrid'
import Background from '@/components/layout/Background'
import Header from '@/components/layout/Header'
import AddTaskDialog from '@/components/task/AddTaskDialog'
import { Button } from '@/components/ui/button'
import { Plus } from 'lucide-react'
import { useState } from 'react'

const MOCK_TASKS = [
    {
        id: 1,
        title: 'Thiết kế giao diện Home',
        description: 'Hoàn thiện layout trang chủ với stats và task list',
        status: 'In Progress',
        priority: 'High',
        dueDate: '2026-07-05',
    },
    {
        id: 2,
        title: 'Kết nối API GetAllTasks',
        description: 'Gọi axios tới /api/Task/GetAllTasks',
        status: 'Todo',
        priority: 'Medium',
        dueDate: '2026-07-10',
    },
    {
        id: 3,
        title: 'Viết unit test TaskService',
        description: 'Cover AddTask, UpdateTask, GetAllTasks',
        status: 'Done',
        priority: 'Low',
        dueDate: '2026-06-28',
    },
    {
        id: 4,
        title: 'Review PR team module',
        description: 'Kiểm tra TeamController và UI Teams',
        status: 'Todo',
        priority: 'High',
        dueDate: '2026-06-25',
    },
]

const TaskPage = () => {
    const [filter, setFilter] = useState('All');
    const [open, setOpen] = useState(false);

    const filteredTasks =
        filter === 'All'
            ? MOCK_TASKS
            : MOCK_TASKS.filter((t) => t.status === filter)

    const stats = {
        total: MOCK_TASKS.length,
        inProgress: MOCK_TASKS.filter((t) => t.status === 'In Progress').length,
        done: MOCK_TASKS.filter((t) => t.status === 'Done').length,
        overdue: MOCK_TASKS.filter(
            (t) => t.status !== 'Done' && new Date(t.dueDate) < new Date()
        ).length,
    }

    return (
        <Background>
            <Header />
            <main className="mx-auto mt-4  pb-8 w-[min(100%-2rem,72rem)] space-y-8">
                <section className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                        <h1 className="text-2xl font-semibold tracking-tight text-foreground md:text-3xl">
                            Good morning 👋
                        </h1>
                        <p className="mt-1 text-muted-foreground">
                            You have {stats.inProgress} tasks in progress today.
                        </p>
                    </div>
                    <Button className="gap-2 shrink-0"
                        onClick={() => setOpen(true)}>
                        <Plus className="size-4" />
                        New Task
                        <AddTaskDialog
                            open={open}
                            onOpenChange={setOpen}
                        />
                    </Button>
                </section>

                <StatSection stats={stats} />


                {/* Filter + Task grid */}

                <section className="space-y-4 pb-4">
                    <TaskFilterBar filter={filter} onChange={setFilter} />
                    <TaskGrid tasks={filteredTasks} filter={filter} />
                </section>

            </main>
        </Background>
    )
}

export default TaskPage