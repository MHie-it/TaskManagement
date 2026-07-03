import { useState } from 'react'
import { Plus } from 'lucide-react'
import Header from '@/components/layout/Header.jsx'
import Background from '@/components/layout/Background.jsx'
import { Button } from '@/components/ui/button'
import TaskFilterBar from '@/components/home/TaskFilterBar.jsx'
import TaskGrid from '@/components/home/TaskGrid.jsx'
import AddTaskDialog from "@/components/task/AddTaskDialog";
import StatsInfor from '@/components/home/StatsInfor.jsx'
import TeamGrid from '@/components/home/TeamGrid.jsx'

const MOCK_USERS = [
  {
    UserId: 1,
    RoleId: 1,
    TeamId: 1,
    UserName: "johndoe",
    HashPass: "123456",
    FullName: "John Doe",
    Email: "john.doe@example.com",
    Phone: "0901111111",
    Bod: "1998-05-10",
    Address: "Ho Chi Minh City",
    Gende: "Male",
    isDeleted: false,
  },
  {
    UserId: 2,
    RoleId: 2,
    TeamId: 1,
    UserName: "janesmith",
    HashPass: "123456",
    FullName: "Jane Smith",
    Email: "jane.smith@example.com",
    Phone: "0902222222",
    Bod: "1999-03-20",
    Address: "Ha Noi",
    Gende: "Female",
    isDeleted: false,
  },
  {
    UserId: 3,
    RoleId: 2,
    TeamId: 2,
    UserName: "michaellee",
    HashPass: "123456",
    FullName: "Michael Lee",
    Email: "michael.lee@example.com",
    Phone: "0903333333",
    Bod: "1997-08-15",
    Address: "Da Nang",
    Gende: "Male",
    isDeleted: false,
  },
  {
    UserId: 4,
    RoleId: 2,
    TeamId: 2,
    UserName: "emilytran",
    HashPass: "123456",
    FullName: "Emily Tran",
    Email: "emily.tran@example.com",
    Phone: "0904444444",
    Bod: "2000-01-05",
    Address: "Can Tho",
    Gende: "Female",
    isDeleted: false,
  },
  {
    UserId: 5,
    RoleId: 2,
    TeamId: 3,
    UserName: "davidpham",
    HashPass: "123456",
    FullName: "David Pham",
    Email: "david.pham@example.com",
    Phone: "0905555555",
    Bod: "1998-11-08",
    Address: "Hai Phong",
    Gende: "Male",
    isDeleted: false,
  },
  {
    UserId: 6,
    RoleId: 2,
    TeamId: 3,
    UserName: "sophianguyen",
    HashPass: "123456",
    FullName: "Sophia Nguyen",
    Email: "sophia.nguyen@example.com",
    Phone: "0906666666",
    Bod: "1999-07-18",
    Address: "Hue",
    Gende: "Female",
    isDeleted: false,
  },
  {
    UserId: 7,
    RoleId: 2,
    TeamId: 4,
    UserName: "williamho",
    HashPass: "123456",
    FullName: "William Ho",
    Email: "william.ho@example.com",
    Phone: "0907777777",
    Bod: "1996-09-30",
    Address: "Ho Chi Minh City",
    Gende: "Male",
    isDeleted: false,
  },
  {
    UserId: 8,
    RoleId: 2,
    TeamId: 4,
    UserName: "oliviale",
    HashPass: "123456",
    FullName: "Olivia Le",
    Email: "olivia.le@example.com",
    Phone: "0908888888",
    Bod: "1998-02-14",
    Address: "Nha Trang",
    Gende: "Female",
    isDeleted: false,
  },
  {
    UserId: 9,
    RoleId: 2,
    TeamId: 5,
    UserName: "danielvu",
    HashPass: "123456",
    FullName: "Daniel Vu",
    Email: "daniel.vu@example.com",
    Phone: "0909999999",
    Bod: "1997-12-01",
    Address: "Bien Hoa",
    Gende: "Male",
    isDeleted: false,
  },
  {
    UserId: 10,
    RoleId: 2,
    TeamId: 5,
    UserName: "gracepham",
    HashPass: "123456",
    FullName: "Grace Pham",
    Email: "grace.pham@example.com",
    Phone: "0910000000",
    Bod: "2000-06-25",
    Address: "Vung Tau",
    Gende: "Female",
    isDeleted: false,
  },
];

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

const MOCK_TEAMS = [
  {
    TeamId: 1,
    Name: "Frontend Team",
    Description: "Responsible for developing user interfaces using React and Tailwind CSS."
  }, {
    TeamId: 2,
    Name: "Backend Team",
    Description: "Develops RESTful APIs, business logic, and database integration using ASP.NET Core."
  }, {
    TeamId: 3,
    Name: "QA Team",
    Description: "Ensures software quality through manual and automated testing."
  }, {
    TeamId: 4,
    Name: "DevOps Team",
    Description: "Manages CI/CD pipelines, deployment, monitoring, and cloud infrastructure."
  }, {
    TeamId: 5,
    Name: "UI/UX Team",
    Description: "Designs intuitive user experiences and modern user interfaces."
  }
]

const HomePage = () => {
  const [filter, setFilter] = useState('All')

  const [open, setOpen] = useState(false);

  const filteredTasks =
    filter === 'All'
      ? MOCK_TASKS
      : MOCK_TASKS.filter((t) => t.status === filter)

  const statsInfor = {
    totalTeam: MOCK_TEAMS.length,
    totalMembers: MOCK_USERS.length,
    totalTask: MOCK_TASKS.length,
    taskCompleted: MOCK_TASKS.filter((t) => t.status === 'Done').length
  }

  const statsTeam = {
    membersByTeam: MOCK_TEAMS.map((team) => ({
      teamId: team.TeamId,
      name: team.Name,
      description: team.Description,
      memberCount: MOCK_USERS.filter((user) => user.TeamId === team.TeamId).length
    }))
  }

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

        {/* Stats */}

        <StatsInfor statsInfor={statsInfor} />

        {/* TeamGrid */}
        <div>
          <h2 className="text-2xl font-semibold tracking-tight text-foreground md:text-3xl">
            MY TEAMS
          </h2>
          <p className="mt-1 text-muted-foreground">
            You have {statsInfor.totalTeam} teams.
          </p>
        </div>

        <section className="space-y-4 max-h-[400px] overflow-y-auto scrollbar-hide pb-4">
          <TeamGrid teams={statsTeam.membersByTeam} />
        </section>


        {/* Filter + Task grid */}

        <section className="space-y-4 pb-4">
          <TaskFilterBar filter={filter} onChange={setFilter} />
          <TaskGrid tasks={filteredTasks} filter={filter} />
        </section>

      </main>
    </Background>
  )

}
export default HomePage

