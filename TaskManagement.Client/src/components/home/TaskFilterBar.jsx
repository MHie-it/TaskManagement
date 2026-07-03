import { Button } from '@/components/ui/button'
import { cn } from '@/components/lib/utils'
import { Filter } from '@/constracts/Filter.jsx'

const TaskFilterBar = ({ filter, onChange }) => {
    return (
        <div className="flex flex-wrap gap-2">
            {Filter.map((item) => (
                <Button
                    key={item}
                    variant={filter === item ? 'secondary' : 'ghost'}
                    size="sm"
                    onClick={() => onChange(item)}
                    className={cn(
                        filter === item && 'bg-blue-500/10 text-blue-700 hover:bg-blue-500/15'
                    )}
                >
                    {item}
                </Button>
            ))}
        </div>
    )
}

export default TaskFilterBar