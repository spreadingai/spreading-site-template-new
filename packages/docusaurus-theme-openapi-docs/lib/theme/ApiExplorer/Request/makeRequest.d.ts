/// <reference path="../../../../src/theme/ApiExplorer/postman-collection.d.ts" />
/// <reference path="../../../../src/theme-openapi.d.ts" />
import sdk from "@paloaltonetworks/postman-collection";
import { Body } from "@theme/ApiExplorer/Body/slice";
declare function makeRequest(request: sdk.Request, proxy: string | undefined, _body: Body): Promise<any>;
export default makeRequest;
