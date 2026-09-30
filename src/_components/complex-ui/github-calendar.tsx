"use client";

import { useEffect, useMemo, useState } from "react";
import { cn } from "@lib/utils";
import { Icon } from "../icon";

type Day = { date: string; count: number; level: 0 | 1 | 2 | 3 | 4 };

/** Public contributions API (GitHub's own calendar, as JSON). */
const API = (user: string) =>
  `https://github-contributions-api.jogruber.de/v4/${encodeURIComponent(user)}?y=last`;

// Empty days in the card's pill tone, busier days in deeper gold.
const LEVEL = [
  "bg-pill",
  "bg-[color-mix(in_srgb,var(--accent-fill)_28%,var(--pill))]",
  "bg-[color-mix(in_srgb,var(--accent-fill)_52%,var(--pill))]",
  "bg-[color-mix(in_srgb,var(--accent-fill)_76%,var(--pill))]",
  "bg-accent",
];

const MONTHS = "Jan Feb Mar Apr May Jun Jul Aug Sep Oct Nov Dec".split(" ");
const nice = (d: string) =>
  new Date(`${d}T00:00:00`).toLocaleDateString("en-SG", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });

/** Weeks of days (Sunday first), padded so the first week starts on Sunday. */
function toWeeks(days: Day[]) {
  const weeks: (Day | null)[][] = [];
  const lead = days.length ? new Date(`${days[0].date}T00:00:00`).getDay() : 0;
  const cells: (Day | null)[] = [...Array(lead).fill(null), ...days];
  for (let i = 0; i < cells.length; i += 7) weeks.push(cells.slice(i, i + 7));
  return weeks;
}

function stats(days: Day[]) {
  const total = days.reduce((n, d) => n + d.count, 0);
  let longest = 0;
  let run = 0;
  for (const d of days) {
    run = d.count > 0 ? run + 1 : 0;
    longest = Math.max(longest, run);
  }
  // Today may not have contributions yet, so the streak can end yesterday.
  let current = 0;
  for (let i = days.length - 1; i >= 0; i--) {
    if (days[i].count > 0) current++;
    else if (i === days.length - 1) continue;
    else break;
  }
  const best = days.reduce<Day | null>(
    (b, d) => (!b || d.count > b.count ? d : b),
    null,
  );
  return { total, longest, current, best };
}

/**
 * My GitHub contributions over the last year, drawn in the site's own
 * charcoal and gold: the year's total and streaks above a calendar of
 * days, deeper gold for busier days. Falls back to a link to my GitHub
 * profile if the numbers can't load (for example when offline).
 */
