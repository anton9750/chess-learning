// Type-udvidelse til styled-components: fortæller TypeScript, at temaet man
// får adgang til via theme-prop'en i alle styled-komponenter har formen af
// vores egen Theme-type (så f.eks. theme.colors.accent er typesikkert).
import type { Theme } from "./theme";

declare module "styled-components" {
  export interface DefaultTheme extends Theme {}
}
