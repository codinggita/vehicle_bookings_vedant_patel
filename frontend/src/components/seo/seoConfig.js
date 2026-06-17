/**
 * seoConfig
 * Maps application routes to their respective SEO metadata attributes.
 */
const seoConfig = {
  '/': {
    title: 'Home',
    description: 'VehicleSphere booking platform - Manage your vehicle bookings with ease.',
    keywords: 'vehicle booking, transportation, ride hailing',
  },
  '/login': {
    title: 'Login',
    description: 'Sign in to your VehicleSphere account.',
    keywords: 'login, sign in, vehicle booking account',
  },
  '/register': {
    title: 'Register',
    description: 'Create a new VehicleSphere account.',
    keywords: 'register, sign up, create account, vehicle booking',
  },
  '/admin': {
    title: 'Dashboard',
    description: 'Analytics overview and administration for VehicleSphere.',
    keywords: 'dashboard, analytics, admin, vehicle booking metrics',
  },
  '/user': {
    title: 'Dashboard',
    description: 'Analytics overview for your VehicleSphere bookings.',
    keywords: 'dashboard, analytics, user, booking overview',
  },
  '/users': {
    title: 'Users Management',
    description: 'Manage user accounts and roles.',
    keywords: 'user management, roles, permissions, admin panel',
  },
  '/bookings': {
    title: 'Dataset Management',
    description: 'Manage vehicle booking datasets and records.',
    keywords: 'bookings, datasets, records, vehicle reservations',
  },
  '/profile': {
    title: 'Profile',
    description: 'View and edit your user profile.',
    keywords: 'profile, account, personal information, settings',
  },
  '/settings': {
    title: 'Settings',
    description: 'Application preferences and theme settings.',
    keywords: 'settings, preferences, theme, customization',
  },
};

export default seoConfig;
