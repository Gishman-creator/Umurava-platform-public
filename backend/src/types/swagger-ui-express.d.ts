declare module 'swagger-ui-express' {
    import { Request, Response, RequestHandler } from 'express';
    
    export interface SwaggerUiOptions {
        customCss?: string;
        customfavIcon?: string;
        customSiteTitle?: string;
        swaggerUrl?: string;
        customJs?: string;
        swaggerOptions?: any;
        explorer?: boolean;
    }

    export function serve(path?: string, options?: SwaggerUiOptions): RequestHandler[];
    export function setup(spec: any, options?: SwaggerUiOptions): RequestHandler;
    export function generateHTML(spec: any, opts?: SwaggerUiOptions): string;
} 