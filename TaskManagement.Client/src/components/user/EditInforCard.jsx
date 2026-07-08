import { Input } from '../ui/input'
import { Textarea } from '../ui/textarea'

const EditInforCard = ({ formData, errors, handleChange }) => {
    return (
        <div>
            <h3 className="text-base font-bold text-foreground uppercase tracking-wider border-b border-gray-100 dark:border-zinc-800 pb-2">
                UPDATE PROFILE
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                    <label className="text-xs font-bold text-muted-foreground uppercase">Full Name *</label>
                    <Input
                        name="FullName"
                        value={formData.FullName}
                        onChange={handleChange}
                        placeholder="Enter full name"
                        className={errors.FullName ? "border-rose-500 focus-visible:ring-rose-500/20" : ""}
                    />
                    {errors.FullName && (
                        <p className="text-xs text-rose-500 font-medium">{errors.FullName}</p>
                    )}
                </div>
                <div className="space-y-1.5">
                    <label className="text-xs font-bold text-muted-foreground uppercase">Email *</label>
                    <Input
                        name="Email"
                        value={formData.Email}
                        onChange={handleChange}
                        placeholder="Nhập địa chỉ email"
                        className={errors.Email ? "border-rose-500 focus-visible:ring-rose-500/20" : ""}
                    />
                    {errors.Email && (
                        <p className="text-xs text-rose-500 font-medium">{errors.Email}</p>
                    )}
                </div>
                <div className="space-y-1.5">
                    <label className="text-xs font-bold text-muted-foreground uppercase">Phone Number</label>
                    <Input
                        name="Phone"
                        value={formData.Phone}
                        onChange={handleChange}
                        placeholder="Enter phone number"
                    />
                </div>
                <div className="space-y-1.5">
                    <label className="text-xs font-bold text-muted-foreground uppercase">Gender</label>
                    <select
                        name="Gende"
                        value={formData.Gende}
                        onChange={handleChange}
                        className="flex h-8 w-full rounded-lg border border-input bg-transparent px-2.5 py-1 text-sm transition-colors outline-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 disabled:cursor-not-allowed dark:bg-input/30"
                    >
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                        <option value="Other">Other</option>
                    </select>
                </div>
                <div className="space-y-1.5">
                    <label className="text-xs font-bold text-muted-foreground uppercase">Date of Birth</label>
                    <Input
                        type="date"
                        name="Bod"
                        value={formData.Bod}
                        onChange={handleChange}
                    />
                </div>
            </div>
            <div className="space-y-1.5">
                <label className="text-xs font-bold text-muted-foreground uppercase">Address</label>
                <Textarea
                    name="Address"
                    value={formData.Address}
                    onChange={handleChange}
                    placeholder="Enter address"
                    rows={3}
                />
            </div>

        </div>
    )
}

export default EditInforCard