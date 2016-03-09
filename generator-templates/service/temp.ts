/**
 *  <Desription of Service here>
 *
 * @export
 * @class <%= upperCaseName %>
 */
export class <%= captialCaseName %> {
  /**
   * $inject to make angular DI minifiication safe
   *
   * @static
   * @type {Array<string>}
   */
  public static $inject [string] = [<%= injectors %>];

  /**
   * @param {$log} $log - Angular logging Service.
   */
  constructor(<%= params %>) {
    this.$log = <%= logger %>
    this.$log.debug('constructor');
  }

};
