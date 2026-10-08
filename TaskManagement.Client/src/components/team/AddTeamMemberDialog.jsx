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
        ? users.filter((user) => {
            const teamId = user.TeamId ?? user.teamId
            return !teamId
        })
        : []

    const handleSubmit = () => {
        if (!selectedUserId || !team) return
        onSubmit?.({
            userId: Number(selectedUserId),
            teamId: team.teamId ?? team.TeamId,
        })
    }

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="max-w-lg">
                <DialogHeader>
                    <DialogTitle>Add Member to {team?.name ?? team?.Name ?? 'Team'}</DialogTitle>
                </DialogHeader>

                <div className="space-y-5">
                    <div className="space-y-2">
                        <Label>Chọn thành viên (Chưa có team)</Label>
                        <Select value={selectedUserId} onValueChange={setSelectedUserId}>
                            <SelectTrigger className="w-full">
                                <SelectValue placeholder="Chọn người dùng chưa có team" />
                            </SelectTrigger>
                            <SelectContent>
                                {availableUsers.length > 0 ? (
                                    availableUsers.map((user) => (
                                        <SelectItem key={user.UserId ?? user.userId} value={String(user.UserId ?? user.userId)}>
                                            {user.FullName ?? user.fullName} — {user.Email ?? user.email}
                                        </SelectItem>
                                    ))
                                ) : (
                                    <SelectItem value="no-users" disabled>
                                        Không có người dùng nào chưa thuộc team
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