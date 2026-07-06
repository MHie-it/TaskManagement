export const MOCK_TASKS = [
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
