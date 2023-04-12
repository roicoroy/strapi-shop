export default ({ env }) => ({
  proxy: true,
  app: {
    keys: env.array('APP_KEYS')
  }, host: env('HOST'),
  port: env.int('PORT'),
  url: env('', 'http://localhost:1337'),
  webhooks: {
    populateRelations: env.bool('WEBHOOKS_POPULATE_RELATIONS', false),
  },
});