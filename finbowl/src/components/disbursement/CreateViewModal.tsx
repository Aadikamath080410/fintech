import { useState } from 'react';
import { Button } from '../ui/Button';
import { Modal } from '../ui/Modal';

interface CreateViewModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCreate: (name: string) => void;
}

export function CreateViewModal({ isOpen, onClose, onCreate }: CreateViewModalProps) {
  const [viewName, setViewName] = useState('');

  const handleCreate = () => {
    if (viewName.trim()) {
      onCreate(viewName.trim());
      setViewName('');
    }
  };

  const handleClose = () => {
    setViewName('');
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={handleClose}
      title="Create Custom View"
      footer={
        <>
          <Button variant="outline" onClick={handleClose}>
            Cancel
          </Button>
          <Button
            variant="primary"
            onClick={handleCreate}
            disabled={!viewName.trim()}
          >
            Create View
          </Button>
        </>
      }
    >
      <div>
        <label
          htmlFor="view-name"
          className="mb-1.5 block text-sm font-medium text-[var(--color-text-primary)]"
        >
          Enter View Name <span className="text-red-500">*</span>
        </label>
        <input
          id="view-name"
          type="text"
          placeholder="Enter View Name"
          value={viewName}
          onChange={(e) => setViewName(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleCreate()}
          className="w-full rounded-lg border border-[var(--color-border)] px-3 py-2.5 text-sm text-[var(--color-text-primary)] placeholder:text-[var(--color-text-muted)] focus:border-[var(--color-primary)] focus:outline-none focus:ring-1 focus:ring-[var(--color-primary)]"
        />
      </div>
    </Modal>
  );
}
