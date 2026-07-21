import { useState } from 'react'
import { Calendar, Check, Copy, Mail, MapPin, Phone, UserCheck } from 'lucide-react'
import { toast } from 'sonner'

const InforCard = ({ user }) => {
  const [copiedField, setCopiedField] = useState(null)

  const handleCopy = (text, label) => {
    if (!text) return
    navigator.clipboard.writeText(text)
    setCopiedField(label)
    toast.success(`Đã sao chép ${label}!`)
    setTimeout(() => setCopiedField(null), 2000)
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between border-b border-slate-100 dark:border-zinc-800 pb-3">
        <h3 className="text-xs font-bold text-slate-400 dark:text-zinc-500 uppercase tracking-widest">
          Information
        </h3>
        <span className="text-xs text-slate-400 dark:text-zinc-500 font-medium">
          ID: #{user.UserId || user.userId || 'N/A'}
        </span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {/* Email */}
        <div className="group relative flex items-start gap-3.5 rounded-xl border border-slate-100 dark:border-zinc-800/80 bg-slate-50/50 dark:bg-zinc-800/40 p-3.5 transition-all duration-200 hover:border-blue-200 dark:hover:border-blue-900/50 hover:bg-blue-50/30 dark:hover:bg-blue-950/20">
          <div className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400">
            <Mail className="size-4.5" />
          </div>
          <div className="min-w-0 flex-1">
            <p className="text-[11px] font-semibold uppercase tracking-wider text-slate-400 dark:text-zinc-500">
              Email
            </p>
            <p className="mt-0.5 truncate text-sm font-semibold text-slate-800 dark:text-zinc-200">
              {user.Email || <span className="font-normal italic text-slate-400">Chưa cung cấp</span>}
            </p>
          </div>
          {user.Email && (
            <button
              type="button"
              onClick={() => handleCopy(user.Email, 'Email')}
              className="opacity-0 group-hover:opacity-100 p-1.5 rounded-md text-slate-400 hover:text-blue-600 hover:bg-white dark:hover:bg-zinc-800 transition"
              title="Sao chép Email"
            >
              {copiedField === 'Email' ? <Check className="size-3.5 text-emerald-500" /> : <Copy className="size-3.5" />}
            </button>
          )}
        </div>

        <div className="group relative flex items-start gap-3.5 rounded-xl border border-slate-100 dark:border-zinc-800/80 bg-slate-50/50 dark:bg-zinc-800/40 p-3.5 transition-all duration-200 hover:border-emerald-200 dark:hover:border-emerald-900/50 hover:bg-emerald-50/30 dark:hover:bg-emerald-950/20">
          <div className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400">
            <Phone className="size-4.5" />
          </div>
          <div className="min-w-0 flex-1">
            <p className="text-[11px] font-semibold uppercase tracking-wider text-slate-400 dark:text-zinc-500">
              Phone
            </p>
            <p className="mt-0.5 text-sm font-semibold text-slate-800 dark:text-zinc-200">
              {user.Phone || <span className="font-normal italic text-slate-400">Chưa cung cấp</span>}
            </p>
          </div>
          {user.Phone && (
            <button
              type="button"
              onClick={() => handleCopy(user.Phone, 'Số điện thoại')}
              className="opacity-0 group-hover:opacity-100 p-1.5 rounded-md text-slate-400 hover:text-emerald-600 hover:bg-white dark:hover:bg-zinc-800 transition"
              title="Sao chép SDT"
            >
              {copiedField === 'Số điện thoại' ? <Check className="size-3.5 text-emerald-500" /> : <Copy className="size-3.5" />}
            </button>
          )}
        </div>

        <div className="flex items-start gap-3.5 rounded-xl border border-slate-100 dark:border-zinc-800/80 bg-slate-50/50 dark:bg-zinc-800/40 p-3.5">
          <div className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-purple-50 dark:bg-purple-950/60 text-purple-600 dark:text-purple-400">
            <UserCheck className="size-4.5" />
          </div>
          <div className="min-w-0 flex-1">
            <p className="text-[11px] font-semibold uppercase tracking-wider text-slate-400 dark:text-zinc-500">
              Gende
            </p>
            <p className="mt-0.5 text-sm font-semibold text-slate-800 dark:text-zinc-200">
              {user.Gende === 'Male' ? 'Nam' : user.Gende === 'Female' ? 'Nữ' : user.Gende === 'Other' ? 'Khác' : (user.Gende || <span className="font-normal italic text-slate-400">Chưa cung cấp</span>)}
            </p>
          </div>
        </div>

        <div className="flex items-start gap-3.5 rounded-xl border border-slate-100 dark:border-zinc-800/80 bg-slate-50/50 dark:bg-zinc-800/40 p-3.5">
          <div className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-amber-50 dark:bg-amber-950/60 text-amber-600 dark:text-amber-400">
            <Calendar className="size-4.5" />
          </div>
          <div className="min-w-0 flex-1">
            <p className="text-[11px] font-semibold uppercase tracking-wider text-slate-400 dark:text-zinc-500">
              BOD
            </p>
            <p className="mt-0.5 text-sm font-semibold text-slate-800 dark:text-zinc-200">
              {user.Bod || <span className="font-normal italic text-slate-400">Chưa cung cấp</span>}
            </p>
          </div>
        </div>
      </div>

      <div className="flex items-start gap-3.5 rounded-xl border border-slate-100 dark:border-zinc-800/80 bg-slate-50/50 dark:bg-zinc-800/40 p-3.5">
        <div className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-rose-50 dark:bg-rose-950/60 text-rose-600 dark:text-rose-400">
          <MapPin className="size-4.5" />
        </div>
        <div className="min-w-0 flex-1">
          <p className="text-[11px] font-semibold uppercase tracking-wider text-slate-400 dark:text-zinc-500">
            Address
          </p>
          <p className="mt-0.5 text-sm font-semibold text-slate-800 dark:text-zinc-200 whitespace-pre-line leading-relaxed">
            {user.Address || <span className="font-normal italic text-slate-400">Chưa cung cấp địa chỉ</span>}
          </p>
        </div>
      </div>
    </div>
  )
}

export default InforCard
