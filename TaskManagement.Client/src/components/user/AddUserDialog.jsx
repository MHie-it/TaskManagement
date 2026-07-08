import { Dialog, DialogContent, DialogHeader, DialogTitle } from '../ui/dialog'
import UserForm from './UserForm'

const AddUserDialog = ({ open, onOpenChange, onSubmit }) => {
    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="max-w-lg">
                <DialogHeader>
                    <DialogTitle>Add New User</DialogTitle>
                </DialogHeader>
                <UserForm mode="add" onOpenChange={onOpenChange} onSubmit={onSubmit} />
            </DialogContent>
        </Dialog>
    )
}

export default AddUserDialog