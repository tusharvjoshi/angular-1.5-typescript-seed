/**
 *  Form User Data
 *
 * @export
 * @class User
 */
export class User {

  /**
   * @param {*} firstName
   * @param {*} lastName
   * @param {*} age
   * @param {*} id
   * @param {*} address
   * @param {*} country
   */
   constructor(
      public firstName: string = '',
      public lastName: string = '',
      public age: number = 0,
      public id: number = 0,
      public address: string = '',
      public country: string = ''
   ) {}

}
