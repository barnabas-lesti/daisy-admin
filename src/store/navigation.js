export const state = () => ({
  menuItems: [
    {
      routeName: 'locale',
      labelKey: 'navigationItems.home',
      icon: 'home',
      exact: true,
    },
    {
      routeName: 'locale-calculator',
      labelKey: 'navigationItems.calculator',
      icon: 'grid_on',
    },
    {
      routeName: 'locale-recipes',
      labelKey: 'navigationItems.recipes',
      icon: 'book',
    },
    {
      routeName: 'locale-food',
      labelKey: 'navigationItems.food',
      icon: 'fastfood',
    },
    {
      routeName: 'locale-exercises',
      labelKey: 'navigationItems.exercises',
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
