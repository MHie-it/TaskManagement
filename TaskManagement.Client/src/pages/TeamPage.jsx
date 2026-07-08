import { useState } from 'react'
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
import {
  MOCK_TEAMS,
  MOCK_USERS,
  buildTeamStats,
  buildTeamsWithMembers,
  getUsersByTeamId,
} from '@/data/mockTeams'
import AddTeamMemberDialog from '@/components/team/AddTeamMemberDialog'

const TeamPage = () => {
  const [addOpen, setAddOpen] = useState(false)
  const [editOpen, setEditOpen] = useState(false)
  const [membersOpen, setMembersOpen] = useState(false)
  const [addMemberOpen, setAddMemberOpen] = useState(false)
  const [search, setSearch] = useState('')
  const [teams, setTeams] = useState(MOCK_TEAMS)
  const [users, setUsers] = useState(MOCK_USERS)
  const [selectedTeam, setSelectedTeam] = useState(null)
  const [editingTeam, setEditingTeam] = useState(null)

  const teamsWithMembers = buildTeamsWithMembers(teams, users)
  const stats = buildTeamStats(teams, users)

  const filteredTeams = teamsWithMembers.filter((team) =>
    team.name.toLowerCase().includes(search.toLowerCase())
  )

  const syncSelectedTeam = (updatedTeams) => {
    if (!selectedTeam) return null

    const freshTeam = buildTeamsWithMembers(updatedTeams, users).find(
      (team) => team.teamId === selectedTeam.teamId
    )

    if (freshTeam) {
      setSelectedTeam(freshTeam)
    }

    return freshTeam
  }

  const handleOpenAddTeamMember = () => {
    setAddMemberOpen(true)
  }

  const handleAddMember = ({ userId, teamId }) => {
    if (!userId || !teamId) return

    setUsers((prev) =>
      prev.map((user) =>
        user.UserId === userId ? { ...user, TeamId: teamId } : user
      )
    )
    setAddMemberOpen(false)
  }

  const handleAddTeam = (newTeam) => {
    setTeams((prev) => [
      ...prev,
      {
        TeamId: Math.max(...prev.map((team) => team.TeamId), 0) + 1,
        Name: newTeam.Name,
        Description: newTeam.Description,
      },
    ])
  }

  const handleUpdateTeam = (updatedTeam) => {
    if (!editingTeam) return

    setTeams((prev) => {
      const nextTeams = prev.map((team) =>
        team.TeamId === editingTeam.teamId
          ? { ...team, Name: updatedTeam.Name, Description: updatedTeam.Description }
          : team
      )

      syncSelectedTeam(nextTeams)
      return nextTeams
    })
  }

  const handleTeamClick = (team) => {
    setSelectedTeam(team)
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

  const selectedMembers = selectedTeam
    ? getUsersByTeamId(users, selectedTeam.teamId)
    : []

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
          <TeamSearchBar value={search} onChange={setSearch} />
          <TeamGrid
            teams={filteredTeams}
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
