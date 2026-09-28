import type { SVGProps } from "react";
import {
  ArrowDownToLine,
  ArrowRight,
  ArrowUpRight,
  Award,
  Box,
  Briefcase,
  CalendarClock,
  CalendarDays,
  ChartLine,
  Check,
  ChefHat,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  CodeXml,
  Copy,
  FileText,
  Image as ImageIcon,
  Layers,
  LayoutGrid,
  LayoutTemplate,
  Leaf,
  Mail,
  MapPin,
  Maximize2,
  Monitor,
  Moon,
  Palette,
  PenTool,
  Phone,
  Rocket,
  ScanLine,
  Server,
  Smartphone,
  Sparkles,
  Sun,
  Trophy,
  X,
  type LucideIcon,
} from "lucide-react";

const LUCIDE: Record<string, LucideIcon> = {
  "arrow-down-to-line": ArrowDownToLine,
  "arrow-right": ArrowRight,
  "arrow-up-right": ArrowUpRight,
  award: Award,
  box: Box,
  briefcase: Briefcase,
  "calendar-clock": CalendarClock,
  "calendar-days": CalendarDays,
  "chart-line": ChartLine,
  check: Check,
  "chef-hat": ChefHat,
  "chevron-down": ChevronDown,
  "chevron-left": ChevronLeft,
  "chevron-right": ChevronRight,
  "code-xml": CodeXml,
  copy: Copy,
  "file-text": FileText,
  image: ImageIcon,
  layers: Layers,
  "layout-grid": LayoutGrid,
  "layout-template": LayoutTemplate,
  leaf: Leaf,
  mail: Mail,
  "map-pin": MapPin,
  "maximize-2": Maximize2,
  monitor: Monitor,
  moon: Moon,
  palette: Palette,
  "pen-tool": PenTool,
  phone: Phone,
  rocket: Rocket,
  "scan-line": ScanLine,
  server: Server,
  smartphone: Smartphone,
  sparkles: Sparkles,
  sun: Sun,
  trophy: Trophy,
  x: X,
};

// Brand marks (Material Design Icons paths) and a simple Google Play mark.
const BRAND: Record<
  string,
  (props: SVGProps<SVGSVGElement>) => React.ReactNode
> = {
  linkedin: (props) => (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.32 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.79M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z" />
    </svg>
  ),
  github: (props) => (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M12 2A10 10 0 0 0 2 12c0 4.42 2.87 8.17 6.84 9.5c.5.08.66-.23.66-.5v-1.69c-2.77.6-3.36-1.34-3.36-1.34c-.46-1.16-1.11-1.47-1.11-1.47c-.91-.62.07-.6.07-.6c1 .07 1.53 1.03 1.53 1.03c.87 1.52 2.34 1.07 2.91.83c.09-.65.35-1.09.63-1.34c-2.22-.25-4.55-1.11-4.55-4.92c0-1.11.38-2 1.03-2.71c-.1-.25-.45-1.29.1-2.64c0 0 .84-.27 2.75 1.02c.79-.22 1.65-.33 2.5-.33s1.71.11 2.5.33c1.91-1.29 2.75-1.02 2.75-1.02c.55 1.35.2 2.39.1 2.64c.65.71 1.03 1.6 1.03 2.71c0 3.82-2.34 4.66-4.57 4.91c.36.31.69.92.69 1.85V21c0 .27.16.59.67.5C19.14 20.16 22 16.42 22 12A10 10 0 0 0 12 2" />
    </svg>
  ),
  whatsapp: (props) => (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M12.04 2c-5.46 0-9.91 4.45-9.91 9.91c0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21c5.46 0 9.91-4.45 9.91-9.91c0-2.65-1.03-5.14-2.9-7.01A9.82 9.82 0 0 0 12.04 2m.01 1.67c2.2 0 4.26.86 5.82 2.42a8.23 8.23 0 0 1 2.41 5.83c0 4.54-3.7 8.23-8.24 8.23c-1.48 0-2.93-.39-4.19-1.15l-.3-.17l-3.12.82l.83-3.04l-.2-.32a8.2 8.2 0 0 1-1.26-4.38c.01-4.54 3.7-8.24 8.25-8.24M8.53 7.33c-.16 0-.43.06-.66.31c-.22.25-.87.86-.87 2.07c0 1.22.89 2.39 1 2.56c.14.17 1.76 2.67 4.25 3.73c.59.27 1.05.42 1.41.53c.59.19 1.13.16 1.56.1c.48-.07 1.46-.6 1.67-1.18s.21-1.07.15-1.18c-.07-.1-.23-.16-.48-.27c-.25-.14-1.47-.74-1.69-.82c-.23-.08-.37-.12-.56.12c-.16.25-.64.81-.78.97c-.15.17-.29.19-.53.07c-.26-.13-1.06-.39-2-1.23c-.74-.66-1.23-1.47-1.38-1.72c-.12-.24-.01-.39.11-.5c.11-.11.27-.29.37-.44c.13-.14.17-.25.25-.41c.08-.17.04-.31-.02-.43c-.06-.11-.56-1.35-.77-1.84c-.2-.48-.4-.42-.56-.43c-.14 0-.3-.01-.47-.01" />
    </svg>
  ),
  "google-play": (props) => (
    <svg viewBox="0 0 24 24" {...props}>
      <path fill="#00a0ff" d="M3 2.5 13 12 3 21.5z" />
      <path fill="#00d95f" d="M3 2.5 16.6 9.9 13 12z" />
      <path fill="#ff3a44" d="M3 21.5 13 12l3.6 2.1z" />
      <path fill="#ffd400" d="M16.6 9.9 21 12l-4.4 2.1L13 12z" />
    </svg>
  ),
};

export type IconName = string;

/**
 * Renders an icon by its Iconify-style name (for example "lucide:mail" or
 * "mdi:github"), so names from the content files can be used directly.
 * Icons are inline SVG and render on the server.
 */
export function Icon({
  name,
  size = 18,
  className,
  strokeWidth,
}: {
  name: IconName;
  size?: number;
  className?: string;
  strokeWidth?: number;
}) {
  const [set, key] = name.includes(":") ? name.split(":") : ["lucide", name];
  if (set === "lucide") {
    const Cmp = LUCIDE[key];
    if (!Cmp) return null;
    return (
      <Cmp
        width={size}
        height={size}
        strokeWidth={strokeWidth ?? 2}
        className={className}
        aria-hidden="true"
      />
    );
  }
  const brandKey = key === "google-play-icon" ? "google-play" : key;
  const Brand = BRAND[brandKey];
  if (!Brand) return null;
  return (
    <Brand
      width={size}
      height={size}
      className={className}
      aria-hidden="true"
      focusable="false"
    />
  );
}
