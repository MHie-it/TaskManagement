import React, { useEffect, useMemo, useState } from 'react'
import Background from '@/components/layout/Background'
import Header from '@/components/layout/Header'
import ProfileCard from '@/components/user/ProfileCard'
import AddUserDialog from '@/components/user/AddUserDialog'
import { UserService } from '@/services/UserService'
import { TeamService } from '@/services/TeamService'
import { toast } from 'sonner'
import { Input } from '@/components/ui/input'
import {
  Card,
  CardContent,
  CardHeader,
} from '@/components/ui/card'
import {
  Search,
  Sparkles,
  Users,
  X,
  ArrowRight,
  Mail,
  UserPlus,
} from 'lucide-react'
import { Button } from '@/components/ui/button'

const normalizeUser = (u) => {
  if (!u) return u
  return {
    ...u,
    UserId: u.UserId ?? u.userId,
    RoleId: u.RoleId ?? u.roleId ?? 2,
    TeamId: u.TeamId ?? u.teamId ?? null,
    UserName: u.UserName ?? u.userName ?? '',
    FullName: u.FullName ?? u.fullName ?? '',
    Email: u.Email ?? u.email ?? '',
    Phone: u.Phone ?? u.phone ?? '',
    Bod: u.Bod ?? u.bod ?? '',
    Address: u.Address ?? u.address ?? '',
    Gende: u.Gende ?? u.gende ?? 'Male',
  }
}

const normalizeTeam = (t) => {
  if (!t) return t
  return {
    ...t,
    TeamId: t.TeamId ?? t.teamId,
    Name: t.Name ?? t.name ?? '',
    Description: t.Description ?? t.description ?? '',
  }
}

