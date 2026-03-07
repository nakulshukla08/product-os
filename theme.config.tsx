import { Logo } from './components/Logo'
import { branding, theme, repository } from './config/site.config'
import { defaultTheme } from './lib/theme'

const colors = { ...defaultTheme, ...theme.colors }
const year = new Date().getFullYear()

const config = {
  logo: (
    <Logo
      productName={branding.productName}
      logo={branding.logo}
    />
  ),
  project: {
    link: repository,
  },
  docsRepositoryBase: repository,
  footer: {
    text: `${branding.productName} © ${year} — MIT License`,
    subscript: branding.subscript,
  },
  branding,
  themeConfig: theme,
  search: {
    placeholder: 'Search product knowledge...',
  },
  editLink: {
    text: 'Edit this page on GitHub →',
  },
  sidebar: {
    defaultMenuCollapseLevel: 1,
    toggleButton: true,
  },
  toc: {
    backToTop: true,
  },
  navigation: {
    prev: true,
    next: true,
  },
  primaryHue: colors.primaryHue,
  primarySaturation: colors.primarySaturation,
}

export default config
