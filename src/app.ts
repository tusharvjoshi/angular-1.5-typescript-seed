/**
 * Main Application - Component Definition
 *
 * @export
 * @class App
 * @implements {ng.IComponentOptions}
 */
export class App implements ng.IComponentOptions {
  /**
   * Controller used with Component
   *
   * @type {Function}
   */
  public controller: Function = AppController
  /**
   * Template used with Component
   *
   * @type {string}
   */
  public template: string = require('./app.html').toString()
  /**
   * Object containing pairs Directive Bindings for Component
   *
   * @type {Object}
   */
  public bindings: Object = {}

  public $routeConfig: any = [
    {path: '/', name: 'Home', component: 'home', useAsDefault: true},
    {path: '/thing/:id', name: 'Thing', component: 'thing'},
    {path: '/**', name: 'NotFound', component: 'notFound' }
  ]
}

/**
 * App - Controller
 *
 * @export
 * @class AppController
 */
export class AppController {
  /**
   * $inject to make angular DI minifiication safe
   *
   * @static
   * @type {Array<string>}
   */
  public static $inject: Array<string> = ['$log', 'AngularServices', 'AppServices']

  /**
   * @param {*} $log Angular Log Service
   * @param {*} angularServices Angular Services Convenience Service
   * @param {*} appServices App Services Convenience Service
   */
  constructor(public $log: any, public AngularServices: any, public AppServices: any) {
    this.$log = $log.getInstance('AppController', false)
    this.$log.debug('constructor')
  }

  /**
   * life cycle hook (road to ng2)
   */
  public $onInit(): void {
    this.$log.debug('onInit')
  }
}
