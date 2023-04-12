const pluginPermissions = {
  main: [
    {action: 'plugin::strapi-plugin-passwordless.main', subject: null}
  ],
  readSettings: [
    {action: 'plugin::strapi-plugin-passwordless.settings.read', subject: null},
  ],
  updateSettings: [
    {action: 'plugin::strapi-plugin-passwordless.settings.update', subject: null},
  ],

};

export default pluginPermissions;