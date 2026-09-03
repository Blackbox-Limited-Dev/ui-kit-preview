import {
  ArrowLeft,
  ArrowRight,
  Calendar,
  Cart,
  Check,
  Clock,
  Copy,
  Eye,
  EyeClosed,
  Heart,
  InfoCircle,
  MapPin,
  Menu,
  NavArrowDown,
  NavArrowLeft,
  NavArrowRight,
  NavArrowUp,
  Search,
  User,
  WarningTriangle,
  Xmark,
} from 'iconoir-react'

import type { ComponentType, SVGProps } from 'react'

// Add new icons here as the design system grows. Keep keys mirroring the
// iconoir-react export names so they're easy to grep against iconoir.com.
export const iconoirIcons = {
  ArrowLeft,
  ArrowRight,
  Calendar,
  Cart,
  Check,
  Clock,
  Copy,
  Eye,
  EyeClosed,
  Heart,
  InfoCircle,
  MapPin,
  Menu,
  NavArrowDown,
  NavArrowLeft,
  NavArrowRight,
  NavArrowUp,
  Search,
  User,
  WarningTriangle,
  Xmark,
} satisfies Record<string, ComponentType<SVGProps<SVGSVGElement>>>

export type IconoirIconName = keyof typeof iconoirIcons
