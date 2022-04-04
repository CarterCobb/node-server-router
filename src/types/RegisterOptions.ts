import { Application } from 'express';

interface RegisterOptions {
    /**
     * The express application to assign routes to. **Required**
     */
    app: Application;
    /**
     * The folder were your routes reside. e.g if the passed values is 'routes' it will be interpreted as './routes'. defaults to 'routes'
     */
    route_dir?: string;
    /**
     * API verison identifier. e.g '/v1'. defaults to ''
     */
    api_version?: string;
    /**
     * Log when routes are successfully configured
     */
    log_configured?: boolean;
}

export default RegisterOptions;
