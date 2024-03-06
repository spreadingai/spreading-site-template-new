import { SecurityRequirementObject, SecuritySchemeObject } from "docusaurus-plugin-openapi-docs/src/openapi/types";
import { ThemeConfig } from "docusaurus-theme-openapi-docs/src/types";
export declare function createAuth({ security, securitySchemes, options, }: {
    security?: SecurityRequirementObject[];
    securitySchemes?: {
        [key: string]: SecuritySchemeObject;
    };
    options?: ThemeConfig["api"];
}): AuthState;
export type Scheme = {
    key: string;
    scopes: string[];
} & SecuritySchemeObject;
export interface AuthState {
    data: {
        [scheme: string]: {
            [key: string]: string | undefined;
        };
    };
    options: {
        [key: string]: Scheme[];
    };
    selected?: string;
}
export declare const slice: any;
export declare const setAuthData: any, setSelectedAuth: any;
declare const _default: any;
export default _default;
