import {
  BarChart3,
  Bot,
  Building2,
  ChevronDown,
  ChevronRight,
  ClipboardCheck,
  LayoutDashboard,
  Receipt,
  Search,
  TrendingUp,
  Wallet,
} from 'lucide-react';
import { useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { cn } from '../../utils/formatters';

interface NavItem {
  label: string;
  icon: React.ReactNode;
  path?: string;
  children?: { label: string; path: string }[];
}

const NAV_ITEMS: NavItem[] = [
  { label: 'Dashboard', icon: <LayoutDashboard className="h-4 w-4" />, path: '/' },
  {
    label: 'Finance',
    icon: <Wallet className="h-4 w-4" />,
    children: [],
  },
  {
    label: 'Sales CRM',
    icon: <TrendingUp className="h-4 w-4" />,
    children: [],
  },
  {
    label: 'RMS',
    icon: <Receipt className="h-4 w-4" />,
    children: [
      { label: 'Dashboard', path: '/rms/dashboard' },
      { label: 'Disbursement', path: '/rms/disbursement' },
      { label: 'Invoices', path: '/rms/invoices' },
      { label: 'PO', path: '/rms/po' },
      { label: 'RMS Reports', path: '/rms/reports' },
    ],
  },
  {
    label: 'Compliance',
    icon: <ClipboardCheck className="h-4 w-4" />,
    children: [],
  },
  {
    label: 'Vendors',
    icon: <Building2 className="h-4 w-4" />,
    children: [],
  },
  {
    label: 'AI Suite',
    icon: <Bot className="h-4 w-4" />,
    children: [],
  },
  {
    label: 'Reports',
    icon: <BarChart3 className="h-4 w-4" />,
    children: [],
  },
];

export interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export function Sidebar({ isOpen, onClose }: SidebarProps) {
  const location = useLocation();
  const [expanded, setExpanded] = useState<Record<string, boolean>>({ RMS: true });
  const [searchQuery, setSearchQuery] = useState('');

  const toggleExpand = (label: string) => {
    setExpanded((prev) => ({ ...prev, [label]: !prev[label] }));
  };

  const isActive = (path: string) => location.pathname === path;

  return (
    <aside className={cn(
      "fixed inset-y-0 left-0 z-30 flex w-[240px] flex-col bg-gradient-to-b from-[var(--color-sidebar-from)] to-[var(--color-sidebar-to)] text-white transition-transform duration-300 ease-in-out md:translate-x-0",
      isOpen ? "translate-x-0" : "-translate-x-full"
    )}>
      <div className="px-5 pt-5 pb-4 flex items-center justify-between">
        <h1 className="text-xl font-bold tracking-tight">FinBowl</h1>
        <button
          onClick={onClose}
          className="rounded p-1 hover:bg-white/10 md:hidden"
          aria-label="Close sidebar"
        >
          <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>

      <div className="px-4 pb-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-white/50" />
          <input
            type="text"
            placeholder="Search"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full rounded-lg border border-white/10 bg-white/10 py-2 pl-9 pr-3 text-sm text-white placeholder:text-white/50 focus:border-white/20 focus:outline-none"
          />
        </div>
      </div>

      <nav className="flex-1 overflow-y-auto px-3 pb-4">
        <ul className="space-y-0.5">
          {NAV_ITEMS.map((item) => {
            const hasChildren = item.children && item.children.length > 0;
            const isExpanded = expanded[item.label];

            if (!hasChildren) {
              return (
                <li key={item.label}>
                  <NavLink
                    to={item.path ?? '#'}
                    className={({ isActive: active }) =>
                      cn(
                        'flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors',
                        active
                          ? 'bg-[var(--color-sidebar-active)] text-white'
                          : 'text-white/70 hover:bg-[var(--color-sidebar-hover)] hover:text-white',
                      )
                    }
                  >
                    {item.icon}
                    {item.label}
                  </NavLink>
                </li>
              );
            }

            return (
              <li key={item.label}>
                <button
                  onClick={() => toggleExpand(item.label)}
                  className="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium text-white/70 transition-colors hover:bg-[var(--color-sidebar-hover)] hover:text-white"
                >
                  {item.icon}
                  <span className="flex-1 text-left">{item.label}</span>
                  {isExpanded ? (
                    <ChevronDown className="h-3.5 w-3.5" />
                  ) : (
                    <ChevronRight className="h-3.5 w-3.5" />
                  )}
                </button>
                {isExpanded && item.children && (
                  <ul className="mt-0.5 ml-3 space-y-0.5 border-l border-white/10 pl-3">
                    {item.children.map((child) => (
                      <li key={child.path}>
                        <NavLink
                          to={child.path}
                          className={cn(
                            'block rounded-lg px-3 py-2 text-sm transition-colors',
                            isActive(child.path)
                              ? 'bg-[var(--color-sidebar-active)] font-medium text-white'
                              : 'text-white/60 hover:bg-[var(--color-sidebar-hover)] hover:text-white',
                          )}
                        >
                          {child.label}
                        </NavLink>
                      </li>
                    ))}
                  </ul>
                )}
              </li>
            );
          })}
        </ul>
      </nav>

      <div className="border-t border-white/10 px-4 py-4">
        <span className="inline-block rounded-full bg-white/10 px-3 py-1 text-xs text-white/60">
          Version 1.0
        </span>
      </div>
    </aside>
  );
}
