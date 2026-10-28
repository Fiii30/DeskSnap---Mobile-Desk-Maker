// Tipe Template dari file induk.
import type { Template } from "../data/template-types";

// Komponen kartu template.
import TemplateCard from "./TemplateCard";

// Props grid template.
type TemplateGridProps = {
  templates: Template[];
  selectedTemplate: Template["key"];
  onSelectTemplate: (template: Template) => void;
};

// Grid berisi template.
export default function TemplateGrid({
  templates,
  selectedTemplate,
  onSelectTemplate,
}: TemplateGridProps) {
  return (
    // Grid dua kolom.
    <div className="grid w-full grid-cols-2 gap-3.5">
      {/* Render setiap template */}
      {templates.map((template) => (
        <TemplateCard
          key={template.key}
          template={template}
          isActive={selectedTemplate === template.key}
          onSelect={onSelectTemplate}
        />
      ))}
    </div>
  );
}