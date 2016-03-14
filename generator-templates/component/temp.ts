import './<%= name %>.scss'

/**
 *  Component Definition
 *
 * @export
 * @class <%= captialCaseName %>
 * @implements {ng.IComponentOptions}
 */
export class <%= captialCaseName %> implements ng.IComponentOptions {

  /**
   * Controller used with Component
   *
   * @type {Function}
   */
  public controller: Function = <%= captialCaseName %>Controller

  /**
   * Template used with Component
   *
   * @type {string}
   */
  public template: string = require('./<%= name %>.html').toString()

  /**
   * Object containing pairs Directive Bindings for Component
   *
   * @type {Object}
   */
  public bindings: Object = {}
}

/**
 * <%= captialCaseName %> - Controller
 *
 * @export
 * @class <%= captialCaseName %>Controller
 */
export class <%= captialCaseName %>Controller {

  /**
   * $inject to make angular DI minifiication safe
   *
   * @static
   * @type {Array<string>}
   */
  public static $inject: [string] = [<%= injectors %>]

  /**
   * @param {*} $log Angular Log Service
   * @param {*} AngularServices Angular Services Convenience Service
   * @param {*} AppServices App Services Convenience Service
   */
  constructor(<%= params %>) {
    this.$log = <%= logger %>
      this.$log.debug('constructor')
  }

  /**
   * life cycle hook (road to ng2)
   * Component is fully bound and all bindings/di are available to work with.
   */
  public $onInit(): void {
    this.$log.debug('onInit')
  }

}
