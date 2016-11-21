// import app component classes
import {AngularLogo} from './angular-logo/angular-logo.ts'
import {Home} from './home/home.ts'
import {Thing} from './thing/thing.ts'
import {NotFound} from './not-found/not-found.ts'
import {MainDemo} from './main-demo/main-demo.ts'
import {MainDemoForm} from './main-demo-form/main-demo-form.ts'

// bundle component classes into angular components
export default angular.module('app.components', [
  'ngRoute'
])
.component('home', new Home())
.component('thing', new Thing())
.component('mainDemo', new MainDemo())
.component('mainDemoForm', new MainDemoForm())
.component('notFound', new NotFound())
.component('angularLogo', new AngularLogo())
