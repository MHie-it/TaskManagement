import { Input } from '../ui/input'
import { Textarea } from '../ui/textarea'
import { User, Mail, Phone, Calendar, MapPin, Sparkles } from 'lucide-react'

const EditInforCard = ({ formData, errors, handleChange }) => {
  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between border-b border-slate-100 dark:border-zinc-800 pb-3">
        <h3 className="text-xs font-bold text-slate-400 dark:text-zinc-500 uppercase tracking-widest flex items-center gap-1.5">
          <Sparkles className="size-3.5 text-blue-500" />
          Update Profile
        </h3>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="space-y-1.5">
          <label className="text-xs font-bold text-slate-600 dark:text-zinc-400 uppercase tracking-wider flex items-center gap-1">
            <User className="size-3 text-slate-400" />
            Full Name *
          </label>
          <Input
            name="FullName"
            value={formData.FullName}
            onChange={handleChange}
            placeholder="Nhập họ và tên"
            className={`h-9 bg-slate-50/50 dark:bg-zinc-800/50 ${
              errors.FullName ? 'border-rose-500 focus-visible:ring-rose-500/20' : ''
            }`}
          />
          {errors.FullName && (
            <p className="text-xs text-rose-500 font-medium">{errors.FullName}</p>
          )}
        </div>

        {/* Email */}
        <div className="space-y-1.5">
          <label className="text-xs font-bold text-slate-600 dark:text-zinc-400 uppercase tracking-wider flex items-center gap-1">
            <Mail className="size-3 text-slate-400" />
            Email *
          </label>
          <Input
            name="Email"
            value={formData.Email}
            onChange={handleChange}
            placeholder="Your email address"
            className={`h-9 bg-slate-50/50 dark:bg-zinc-800/50 ${
              errors.Email ? 'border-rose-500 focus-visible:ring-rose-500/20' : ''
            }`}
          />
          {errors.Email && (
            <p className="text-xs text-rose-500 font-medium">{errors.Email}</p>
          )}
        </div>

        <div className="space-y-1.5">
          <label className="text-xs font-bold text-slate-600 dark:text-zinc-400 uppercase tracking-wider flex items-center gap-1">
            <Phone className="size-3 text-slate-400" />
            Phone
          </label>
          <Input
            name="Phone"
            value={formData.Phone}
            onChange={handleChange}
            placeholder="Your phone number"
            className="h-9 bg-slate-50/50 dark:bg-zinc-800/50"
          />
        </div>

        <div className="space-y-1.5">
          <label className="text-xs font-bold text-slate-600 dark:text-zinc-400 uppercase tracking-wider">
            Gende
          </label>
          <select
            name="Gende"
            value={formData.Gende}
            onChange={handleChange}
            className="flex h-9 w-full rounded-md border border-input bg-slate-50/50 dark:bg-zinc-800/50 px-3 py-1 text-sm shadow-xs transition-colors outline-none focus-visible:border-ring focus-visible:ring-2 focus-visible:ring-blue-500/30 text-slate-800 dark:text-zinc-200"
          >
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Other">Other</option>
          </select>
        </div>

        <div className="space-y-1.5 sm:col-span-2">
          <label className="text-xs font-bold text-slate-600 dark:text-zinc-400 uppercase tracking-wider flex items-center gap-1">
            <Calendar className="size-3 text-slate-400" />
            BOD
          </label>
          <Input
            type="date"
            name="Bod"
            value={formData.Bod}
            onChange={handleChange}
            className="h-9 bg-slate-50/50 dark:bg-zinc-800/50"
          />
        </div>
      </div>

      <div className="space-y-1.5">
        <label className="text-xs font-bold text-slate-600 dark:text-zinc-400 uppercase tracking-wider flex items-center gap-1">
          <MapPin className="size-3 text-slate-400" />
          Address
        </label>
        <Textarea
          name="Address"
          value={formData.Address}
          onChange={handleChange}
          placeholder="Your Address"
          rows={3}
          className="bg-slate-50/50 dark:bg-zinc-800/50 resize-none"
        />
      </div>
    </div>
  )
}

export default EditInforCard
