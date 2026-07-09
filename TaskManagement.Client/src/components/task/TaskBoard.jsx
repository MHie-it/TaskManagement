import { Filter } from '@/constracts/Filter'
import TaskCard from './TaskCard'

const TaskBoard = ({ tasks = [], onUpdate }) => {
    return (
        <div className="grid gap-4 lg:grid-cols-4">
            {Filter.map((status) => {
                const statusTasks = tasks.filter((task) => task.status === status)

                return (
                    <div
                        key={status}
                        className="rounded-2xl border border-slate-200 bg-white/80 p-4 shadow-sm"
                    >
                        <div className="mb-4 flex items-center justify-between">
                            <h2 className="text-sm font-semibold uppercase tracking-[0.18em] text-slate-600">
                                {status}
                            </h2>
                            <span className="rounded-full bg-slate-100 px-2 py-1 text-xs font-medium text-slate-700">
                                {statusTasks.length}
                            </span>
                        </div>

                        <div className="space-y-3">
                            {statusTasks.length > 0 ? (
                                statusTasks.map((task) => (
                                    <TaskCard key={task.id}
                                        task={task}
                                        onClick={() => {
                                            onUpdate(task)
                                        }} />
                                ))
                            ) : (
                                <div className="rounded-xl bg-slate-50 p-4 text-sm text-slate-500">
                                    No tasks
                                </div>
                            )}
                        </div>
                    </div>
                )
            })}
        </div>
    )
}

export default TaskBoard