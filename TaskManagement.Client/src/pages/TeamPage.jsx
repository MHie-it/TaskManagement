import { useState, useEffect } from 'react'
import { Plus } from 'lucide-react'
import Background from '@/components/layout/Background'
import Header from '@/components/layout/Header'
import { Button } from '@/components/ui/button'
import TeamGrid from '@/components/team/TeamGrid'
import TeamStatSection from '@/components/team/TeamStatSection'
import TeamSearchBar from '@/components/team/TeamSearchBar'
import AddTeamDialog from '@/components/team/AddTeamDialog'
import EditTeamDialog from '@/components/team/EditTeamDialog'
import TeamMembersDialog from '@/components/team/TeamMembersDialog'
import AddTeamMemberDialog from '@/components/team/AddTeamMemberDialog'
import { TeamService } from '@/services/TeamService'
import { UserService } from '@/services/UserService'

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

const TeamPage = () => {
  const [addOpen, setAddOpen] = useState(false)
  const [editOpen, setEditOpen] = useState(false)
  const [membersOpen, setMembersOpen] = useState(false)
  const [addMemberOpen, setAddMemberOpen] = useState(false)
  const [search, setSearch] = useState('')
  const [teams, setTeams] = useState([])
  const [users, setUsers] = useState([])
  const [selectedTeam, setSelectedTeam] = useState(null)
  const [editingTeam, setEditingTeam] = useState(null)
  const [selectedMembers, setSelectedMembers] = useState([])

  const stats = {
    totalTeams: teams.length,
    totalMembers: users.length,
    avgMembers: teams.length ? Math.round(users.length / teams.length) : 0,
    largestTeam: teams.length
      ? Math.max(...teams.map((team) => team.memberCount ?? 0))
      : 0,
  }

  const handleOpenAddTeamMember = () => {
    setAddMemberOpen(true)
  }

  const handleAddMember = async ({ userId, teamId }) => {
    if (!userId || !teamId) return

    try {
      await TeamService.addMember(userId, { TeamId: teamId })
      const currentUsers = await fetchUsers()
      await fetchTeams(currentUsers)
      const members = await UserService.getAllUserByTeam(teamId)
      setSelectedMembers(normalizeUsers(members))
      setAddMemberOpen(false)
      setMembersOpen(false)
    } catch (err) {
      console.error(err)
    }
  }

  const handleTeamClick = async (team) => {
    setSelectedTeam(team)
    try {
      const members = await UserService.getAllUserByTeam(team.teamId)
      setSelectedMembers(normalizeUsers(members))
    } catch (err) {
      console.error(err)
      setSelectedMembers([])
    }
    setMembersOpen(true)
  }

  const handleEditTeam = (team) => {
    setEditingTeam(team)
    setEditOpen(true)
  }

  const handleEditFromMembers = () => {
    if (!selectedTeam) return

    setMembersOpen(false)
    handleEditTeam(selectedTeam)
  }

  const fetchUsers = async () => {
    const data = await UserService.getAllUser()
    const normalized = normalizeUsers(data)
    setUsers(normalized)
    return normalized
  }

  const fetchTeams = async (currentUsers = users) => {
    const data = await TeamService.getAllTeam()
    const normalizedTeams = normalizeTeams(data)
    const updatedTeams = normalizedTeams.map((team) => ({
      ...team,
      memberCount: currentUsers.filter((user) => user.TeamId === team.teamId).length,
    }))
    setTeams(updatedTeams)
  }

  useEffect(() => {
    const loadData = async () => {
      const currentUsers = await fetchUsers()
      await fetchTeams(currentUsers)
    }
    loadData()
  }, [])

  const handleSearch = async (value) => {
    setSearch(value)
    if (value.trim() === '') {
      await fetchTeams(users)
      return
    }

    const result = await TeamService.getTeamByName(value)
    const normalizedTeams = normalizeTeams(result)
    const updatedTeams = normalizedTeams.map((team) => ({
      ...team,
      memberCount: users.filter((user) => user.TeamId === team.teamId).length,
    }))
    setTeams(updatedTeams)
  }

  const handleAddTeam = async (newTeam) => {
    try {
      await TeamService.addTeam(newTeam)
      await fetchTeams()
      setAddOpen(false)
    } catch (err) {
      console.log(err)
    }
  }

  const handleUpdateTeam = async (updatedTeam) => {
    if (!editingTeam) return

    try {
      await TeamService.updateTeam(editingTeam.teamId, updatedTeam)
      await fetchTeams()
      setEditOpen(false)
      setEditingTeam(null)
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <Background>
      <Header />

      <main className="mx-auto mt-4 w-[min(100%-2rem,72rem)] space-y-8 pb-12">
        <section className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-2xl font-semibold tracking-tight text-foreground md:text-3xl">
              Teams
            </h1>
            <p className="mt-1 text-muted-foreground">
              Manage {stats.totalTeams} teams and {stats.totalMembers} members.
            </p>
          </div>

          <Button className="gap-2 shrink-0" onClick={() => setAddOpen(true)}>
            <Plus className="size-4" />
            New Team
          </Button>
        </section>

        <AddTeamDialog
          open={addOpen}
          onOpenChange={setAddOpen}
          onSubmit={handleAddTeam}
        />

        <EditTeamDialog
          open={editOpen}
          onOpenChange={setEditOpen}
          team={editingTeam}
          onSubmit={handleUpdateTeam}
        />

        <TeamMembersDialog
          open={membersOpen}
          onOpenChange={setMembersOpen}
          team={selectedTeam}
          members={selectedMembers}
          onEdit={handleEditFromMembers}
          onAddMember={handleOpenAddTeamMember}
        />

        <AddTeamMemberDialog
          open={addMemberOpen}
          onOpenChange={setAddMemberOpen}
          team={selectedTeam}
          users={users}
          onSubmit={handleAddMember}
        />

        <TeamStatSection stats={stats} />

        <section className="space-y-4">
          <TeamSearchBar value={search} onChange={handleSearch} />
          <TeamGrid
            teams={teams}
            onTeamClick={handleTeamClick}
            onEditTeam={handleEditTeam}
            emptyMessage={
              search
                ? `No teams found for "${search}".`
                : 'No teams found.'
            }
          />
        </section>
      </main>
    </Background>
  )
}

export default TeamPage
