export interface FileContent {
    type: "file";
    value: {
        src: string;
        content: Blob;
    };
}
export interface StringContent {
    type: "string";
    value?: string;
}
export type Content = FileContent | StringContent | undefined;
export interface FormBody {
    type: "form";
    content: {
        [key: string]: Content;
    };
}
export interface RawBody {
    type: "raw";
    content: Content;
}
export interface EmptyBody {
    type: "empty";
}
export type Body = EmptyBody | FormBody | RawBody;
export type State = Body;
export declare const slice: any;
export declare const clearRawBody: any, setStringRawBody: any, setFileRawBody: any, clearFormBodyKey: any, setStringFormBody: any, setFileFormBody: any;
declare const _default: any;
export default _default;
