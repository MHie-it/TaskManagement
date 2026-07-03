import React from 'react'
import TeamCard from '@/components/home/TeamCard.jsx'

const TeamGrid = ({teams}) => {
  return (
    <section className = "grid gap-4 grid-cols-4 ">
        {teams.map((team) => (
          <TeamCard
            key={team.teamId}
            name={team.name}
            description={team.description}
            memberCount={team.memberCount}
          />
        ))}
    </section>
  )
}

export default TeamGrid