import { Home, Users, Search, LayoutGrid, CircleUserRound, NotebookPen } from 'lucide-react'
import { Link, useLocation } from 'react-router'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { cn } from '@/components/lib/utils'

const navItems = [
  { label: 'Home', icon: Home, path: '/' },
  { label: 'Teams', icon: Users, path: '/teams' },
  { label: 'Tasks', icon: NotebookPen, path: '/tasks' },
  { label: 'Profile', icon: CircleUserRound, path: '/profile' },
]

const Header = () => {
  const location = useLocation()

  const isActive = (path) => {
    if (path === '/') return location.pathname === '/'
    return location.pathname.startsWith(path)
  }

  return (
    <header className="sticky top-0 z-50 mx-auto mt-4 w-[min(100%-2rem,72rem)]">
      <div
        className={cn(
          'flex items-center justify-between gap-4 rounded-2xl border border-white/20',
          'bg-white/70 px-4 py-3 shadow-lg backdrop-blur-xl',
          'dark:bg-black/40 dark:border-white/10'
        )}
      >
        <Link to="/" className="flex items-center gap-2.5 shrink-0">
          <div className="flex size-9 items-center justify-center rounded-xl bg-blue-500/10 text-blue-600">
            <LayoutGrid className="size-5" />
          </div>
          <span className="text-lg font-semibold tracking-tight text-foreground">
            Tasks<span className="text-blue-600">Hub</span>
          </span>
        </Link>

        <nav className="hidden md:flex items-center gap-1">
          {navItems.map(({ label, icon: Icon, path }) => {
            const active = isActive(path)

            return (
              <Button
                key={label}
                asChild
                variant={active ? 'secondary' : 'ghost'}
                size="sm"
                className={cn(
                  'gap-1.5',
                  active && 'bg-blue-500/10 text-blue-700 hover:bg-blue-500/15'
                )}
              >
                <Link to={path}>
                  {Icon && <Icon className="size-4" />}
                  {label}
                </Link>
              </Button>
            )
          })}
        </nav>

        <div className="flex items-center gap-3">
          <div className="relative hidden sm:block">
            <Search className="absolute left-2.5 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Search tasks..."
              className="w-48 pl-8 md:w-56"
            />
          </div>
          <Avatar size="sm">
            <AvatarImage src="" alt="Profile" />
            <AvatarFallback className="bg-blue-500/10 text-blue-700 text-xs font-medium">
              H
            </AvatarFallback>
          </Avatar>
        </div>
      </div>
    </header>
  )
}

export default Header
