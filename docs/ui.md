# UI Coding Standards

## Component Library: shadcn/ui Only

All UI in this project **must** use [shadcn/ui](https://ui.shadcn.com/) components. No custom components are permitted.

### Rules

- **Use shadcn/ui components exclusively.** Do not build custom buttons, inputs, modals, cards, badges, or any other UI primitives. Every UI element must map to an existing shadcn/ui component.
- **No custom components.** Creating new components in `src/components/` (outside of `src/components/ui/`) is not allowed unless it is purely a composition of shadcn/ui components with no new styling logic.
- **Add components via CLI.** Install new shadcn/ui components using the CLI:
  ```bash
  npx shadcn@latest add <component-name>
  ```
  Components are added to `src/components/ui/` and are locally owned — edit them there if customisation is needed.
- **Use `cn()` for conditional classes.** When applying conditional Tailwind classes, always use the `cn` utility from `@/lib/utils`, which is the shadcn-provided merge helper.

### Available components

Components already installed are in `src/components/ui/`. Before adding a new component, check this directory first. Refer to the [shadcn/ui component list](https://ui.shadcn.com/docs/components) for the full catalogue.

---

## Date Formatting: date-fns

All date formatting **must** use [date-fns](https://date-fns.org/). Do not use `Date.toLocaleDateString()`, `Intl.DateTimeFormat`, or any other formatting approach.

### Required format

Dates must be displayed in the following format:

```
1st Sep 2025
2nd Aug 2025
3rd Jan 2026
4th Jun 2024
```

### Format string

Use the `format` function from `date-fns` with the format string `do MMM yyyy`:

```ts
import { format } from "date-fns";

format(new Date("2025-09-01"), "do MMM yyyy"); // "1st Sep 2025"
format(new Date("2025-08-02"), "do MMM yyyy"); // "2nd Aug 2025"
format(new Date("2026-01-03"), "do MMM yyyy"); // "3rd Jan 2026"
format(new Date("2024-06-04"), "do MMM yyyy"); // "4th Jun 2024"
```

- `do` — day of month with ordinal suffix (1st, 2nd, 3rd, 4th...)
- `MMM` — abbreviated month name (Jan, Feb, Mar...)
- `yyyy` — 4-digit year

### Utility helper

Define a shared helper to avoid repeating the format string across the codebase:

```ts
// src/lib/date.ts
import { format } from "date-fns";

export function formatDate(date: Date | string | number): string {
  return format(new Date(date), "do MMM yyyy");
}
```

Import and use this helper wherever a date needs to be displayed.
