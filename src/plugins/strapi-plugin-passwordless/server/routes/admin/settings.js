module.exports = [
  {
    method: 'GET',
    path: '/',
    handler: 'passwordless.index',
    config: {policies: []}
  },
  {
    method: 'GET',
    path: '/settings',
    handler: 'passwordless.getSettings',
    config: {
      policies: [
        {
          name: 'admin::hasPermissions',
          config: {
            actions: ['plugin::strapi-plugin-passwordless.settings.read'],
          },
        },
      ],
    }
  },
  {
    method: 'PUT',
    path: '/settings',
    handler: 'passwordless.updateSettings',
    config: {
      policies: [
        {
          name: 'admin::hasPermissions',
          config: {
            actions: ['plugin::strapi-plugin-passwordless.settings.update'],
          },
        },
      ],
    }
  },
]