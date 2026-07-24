import { X } from 'lucide-react';
import type { ActivityLogEntry } from '../../types';
import { StatusBadge } from '../ui/Badge';
import { Avatar } from '../ui/Avatar';

interface ActivityDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  entries: ActivityLogEntry[];
}

export function ActivityDrawer({ isOpen, onClose, entries }: ActivityDrawerProps) {
  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 z-40 bg-black/20 backdrop-blur-[1px]"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Drawer */}
      <aside className="fixed inset-y-0 right-0 z-50 flex w-[380px] max-w-full flex-col border-l border-[var(--color-border)] bg-white shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-[var(--color-border)] px-5 py-4">
          <h2 className="text-base font-semibold text-[var(--color-text-primary)]">
            Activity Log
          </h2>
          <button
            onClick={onClose}
            className="rounded-md p-1.5 text-[var(--color-text-muted)] hover:bg-gray-100 hover:text-[var(--color-text-primary)] transition-colors"
            aria-label="Close activity log"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Entries */}
        <div className="flex-1 overflow-y-auto">
          {entries.length === 0 ? (
            <p className="p-6 text-center text-sm text-[var(--color-text-muted)]">
              No activity recorded yet.
            </p>
          ) : (
            <ul className="divide-y divide-[var(--color-border)]">
              {entries.map((entry) => (
                <li key={entry.id} className="px-5 py-4">
                  <div className="flex items-start gap-3">
                    <Avatar src={entry.avatar} alt={entry.user} size="md" />
                    <div className="min-w-0 flex-1">
                      {/* Action + timestamp on the same row */}
                      <div className="flex items-start justify-between gap-2">
                        <p className="text-sm font-semibold text-[var(--color-text-primary)] leading-snug">
                          {entry.action}
                        </p>
                        <span className="shrink-0 text-xs text-[var(--color-text-muted)] whitespace-nowrap pt-0.5">
                          {entry.timestamp}
                        </span>
                      </div>
                      <p className="mt-0.5 text-xs text-[var(--color-text-secondary)]">
                        {entry.user}
                      </p>

                      {/* Change card */}
                      {entry.change && (
                        <div className="mt-3 rounded-lg border border-[var(--color-border)] bg-gray-50 p-3">
                          {entry.change.label && (
                            <p className="mb-2 text-xs font-medium text-[var(--color-text-secondary)]">
                              {entry.change.label}
                            </p>
                          )}
                          <div className="grid grid-cols-2 gap-2">
                            <div>
                              <p className="mb-1 text-[10px] uppercase tracking-wide text-[var(--color-text-muted)]">
                                From
                              </p>
                              {entry.change.fromBadge ? (
                                <StatusBadge status={entry.change.fromBadge} />
                              ) : (
                                <span className="text-sm font-medium text-[var(--color-text-primary)]">
                                  {entry.change.from}
                                </span>
                              )}
                            </div>
                            <div>
                              <p className="mb-1 text-[10px] uppercase tracking-wide text-[var(--color-text-muted)]">
                                To
                              </p>
                              {entry.change.toBadge ? (
                                <StatusBadge status={entry.change.toBadge} />
                              ) : (
                                <span className="text-sm font-medium text-[var(--color-text-primary)]">
                                  {entry.change.to}
                                </span>
                              )}
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      </aside>
    </>
  );
}
