import { MediaTypeObject } from "../openapi/types";
interface Props {
    style?: any;
    title: string;
    body: {
        content?: {
            [key: string]: MediaTypeObject;
        };
        description?: string;
        required?: string[] | boolean;
    };
}
export declare function createRequestSchema({ title, body, ...rest }: Props): string | undefined;
export {};
