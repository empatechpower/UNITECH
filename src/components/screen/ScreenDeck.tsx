'use client';

import { useSearchParams } from 'next/navigation';

export interface DeckPanel {
  id: string;
  content: React.ReactNode;
}

/**
 * Renders the panels of a screen. The selector for them lives in SiteNav, so
 * the deck is driven entirely by the `view` search param: navigation and state
 * are the same thing, which is what lets one bar serve as the whole site nav.
 *
 * Every panel is rendered into the DOM on the server, so the full content of
 * the screen reaches crawlers and no-JS readers in the initial HTML. Only the
 * active one is visible; the rest are `inert`, which takes them out of the
 * accessibility tree and tab order without taking them out of the document.
 */
export default function ScreenDeck({ panels }: { panels: DeckPanel[] }) {
  const searchParams = useSearchParams();
  const requested = searchParams.get('view');
  const active = panels.some((p) => p.id === requested) ? requested : panels[0]?.id;

  return (
    <div className="relative min-h-0 flex-1">
      {panels.map((p) => (
        <section
          key={p.id}
          id={`panel-${p.id}`}
          data-state={active === p.id ? 'active' : 'inactive'}
          inert={active === p.id ? undefined : true}
          className="panel"
        >
          {p.content}
        </section>
      ))}
    </div>
  );
}
