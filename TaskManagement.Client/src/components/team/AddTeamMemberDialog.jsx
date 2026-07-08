import { useEffect, useState } from 'react'
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select'

const AddTeamMemberDialog = ({ open, onOpenChange, team, users, onSubmit }) => {
    const [selectedUserId, setSelectedUserId] = useState('')

    useEffect(() => {
        if (!open) {
            setSelectedUserId('')
        }
    }, [open])

    const availableUsers = team
        ? users.filter((user) => user.TeamId !== team.teamId)
        : []

    const handleSubmit = () => {
        if (!selectedUserId || !team) return
        onSubmit?.({
            userId: Number(selectedUserId),
            teamId: team.teamId,
        })
    }

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="max-w-lg">
                <DialogHeader>
                    <DialogTitle>Add Member to {team?.name ?? 'Team'}</DialogTitle>
                </DialogHeader>

                <div className="space-y-5">
                    <div className="space-y-2">
                        <Label>Chọn thành viên</Label>
                        <Select value={selectedUserId} onValueChange={setSelectedUserId}>
                            <SelectTrigger className="w-full">
                                <SelectValue placeholder="Select a user" />
                            </SelectTrigger>
                            <SelectContent>
                                {availableUsers.length > 0 ? (
                                    availableUsers.map((user) => (
                                        <SelectItem key={user.UserId} value={String(user.UserId)}>
                                            {user.FullName} — {user.Email}
                                        </SelectItem>
                                    ))
                                ) : (
                                    <SelectItem value="" disabled>
                                        No available users
                                    </SelectItem>
                                )}
                            </SelectContent>
                        </Select>
                    </div>

                    <div className="flex justify-end gap-3 border-t pt-5">
                        <Button variant="outline" onClick={() => onOpenChange(false)}>
                            Cancel
                        </Button>
                        <Button
                            disabled={!selectedUserId || !team || availableUsers.length === 0}
                            onClick={handleSubmit}
                        >
                            Add Member
                        </Button>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    )
}

export default AddTeamMemberDialog