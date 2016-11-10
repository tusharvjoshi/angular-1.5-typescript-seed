import './main-demo.scss'

/**
 *  Component Definition
 *
 * @export
 * @class NotFound
 * @implements {ng.IComponentOptions}
 */
export class MainDemo implements ng.IComponentOptions {

  /**
   * Controller used with Component
   *
   * @type {Function}
   */
  public controller: Function = MainDemoController

  /**
   * Template used with Component
   *
   * @type {string}
   */
  public template: string = require('./main-demo.html').toString()

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
 * @class NotFoundController
 */
export class MainDemoController {

  /**
   * $inject to make angular DI minifiication safe
   *
   * @static
   * @type {Array<string>}
   */
  public static $inject: [string] = ['$log', 'AngularServices', 'AppServices']

  public amount: number = 3;
  public round: string = 'none'

  public numCalc: any = [
        {
          modifier: 6,
          op: 'add',
          title: 'Add ',
        } , {
          modifier: 1,
          op: 'subtract',
          title: 'Subtract ',
        } , {
          modifier: 20,
          op: 'multiply',
          title: 'Multiply by ',
        } , {
          modifier: 2,
          op: 'divide',
          title: 'Divide by ',
        }
      ]

  public potOps: any = [
        {
          operation: 'Addition',
          symbol: '+'
        },
        {
          operation: 'Subtract',
          symbol: '-'
        },
        {
          operation: 'Multiply',
          symbol: '*'
        },
        {
          operation: 'Divide',
          symbol: '\/'
        },
      ]

  /**
   * @param {*} $log Angular Log Service
   * @param {*} AngularServices Angular Services Convenience Service
   * @param {*} AppServices App Services Convenience Service
   */
  constructor(public $log: any, public AngularServices: any, public AppServices: any) {
    this.$log = $log.getInstance('MainDemo', false)
    this.$log.debug('constructor')
  }

  /**
   * life cycle hook (road to ng2)
   */
  public $onInit(): void {
    this.$log.debug('onInit')
  }

  public calculate(modifier: number, op: string, amount: number): any {
        let result: number
        let factor: number
        let nan: string

        switch (op) {
          case 'add':
            result = modifier + amount
            break
          case 'subtract':
            result = amount - modifier
            break
          case 'multiply':
            result = amount * modifier
            break
          case 'divide':
            result = amount / modifier
            break
          default:
          console.log('No cases found.')
        }

        // determines the rounding factor
        switch (this.round) {
          case 'ones':
            factor = 1
            break
          case 'tenths':
            factor = 10
            break
          case 'hundredths':
            factor = 100
            break
          case 'thousandths':
            factor = 1000
            break
          case 'none':
            factor = 0
            break
          default:
            console.log('This is not a valid option.')
        }

        // means that no rounding should occur
        if (this.round !== 'none') {
          result = Math.round(result * factor) / factor
        }

        if (isNaN(result)) {
          nan = 'Not a number'
          return nan
        } else {
          return result
        }
      }
    }
