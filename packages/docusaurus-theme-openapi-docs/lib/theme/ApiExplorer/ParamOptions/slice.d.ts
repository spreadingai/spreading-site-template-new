import { ParameterObject } from "docusaurus-plugin-openapi-docs/src/openapi/types";
export type Param = ParameterObject & {
    value?: string[] | string;
};
export interface State {
    path: Param[];
    query: Param[];
    header: Param[];
    cookie: Param[];
}
export declare const slice: any;
export declare const setParam: any;
declare const _default: any;
export default _default;
