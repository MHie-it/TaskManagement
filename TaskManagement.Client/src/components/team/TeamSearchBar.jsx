import { Search } from 'lucide-react'
import { Input } from '@/components/ui/input'

const TeamSearchBar = ({ value, onChange }) => {
  return (
    <div className="relative max-w-sm">
      <Search className="absolute left-2.5 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
      <Input
        placeholder="Search team..."
        className="pl-8"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  )
}

export default TeamSearchBar
