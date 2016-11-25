import {User} from './user'

describe('Component::mainDemoForm', () => {

  // component to run each test against
  let component: any
  let $httpBackend: any

  // load app module so we can access everything
  beforeEach(window.module('app'))

  // load app module so we can access everything
  beforeEach(inject(($rootScope, $componentController, _$httpBackend_) => {

    // a scope is always required for a component to attach to
    let locals: any = {
      $scope: $rootScope.$new()
    }

    // bindings data to compile component against
    let bindings: any = {}

    // generate component with angular.mocks helper service
    component = $componentController('mainDemoForm', locals, bindings)

    // generate http call
    $httpBackend = _$httpBackend_
    $httpBackend.expectGET('http://localhost:3000/countries')
      .respond([
         {
            'name': 'Afghanistan',
            'code': 'AF'
         } , {
            'name': 'Aland Islands',
            'code': 'AX'
         }
      ])

    // trigger init on component, $componentController doesn't currently
    component.$onInit()
  }))

  describe('::constructor()', () => {
    it('should contain a logger', () => {
      expect(component.$log).toBeDefined()
    })

    it('should contain a user', () => {
      expect(component.user).toBeDefined()
    })

    it('should contain default countries', () => {
      expect(component.countries).toBeUndefined()
      $httpBackend.flush()
      expect(component.countries).toBeDefined()
    })

  })

  describe('::reset()', () => {
     beforeEach( () => {
        component.reset()
     })

     it('should reset the user properties to default user', () => {
        expect(component.user).toEqual(new User())
     })
  })

})

describe('Support Class::User', () => {
   let testUser: User
   beforeEach(() => {
      testUser = new User()
   })

   describe('::constructor', () => {

      it('should write default values for unspecified variables', () => {
         expect(testUser.firstName).toBe('')
         expect(testUser.lastName).toBe('')
         expect(testUser.age).toBe(0)
         expect(testUser.id).toBe(0)
         expect(testUser.address).toBe('')
         expect(testUser.country).toBe('')
      })

      it('should accept variable arguments and only assign necessary values', () => {
         let pickyUser: User = new User('Jack', undefined, 3)

         expect(pickyUser.firstName !== testUser.firstName).toBeTruthy()
         expect(pickyUser.lastName === testUser.lastName).toBeTruthy()
         expect(pickyUser.age !== testUser.age).toBeTruthy()
      })
   })
})
