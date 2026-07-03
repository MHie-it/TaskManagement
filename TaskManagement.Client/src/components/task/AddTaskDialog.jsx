import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import AddTaskForm from "@/components/task/AddTaskForm.jsx";

const AddTaskDialog = ({ open, onOpenChange }) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl">
        <DialogHeader>
          <DialogTitle>Add New Task</DialogTitle>
        </DialogHeader>
        <AddTaskForm onOpenChange={onOpenChange} />
      </DialogContent>
    </Dialog>
  );
};  

export default AddTaskDialog;