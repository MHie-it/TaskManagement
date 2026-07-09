import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import AddTaskForm from "@/components/task/AddTaskForm.jsx";

const AddTaskDialog = ({ open, onOpenChange, task }) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange} >
      <DialogContent className="max-w-3xl">
        <DialogHeader>
          <DialogTitle>{task ? "Update Task" : "Add New Task"}</DialogTitle>
        </DialogHeader>
        <AddTaskForm task={task} onOpenChange={onOpenChange} />
      </DialogContent>
    </Dialog>
  );
};  

export default AddTaskDialog;