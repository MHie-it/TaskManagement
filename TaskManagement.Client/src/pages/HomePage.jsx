import { useState } from 'react'
import {
  Plus,
  CheckCircle2,
  Clock,
  AlertCircle,
  ListTodo,
  Calendar,
  Flag,
} from 'lucide-react'
import Header from '@/components/ui/Header.jsx'
import Background from '@/components/ui/Background.jsx'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { cn } from '@/components/lib/utils'
// Mock data — sau này thay bằng API
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
const FILTERS = ['All', 'Todo', 'In Progress', 'Done']
const statusConfig = {
  Todo: { variant: 'outline', icon: ListTodo, color: 'text-muted-foreground' },
  'In Progress': { variant: 'secondary', icon: Clock, color: 'text-blue-600' },
  Done: { variant: 'default', icon: CheckCircle2, color: 'text-green-600' },
}
const priorityConfig = {
  High: 'destructive',
  Medium: 'secondary',
  Low: 'outline',
}
const glassCard = cn(
  'rounded-2xl border border-white/20 bg-white/70 shadow-lg backdrop-blur-xl',
  'dark:border-white/10 dark:bg-black/40'
)
function StatCard({ label, value, icon: Icon, accent }) {
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
function TaskCard({ task }) {
  const status = statusConfig[task.status] ?? statusConfig.Todo
  const StatusIcon = status.icon
  return (
    <Card className={cn(glassCard, 'ring-0 transition hover:shadow-xl')}>
      <CardHeader className="pb-2">
        <div className="flex items-start justify-between gap-2">
          <CardTitle className="text-base">{task.title}</CardTitle>
          <Badge variant={priorityConfig[task.priority] ?? 'outline'}>
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
const HomePage = () => {
  const [filter, setFilter] = useState('All')
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
      <main className="mx-auto mt-8 w-[min(100%-2rem,72rem)] space-y-8 pb-12">
        {/* Hero */}
        <section className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-2xl font-semibold tracking-tight text-foreground md:text-3xl">
              Good morning 👋
            </h1>
            <p className="mt-1 text-muted-foreground">
              You have {stats.inProgress} tasks in progress today.
            </p>
          </div>
          <Button className="gap-2 shrink-0">
            <Plus className="size-4" />
            New Task
          </Button>
        </section>
        {/* Stats */}
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
        {/* Filter + Task grid */}
        <section className="space-y-4">
          <div className="flex flex-wrap gap-2">
            {FILTERS.map((item) => (
              <Button
                key={item}
                variant={filter === item ? 'secondary' : 'ghost'}
                size="sm"
                onClick={() => setFilter(item)}
                className={cn(
                  filter === item && 'bg-blue-500/10 text-blue-700 hover:bg-blue-500/15'
                )}
              >
                {item}
              </Button>
            ))}
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {filteredTasks.length > 0 ? (
              filteredTasks.map((task) => (
                <TaskCard key={task.id} task={task} />
              ))
            ) : (
              <Card className={cn(glassCard, 'col-span-full ring-0')}>
                <CardContent className="py-12 text-center text-muted-foreground">
                  No tasks found for &quot;{filter}&quot;.
                </CardContent>
              </Card>
            )}
          </div>
        </section>
      </main>
    </Background>
  )
}
export default HomePage