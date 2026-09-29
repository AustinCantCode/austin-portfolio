import type { SkillIcon as Data } from "@data/skill-icons";

/** Renders an icon built by skillIcon() (src/data/skill-icons.ts). */
export function SkillIcon({
  icon,
  size = 16,
  className,
}: {
  icon?: Data;
  size?: number;
  className?: string;
}) {
  if (!icon) return null;
  return (
    <svg
      width={size}
      height={size}
      viewBox={icon.viewBox}
      fill="currentColor"
      aria-hidden="true"
      focusable="false"
      className={className}
      dangerouslySetInnerHTML={{ __html: icon.body }}
    />
  );
}
