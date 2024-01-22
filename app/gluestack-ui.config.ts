const colors = {
  // NativeBase color Tokens
  "rose.50": "#fff1f2",
  "rose.100": "#ffe4e6",
  "rose.200": "#fecdd3",
  "rose.300": "#fda4af",
  "rose.400": "#fb7185",
  "rose.500": "#f43f5e",
  "rose.600": "#e11d48",
  "rose.700": "#be123c",
  "rose.800": "#9f1239",
  "rose.900": "#881337",
  "pink.50": "#fdf2f8",
  "pink.100": "#fce7f3",
  "pink.200": "#fbcfe8",
  "pink.300": "#f9a8d4",
  "pink.400": "#f472b6",
  "pink.500": "#ec4899",
  "pink.600": "#db2777",
  "pink.700": "#be185d",
  "pink.800": "#9d174d",
  "pink.900": "#831843",
  "fuchsia.50": "#fdf4ff",
  "fuchsia.100": "#fae8ff",
  "fuchsia.200": "#f5d0fe",
  "fuchsia.300": "#f0abfc",
  "fuchsia.400": "#e879f9",
  "fuchsia.500": "#d946ef",
  "fuchsia.600": "#c026d3",
  "fuchsia.700": "#a21caf",
  "fuchsia.800": "#86198f",
  "fuchsia.900": "#701a75",
  "purple.50": "#faf5ff",
  "purple.100": "#f3e8ff",
  "purple.200": "#e9d5ff",
  "purple.300": "#d8b4fe",
  "purple.400": "#c084fc",
  "purple.500": "#a855f7",
  "purple.600": "#9333ea",
  "purple.700": "#7e22ce",
  "purple.800": "#6b21a8",
  "purple.900": "#581c87",
  "violet.50": "#f5f3ff",
  "violet.100": "#ede9fe",
  "violet.200": "#ddd6fe",
  "violet.300": "#c4b5fd",
  "violet.400": "#a78bfa",
  "violet.500": "#8b5cf6",
  "violet.600": "#7c3aed",
  "violet.700": "#6d28d9",
  "violet.800": "#5b21b6",
  "violet.900": "#4c1d95",
  "indigo.50": "#eef2ff",
  "indigo.100": "#e0e7ff",
  "indigo.200": "#c7d2fe",
  "indigo.300": "#a5b4fc",
  "indigo.400": "#818cf8",
  "indigo.500": "#6366f1",
  "indigo.600": "#4f46e5",
  "indigo.700": "#4338ca",
  "indigo.800": "#3730a3",
  "indigo.900": "#312e81",
  "blue.50": "#eff6ff",
  "blue.100": "#dbeafe",
  "blue.200": "#bfdbfe",
  "blue.300": "#93c5fd",
  "blue.400": "#60a5fa",
  "blue.500": "#3b82f6",
  "blue.600": "#2563eb",
  "blue.700": "#1d4ed8",
  "blue.800": "#1e40af",
  "blue.900": "#1e3a8a",
  "lightBlue.50": "#f0f9ff",
  "lightBlue.100": "#e0f2fe",
  "lightBlue.200": "#bae6fd",
  "lightBlue.300": "#7dd3fc",
  "lightBlue.400": "#38bdf8",
  "lightBlue.500": "#0ea5e9",
  "lightBlue.600": "#0284c7",
  "lightBlue.700": "#0369a1",
  "lightBlue.800": "#075985",
  "lightBlue.900": "#0c4a6e",
  "darkBlue.50": "#dbf4ff",
  "darkBlue.100": "#addbff",
  "darkBlue.200": "#7cc2ff",
  "darkBlue.300": "#4aa9ff",
  "darkBlue.400": "#1a91ff",
  "darkBlue.500": "#0077e6",
  "darkBlue.600": "#005db4",
  "darkBlue.700": "#004282",
  "darkBlue.800": "#002851",
  "darkBlue.900": "#000e21",
  "cyan.50": "#ecfeff",
  "cyan.100": "#cffafe",
  "cyan.200": "#a5f3fc",
  "cyan.300": "#67e8f9",
  "cyan.400": "#22d3ee",
  "cyan.500": "#06b6d4",
  "cyan.600": "#0891b2",
  "cyan.700": "#0e7490",
  "cyan.800": "#155e75",
  "cyan.900": "#164e63",
  "teal.50": "#f0fdfa",
  "teal.100": "#ccfbf1",
  "teal.200": "#99f6e4",
  "teal.300": "#5eead4",
  "teal.400": "#2dd4bf",
  "teal.500": "#14b8a6",
  "teal.600": "#0d9488",
  "teal.700": "#0f766e",
  "teal.800": "#115e59",
  "teal.900": "#134e4a",
  "emerald.50": "#ecfdf5",
  "emerald.100": "#d1fae5",
  "emerald.200": "#a7f3d0",
  "emerald.300": "#6ee7b7",
  "emerald.400": "#34d399",
  "emerald.500": "#10b981",
  "emerald.600": "#059669",
  "emerald.700": "#047857",
  "emerald.800": "#065f46",
  "emerald.900": "#064e3b",
  "green.50": "#f0fdf4",
  "green.100": "#dcfce7",
  "green.200": "#bbf7d0",
  "green.300": "#86efac",
  "green.400": "#4ade80",
  "green.500": "#22c55e",
  "green.600": "#16a34a",
  "green.700": "#15803d",
  "green.800": "#166534",
  "green.900": "#14532d",
  "lime.50": "#f7fee7",
  "lime.100": "#ecfccb",
  "lime.200": "#d9f99d",
  "lime.300": "#bef264",
  "lime.400": "#a3e635",
  "lime.500": "#84cc16",
  "lime.600": "#65a30d",
  "lime.700": "#4d7c0f",
  "lime.800": "#3f6212",
  "lime.900": "#365314",
  "yellow.50": "#fefce8",
  "yellow.100": "#fef9c3",
  "yellow.200": "#fef08a",
  "yellow.300": "#fde047",
  "yellow.400": "#facc15",
  "yellow.500": "#eab308",
  "yellow.600": "#ca8a04",
  "yellow.700": "#a16207",
  "yellow.800": "#854d0e",
  "yellow.900": "#713f12",
  "amber.50": "#fffbeb",
  "amber.100": "#fef3c7",
  "amber.200": "#fde68a",
  "amber.300": "#fcd34d",
  "amber.400": "#fbbf24",
  "amber.500": "#f59e0b",
  "amber.600": "#d97706",
  "amber.700": "#b45309",
  "amber.800": "#92400e",
  "amber.900": "#78350f",
  "orange.50": "#fff7ed",
  "orange.100": "#ffedd5",
  "orange.200": "#fed7aa",
  "orange.300": "#fdba74",
  "orange.400": "#fb923c",
  "orange.500": "#f97316",
  "orange.600": "#ea580c",
  "orange.700": "#c2410c",
  "orange.800": "#9a3412",
  "orange.900": "#7c2d12",
  "red.50": "#fef2f2",
  "red.100": "#fee2e2",
  "red.200": "#fecaca",
  "red.300": "#fca5a5",
  "red.400": "#f87171",
  "red.500": "#ef4444",
  "red.600": "#dc2626",
  "red.700": "#b91c1c",
  "red.800": "#991b1b",
  "red.900": "#7f1d1d",
  "warmGray.50": "#fafaf9",
  "warmGray.100": "#f5f5f4",
  "warmGray.200": "#e7e5e4",
  "warmGray.300": "#d6d3d1",
  "warmGray.400": "#a8a29e",
  "warmGray.500": "#78716c",
  "warmGray.600": "#57534e",
  "warmGray.700": "#44403c",
  "warmGray.800": "#292524",
  "warmGray.900": "#1c1917",
  "trueGray.50": "#fafafa",
  "trueGray.100": "#f5f5f5",
  "trueGray.200": "#e5e5e5",
  "trueGray.300": "#d4d4d4",
  "trueGray.400": "#a3a3a3",
  "trueGray.500": "#737373",
  "trueGray.600": "#525252",
  "trueGray.700": "#404040",
  "trueGray.800": "#262626",
  "trueGray.900": "#171717",
  "gray.50": "#fafafa",
  "gray.100": "#f4f4f5",
  "gray.200": "#e4e4e7",
  "gray.300": "#d4d4d8",
  "gray.400": "#a1a1aa",
  "gray.500": "#71717a",
  "gray.600": "#52525b",
  "gray.700": "#3f3f46",
  "gray.800": "#27272a",
  "gray.900": "#18181b",
  "coolGray.50": "#f9fafb",
  "coolGray.100": "#f3f4f6",
  "coolGray.200": "#e5e7eb",
  "coolGray.300": "#d1d5db",
  "coolGray.400": "#9ca3af",
  "coolGray.500": "#6b7280",
  "coolGray.600": "#4b5563",
  "coolGray.700": "#374151",
  "coolGray.800": "#1f2937",
  "coolGray.900": "#111827",
  "blueGray.50": "#f8fafc",
  "blueGray.100": "#f1f5f9",
  "blueGray.200": "#e2e8f0",
  "blueGray.300": "#cbd5e1",
  "blueGray.400": "#94a3b8",
  "blueGray.500": "#64748b",
  "blueGray.600": "#475569",
  "blueGray.700": "#334155",
  "blueGray.800": "#1e293b",
  "blueGray.900": "#0f172a",
  "dark.50": "#18181b",
  "dark.100": "#27272a",
  "dark.200": "#3f3f46",
  "dark.300": "#52525b",
  "dark.400": "#71717a",
  "dark.500": "#a1a1aa",
  "dark.600": "#d4d4d8",
  "dark.700": "#e4e4e7",
  "dark.800": "#f4f4f5",
  "dark.900": "#fafafa",
  "text.50": "#fafafa",
  "text.100": "#f5f5f5",
  "text.200": "#e5e5e5",
  "text.300": "#d4d4d4",
  "text.400": "#a3a3a3",
  "text.500": "#737373",
  "text.600": "#525252",
  "text.700": "#404040",
  "text.800": "#262626",
  "text.900": "#171717",
  lightText: "#FFFFFF",
  darkText: "#000000",
  "danger.50": "#fff1f2",
  "danger.100": "#ffe4e6",
  "danger.200": "#fecdd3",
  "danger.300": "#fda4af",
  "danger.400": "#fb7185",
  "danger.500": "#f43f5e",
  "danger.600": "#e11d48",
  "danger.700": "#be123c",
  "danger.800": "#9f1239",
  "danger.900": "#881337",

  "success.50": "#f0fdf4",
  "success.100": "#dcfce7",
  "success.200": "#bbf7d0",
  "success.300": "#86efac",
  "success.400": "#4ade80",
  "success.500": "#22c55e",
  "success.600": "#16a34a",
  "success.700": "#15803d",
  "success.800": "#166534",
  "success.900": "#14532d",

  "warning.50": "#fff7ed",
  "warning.100": "#ffedd5",
  "warning.200": "#fed7aa",
  "warning.300": "#fdba74",
  "warning.400": "#fb923c",
  "warning.500": "#f97316",
  "warning.600": "#ea580c",
  "warning.700": "#c2410c",
  "warning.800": "#9a3412",
  "warning.900": "#7c2d12",

  "muted.50": "#fafafa",
  "muted.100": "#f5f5f5",
  "muted.200": "#e5e5e5",
  "muted.300": "#d4d4d4",
  "muted.400": "#a3a3a3",
  "muted.500": "#737373",
  "muted.600": "#525252",
  "muted.700": "#404040",
  "muted.800": "#262626",
  "muted.900": "#171717",

  "primary.50": "#ecfeff",
  "primary.100": "#cffafe",
  "primary.200": "#a5f3fc",
  "primary.300": "#67e8f9",
  "primary.400": "#22d3ee",
  "primary.500": "#06b6d4",
  "primary.600": "#0891b2",
  "primary.700": "#0e7490",
  "primary.800": "#155e75",
  "primary.900": "#164e63",

  "secondary.50": "#fdf2f8",
  "secondary.100": "#fce7f3",
  "secondary.200": "#fbcfe8",
  "secondary.300": "#f9a8d4",
  "secondary.400": "#f472b6",
  "secondary.500": "#ec4899",
  "secondary.600": "#db2777",
  "secondary.700": "#be185d",
  "secondary.800": "#9d174d",
  "secondary.900": "#831843",

  "tertiary.50": "#ecfdf5",
  "tertiary.100": "#d1fae5",
  "tertiary.200": "#a7f3d0",
  "tertiary.300": "#6ee7b7",
  "tertiary.400": "#34d399",
  "tertiary.500": "#10b981",
  "tertiary.600": "#059669",
  "tertiary.700": "#047857",
  "tertiary.800": "#065f46",
  "tertiary.900": "#064e3b",

  "info.50": "#f0f9ff",
  "info.100": "#e0f2fe",
  "info.200": "#bae6fd",
  "info.300": "#7dd3fc",
  "info.400": "#38bdf8",
  "info.500": "#0ea5e9",
  "info.600": "#0284c7",
  "info.700": "#0369a1",
  "info.800": "#075985",
  "info.900": "#0c4a6e",

  "light.50": "#fafaf9",
  "light.100": "#f5f5f4",
  "light.200": "#e7e5e4",
  "light.300": "#d6d3d1",
  "light.400": "#a8a29e",
  "light.500": "#78716c",
  "light.600": "#57534e",
  "light.700": "#44403c",
  "light.800": "#292524",
  "light.900": "#1c1917",

  // gluestack-ui color tokens
  rose50: "#fff1f2",
  rose100: "#ffe4e6",
  rose200: "#fecdd3",
  rose300: "#fda4af",
  rose400: "#fb7185",
  rose500: "#f43f5e",
  rose600: "#e11d48",
  rose700: "#be123c",
  rose800: "#9f1239",
  rose900: "#881337",
  pink50: "#fdf2f8",
  pink100: "#fce7f3",
  pink200: "#fbcfe8",
  pink300: "#f9a8d4",
  pink400: "#f472b6",
  pink500: "#ec4899",
  pink600: "#db2777",
  pink700: "#be185d",
  pink800: "#9d174d",
  pink900: "#831843",
  fuchsia50: "#fdf4ff",
  fuchsia100: "#fae8ff",
  fuchsia200: "#f5d0fe",
  fuchsia300: "#f0abfc",
  fuchsia400: "#e879f9",
  fuchsia500: "#d946ef",
  fuchsia600: "#c026d3",
  fuchsia700: "#a21caf",
  fuchsia800: "#86198f",
  fuchsia900: "#701a75",
  purple50: "#faf5ff",
  purple100: "#f3e8ff",
  purple200: "#e9d5ff",
  purple300: "#d8b4fe",
  purple400: "#c084fc",
  purple500: "#a855f7",
  purple600: "#9333ea",
  purple700: "#7e22ce",
  purple800: "#6b21a8",
  purple900: "#581c87",
  violet50: "#f5f3ff",
  violet100: "#ede9fe",
  violet200: "#ddd6fe",
  violet300: "#c4b5fd",
  violet400: "#a78bfa",
  violet500: "#8b5cf6",
  violet600: "#7c3aed",
  violet700: "#6d28d9",
  violet800: "#5b21b6",
  violet900: "#4c1d95",
  indigo50: "#eef2ff",
  indigo100: "#e0e7ff",
  indigo200: "#c7d2fe",
  indigo300: "#a5b4fc",
  indigo400: "#818cf8",
  indigo500: "#6366f1",
  indigo600: "#4f46e5",
  indigo700: "#4338ca",
  indigo800: "#3730a3",
  indigo900: "#312e81",
  blue50: "#eff6ff",
  blue100: "#dbeafe",
  blue200: "#bfdbfe",
  blue300: "#93c5fd",
  blue400: "#60a5fa",
  blue500: "#3b82f6",
  blue600: "#2563eb",
  blue700: "#1d4ed8",
  blue800: "#1e40af",
  blue900: "#1e3a8a",
  lightBlue50: "#f0f9ff",
  lightBlue100: "#e0f2fe",
  lightBlue200: "#bae6fd",
  lightBlue300: "#7dd3fc",
  lightBlue400: "#38bdf8",
  lightBlue500: "#0ea5e9",
  lightBlue600: "#0284c7",
  lightBlue700: "#0369a1",
  lightBlue800: "#075985",
  lightBlue900: "#0c4a6e",
  darkBlue50: "#dbf4ff",
  darkBlue100: "#addbff",
  darkBlue200: "#7cc2ff",
  darkBlue300: "#4aa9ff",
  darkBlue400: "#1a91ff",
  darkBlue500: "#0077e6",
  darkBlue600: "#005db4",
  darkBlue700: "#004282",
  darkBlue800: "#002851",
  darkBlue900: "#000e21",
  cyan50: "#ecfeff",
  cyan100: "#cffafe",
  cyan200: "#a5f3fc",
  cyan300: "#67e8f9",
  cyan400: "#22d3ee",
  cyan500: "#06b6d4",
  cyan600: "#0891b2",
  cyan700: "#0e7490",
  cyan800: "#155e75",
  cyan900: "#164e63",
  teal50: "#f0fdfa",
  teal100: "#ccfbf1",
  teal200: "#99f6e4",
  teal300: "#5eead4",
  teal400: "#2dd4bf",
  teal500: "#14b8a6",
  teal600: "#0d9488",
  teal700: "#0f766e",
  teal800: "#115e59",
  teal900: "#134e4a",
  emerald50: "#ecfdf5",
  emerald100: "#d1fae5",
  emerald200: "#a7f3d0",
  emerald300: "#6ee7b7",
  emerald400: "#34d399",
  emerald500: "#10b981",
  emerald600: "#059669",
  emerald700: "#047857",
  emerald800: "#065f46",
  emerald900: "#064e3b",
  green50: "#f0fdf4",
  green100: "#dcfce7",
  green200: "#bbf7d0",
  green300: "#86efac",
  green400: "#4ade80",
  green500: "#22c55e",
  green600: "#16a34a",
  green700: "#15803d",
  green800: "#166534",
  green900: "#14532d",
  lime50: "#f7fee7",
  lime100: "#ecfccb",
  lime200: "#d9f99d",
  lime300: "#bef264",
  lime400: "#a3e635",
  lime500: "#84cc16",
  lime600: "#65a30d",
  lime700: "#4d7c0f",
  lime800: "#3f6212",
  lime900: "#365314",
  yellow50: "#fefce8",
  yellow100: "#fef9c3",
  yellow200: "#fef08a",
  yellow300: "#fde047",
  yellow400: "#facc15",
  yellow500: "#eab308",
  yellow600: "#ca8a04",
  yellow700: "#a16207",
  yellow800: "#854d0e",
  yellow900: "#713f12",
  amber50: "#fffbeb",
  amber100: "#fef3c7",
  amber200: "#fde68a",
  amber300: "#fcd34d",
  amber400: "#fbbf24",
  amber500: "#f59e0b",
  amber600: "#d97706",
  amber700: "#b45309",
  amber800: "#92400e",
  amber900: "#78350f",
  orange50: "#fff7ed",
  orange100: "#ffedd5",
  orange200: "#fed7aa",
  orange300: "#fdba74",
  orange400: "#fb923c",
  orange500: "#f97316",
  orange600: "#ea580c",
  orange700: "#c2410c",
  orange800: "#9a3412",
  orange900: "#7c2d12",
  red50: "#fef2f2",
  red100: "#fee2e2",
  red200: "#fecaca",
  red300: "#fca5a5",
  red400: "#f87171",
  red500: "#ef4444",
  red600: "#dc2626",
  red700: "#b91c1c",
  red800: "#991b1b",
  red900: "#7f1d1d",
  warmGray50: "#fafaf9",
  warmGray100: "#f5f5f4",
  warmGray200: "#e7e5e4",
  warmGray300: "#d6d3d1",
  warmGray400: "#a8a29e",
  warmGray500: "#78716c",
  warmGray600: "#57534e",
  warmGray700: "#44403c",
  warmGray800: "#292524",
  warmGray900: "#1c1917",
  trueGray50: "#fafafa",
  trueGray100: "#f5f5f5",
  trueGray200: "#e5e5e5",
  trueGray300: "#d4d4d4",
  trueGray400: "#a3a3a3",
  trueGray500: "#737373",
  trueGray600: "#525252",
  trueGray700: "#404040",
  trueGray800: "#262626",
  trueGray900: "#171717",
  gray50: "#fafafa",
  gray100: "#f4f4f5",
  gray200: "#e4e4e7",
  gray300: "#d4d4d8",
  gray400: "#a1a1aa",
  gray500: "#71717a",
  gray600: "#52525b",
  gray700: "#3f3f46",
  gray800: "#27272a",
  gray900: "#18181b",
  coolGray50: "#f9fafb",
  coolGray100: "#f3f4f6",
  coolGray200: "#e5e7eb",
  coolGray300: "#d1d5db",
  coolGray400: "#9ca3af",
  coolGray500: "#6b7280",
  coolGray600: "#4b5563",
  coolGray700: "#374151",
  coolGray800: "#1f2937",
  coolGray900: "#111827",
  blueGray50: "#f8fafc",
  blueGray100: "#f1f5f9",
  blueGray200: "#e2e8f0",
  blueGray300: "#cbd5e1",
  blueGray400: "#94a3b8",
  blueGray500: "#64748b",
  blueGray600: "#475569",
  blueGray700: "#334155",
  blueGray800: "#1e293b",
  blueGray900: "#0f172a",
  dark50: "#18181b",
  dark100: "#27272a",
  dark200: "#3f3f46",
  dark300: "#52525b",
  dark400: "#71717a",
  dark500: "#a1a1aa",
  dark600: "#d4d4d8",
  dark700: "#e4e4e7",
  dark800: "#f4f4f5",
  dark900: "#fafafa",
  tertiary50: "#ecfdf5",
  tertiary100: "#d1fae5",
  tertiary200: "#a7f3d0",
  tertiary300: "#6ee7b7",
  tertiary400: "#34d399",
  tertiary500: "#10b981",
  tertiary600: "#059669",
  tertiary700: "#047857",
  tertiary800: "#065f46",
  tertiary900: "#064e3b",
  danger50: "#fff1f2",
  danger100: "#ffe4e6",
  danger200: "#fecdd3",
  danger300: "#fda4af",
  danger400: "#fb7185",
  danger500: "#f43f5e",
  danger600: "#e11d48",
  danger700: "#be123c",
  danger800: "#9f1239",
  danger900: "#881337",
  error00: "#FEE9E9",
  error50: "#FEE2E2",
  error100: "#FECACA",
  error200: "#FCA5A5",
  error300: "#F87171",
  error400: "#EF4444",
  error500: "#E63535",
  error600: "#DC2626",
  error700: "#B91C1C",
  error800: "#7F1D1D",
  error900: "#991B1B",
  error950: "#220808",
  success0: "#E4FFF4",
  success50: "#CAFFE8",
  success100: "#A2F1C0",
  success200: "#84D3A2",
  success300: "#66B584",
  success400: "#489766",
  success500: "#348352",
  success600: "#2A7948",
  success700: "#206F3E",
  success800: "#166534",
  success900: "#14532D",
  success950: "#071F11",
  warning50: "#fff7ed",
  warning100: "#ffedd5",
  warning200: "#fed7aa",
  warning300: "#fdba74",
  warning400: "#fb923c",
  warning500: "#f97316",
  warning600: "#ea580c",
  warning700: "#c2410c",
  warning800: "#9a3412",
  warning900: "#7c2d12",
  muted50: "#fafafa",
  muted100: "#f5f5f5",
  muted200: "#e5e5e5",
  muted300: "#d4d4d4",
  muted400: "#a3a3a3",
  muted500: "#737373",
  muted600: "#525252",
  muted700: "#404040",
  muted800: "#262626",
  muted900: "#171717",
  info50: "#f0f9ff",
  info100: "#e0f2fe",
  info200: "#bae6fd",
  info300: "#7dd3fc",
  info400: "#38bdf8",
  info500: "#0ea5e9",
  info600: "#0284c7",
  info700: "#0369a1",
  info800: "#075985",
  info900: "#0c4a6e",
  light50: "#fafaf9",
  light100: "#f5f5f4",
  light200: "#e7e5e4",
  light300: "#d6d3d1",
  light400: "#a8a29e",
  light500: "#78716c",
  light600: "#57534e",
  light700: "#44403c",
  light800: "#292524",
  light900: "#1c1917",
  primary0: "#E5F1FB",
  primary50: "#CCE9FF",
  primary100: "#ADDBFF",
  primary200: "#7CC2FF",
  primary300: "#4AA9FF",
  primary400: "#1A91FF",
  primary500: "#0077E6",
  primary600: "#005DB4",
  primary700: "#004282",
  primary800: "#002851",
  primary900: "#011838",
  primary950: "#000711",
  secondary0: "#F6F6F6",
  secondary50: "#F3F3F3",
  secondary100: "#E9E9E9",
  secondary200: "#DADADA",
  secondary300: "#B0B0B0",
  secondary400: "#737373",
  secondary500: "#5F5F5F",
  secondary600: "#525252",
  secondary700: "#404040",
  secondary800: "#262626",
  secondary900: "#171717",
  secondary950: "#0C0C0C",
  textLight0: "#FCFCFC",
  textLight50: "#F5F5F5",
  textLight100: "#E5E5E5",
  textLight200: "#DBDBDB",
  textLight300: "#D4D4D4",
  textLight400: "#A3A3A3",
  textLight500: "#8C8C8C",
  textLight600: "#737373",
  textLight700: "#525252",
  textLight800: "#404040",
  textLight900: "#262626",
  textLight950: "#171717",
  textDark0: "#FCFCFC",
  textDark50: "#F5F5F5",
  textDark100: "#E5E5E5",
  textDark200: "#DBDBDB",
  textDark300: "#D4D4D4",
  textDark400: "#A3A3A3",
  textDark500: "#8C8C8C",
  textDark600: "#737373",
  textDark700: "#525252",
  textDark800: "#404040",
  textDark900: "#262626",
  textDark950: "#171717",
  borderDark0: "#FCFCFC",
  borderDark50: "#F5F5F5",
  borderDark100: "#E5E5E5",
  borderDark200: "#DBDBDB",
  borderDark300: "#D4D4D4",
  borderDark400: "#A3A3A3",
  borderDark500: "#8C8C8C",
  borderDark600: "#737373",
  borderDark700: "#525252",
  borderDark800: "#404040",
  borderDark900: "#262626",
  borderDark950: "#171717",
  borderLight0: "#FCFCFC",
  borderLight50: "#F5F5F5",
  borderLight100: "#E5E5E5",
  borderLight200: "#DBDBDB",
  borderLight300: "#D4D4D4",
  borderLight400: "#A3A3A3",
  borderLight500: "#8C8C8C",
  borderLight600: "#737373",
  borderLight700: "#525252",
  borderLight800: "#404040",
  borderLight900: "#262626",
  borderLight950: "#171717",
  backgroundDark0: "#FCFCFC",
  backgroundDark50: "#F5F5F5",
  backgroundDark100: "#F1F1F1",
  backgroundDark200: "#DBDBDB",
  backgroundDark300: "#D4D4D4",
  backgroundDark400: "#A3A3A3",
  backgroundDark500: "#8C8C8C",
  backgroundDark600: "#737373",
  backgroundDark700: "#525252",
  backgroundDark800: "#404040",
  backgroundDark900: "#262626",
  backgroundDark950: "#171717",
  backgroundLight0: "#FCFCFC",
  backgroundLight50: "#F5F5F5",
  backgroundLight100: "#F1F1F1",
  backgroundLight200: "#DBDBDB",
  backgroundLight300: "#D4D4D4",
  backgroundLight400: "#A3A3A3",
  backgroundLight500: "#8C8C8C",
  backgroundLight600: "#737373",
  backgroundLight700: "#525252",
  backgroundLight800: "#404040",
  backgroundLight900: "#262626",
  backgroundLight950: "#171717",
  backgroundLightError: "#FEF1F1",
  backgroundDarkError: "#422B2B",
  backgroundLightWarning: "#FFF4EB",
  backgroundDarkWarning: "#412F23",
  backgroundLightSuccess: "#EDFCF2",
  backgroundDarkSuccess: "#1C2B21",
  backgroundLightInfo: "#EBF8FE",
  backgroundDarkInfo: "#1A282E",
  backgroundLightMuted: "#F6F6F7",
  backgroundDarkMuted: "#252526",
  white: "#FFFFFF",
  black: "#000000",
};

