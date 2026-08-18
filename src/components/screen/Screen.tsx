'use client';

import { useEffect } from 'react';

/**
 * Opts a page into the fixed-viewport shell: the document stops scrolling and
 * the page fills exactly the space between the header and the status bar.
 *
 * It is opt-in per page rather than global because the un-migrated Services
 * pages still rely on document scroll and window-scroll listeners. When every
 * page is migrated this can move up into the layout and the attribute goes.
 */
export default function Screen({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    const root = document.documentElement;
    const previous = root.dataset.shell;
    root.dataset.shell = 'screen';
    return () => {
      if (previous) root.dataset.shell = previous;
      else delete root.dataset.shell;
    };
  }, []);

  return (
    <div className="screen-frame">
      <div className="ground-texture" aria-hidden="true" />
      {children}
    </div>
  );
}
