describe('Component::mainDemo', () => {

  // component to run each test against
  let component: any

  // load app module so we can access everything
  beforeEach(window.module('app'))

  // load app module so we can access everything
  beforeEach(inject(($rootScope, $componentController) => {

    // a scope is always required for a component to attach to
    let locals: any = {
      $scope: $rootScope.$new()
    }

    // bindings data to compile component against
    let bindings: any = {}

    // generate component with angular.mocks helper service
    component = $componentController('mainDemo', locals, bindings)

    // trigger init on component, $componentController doesn't currently
    component.$onInit()
  }))

  describe('::constructor()', () => {
    it('should contain a logger', () => {
      expect(component.$log).toBeDefined()
    })
  })

  describe('::constructor', () => {
    it('should contain initInput with default value of 3', () => {
      expect(component.initInput).toBeDefined()
      expect(component.initInput).toBe(3)
    })
  })

  describe('::constructor()', () => {
    it('should contain round with default value of none', () => {
      expect(component.initInput).toBeDefined()
      expect(component.initInput).toBe(3)
    })
  })

})
