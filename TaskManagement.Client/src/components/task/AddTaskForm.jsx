import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Status } from "@/constracts/StatusConfig";
import { Priority } from "@/constracts/PriorityConfig";
import { TaskService } from "@/services/TaskService";

const MOCK_USERS = [
  {
    id: 1,
    fullName: "Nguyễn Văn A",
  },
  {
    id: 2,
    fullName: "Trần Thị B",
  },
  {
    id: 3,
    fullName: "Lê Minh Hiệp",
  },
];

const AddTaskForm = ({ task, onOpenChange, onSuccess }) => {
  const [formData, setFormData] = useState({
    userId: "",
    title: "",
    description: "",
    starTime: "",
    dueDate: "",
    note: "",
    priority: "",
    status: "",
  });

  useEffect(() => {
    if (task) {
      setFormData({
        userId: task.userId,
        title: task.title,
        description: task.description,
        starTime: task.starTime,
        dueDate: task.dueDate,
        note: task.note,
        priority: task.priority,
        status: task.status,
      });
    } else {
      setFormData({
        userId: "",
        title: "",
        description: "",
        starTime: "",
        dueDate: "",
        note: "",
        priority: "",
        status: "",
      });
    }
  }, [task]);

  const handleChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSubmit = async() => {
    try{
      if(task){
        await TaskService.updateTask(task.id,formData)
      }else{
        await TaskService.addTask(formData)
      }
      onSuccess();
      onOpenChange(false);
    }catch(error){
      console.error(error);
    }
  };

  return (
    <div className="grid grid-cols-2 gap-x-6 gap-y-5">

      {/* Title */}
      <div className="col-span-2 space-y-2">
        <Label className="font-medium">Title *</Label>

        <Input
          className="h-11"
          placeholder="Enter task title..."
          value={formData.title}
          onChange={(e) => handleChange("title", e.target.value)}
        />
      </div>

      {/* Assign */}
      <div className="col-span-2 space-y-2">
        <Label className="font-medium">Assign To *</Label>

        <Select
        value = {String(formData.userId)}
          onValueChange={(value) =>
            handleChange("userId", Number(value))
          }
        >
          <SelectTrigger className="h-11 w-full">
            <SelectValue placeholder="Select assignee" />
          </SelectTrigger>

          <SelectContent>
            {MOCK_USERS.map((user) => (
              <SelectItem
                key={user.id}
                value={String(user.id)}
              >
                {user.fullName}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Description */}
      <div className="col-span-2 space-y-2">
        <Label className="font-medium">Description</Label>

        <Textarea
          className="h-24 resize-none overflow-y-auto scrollbar-hide"
          placeholder="Enter description..."
          value={formData.description}
          onChange={(e) => handleChange("description", e.target.value)}
        />
      </div>

      {/* Priority */}
      <div className="space-y-2">
        <Label className="font-medium">Priority</Label>

        <Select
          value={formData.priority}
          onValueChange={(value) =>
            handleChange("priority", value)
          }
        >
          <SelectTrigger className="h-11 w-full">
            <SelectValue placeholder="Priority" />
          </SelectTrigger>

          <SelectContent>
            {Priority.map((item) => (
              <SelectItem key={item} value={item}>
                {item}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Status */}
      <div className="space-y-2">
        <Label className="font-medium">Status</Label>

        <Select
          value = {formData.status}
          onValueChange={(value) =>
            handleChange("status", value)
          }
        >
          <SelectTrigger className="h-11 w-full">
            <SelectValue placeholder="Status" />
          </SelectTrigger>

          <SelectContent>
            {Status.map((item) => (
              <SelectItem key={item} value={item}>
                {item}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Start Date */}
      <div className="space-y-2">
        <Label className="font-medium">Start Date</Label>

        <Input
          className="h-11"
          type="date"
          value={formData.starTime}
          onChange={(e) =>
            handleChange("starTime", e.target.value)
          }
        />
      </div>

      {/* Due Date */}
      <div className="space-y-2">
        <Label className="font-medium">Due Date</Label>

        <Input
          className="h-11"
          type="date"
          value={formData.dueDate}
          onChange={(e) =>
            handleChange("dueDate", e.target.value)
          }
        />
      </div>

      {/* Note */}
      <div className="col-span-2 space-y-2">
        <Label className="font-medium">Note</Label>

        <Textarea
          className="h-24 resize-none overflow-y-auto scrollbar-hide"
          placeholder="Enter note..."
          value={formData.note}
          onChange={(e) =>
            handleChange("note", e.target.value)
          }
        />
      </div>

      {/* Buttons */}
      <div className="col-span-2 flex justify-end gap-3 border-t pt-5">
        <Button
          variant="outline"
          onClick={() => onOpenChange(false)}
        >
          Cancel
        </Button>

        <Button onClick={handleSubmit}>
          {task ? "Update Task" : "Create Task"}
        </Button>
      </div>

    </div>
  );
};

export default AddTaskForm;