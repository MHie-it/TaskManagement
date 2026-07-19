import { useState } from 'react'
import { Button } from '../ui/button';
import { Input } from '../ui/input'
import { Label } from '../ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';

const UserForm = ({
    mode = "add",
    onOpenChange,
    onSubmit,
}) => {
    const [formData, setFormData] = useState({
        userName: "",
        password: "",
        fullName: "",
        email: "",
        gender: "male",
    });

    const handleChange = (field, value) => {
        setFormData((prev) => ({
            ...prev,
            [field]: value,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        onSubmit?.({
            UserName: formData.userName,
            HashPass: formData.password,
            FullName: formData.fullName,
            Email: formData.email,
            Gender: formData.gender,
        });

        onOpenChange(false);

        setFormData({
            userName: "",
            password: "",
            fullName: "",
            email: "",
            gender: "male",
        });
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-5">

            <div className="space-y-2">
                <Label>User Name *</Label>
                <Input
                    className="h-11"
                    value={formData.userName}
                    onChange={(e) => handleChange("userName", e.target.value)}
                    required
                />
            </div>

            <div className="space-y-2">
                <Label>Password *</Label>
                <Input
                    type="password"
                    className="h-11"
                    value={formData.password}
                    onChange={(e) => handleChange("password", e.target.value)}
                    required
                />
            </div>

            <div className="space-y-2">
                <Label>Full Name *</Label>
                <Input
                    className="h-11"
                    value={formData.fullName}
                    onChange={(e) => handleChange("fullName", e.target.value)}
                    required
                />
            </div>

            <div className="space-y-2">
                <Label>Email *</Label>
                <Input
                    type="email"
                    className="h-11"
                    value={formData.email}
                    onChange={(e) => handleChange("email", e.target.value)}
                    required
                />
            </div>

            <div className="space-y-2">
                <Label>Gender</Label>
                <Select
                    value={formData.gender}
                    onValueChange={(value) => handleChange("gender", value)}
                >
                    <SelectTrigger className="h-11">
                        <SelectValue placeholder="Select gender" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="male">Male</SelectItem>
                        <SelectItem value="female">Female</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                </Select>
            </div>

            <div className="flex justify-end gap-3 pt-4 border-t">
                <Button variant="outline" type="button" onClick={() => onOpenChange(false)}>
                    Cancel
                </Button>
                <Button type="submit">Add User</Button>
            </div>

        </form>
    )
}


export default UserForm