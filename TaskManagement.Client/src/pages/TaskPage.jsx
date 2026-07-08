import StatSection from '@/components/home/StatSection'
import Background from '@/components/layout/Background'
import Header from '@/components/layout/Header'
import AddTaskDialog from '@/components/task/AddTaskDialog'
import TaskBoard from '@/components/task/TaskBoard'
import { Button } from '@/components/ui/button'
import { MOCK_TASKS } from '@/data/mockTasks'
import { Plus } from 'lucide-react'
import { useState } from 'react'

const TaskPage = () => {
  const [filter, setFilter] = useState('All')
  const [open, setOpen] = useState(false)

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
      <main className="mx-auto mt-4 pb-8 w-[min(100%-2rem,72rem)] space-y-8">
        <section className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-2xl font-semibold tracking-tight text-foreground md:text-3xl">
              Tasks
            </h1>
            <p className="mt-1 text-muted-foreground">
              You have {stats.inProgress} tasks in progress today.
            </p>
          </div>
          <Button className="gap-2 shrink-0" onClick={() => setOpen(true)}>
            <Plus className="size-4" />
            New Task
          </Button>
        </section>

        <AddTaskDialog open={open} onOpenChange={setOpen} />

        <StatSection stats={stats} />

        <TaskBoard tasks={filteredTasks} filter={filter} />
      </main>
    </Background>
  )
}

export default TaskPage
