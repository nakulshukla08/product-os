/**
 * Site branding and theme configuration.
 * Customize this when forking or building on Product OS.
 *
 * Branding:
 *   - productName: Shown in nav, footer, page title
 *   - logo: Image path (e.g. '/logo.svg' in public/) or custom React component
 *   - favicon: Optional favicon path
 *   - subscript: Footer text, e.g. "Powered by Product OS" for forks
 *
 * Repository:
 *   - repository: GitHub repo URL for "Edit on GitHub", feedback, and project links
 *
 * Theme:
 *   - colors: primaryHue, primarySaturation, backgroundLight/Dark
 *   - customCSS: Path to extra CSS (e.g. '/theme/override.css' in public/)
 *
 * Custom CSS: Also edit styles/custom.css for overrides (always loaded).
 */

import type { BrandingConfig, ThemeConfig } from '../lib/theme'

/** GitHub repository URL. Used for Edit on GitHub, feedback links, and project icon. */
export const repository = 'https://github.com/nakulshukla08/product-os'

export const branding: BrandingConfig = {
  productName: 'Product OS',
  // logo: '/logo.svg',           // Image path (place in public/)
  // logo: <CustomLogo />,        // Or custom React component
  // favicon: '/favicon.ico',
  // subscript: 'Powered by Product OS',  // For forks - shown in footer
}

export const theme: ThemeConfig = {
  colors: {
    primaryHue: 220,
    primarySaturation: 80,
    // backgroundLight: '250,250,250',
    // backgroundDark: '17,17,17',
  },
  // customCSS: '/theme/override.css',  // Extra CSS from public/
}
