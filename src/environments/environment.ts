// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  weatherApiBaseUrl:'https://api.open-meteo.com/v1/forecast?latitude=41.01&longitude=28.95&hourly=temperature_2m',
  
  xRapidAPIHostHeaderName:'X-RapidAPI-Host',
  xRapidAPIHostHeaderValue:'open-weather13.p.rapidapi.com',

  xRapidAPIKeyName:'X-RapidAPI-Key',
  xRapidAPIKey:'16dba67866msh96aacaec8231656p18a4d1jsn4bf8bbb6b6fd',

  googleApiKey:'AIzaSyD_FcC3-626R9igewrQ9lqhaukGW7SSIg8'
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
