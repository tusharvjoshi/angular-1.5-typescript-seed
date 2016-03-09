
// karma requires this when using phantomjs
require('phantomjs-polyfill')

// ensure angular & angular mocks exists in the page tests are run in
import 'angular'
import '@angular/router/angular1/angular_1_router'
import 'angular-mocks'

// our apps starting point
import './index.dev.ts'

// grab all spec files and include them in the page tests are run in
requireAll((<any>require).context('./', true, /spec.ts$/))
function requireAll(r: any): any {
    r.keys().forEach(r)
}
