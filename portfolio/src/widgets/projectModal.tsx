import { useState, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { ProjectLoader } from '../shared/projectLoader.ts';
import type { ProjectData } from '../shared/projectLoader.ts';

type ProjectModalProps = {
  slug: string | null;
  onClose: () => void;
};

export function ProjectModal({ slug, onClose }: ProjectModalProps) {
  const [project, setProject] = useState<ProjectData | null>(null);
  const [loading, setLoading] = useState(false);
  const closeBtnRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!slug) { setProject(null); return; }
    
    setLoading(true);
    ProjectLoader.getInstance().getProjectBySlug(slug).then(data => {
      setProject(data);
      setLoading(false);
    });
  }, [slug]);

  useEffect(() => {
    if (!slug) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', handleKeyDown);
    closeBtnRef.current?.focus();
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [slug, onClose]);

  if (!slug) return null;

  const modalContent = (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4"
      onClick={onClose}
      role="presentation"
    >
      <div
        className="bg-white dark:bg-gray-900 rounded-2xl shadow-2xl w-full max-w-2xl max-h-[85vh] overflow-hidden flex flex-col"
        onClick={e => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
        tabIndex={-1}
      >
        <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700">
          <h2 id="modal-title" className="text-lg font-semibold text-gray-900 dark:text-gray-100 truncate pr-4">
            {loading ? 'Загрузка...' : project?.title || 'Проект'}
          </h2>
          <button
            ref={closeBtnRef}
            onClick={onClose}
            className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full transition shrink-0"
            aria-label="Закрыть"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          </button>
        </div>

        <div className="text-blue-200 flex-1 overflow-y-auto p-6 prose prose-sm sm:prose prose-gray dark:prose-invert max-w-none">
          {loading ? (
            <div className="flex justify-center py-10 animate-pulse text-gray-500">Загрузка...</div>
          ) : project?.content ? (
            <ReactMarkdown remarkPlugins={[remarkGfm]}>{project.content}</ReactMarkdown>
          ) : (
            <p className="text-gray-500">Контент не найден.</p>
          )}
        </div>
      </div>
    </div>
  );

  return createPortal(modalContent, document.body);
}