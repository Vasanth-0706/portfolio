import { useState, useEffect } from 'react';
import BlinkingCursor from './BlinkingCursor';
import { projects } from '../config';

export default function Projects({ onBack }) {
  const [showCommand, setShowCommand] = useState(false);
  const [visibleProjects, setVisibleProjects] = useState(0);
  const [selectedProject, setSelectedProject] = useState(null);
  const [showDetail, setShowDetail] = useState(false);
  const [showCursor, setShowCursor] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setShowCommand(true), 100);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    if (!showCommand) return;
    if (visibleProjects < projects.length) {
      const t = setTimeout(() => setVisibleProjects(prev => prev + 1), 400);
      return () => clearTimeout(t);
    } else {
      const t = setTimeout(() => setShowCursor(true), 300);
      return () => clearTimeout(t);
    }
  }, [showCommand, visibleProjects]);

  const selectProject = (project) => {
    setSelectedProject(project);
    setTimeout(() => setShowDetail(true), 200);
  };

  const closeDetail = () => {
    setShowDetail(false);
    setSelectedProject(null);
  };

  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === 'Escape' || e.key === 'Backspace') {
        e.preventDefault();
        if (selectedProject) closeDetail();
        else onBack();
      }
      if (!selectedProject && showCursor) {
        const num = parseInt(e.key);
        if (num >= 1 && num <= projects.length) {
          selectProject(projects[num - 1]);
        }
      }
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [onBack, selectedProject, showCursor]);

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="w-full max-w-2xl">
        {showCommand && (
          <p className="text-terminal-green text-sm sm:text-base mb-6 text-glow">
            &gt; ls projects/
          </p>
        )}

        {/* Empty state */}
        {showCommand && projects.length === 0 && (
          <div className="ml-2 sm:ml-4 space-y-3">
            <p className="text-terminal-amber text-sm sm:text-base">
              Coming soon...
            </p>
            <p className="text-terminal-dim text-sm sm:text-base">
              check back later ⏳
            </p>
            <div className="mt-6">
              <span className="text-terminal-green text-sm sm:text-base">&gt; </span>
              <BlinkingCursor />
              <p
                className="text-terminal-dim text-xs mt-4 cursor-pointer hover:text-terminal-green transition-colors"
                onClick={onBack}
              >
                [ESC] Back to menu
              </p>
            </div>
          </div>
        )}

        {projects.length > 0 && !selectedProject && (
          <>
            <div className="space-y-3 ml-2 sm:ml-4">
              {projects.slice(0, visibleProjects).map((project) => (
                <div
                  key={project.id}
                  onClick={() => selectProject(project)}
                  className="cursor-pointer group flex items-center text-sm sm:text-base hover:translate-x-2 transition-all duration-200"
                >
                  <span className="text-terminal-amber mr-3">📁</span>
                  <span className="text-terminal-green group-hover:text-terminal-white transition-colors">
                    project-{project.id}/
                  </span>
                  <span className="text-terminal-cyan ml-3 text-xs sm:text-sm">
                    [{project.status}]
                  </span>
                </div>
              ))}
            </div>

            {showCursor && (
              <div className="mt-6 ml-2 sm:ml-4">
                <span className="text-terminal-dim text-sm">&gt; cd project-</span>
                <BlinkingCursor />
                <p
                  className="text-terminal-dim text-xs mt-4 cursor-pointer hover:text-terminal-green transition-colors"
                  onClick={onBack}
                >
                  [ESC] Back to menu
                </p>
              </div>
            )}
          </>
        )}

        {selectedProject && showDetail && (
          <div className="ml-2 sm:ml-4">
            <p className="text-terminal-green text-sm sm:text-base mb-4 text-glow">
              &gt; cat project-{selectedProject.id}/readme.md
            </p>
            <div className="space-y-2 text-sm sm:text-base">
              <div className="flex">
                <span className="text-terminal-dim w-20 sm:w-24 shrink-0">NAME</span>
                <span className="text-terminal-dim mr-2">:</span>
                <span className="text-terminal-white">{selectedProject.name}</span>
              </div>
              <div className="flex">
                <span className="text-terminal-dim w-20 sm:w-24 shrink-0">STACK</span>
                <span className="text-terminal-dim mr-2">:</span>
                <span className="text-terminal-cyan">{selectedProject.stack}</span>
              </div>
              <div className="flex flex-col sm:flex-row">
                <span className="text-terminal-dim w-20 sm:w-24 shrink-0">DESC</span>
                <span className="text-terminal-dim mr-2 hidden sm:inline">:</span>
                <span className="text-terminal-green whitespace-pre-line">
                  {selectedProject.desc}
                </span>
              </div>
              <div className="flex">
                <span className="text-terminal-dim w-20 sm:w-24 shrink-0">STATUS</span>
                <span className="text-terminal-dim mr-2">:</span>
                <span className="text-terminal-green text-glow">Live ✓</span>
              </div>
            </div>

            <div className="mt-6 flex gap-4">
              {selectedProject.github !== '#' && (
                <a
                  href={selectedProject.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-terminal-cyan hover:text-terminal-white transition-colors text-sm sm:text-base"
                >
                  [G] GitHub
                </a>
              )}
              {selectedProject.live !== '#' && (
                <a
                  href={selectedProject.live}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-terminal-cyan hover:text-terminal-white transition-colors text-sm sm:text-base"
                >
                  [L] Live Demo
                </a>
              )}
            </div>

            <div className="mt-6">
              <span className="text-terminal-green text-sm">&gt; </span>
              <BlinkingCursor />
              <p
                className="text-terminal-dim text-xs mt-4 cursor-pointer hover:text-terminal-green transition-colors"
                onClick={closeDetail}
              >
                [ESC] Back to projects
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
