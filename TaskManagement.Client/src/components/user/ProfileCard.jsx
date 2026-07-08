import { useState, useEffect } from 'react'
import { Card, CardContent } from '../ui/card'
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar'
import { Button } from '../ui/button'
import {
  Shield, Users, Edit3, Save, X
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
      <Card className="w-full max-w-4xl p-12 text-center bg-white shadow-xl rounded-2xl border border-gray-100">
        <p className="text-gray-500 text-lg font-medium">Không tìm thấy thông tin người dùng.</p>
      </Card>
    )
  }

  const activeTeam = teams.find(t => t.TeamId === user.TeamId || t.teamId === user.TeamId)
  const teamName = activeTeam ? (activeTeam.Name || activeTeam.name) : 'Chưa tham gia nhóm'

  const roleName = user.RoleId === 1 ? 'Quản trị viên' : 'Thành viên'

  const getInitials = (name) => {
    if (!name) return 'U'
    const parts = name.split(' ')
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
    <Card className="w-full max-w-4xl bg-white/80 dark:bg-zinc-900/80 backdrop-blur-xl border border-white/20 dark:border-zinc-800 shadow-xl rounded-2xl transition-all duration-300">

      <CardContent className="p-6 md:p-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8">

          <div className="md:col-span-4 flex flex-col items-center text-center border-b md:border-b-0 md:border-r border-gray-100 dark:border-zinc-800 pb-8 md:pb-0 md:pr-8">
            <div className="relative group mb-4">
              <div className="absolute -inset-1.5 rounded-full bg-gradient-to-tr from-blue-500 to-indigo-500 opacity-70 blur-sm group-hover:opacity-100 transition duration-500"></div>
              <Avatar className="h-28 w-28 flex items-center justify-center relative bg-white dark:bg-zinc-800 border-2 border-white dark:border-zinc-950">
                <AvatarImage src="" alt={user.FullName} className="object-cover" />
                <AvatarFallback className="bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-zinc-800 dark:to-zinc-700 text-blue-600 dark:text-blue-400 text-2xl font-bold">
                  {getInitials(user.FullName)}
                </AvatarFallback>
              </Avatar>
            </div>

            <h2 className="text-xl font-bold text-foreground mt-2">{user.FullName}</h2>
            <p className="text-sm text-muted-foreground font-medium">@{user.UserName}</p>

            <div className="flex flex-col gap-2 mt-4 w-full max-w-[200px]">
              <div className="flex items-center justify-center gap-1.5 px-3 py-1.5 rounded-full bg-blue-500/10 text-blue-700 dark:text-blue-400 text-xs font-semibold">
                <Shield className="size-3.5" />
                {roleName}
              </div>
              <div className="flex items-center justify-center gap-1.5 px-3 py-1.5 rounded-full bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 text-xs font-semibold">
                <Users className="size-3.5" />
                {teamName}
              </div>
            </div>

            {!isEditing && (
              <Button
                onClick={() => setIsEditing(true)}
                variant="outline"
                size="sm"
                className="mt-6 gap-2 w-full max-w-[200px] border-blue-200 text-blue-600 hover:bg-blue-50 dark:border-zinc-800 dark:text-zinc-300 dark:hover:bg-zinc-800"
              >
                <Edit3 className="size-4" />
                Update Profile
              </Button>
            )}
          </div>

          <div className="md:col-span-8 flex flex-col justify-start">
            {!isEditing ? (
              /* Profile Information */
              <InforCard user={user} />
            ) : (
              /* Edit Form */
              <form onSubmit={handleSubmit} className="space-y-5">
                <EditInforCard
                  formData={formData}
                  errors={errors}
                  handleChange={handleChange}
                />
                <div className="flex items-center gap-3 pt-2 justify-end">
                  <Button
                    type="button"
                    variant="ghost"
                    onClick={() => {
                      setIsEditing(false)
                      setErrors({})
                    }}
                    className="gap-1.5"
                  >
                    <X className="size-4" />
                    Cancel
                  </Button>
                  <Button
                    type="submit"
                    className="bg-blue-600 hover:bg-blue-700 text-white gap-1.5"
                  >
                    <Save className="size-4" />
                    Save Changes
                  </Button>
                </div>

              </form>
            )}
          </div>

        </div>
      </CardContent>
    </Card>
  )
}

export default ProfileCard
