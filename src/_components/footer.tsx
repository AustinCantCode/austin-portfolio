/** A quiet sign-off. Everything else is in the nav. */
export function Footer() {
  return (
    <footer className="border-t border-hairline text-[13px] text-fg-2">
      <div className="wrap gutter flex flex-wrap items-center justify-between gap-x-6 gap-y-1 py-7">
        <p>© {new Date().getFullYear()} Austin Sia</p>
        <p>Designed and developed by me in Singapore.</p>
      </div>
      {/* Room for the mobile tab bar (see Nav). */}
      <div
        aria-hidden="true"
        className="h-[calc(64px+env(safe-area-inset-bottom))] lg:hidden"
      />
    </footer>
  );
}
