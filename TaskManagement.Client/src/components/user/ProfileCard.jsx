import { useState, useEffect } from 'react'
import { Card, CardContent } from '../ui/card'
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar'
import { Button } from '../ui/button'
import {
  Shield, Users, Edit3, Save, X, Sparkles, UserCheck
} from 'lucide-react'
import InforCard from './InforCard'
import EditInforCard from './EditInforCard'

const ProfileCard = ({ user, teams = [], users = [], onSave, onSelectUser }) => {
  const [isEditing, setIsEditing] = useState(false)
  const [formData, setFormData] = useState({
    FullName: '',
    Email: '',
    Phone: '',
    Bod: '',
    Address: '',
    Gende: ''
  })
  const [errors, setErrors] = useState({})

  useEffect(() => {
    if (user) {
      setFormData({
        FullName: user.FullName || '',
        Email: user.Email || '',
        Phone: user.Phone || '',
        Bod: user.Bod || '',
        Address: user.Address || '',
        Gende: user.Gende || 'Male'
      })
      setErrors({})
      setIsEditing(false)
    }
  }, [user])

  if (!user) {
    return (
      <Card className="w-full border border-slate-200/70 dark:border-zinc-800 bg-white/90 dark:bg-zinc-900/90 shadow-lg rounded-2xl p-8 text-center backdrop-blur-md">
        <div className="mx-auto flex size-14 items-center justify-center rounded-full bg-slate-100 dark:bg-zinc-800 text-slate-400">
          <Sparkles className="size-6" />
        </div>
        <h3 className="mt-4 font-semibold text-slate-700 dark:text-zinc-300">Chưa chọn người dùng</h3>
        <p className="mt-1 text-xs text-slate-500 dark:text-zinc-500">
          Vui lòng chọn một tài khoản ở danh sách bên trái để xem hồ sơ chi tiết.
        </p>
      </Card>
    )
  }

  const activeTeam = teams.find(t => t.TeamId === user.TeamId || t.teamId === user.TeamId)
  const teamName = activeTeam ? (activeTeam.Name || activeTeam.name) : 'Chưa phân nhóm'

  const roleName = user.RoleId === 1 ? 'Quản trị viên (Admin)' : 'Thành viên (Member)'

  const getInitials = (name) => {
    if (!name) return 'U'
    const parts = name.trim().split(' ').filter(Boolean)
    return parts.map(p => p[0]).join('').toUpperCase().slice(0, 2)
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }))
    }
  }

  const validateForm = () => {
    const newErrors = {}
    if (!formData.FullName.trim()) {
      newErrors.FullName = 'Họ và tên không được để trống'
    }
    if (!formData.Email.trim()) {
      newErrors.Email = 'Email không được để trống'
    } else if (!/\S+@\S+\.\S+/.test(formData.Email)) {
      newErrors.Email = 'Email không đúng định dạng'
    }
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!validateForm()) return

    onSave({
      ...user,
      FullName: formData.FullName,
      Email: formData.Email,
      Phone: formData.Phone,
      Bod: formData.Bod,
      Address: formData.Address,
      Gende: formData.Gende
    })
    setIsEditing(false)
  }

  return (
    <Card className="w-full overflow-hidden border border-slate-200/80 dark:border-zinc-800 bg-white dark:bg-zinc-900 shadow-xl rounded-2xl transition-all duration-300">
  
      <div className="relative h-24 bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-white/20 via-transparent to-transparent"></div>
        <div className="absolute right-3 top-3 flex gap-1.5">
          <span className="inline-flex items-center gap-1 rounded-full bg-white/20 px-2.5 py-0.5 text-[11px] font-medium text-white backdrop-blur-md">
            <UserCheck className="size-3" /> Active Profile
          </span>
        </div>
      </div>

      <CardContent className="relative px-6 pb-6 pt-0">
        <div className="-mt-12 mb-4 flex flex-col items-center sm:flex-row sm:items-end sm:justify-between sm:gap-4">
          <div className="relative group">
            <div className="absolute -inset-1 rounded-full bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500 opacity-75 blur-xs group-hover:opacity-100 transition duration-300"></div>
            <Avatar className="relative h-24 w-24 border-4 border-white dark:border-zinc-900 bg-white dark:bg-zinc-800 shadow-md">
              <AvatarImage src="" alt={user.FullName} />
              <AvatarFallback className="bg-gradient-to-br from-blue-600 to-indigo-700 text-white text-2xl font-bold">
                {getInitials(user.FullName)}
              </AvatarFallback>
            </Avatar>
          </div>

          <div className="mt-3 sm:mt-0 flex items-center gap-2">
            {!isEditing && (
              <Button
                onClick={() => setIsEditing(true)}
                size="sm"
                className="gap-1.5 bg-slate-900 hover:bg-slate-800 dark:bg-white dark:text-zinc-900 dark:hover:bg-zinc-100 text-white shadow-xs"
              >
                <Edit3 className="size-3.5" />
                Update Profile
              </Button>
            )}
          </div>
        </div>

        <div className="mb-6">
          <h2 className="text-xl font-bold text-slate-900 dark:text-zinc-100 flex items-center gap-2">
            {user.FullName}
          </h2>
          <p className="text-sm font-medium text-slate-500 dark:text-zinc-400">
            @{user.UserName || 'user'}
          </p>

          <div className="mt-3 flex flex-wrap gap-2">
            <div className="inline-flex items-center gap-1.5 rounded-full border border-blue-100 dark:border-blue-900/50 bg-blue-50 dark:bg-blue-950/50 px-3 py-1 text-xs font-semibold text-blue-700 dark:text-blue-300">
              <Shield className="size-3.5 text-blue-500" />
              {roleName}
            </div>

            <div className="inline-flex items-center gap-1.5 rounded-full border border-emerald-100 dark:border-emerald-900/50 bg-emerald-50 dark:bg-emerald-950/50 px-3 py-1 text-xs font-semibold text-emerald-700 dark:text-emerald-300">
              <Users className="size-3.5 text-emerald-500" />
              {teamName}
            </div>
          </div>
        </div>

        <div className="border-t border-slate-100 dark:border-zinc-800/80 pt-5">
          {!isEditing ? (
            <InforCard user={user} />
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">
              <EditInforCard
                formData={formData}
                errors={errors}
                handleChange={handleChange}
              />
              <div className="flex items-center gap-2 pt-2 justify-end border-t border-slate-100 dark:border-zinc-800">
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    setIsEditing(false)
                    setErrors({})
                  }}
                  className="gap-1.5 text-slate-600 dark:text-zinc-400"
                >
                  <X className="size-3.5" />
                  Cancel
                </Button>
                <Button
                  type="submit"
                  size="sm"
                  className="bg-blue-600 hover:bg-blue-700 text-white gap-1.5 shadow-xs"
                >
                  <Save className="size-3.5" />
                  Save
                </Button>
              </div>
            </form>
          )}
        </div>
      </CardContent>
    </Card>
  )
}

export default ProfileCard