const UserPage = () => {
  const [users, setUsers] = useState([])
  const [teams, setTeams] = useState([])
  const [activeUserId, setActiveUserId] = useState(null)
  const [searchTerm, setSearchTerm] = useState('')
  const [teamFilter, setTeamFilter] = useState('all') // 'all' | 'assigned' | 'unassigned'
  const [isAddUserOpen, setIsAddUserOpen] = useState(false)
  const [loading, setLoading] = useState(true)

  const fetchUsers = async () => {
    try {
      const data = await UserService.getAllUser()
      const normalized = (data || []).map(normalizeUser)
      setUsers(normalized)
      if (normalized.length > 0) {
        setActiveUserId((prev) => (normalized.some((u) => u.UserId === prev) ? prev : normalized[0].UserId))
      } else {
        setActiveUserId(null)
      }
    } catch (err) {
      console.error('Lỗi nạp danh sách user:', err)
      toast.error('Không thể tải danh sách người dùng từ server!')
    }
  }

  const fetchTeams = async () => {
    try {
      const data = await TeamService.getAllTeam()
      const normalized = (data || []).map(normalizeTeam)
      setTeams(normalized)
    } catch (err) {
      console.error('Lỗi nạp danh sách team:', err)
    }
  }

  useEffect(() => {
    const initData = async () => {
      setLoading(true)
      await Promise.all([fetchUsers(), fetchTeams()])
      setLoading(false)
    }
    initData()
  }, [])

  const stats = useMemo(() => {
    const total = users.length
    const assigned = users.filter((u) => u.TeamId).length
    const unassigned = total - assigned
    return { total, assigned, unassigned }
  }, [users])

  const filteredUsers = useMemo(() => {
    const query = searchTerm.trim().toLowerCase()

    return users.filter((user) => {
      const matchesSearch =
        !query ||
        [user.FullName, user.UserName, user.Email, user.Phone]
          .filter(Boolean)
          .some((value) => String(value).toLowerCase().includes(query))

      const matchesFilter =
        teamFilter === 'all'
          ? true
          : teamFilter === 'assigned'
            ? Boolean(user.TeamId)
            : !user.TeamId

      return matchesSearch && matchesFilter
    })
  }, [users, searchTerm, teamFilter])

  useEffect(() => {
    if (filteredUsers.length > 0 && !filteredUsers.some((u) => u.UserId === activeUserId)) {
      setActiveUserId(filteredUsers[0].UserId)
    }
  }, [filteredUsers, activeUserId])

  const activeUser =
    filteredUsers.find((u) => u.UserId === activeUserId) ||
    users.find((u) => u.UserId === activeUserId) ||
    null

  const handleSaveUser = async (updatedUser) => {
    try {
      const userId = updatedUser.UserId
      const payload = {
        FullName: updatedUser.FullName,
        Email: updatedUser.Email,
        Phone: updatedUser.Phone,
        Bod: updatedUser.Bod || null,
        Address: updatedUser.Address,
        Gende: updatedUser.Gende,
        TeamId: updatedUser.TeamId || null,
      }
      await UserService.updateUser(userId, payload)
      toast.success('Cập nhật hồ sơ cá nhân thành công!')
      await fetchUsers()
    } catch (err) {
      console.error('Lỗi cập nhật user:', err)
      toast.error(err.message || 'Cập nhật hồ sơ thất bại!')
    }
  }

  const handleAddUser = async (newUserPayload) => {
    try {
      await UserService.addUser(newUserPayload)
      toast.success(`Đã thêm thành viên "${newUserPayload.FullName || newUserPayload.fullName}" thành công!`)
      setIsAddUserOpen(false)
      await fetchUsers()
    } catch (err) {
      console.error('Lỗi thêm user:', err)
      toast.error(err.message || 'Thêm người dùng thất bại!')
    }
  }

  const handleDeleteUser = async (userId) => {
    try {
      await UserService.deleteUser(userId)
      toast.success('Xóa tài khoản người dùng thành công!')
      if (activeUserId === userId) {
        setActiveUserId(null)
      }
      await fetchUsers()
    } catch (err) {
      console.error('Lỗi xóa user:', err)
      toast.error(err.message || 'Xóa người dùng thất bại!')
    }
  }

  const getInitials = (name) => {
    if (!name) return 'U'
    return name
      .split(' ')
      .filter(Boolean)
      .map((part) => part[0])
      .join('')
      .toUpperCase()
      .slice(0, 2)
  }

  return (
    <Background>
      <Header />
      <main className="mx-auto mt-6 w-[min(100%-2rem,1280px)] px-4 pb-20 space-y-6">

        <AddUserDialog
          open={isAddUserOpen}
          onOpenChange={setIsAddUserOpen}
          onSubmit={handleAddUser}
        />

        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-zinc-100 md:text-3xl">
              Quản lý người dùng
            </h1>
            <p className="mt-1 text-sm text-slate-500 dark:text-zinc-400">
              Quản lý thông tin các tài khoản, phân nhóm và hồ sơ cá nhân.
            </p>
          </div>
          <Button className="gap-2 shrink-0 bg-blue-600 hover:bg-blue-700 text-white" onClick={() => setIsAddUserOpen(true)}>
            <UserPlus className="size-4" />
            Thêm User Mới
          </Button>
        </div>

        <div className="grid gap-6 lg:grid-cols-12 items-start">

          <div className="lg:col-span-7 space-y-4">
            <Card className="overflow-hidden border border-slate-200/80 dark:border-zinc-800 bg-white dark:bg-zinc-900 shadow-sm rounded-2xl">

              <CardHeader className="border-b border-slate-100 dark:border-zinc-800 bg-slate-50/70 dark:bg-zinc-900/80 p-4 sm:p-5">
                <div className="space-y-4">

                  <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none border-t border-slate-200/50 dark:border-zinc-800 pt-3">
                    <button
                      type="button"
                      onClick={() => setTeamFilter('all')}
                      className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all ${teamFilter === 'all'
                        ? 'bg-slate-900 text-white dark:bg-white dark:text-zinc-900 shadow-xs'
                        : 'bg-slate-100 text-slate-600 hover:bg-slate-200 dark:bg-zinc-800 dark:text-zinc-400'
                        }`}
                    >
                      Tất cả ({stats.total})
                    </button>
                    <button
                      type="button"
                      onClick={() => setTeamFilter('assigned')}
                      className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all ${teamFilter === 'assigned'
                        ? 'bg-emerald-600 text-white shadow-xs'
                        : 'bg-slate-100 text-slate-600 hover:bg-slate-200 dark:bg-zinc-800 dark:text-zinc-400'
                        }`}
                    >
                      Đã có team ({stats.assigned})
                    </button>
                    <button
                      type="button"
                      onClick={() => setTeamFilter('unassigned')}
                      className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all ${teamFilter === 'unassigned'
                        ? 'bg-amber-600 text-white shadow-xs'
                        : 'bg-slate-100 text-slate-600 hover:bg-slate-200 dark:bg-zinc-800 dark:text-zinc-400'
                        }`}
                    >
                      Chưa phân nhóm ({stats.unassigned})
                    </button>

                    <div className="relative min-w-[220px]">
                      <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-slate-400" />
                      <Input
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        placeholder="Tìm tên, email..."
                        className="h-9 pl-9 pr-8 bg-white dark:bg-zinc-800 border-slate-200 dark:border-zinc-700 text-xs shadow-none"
                      />
                      {searchTerm && (
                        <button
                          onClick={() => setSearchTerm('')}
                          className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                        >
                          <X className="size-3.5" />
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </CardHeader>

              <CardContent className="p-0">
                <div className="max-h-[640px] overflow-y-auto divide-y divide-slate-100 dark:divide-zinc-800/80">
                  {loading ? (
                    <div className="p-8 text-center text-xs text-slate-500">Đang tải danh sách...</div>
                  ) : filteredUsers.length > 0 ? (
                    filteredUsers.map((user) => {
                      const team = teams.find(
                        (t) => t.TeamId === user.TeamId || t.teamId === user.TeamId
                      )
                      const isSelected = activeUser?.UserId === user.UserId

                      return (
                        <button
                          key={user.UserId}
                          type="button"
                          onClick={() => setActiveUserId(user.UserId)}
                          className={`relative flex w-full items-center justify-between gap-3 p-4 text-left transition-all duration-200 group ${isSelected
                            ? 'bg-blue-50/70 dark:bg-blue-950/30'
                            : 'hover:bg-slate-50/80 dark:hover:bg-zinc-800/40'
                            }`}
                        >
                          {isSelected && (
                            <span className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-blue-600 to-indigo-600 rounded-r-full"></span>
                          )}

                          <div className="flex items-center gap-3.5 min-w-0">
                            <div
                              className={`flex size-11 shrink-0 items-center justify-center rounded-full font-bold text-white shadow-xs transition-transform duration-200 group-hover:scale-105 ${isSelected
                                ? 'bg-gradient-to-br from-blue-600 to-indigo-600 ring-2 ring-blue-500/30'
                                : 'bg-gradient-to-br from-slate-600 to-slate-800 dark:from-zinc-700 dark:to-zinc-800'
                                }`}
                            >
                              {getInitials(user.FullName)}
                            </div>

                            <div className="min-w-0 flex-1">
                              <div className="flex items-center gap-2">
                                <p className={`truncate font-semibold text-sm ${isSelected ? 'text-blue-950 dark:text-blue-200 font-bold' : 'text-slate-900 dark:text-zinc-100'
                                  }`}>
                                  {user.FullName}
                                </p>

                                <span
                                  className={`shrink-0 rounded-full px-2 py-0.5 text-[10px] font-semibold ${user.TeamId
                                    ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-300'
                                    : 'bg-amber-100 text-amber-700 dark:bg-amber-950/60 dark:text-amber-300'
                                    }`}
                                >
                                  {user.TeamId ? 'Đã có team' : 'Tự do'}
                                </span>
                              </div>

                              <p className="mt-0.5 truncate text-xs text-slate-500 dark:text-zinc-400 flex items-center gap-1">
                                <Mail className="size-3 text-slate-400 shrink-0" />
                                <span className="truncate">{user.Email}</span>
                              </p>

                              <div className="mt-2 flex flex-wrap items-center gap-2 text-[11px] text-slate-500 dark:text-zinc-400">
                                <span className="inline-flex items-center gap-1 rounded-md bg-slate-100 dark:bg-zinc-800 px-2 py-0.5 font-medium">
                                  <Users className="size-3 text-slate-400" />
                                  {team?.Name || team?.name || 'Chưa vào team'}
                                </span>
                              </div>
                            </div>
                          </div>

                          <div className="shrink-0 flex items-center">
                            <span className={`p-1.5 rounded-full transition-colors ${isSelected ? 'bg-blue-600 text-white' : 'text-slate-300 group-hover:text-slate-400'
                              }`}>
                              <ArrowRight className="size-4" />
                            </span>
                          </div>
                        </button>
                      )
                    })
                  ) : (

                    <div className="flex flex-col items-center justify-center px-6 py-16 text-center">
                      <div className="flex size-14 items-center justify-center rounded-full bg-slate-100 dark:bg-zinc-800 text-slate-400 mb-3">
                        <Sparkles className="size-7" />
                      </div>
                      <p className="font-semibold text-slate-800 dark:text-zinc-200 text-base">
                        Không tìm thấy người dùng!
                      </p>
                      <p className="mt-1 text-xs text-slate-500 dark:text-zinc-400 max-w-xs">
                        Không có tài khoản nào phù hợp với từ khóa "{searchTerm}".
                      </p>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="lg:col-span-5 lg:sticky lg:top-6">
            <ProfileCard
              user={activeUser}
              teams={teams}
              users={users}
              onSave={handleSaveUser}
              onDelete={handleDeleteUser}
              onSelectUser={setActiveUserId}
            />
          </div>

        </div>
      </main>
    </Background>
  )
}

export default UserPage