export const config = {
  componentPath: "/components",
  theme: {
    aliases: {
      bg: "backgroundColor",
      bgColor: "backgroundColor",
      h: "height",
      w: "width",
      p: "padding",
      px: "paddingHorizontal",
      py: "paddingVertical",
      pt: "paddingTop",
      pb: "paddingBottom",
      pr: "paddingRight",
      pl: "paddingLeft",
      m: "margin",
      mx: "marginHorizontal",
      my: "marginVertical",
      mt: "marginTop",
      mb: "marginBottom",
      mr: "marginRight",
      ml: "marginLeft",
      rounded: "borderRadius",
    } as const,
    tokens: {
      colors,
      space: {
        px: "1px",
        "0": 0,
        "0.5": 2,
        "1": 4,
        "1.5": 6,
        "2": 8,
        "2.5": 10,
        "3": 12,
        "3.5": 14,
        "4": 16,
        "4.5": 18,
        "5": 20,
        "6": 24,
        "7": 28,
        "8": 32,
        "9": 36,
        "10": 40,
        "11": 44,
        "12": 48,
        "16": 64,
        "20": 80,
        "24": 96,
        "32": 128,
        "40": 160,
        "48": 192,
        "56": 224,
        "64": 256,
        "72": 288,
        "80": 320,
        "96": 384,
        "1/2": "50%",
        "1/3": "33.333%",
        "2/3": "66.666%",
        "1/4": "25%",
        "2/4": "50%",
        "3/4": "75%",
        "1/5": "20%",
        "2/5": "40%",
        "3/5": "60%",
        "4/5": "80%",
        "1/6": "16.666%",
        "2/6": "33.333%",
        "3/6": "50%",
        "4/6": "66.666%",
        "5/6": "83.333%",
        full: "100%",
      },
      borderWidths: {
        "0": 0,
        "1": 1,
        "2": 2,
        "4": 4,
        "8": 8,
      },
      radii: {
        none: 0,
        xs: 2,
        sm: 4,
        md: 6,
        lg: 8,
        xl: 12,
        "2xl": 16,
        "3xl": 24,
        full: 9999,
      },
      breakpoints: {
        base: 0,
        xs: 400,
        sm: 480,
        md: 768,
        lg: 992,
        xl: 1280,
        "2xl": 1546,
      },
      mediaQueries: {
        base: "@media screen and (min-width: 0)",
        xs: "@media screen and (min-width: 400px)",
        sm: "@media screen and (min-width: 480px)",
        md: "@media screen and (min-width: 768px)",
        lg: "@media screen and (min-width: 992px)",
        xl: "@media screen and (min-width: 1280px)",
        "2xl": "@media screen and (min-width: 1536px)",
      },
      letterSpacings: {
        xs: -0.4,
        sm: -0.2,
        md: 0,
        lg: 0.2,
        xl: 0.4,
        "2xl": 1.6,
      },
      lineHeights: {
        "2xs": 16,
        xs: 18,
        sm: 20,
        md: 22,
        lg: 24,
        xl: 28,
        "2xl": 32,
        "3xl": 40,
        "4xl": 48,
        "5xl": 56,
        "6xl": 72,
        "7xl": 90,
      },
      fontWeights: {
        hairline: "100",
        thin: "200",
        light: "300",
        normal: "400",
        medium: "500",
        semibold: "600",
        bold: "700",
        extrabold: "800",
        black: "900",
        extraBlack: "950",
      },
      fonts: {
        heading: undefined,
        body: undefined,
        mono: undefined,
      },
      fontSizes: {
        "2xs": 10,
        xs: 12,
        sm: 14,
        md: 16,
        lg: 18,
        xl: 20,
        "2xl": 24,
        "3xl": 30,
        "4xl": 36,
        "5xl": 48,
        "6xl": 60,
        "7xl": 72,
        "8xl": 96,
        "9xl": 128,
      },
      opacity: {
        0: 0,
        5: 0.05,
        10: 0.1,
        20: 0.2,
        25: 0.25,
        30: 0.3,
        40: 0.4,
        50: 0.5,
        60: 0.6,
        70: 0.7,
        75: 0.75,
        80: 0.8,
        90: 0.9,
        95: 0.95,
        100: 1,
      },
    } as const,
    globalStyle: {
      variants: {
        // NativeBase shadow tokens
        shadow: {
          none: {
            shadowColor: "transparent",
            shadowOffset: {
              width: 0,
              height: 0,
            },
            shadowOpacity: 0,
            shadowRadius: 0,
            elevation: 0,
          },
          "0": {
            shadowColor: colors.black,
            shadowOffset: {
              width: 0,
              height: 1,
            },
            shadowOpacity: 0.18,
            shadowRadius: 1.0,
            elevation: 1,
          },
          "1": {
            shadowColor: colors.black,
            shadowOffset: {
              width: 0,
              height: 1,
            },
            shadowOpacity: 0.2,
            shadowRadius: 1.41,
            elevation: 2,
          },
          "2": {
            shadowColor: colors.black,
            shadowOffset: {
              width: 0,
              height: 1,
            },
            shadowOpacity: 0.22,
            shadowRadius: 2.22,
            elevation: 3,
          },
          "3": {
            shadowColor: colors.black,
            shadowOffset: {
              width: 0,
              height: 2,
            },
            shadowOpacity: 0.23,
            shadowRadius: 2.62,
            elevation: 4,
          },
          "4": {
            shadowColor: colors.black,
            shadowOffset: {
              width: 0,
              height: 2,
            },
            shadowOpacity: 0.25,
            shadowRadius: 3.84,
            elevation: 5,
          },
          "5": {
            shadowColor: colors.black,
            shadowOffset: {
              width: 0,
              height: 3,
            },
            shadowOpacity: 0.27,
            shadowRadius: 4.65,
            elevation: 6,
          },
          "6": {
            shadowColor: colors.black,
            shadowOffset: {
              width: 0,
              height: 3,
            },
            shadowOpacity: 0.29,
            shadowRadius: 4.65,
            elevation: 7,
          },
          "7": {
            shadowColor: colors.black,
            shadowOffset: {
              width: 0,
              height: 4,
            },
            shadowOpacity: 0.3,
            shadowRadius: 4.65,
            elevation: 8,
          },
          "8": {
            shadowColor: colors.black,
            shadowOffset: {
              width: 0,
              height: 4,
            },
            shadowOpacity: 0.32,
            shadowRadius: 5.46,
            elevation: 9,
          },
          "9": {
            shadowColor: colors.black,
            shadowOffset: {
              width: 0,
              height: 5,
            },
            shadowOpacity: 0.34,
            shadowRadius: 6.27,
            elevation: 10,
          },
        },

        //gluestack-ui shadow tokens
        hardShadow: {
          "1": {
            shadowColor: "$backgroundLight900",
            shadowOffset: {
              width: -2,
              height: 2,
            },
            shadowRadius: 8,
            shadowOpacity: 0.5,
            elevation: 10,
          },
          "2": {
            shadowColor: "$backgroundLight900",
            shadowOffset: {
              width: 0,
              height: 3,
            },
            shadowRadius: 8,
            shadowOpacity: 0.5,
            elevation: 10,
          },
          "3": {
            shadowColor: "$backgroundLight900",
            shadowOffset: {
              width: 2,
              height: 2,
            },
            shadowRadius: 8,
            shadowOpacity: 0.5,
            elevation: 10,
          },
          "4": {
            shadowColor: "$backgroundLight900",
            shadowOffset: {
              width: 0,
              height: -3,
            },
            shadowRadius: 8,
            shadowOpacity: 0.5,
            elevation: 10,
          },
          // this 5th version is only for toast shadow
          // temporary
          "5": {
            shadowColor: "$backgroundLight900",
            shadowOffset: {
              width: 0,
              height: 3,
            },
            shadowRadius: 8,
            shadowOpacity: 0.2,
            elevation: 10,
          },
        },
        softShadow: {
          "1": {
            shadowColor: "$backgroundLight900",
            shadowOffset: {
              width: 0,
              height: 0,
            },
            shadowRadius: 10,
            shadowOpacity: 0.1,
            _android: {
              shadowColor: "$backgroundLight500",
              elevation: 5,
              shadowOpacity: 0.05,
            },
          },
          "2": {
            shadowColor: "$backgroundLight900",
            shadowOffset: {
              width: 0,
              height: 0,
            },
            shadowRadius: 20,
            elevation: 3,
            shadowOpacity: 0.1,
            _android: {
              shadowColor: "$backgroundLight500",
              elevation: 10,
              shadowOpacity: 0.1,
            },
          },
          "3": {
            shadowColor: "$backgroundLight900",
            shadowOffset: {
              width: 0,
              height: 0,
            },
            shadowRadius: 30,
            shadowOpacity: 0.1,
            elevation: 4,
            _android: {
              shadowColor: "$backgroundLight500",
              elevation: 15,
              shadowOpacity: 0.15,
            },
          },
          "4": {
            shadowColor: "$backgroundLight900",
            shadowOffset: {
              width: 0,
              height: 0,
            },
            shadowRadius: 40,
            shadowOpacity: 0.1,
            elevation: 10,
            _android: {
              shadowColor: "$backgroundLight500",
              elevation: 20,
              shadowOpacity: 0.2,
            },
          },
        },
      },
    },
  },
} as const;

type Config = typeof config.theme;

declare module "@gluestack-style/react" {
  interface ICustomConfig extends Config {}
}
