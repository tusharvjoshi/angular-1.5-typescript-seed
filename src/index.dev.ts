/*
 * Vendor Imports 
 * The import feature of typescript allows modules to be loaded. The scope is contained
 * within the module similar to the standard ES2015 export import
 * 
 * NOTE: The use of curly braces is only required when the component is not the default
 * export from the file.
 *
*/
import 'angular'; // standard Angular framework
import 'angular-route'; // router
import 'angular-material'; // material icons
import 'LogUnobtrusiveExtension/dist/log-ex-unobtrusive';
import 'ng-stats';

// app css
import './app.scss';

// app imports
import Common from './common/common.ts';
import Components from './components/components.ts';

// note: You can only have one default export per file, hence multiple exports must be
// specified with curly braces.
import {App} from './app.ts'
import AppConfig from './app.config.ts'

/*  
 * Top Level Angular Module
 *
 * First argument accepts the name of the app, the second passes in the components which
 * will be included.
 * 
 * Note: Both Common and Components export individual apps which are subsets of the main app.
 * 
*/
angular.module('app', [
   'ngRoute',
   'ngMaterial',
   'log.ex.uo',
   'angularStats',
   Common.name,
   Components.name
])
.config(AppConfig)
.value('$routeProvider', 'app') // top level router component, contains the intial routes and views
.component('app', new App())

// start angular using code instead of ng-app declaration in the index.html
angular.bootstrap(document, ['app'], {
    strictDi: true
})
