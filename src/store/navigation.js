export const state = () => ({
  menuItems: [
    {
      routeName: 'index',
      labelKey: 'menuItems.home',
      icon: 'home',
      exact: true,
    },
    {
      routeName: 'calculator',
      labelKey: 'menuItems.calculator',
      icon: 'grid_on',
    },
    {
      routeName: 'recipes',
      labelKey: 'menuItems.recipes',
      icon: 'book',
    },
    {
      routeName: 'food',
      labelKey: 'menuItems.food',
      icon: 'fastfood',
    },
    {
      routeName: 'exercises',
      labelKey: 'menuItems.exercises',
      icon: 'directions_run',
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
