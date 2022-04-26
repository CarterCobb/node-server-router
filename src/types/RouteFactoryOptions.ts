export default interface RouteFactoryOptions {
  /**
   * The folder were your routes reside. e.g if the passed values is 'routes' it will be interpreted as './routes'; '/folder1/folder2' is './folder1/folder2' defaults to 'routes'
   */
  route_dir?: string;
  /**
   * API verison identifier. e.g '/v1'. defaults to '/'
   */
  api_version?: string;
  /**
   * Log when routes are successfully configured. default is false
   */
  log_configured?: boolean;
}