export default function GitHubCalendar({ username }: { username: string }) {
  const [days, setDays] = useState<Day[] | null>(null);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    const ctrl = new AbortController();
    fetch(API(username), { signal: ctrl.signal })
      .then((r) => (r.ok ? r.json() : Promise.reject(r.status)))
      .then((j: { contributions?: Day[] }) => {
        if (!j.contributions?.length) throw new Error("empty");
        setDays(j.contributions);
      })
      .catch(() => !ctrl.signal.aborted && setFailed(true));
    return () => ctrl.abort();
  }, [username]);

  const weeks = useMemo(() => (days ? toWeeks(days) : []), [days]);
  const s = useMemo(() => (days ? stats(days) : null), [days]);
  // A month's label sits over the first week that starts in it.
  const months = useMemo(
    () =>
      weeks.flatMap((w, i) => {
        const first = w.find(Boolean);
        if (!first) return [];
        const d = new Date(`${first.date}T00:00:00`);
        const prev = weeks[i - 1]?.find(Boolean);
        const prevMonth = prev
          ? new Date(`${prev.date}T00:00:00`).getMonth()
          : -1;
        return d.getMonth() !== prevMonth && (i > 0 || d.getDate() <= 7)
          ? [{ col: i, label: MONTHS[d.getMonth()] }]
          : [];
      }),
    [weeks],
  );

  if (failed) {
    return (
      <a
        href={`https://github.com/${username}`}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center gap-4 text-fg hover:no-underline"
      >
        <span className="grid size-12 flex-none place-items-center rounded-full bg-well">
          <Icon name="mdi:github" size={24} />
        </span>
        <span className="flex flex-col">
          <span className="text-[17px] font-semibold">
            See my contributions on GitHub
          </span>
          <span className="text-[14px] text-fg-2">
            The calendar couldn&apos;t load here.
          </span>
        </span>
        <Icon name="arrow-up-right" size={18} className="ml-auto text-fg-2" />
      </a>
    );
  }

  const figures = s && [
    { n: s.total.toLocaleString("en-SG"), label: "contributions this year" },
    { n: `${s.current}`, label: "current streak (days)" },
    { n: `${s.longest}`, label: "longest streak (days)" },
    ...(s.best && s.best.count > 0
      ? [{ n: `${s.best.count}`, label: `busiest day, ${nice(s.best.date)}` }]
      : []),
  ];

  return (
    <div className="flex min-w-[680px] flex-col gap-[clamp(24px,3vw,36px)]">
      {/* The year in numbers. */}
      <dl className="m-0 flex flex-wrap gap-x-[clamp(32px,5vw,72px)] gap-y-4">
        {(figures ?? [0, 1, 2, 3]).map((f, i) => (
          <div key={i} className="flex flex-col gap-1">
            <dt className="order-2 text-[14px] text-fg-2">
              {typeof f === "number" ? " " : f.label}
            </dt>
            <dd
              className={cn(
                "font-display order-1 m-0 text-[clamp(28px,3vw,40px)] leading-none font-bold tracking-[-0.02em]",
                i === 0 && "text-accent-text",
                typeof f === "number" &&
                  "h-[1em] w-24 animate-pulse rounded-md bg-pill",
              )}
            >
              {typeof f === "number" ? "" : f.n}
            </dd>
          </div>
        ))}
      </dl>

      {/* The calendar: a column per week, a row per weekday. */}
      <div
        className="grid grid-cols-[auto_minmax(0,1fr)] gap-x-2.5 gap-y-2"
        aria-busy={!days}
      >
        <span />
        <div
          aria-hidden="true"
          className="relative h-4 text-[12px] leading-4 text-fg-2"
        >
          {months.map((m) => (
            <span
              key={m.col}
              className="absolute top-0"
              style={{ left: `${(m.col / Math.max(weeks.length, 1)) * 100}%` }}
            >
              {m.label}
            </span>
          ))}
        </div>
        <div
          aria-hidden="true"
          className="grid grid-rows-7 gap-[3px] text-[11px] leading-none text-fg-2"
        >
          {["", "Mon", "", "Wed", "", "Fri", ""].map((d, i) => (
            <span key={i} className="flex items-center">
              {d}
            </span>
          ))}
        </div>
        <div
          role="img"
          aria-label={
            s
              ? `${s.total} GitHub contributions in the last year`
              : "Loading GitHub contributions"
          }
          className="grid grid-flow-col grid-rows-7 gap-[3px]"
          style={{
            gridTemplateColumns: `repeat(${weeks.length || 53}, minmax(0, 1fr))`,
          }}
        >
          {(weeks.length ? weeks : Array(53).fill(Array(7).fill(null))).map(
            (w: (Day | null)[], i: number) =>
              Array.from({ length: 7 }, (_, j) => {
                const d = w[j];
                return (
                  <span
                    key={`${i}-${j}`}
                    title={
                      d
                        ? `${d.count || "No"} contribution${d.count === 1 ? "" : "s"} on ${nice(d.date)}`
                        : undefined
                    }
                    className={cn(
                      "aspect-square w-full rounded-[3px] transition-colors duration-500",
                      d
                        ? LEVEL[d.level]
                        : days
                          ? "bg-transparent"
                          : "bg-pill/60",
                      !days && "animate-pulse",
                    )}
                  />
                );
              }),
          )}
        </div>
      </div>

      <div className="flex items-center justify-end gap-1.5 text-[12px] text-fg-2">
        Less
        {LEVEL.map((c) => (
          <span key={c} className={cn("size-3 rounded-[3px]", c)} />
        ))}
        More
      </div>
    </div>
  );
}
