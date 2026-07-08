import { useEffect, useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'

const TeamForm = ({
  mode = 'add',
  initialValues,
  onOpenChange,
  onSubmit,
}) => {
  const [formData, setFormData] = useState({ name: '', description: '' })

  useEffect(() => {
    if (mode === 'edit' && initialValues) {
      setFormData({
        name: initialValues.name ?? '',
        description: initialValues.description ?? '',
      })
      return
    }

    setFormData({ name: '', description: '' })
  }, [mode, initialValues])

  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleSubmit = () => {
    if (!formData.name.trim()) return

    onSubmit?.({
      Name: formData.name.trim(),
      Description: formData.description.trim(),
    })

    if (mode === 'add') {
      setFormData({ name: '', description: '' })
    }

    onOpenChange(false)
  }

  return (
    <div className="space-y-5">
      <div className="space-y-2">
        <Label className="font-medium">Team Name *</Label>
        <Input
          placeholder="e.g. Frontend Team"
          value={formData.name}
          onChange={(e) => handleChange('name', e.target.value)}
        />
      </div>

      <div className="space-y-2">
        <Label className="font-medium">Description</Label>
        <Textarea
          className="h-24 resize-none"
          placeholder="What does this team do?"
          value={formData.description}
          onChange={(e) => handleChange('description', e.target.value)}
        />
      </div>

      <div className="flex justify-end gap-3 border-t pt-5">
        <Button variant="outline" onClick={() => onOpenChange(false)}>
          Cancel
        </Button>
        <Button onClick={handleSubmit}>
          {mode === 'edit' ? 'Save Changes' : 'Create Team'}
        </Button>
      </div>
    </div>
  )
}

export default TeamForm
