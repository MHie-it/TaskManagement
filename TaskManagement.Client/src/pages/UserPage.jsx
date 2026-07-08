import React, { useState, useEffect } from 'react'
import Background from '@/components/layout/Background'
import Header from '@/components/layout/Header'
import ProfileCard from '@/components/user/ProfileCard'
import { MOCK_USERS, MOCK_TEAMS } from '@/data/mockTeams'
import { toast } from 'sonner'

const UserPage = () => {

  const [users, setUsers] = useState(() => {
    return MOCK_USERS.map((user, idx) => ({
      ...user,
      Phone: user.Phone || `098765432${idx}`,
      Bod: user.Bod || `199${5 + (idx % 5)}-0${(idx % 9) + 1}-15`,
      Address: user.Address || `${idx + 12} Đường Lê Lợi, Quận 1, TP. Hồ Chí Minh`,
      Gende: user.Gende || (idx % 2 === 0 ? 'Male' : 'Female')
    }))
  })

  const [teams] = useState(MOCK_TEAMS)
  const [activeUserId, setActiveUserId] = useState(1)
  const [isLoading, setIsLoading] = useState(false)

  const activeUser = users.find(u => u.UserId === activeUserId)

  const handleSaveMock = (updatedUser) => {
    setIsLoading(true)

    setTimeout(() => {
      setUsers(prev => prev.map(u => u.UserId === updatedUser.UserId ? updatedUser : u))
      setIsLoading(false)
      toast.success('Cập nhật hồ sơ cá nhân thành công! (Dữ liệu Giả Lập)')
    }, 600)
  }

  return (
    <Background>
      <Header />
      <main className="flex flex-col items-center justify-center mx-auto mt-6 w-[min(100%-2rem,72rem)] space-y-6 pb-16 h-full px-4">

        <ProfileCard
          user={activeUser}
          teams={teams}
          users={users}
          onSave={handleSaveMock}
        />

      </main>
    </Background>
  )
}

export default UserPage
