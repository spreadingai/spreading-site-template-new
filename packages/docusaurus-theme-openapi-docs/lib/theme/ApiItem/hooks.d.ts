import { TypedUseSelectorHook } from "react-redux";
import type { RootState } from "./store";
export declare const useTypedDispatch: () => import("@reduxjs/toolkit").ThunkDispatch<import("@reduxjs/toolkit").CombinedState<{
    accept: unknown;
    contentType: unknown;
    response: unknown;
    server: unknown;
    body: unknown;
    params: unknown;
    auth: unknown;
}>, undefined, import("@reduxjs/toolkit").AnyAction> & import("@reduxjs/toolkit").Dispatch<import("@reduxjs/toolkit").Action<any>>;
export declare const useTypedSelector: TypedUseSelectorHook<RootState>;
