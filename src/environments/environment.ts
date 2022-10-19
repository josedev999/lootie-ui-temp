// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  env: 'development',
  production: false,
  isSentry: false,
  apiUrl: 'https://dev-api.bitpacks.io/v1',
  discordApiUrl:
    'https://discordapp.com/api/oauth2/authorize?client_id=618783118236844052&redirect_uri=http%3A%2F%2Flocalhost%3A7777%2Fredirect%2Fdiscord&response_type=token&scope=identify%20guilds',
  googleClientId: '988730414400-d2m480n5htmd4q56t2obhss32885jevp.apps.googleusercontent.com',
  apiToken: 'jtu9fvdUwMmV',
  sentryWebhookUrl: 'https://b8a2dcd861cf444cad2fe086553f7dc6@o423107.ingest.sentry.io/5370026',
  fingerprintToken: '084r8K88pVnKw5kp0XVT',
  fingerprintDomain: 'https://fp.lootie.com',
  segmentApiKey: 'RNou2oNbDfauMX4m9LWUGDHs9M4Wk8rH',
  intercomSecretKey: '6OWIUdv8IH11Oiy8D3vpgXQ4MDKkKH36LpgMnOd6',
  socket: {
    baseUrl: 'https://dev-api.bitpacks.io/',
    config: {},
  },
  appId: 'lootie',
  experimentId: 'seAH07ReR0ePajilUD_NDA',
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.