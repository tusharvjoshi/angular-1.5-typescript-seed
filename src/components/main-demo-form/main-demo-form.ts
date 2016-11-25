import './main-demo-form.scss'
import {User} from './user'

/**
 *  Component Definition
 *
 * @export
 * @class MainDemoForm
 * @implements {ng.IComponentOptions}
 */
export class MainDemoForm implements ng.IComponentOptions {

  /**
   * Controller used with Component
   *
   * @type {Function}
   */
  public controller: Function = MainDemoFormController

  /**
   * Template used with Component
   *
   * @type {string}
   */
  public template: string = require('./main-demo-form.html').toString()

  /**
   * Object containing pairs Directive Bindings for Component
   *
   * @type {Object}
   */
  public bindings: { [binding: string]: string; } = {
    $router: '<'
  }

  /**
   * Component Router lifecycle hook
   */
  public $canActivate: any = function(): boolean {
    return true
  }

}

/**
 * mainDemo - Controller
 *
 * @export
 * @class MainDemoFormController
 */
export class MainDemoFormController {

  /**
   * $inject to make angular DI minifiication safe
   *
   * @static
   * @type {Array<string>}
   */
  public static $inject: [string] = ['$log', '$http']

  /**
   * @param {*} $log Angular Log Service
   * @param {*} $http restful services
   * @param {*} user User submitted data
   * @param {*} countries Default countries based on ISO compliance
   */
   constructor(
      public $log: any,
      public $http: any,
      public user: User,
      public countries: any
      ) {
      this.$log = $log.getInstance('MainDemoForm', false)
      this.$log.debug('constructor')

      this.user = new User()

      $http.get('http://localhost:3000/countries').then( (response) =>
         this.countries = response.data
      )
  }

  /**
   * life cycle hook (road to ng2)
   */
   public $onInit(): void {
     this.$log.debug('onInit')
   }

   public save(newUser: User, form: any): void {
      form.$setPristine()
      form.$setUntouched()
      this.$http.post('http://localhost:3000/posts', JSON.stringify(newUser))
   }

  public reset(): void {
     // generate new user with defaultUser prototype
     this.user = new User()
  }
}
