export const state = () => ({
  menuItems: [
    {
      routeName: 'index',
      labelKey: 'common.menuItems.home',
      icon: 'home',
      exact: true,
    },
    {
      routeName: 'calculator',
      labelKey: 'common.menuItems.calculator',
      icon: 'grid_on',
    },
    {
      routeName: 'recipes',
      labelKey: 'common.menuItems.recipes',
      icon: 'book',
    },
    {
      routeName: 'food',
      labelKey: 'common.menuItems.food',
      icon: 'fastfood',
    },
    // {
    //   routeName: 'exercises',
    //   labelKey: 'common.menuItems.exercises',
    //   icon: 'directions_run',
    // },
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
