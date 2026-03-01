const config = {
  logo: (
    <div className="flex items-center gap-2">
      <div className="w-8 h-8 bg-gradient-to-br from-slate-600 to-slate-800 dark:from-slate-500 dark:to-slate-700 rounded-lg flex items-center justify-center">
        <span className="text-white font-bold text-sm">OS</span>
      </div>
      <span className="font-semibold text-lg">Product OS</span>
    </div>
  ),
  project: {
    link: 'https://github.com/winspect-labs/product-os',
  },
  docsRepositoryBase: 'https://github.com/winspect-labs/product-os',
  footer: {
    text: `Product OS © ${new Date().getFullYear()} — MIT License`,
  },
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
  primaryHue: 220,
  primarySaturation: 80,
}

export default config
