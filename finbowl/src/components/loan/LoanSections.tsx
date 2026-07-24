import { ChevronDown, ChevronUp } from 'lucide-react';
import { useState, type ReactNode } from 'react';
import { cn } from '../../utils/formatters';

interface SectionCardProps {
  title: string;
  icon?: ReactNode;
  badge?: ReactNode;
  defaultOpen?: boolean;
  children: ReactNode;
  id?: string;
}

export function SectionCard({
  title,
  icon,
  badge,
  defaultOpen = true,
  children,
  id,
}: SectionCardProps) {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  return (
    <section
      id={id}
      className="scroll-mt-[72px] overflow-hidden rounded-lg border border-[var(--color-border)] bg-white"
    >
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex w-full items-center justify-between px-5 py-4 text-left hover:bg-gray-50/50"
      >
        <div className="flex items-center gap-2">
          {icon}
          <h3 className="text-sm font-semibold text-[var(--color-text-primary)]">
            {title}
          </h3>
          {badge}
        </div>
        {isOpen ? (
          <ChevronUp className="h-4 w-4 text-[var(--color-text-muted)]" />
        ) : (
          <ChevronDown className="h-4 w-4 text-[var(--color-text-muted)]" />
        )}
      </button>
      {isOpen && (
        <div className="border-t border-[var(--color-border)] px-5 py-4">
          {children}
        </div>
      )}
    </section>
  );
}

interface SectionNavProps {
  sections: { id: string; label: string }[];
  activeSection: string;
  onNavigate: (id: string) => void;
}

export function SectionNav({ sections, activeSection, onNavigate }: SectionNavProps) {
  return (
    <nav className="sticky top-[72px] h-fit w-[200px] shrink-0">
      <ul className="space-y-0.5">
        {sections.map((section) => (
          <li key={section.id}>
            <button
              onClick={() => onNavigate(section.id)}
              className={cn(
                'w-full rounded-lg px-3 py-2 text-left text-sm transition-colors',
                activeSection === section.id
                  ? 'border-l-2 border-[var(--color-primary)] bg-[var(--color-primary-light)] font-medium text-[var(--color-primary)]'
                  : 'text-[var(--color-text-secondary)] hover:bg-gray-100 hover:text-[var(--color-text-primary)]',
              )}
            >
              {section.label}
            </button>
          </li>
        ))}
      </ul>
    </nav>
  );
}

interface DetailFieldProps {
  label: string;
  value: ReactNode;
  valueClassName?: string;
}

export function DetailField({ label, value, valueClassName }: DetailFieldProps) {
  return (
    <div>
      <p className="mb-1 text-xs text-[var(--color-text-muted)]">{label}</p>
      <div className={cn('text-sm font-medium text-[var(--color-text-primary)]', valueClassName)}>
        {value}
      </div>
    </div>
  );
}

export function DataTable({
  headers,
  rows,
}: {
  headers: string[];
  rows: ReactNode[][];
}) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-[var(--color-border)] bg-gray-50/80">
            {headers.map((header) => (
              <th
                key={header}
                className="whitespace-nowrap px-4 py-2.5 text-left text-xs font-medium text-[var(--color-text-secondary)]"
              >
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, idx) => (
            <tr key={idx} className="border-b border-[var(--color-border-light)]">
              {row.map((cell, cellIdx) => (
                <td
                  key={cellIdx}
                  className="whitespace-nowrap px-4 py-3 text-[var(--color-text-primary)]"
                >
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
