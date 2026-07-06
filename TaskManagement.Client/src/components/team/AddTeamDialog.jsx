import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import TeamForm from '@/components/team/TeamForm'

const AddTeamDialog = ({ open, onOpenChange, onSubmit }) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-lg">
        <DialogHeader>
          <DialogTitle>Add New Team</DialogTitle>
        </DialogHeader>
        <TeamForm mode="add" onOpenChange={onOpenChange} onSubmit={onSubmit} />
      </DialogContent>
    </Dialog>
  )
}

export default AddTeamDialog
