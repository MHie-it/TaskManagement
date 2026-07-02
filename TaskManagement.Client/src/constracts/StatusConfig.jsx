import { ListTodo, Clock, CheckCircle2 } from 'lucide-react'

export const StatusConfig = {
  Todo: { variant: 'outline', icon: ListTodo, color: 'text-muted-foreground' },
  'In Progress': { variant: 'secondary', icon: Clock, color: 'text-blue-600' },
  Done: { variant: 'default', icon: CheckCircle2, color: 'text-green-600' },
}