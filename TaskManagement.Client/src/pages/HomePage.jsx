import { useState, useEffect } from 'react'
import { Plus } from 'lucide-react'
import { Link } from 'react-router'
import Header from '@/components/layout/Header.jsx'
import Background from '@/components/layout/Background.jsx'
import { Button } from '@/components/ui/button'
import StatsInfor from '@/components/home/StatsInfor.jsx'
import TeamGrid from '@/components/team/TeamGrid.jsx'
import AddUserDialog from '@/components/user/AddUserDialog'
import TaskBoard from '@/components/task/TaskBoard'
import { TeamService } from '@/services/TeamService'
import { UserService } from '@/services/UserService'
import { TaskService } from '@/services/TaskService'

const normalizeTeams = (data = []) =>
  data.map((team) => ({
    teamId: team.teamId ?? team.TeamId,
    name: team.name ?? team.Name,
    description: team.description ?? team.Description,
  }))

const normalizeUsers = (data = []) =>
  data.map((user) => ({
    UserId: user.UserId ?? user.userId,
    TeamId: user.TeamId ?? user.teamId,
    FullName: user.FullName ?? user.fullName,
    Email: user.Email ?? user.email,
  }))

const HomePage = () => {
  const [filter, setFilter] = useState('All')
  const [open, setOpen] = useState(false)
  const [teams, setTeams] = useState([])
  const [users, setUsers] = useState([])
  const [tasks, setTasks] = useState([])

  const loadData = async () => {
    try {
      const [teamsData, usersData, tasksData] = await Promise.all([
        TeamService.getAllTeam(),
        UserService.getAllUser(),
        TaskService.getAllTask(),
      ])
      setTeams(normalizeTeams(teamsData))
      setUsers(normalizeUsers(usersData))
      setTasks(tasksData)
    } catch (err) {
      console.error('Error loading home data:', err)
    }
  }

  useEffect(() => {
    loadData()
  }, [])

  const handleAddUser = async (userPayload) => {
    try {
      await UserService.addUser(userPayload)
      await loadData()
      setOpen(false)
    } catch (err) {
      console.error(err)
    }
  }

  const filteredTasks =
    filter === 'All'
      ? tasks
      : tasks.filter((t) => t.status === filter)

  const statsInfor = {
    totalTeam: teams.length,
    totalMembers: users.length,
    totalTask: tasks.length,
    taskCompleted: tasks.filter((t) => t.status === 'Done').length,
  }

  const teamsWithMembers = teams.map((team) => ({
    ...team,
    memberCount: users.filter((user) => user.TeamId === team.teamId).length,
  }))

  const stats = {
    total: tasks.length,
    inProgress: tasks.filter((t) => t.status === 'In Progress').length,
    done: tasks.filter((t) => t.status === 'Done').length,
    overdue: tasks.filter(
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
            New User
          </Button>
        </section>

        <AddUserDialog open={open} onOpenChange={setOpen} onSubmit={handleAddUser} />

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

        <TaskBoard tasks={filteredTasks} filter={filter} />

      </main>
    </Background>
  )
}

export default HomePage
