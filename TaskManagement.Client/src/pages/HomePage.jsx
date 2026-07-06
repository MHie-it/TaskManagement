import { useState } from 'react'
import { Plus } from 'lucide-react'
import { Link } from 'react-router'
import Header from '@/components/layout/Header.jsx'
import Background from '@/components/layout/Background.jsx'
import { Button } from '@/components/ui/button'
import TaskFilterBar from '@/components/home/TaskFilterBar.jsx'
import TaskGrid from '@/components/home/TaskGrid.jsx'
import AddTaskDialog from '@/components/task/AddTaskDialog'
import StatsInfor from '@/components/home/StatsInfor.jsx'
import TeamGrid from '@/components/team/TeamGrid.jsx'
import { MOCK_TEAMS, MOCK_USERS, buildTeamsWithMembers } from '@/data/mockTeams'
import { MOCK_TASKS } from '@/data/mockTasks'

const HomePage = () => {
  const [filter, setFilter] = useState('All')
  const [open, setOpen] = useState(false)

  const filteredTasks =
    filter === 'All'
      ? MOCK_TASKS
      : MOCK_TASKS.filter((t) => t.status === filter)

  const statsInfor = {
    totalTeam: MOCK_TEAMS.length,
    totalMembers: MOCK_USERS.length,
    totalTask: MOCK_TASKS.length,
    taskCompleted: MOCK_TASKS.filter((t) => t.status === 'Done').length,
  }

  const teamsWithMembers = buildTeamsWithMembers(MOCK_TEAMS, MOCK_USERS)

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
      <main className="mx-auto mt-8 w-[min(100%-2rem,72rem)] space-y-8 pb-12">
        <section className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-2xl font-semibold tracking-tight text-foreground md:text-3xl">
              Good morning 👋
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

        <StatsInfor statsInfor={statsInfor} />

        <div className="flex items-end justify-between gap-4">
          <div>
            <h2 className="text-2xl font-semibold tracking-tight text-foreground md:text-3xl">
              My Teams
            </h2>
            <p className="mt-1 text-muted-foreground">
              You have {statsInfor.totalTeam} teams.
            </p>
          </div>
          <Button variant="outline" size="sm" asChild>
            <Link to="/teams">View all</Link>
          </Button>
        </div>

        <section className="space-y-4 max-h-[400px] overflow-y-auto scrollbar-hide pb-4">
          <TeamGrid teams={teamsWithMembers} />
        </section>

        <section className="space-y-4 pb-4">
          <TaskFilterBar filter={filter} onChange={setFilter} />
          <TaskGrid tasks={filteredTasks} filter={filter} />
        </section>
      </main>
    </Background>
  )
}

export default HomePage
