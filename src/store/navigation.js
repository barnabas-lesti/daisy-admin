export const state = () => ({
  sidebarItems: [
    {
      routeName: 'index',
      labelKey: 'components.layout.sidebar.index',
      icon: 'home',
      exact: true,
    },
    {
      routeName: 'calculator',
      labelKey: 'components.layout.sidebar.calculator',
      icon: 'grid_on',
    },
    {
      routeName: 'recipes',
      labelKey: 'components.layout.sidebar.recipes',
      icon: 'book',
    },
    {
      routeName: 'food',
      labelKey: 'components.layout.sidebar.food',
      icon: 'fastfood',
    },
  ],
  toolbarItems: [
    {
      routeName: 'index',
      labelKey: 'components.layout.toolbar.index',
      exact: true,
    },
    {
      routeName: 'calculator',
      labelKey: 'components.layout.toolbar.calculator',
    },
    {
      routeName: 'recipes',
      labelKey: 'components.layout.toolbar.recipes',
    },
    {
      routeName: 'food',
      labelKey: 'components.layout.toolbar.food',
    },
  ],
  socialItems: [
    {
      name: 'Facebook',
      iconImagePath: '/images/social/facebook.png',
      url: 'https://www.facebook.com/',
    },
    {
      name: 'Instagram',
      iconImagePath: '/images/social/instagram.png',
      url: 'https://www.instagram.com/',
    },
    {
      name: 'Patreon',
      iconImagePath: '/images/social/patreon.png',
      url: 'https://www.patreon.com/',
    },
  ],
});
