import { Bell, Building2, ChevronDown, FlaskConical, Menu } from 'lucide-react';
import { UserAvatar } from '../ui/Avatar';
import { useDisbursementContext } from '../../context/DisbursementContext';

export function TopHeader({ onMenuClick }: { onMenuClick: () => void }) {
  const { demoState, setDemoState } = useDisbursementContext();

  return (
    <header className="sticky top-0 z-20 flex h-14 items-center justify-between border-b border-[var(--color-border)] bg-white px-4 md:px-6">
      <div className="flex items-center gap-2 md:gap-3">
        <button
          onClick={onMenuClick}
          className="rounded-lg p-1.5 text-[var(--color-text-secondary)] hover:bg-gray-100 md:hidden"
          aria-label="Open menu"
        >
          <Menu className="h-5 w-5" />
        </button>
        <button className="hidden sm:inline-flex items-center gap-2 rounded-lg border border-[var(--color-border)] bg-white px-3 py-1.5 text-sm font-medium text-[var(--color-text-primary)] hover:bg-gray-50">
          <Building2 className="h-4 w-4 text-[var(--color-text-secondary)]" />
          Gracia Advisory Group
          <ChevronDown className="h-3.5 w-3.5 text-[var(--color-text-muted)]" />
        </button>
        <button className="hidden sm:inline-flex items-center gap-2 rounded-lg border border-[var(--color-border)] bg-white px-3 py-1.5 text-sm font-medium text-[var(--color-text-primary)] hover:bg-gray-50">
          <Building2 className="h-4 w-4 text-[var(--color-text-secondary)]" />
          ABC Advisory Group
          <ChevronDown className="h-3.5 w-3.5 text-[var(--color-text-muted)]" />
        </button>
      </div>

      <div className="flex items-center gap-4">
        {/* State Simulator Dropdown */}
        <div className="flex items-center gap-1.5 rounded-lg border border-purple-200 bg-purple-50 px-2.5 py-1 text-xs text-purple-700">
          <FlaskConical className="h-3.5 w-3.5 text-purple-500 animate-pulse" />
          <span className="font-semibold select-none">Demo State:</span>
          <select
            value={demoState}
            onChange={(e) => setDemoState(e.target.value as any)}
            className="bg-transparent font-semibold text-purple-900 focus:outline-none cursor-pointer pr-1"
          >
            <option value="success" className="bg-white text-gray-800">Success</option>
            <option value="loading" className="bg-white text-gray-800">Loading</option>
            <option value="error" className="bg-white text-gray-800">Error</option>
            <option value="empty" className="bg-white text-gray-800">Empty</option>
          </select>
        </div>

        <button className="relative rounded-lg p-2 hover:bg-gray-50" aria-label="Notifications">
          <Bell className="h-5 w-5 text-[var(--color-text-secondary)]" />
          <span className="absolute -top-0.5 -right-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-[10px] font-bold text-white">
            2
          </span>
        </button>
        <UserAvatar
          src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=100"
          alt="User profile"
        />
      </div>
    </header>
  );
}
