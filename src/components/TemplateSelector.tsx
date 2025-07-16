import { cn } from '@/lib/utils'
import type { TemplateType } from '@/types/invoice'
import { Button } from './ui/button'
import { Card, CardContent, CardHeader, CardTitle } from './ui/card'
import type { Template } from '@/app/actions/templates'

interface TemplateSelectorProps {
  templates: Template[]
  selectedTemplate: TemplateType
  onTemplateSelect: (template: TemplateType) => void
}

export default function TemplateSelector({ templates, selectedTemplate, onTemplateSelect }: TemplateSelectorProps) {
  return (
    <Card>
        <CardHeader>
            <CardTitle>Choose a Template</CardTitle>
        </CardHeader>
        <CardContent>
            <div className="grid grid-cols-2 gap-3">
                {templates.map((template) => (
                <Button
                    key={template.id}
                    onClick={() => onTemplateSelect(template.id)}
                    variant={selectedTemplate === template.id ? 'default' : 'outline'}
                    className={cn(
                        "h-auto flex-col p-4",
                        selectedTemplate === template.id && `${template.color} text-white`
                    )}
                >
                    <div className={cn("w-full h-12 rounded-sm mb-2", template.color)}/>
                    <span>{template.name}</span>
                </Button>
                ))}
            </div>
        </CardContent>
    </Card>
  )
}
