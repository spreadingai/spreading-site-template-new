declare const rootReducer: import("@reduxjs/toolkit").Reducer<import("@reduxjs/toolkit").CombinedState<{
    accept: unknown;
    contentType: unknown;
    response: unknown;
    server: unknown;
    body: unknown;
    params: unknown;
    auth: unknown;
}>, import("@reduxjs/toolkit").Action<any>>;
export type RootState = ReturnType<typeof rootReducer>;
export declare const createStoreWithState: (preloadedState: RootState, middlewares: any[]) => import("@reduxjs/toolkit/dist/configureStore").ToolkitStore<import("@reduxjs/toolkit").EmptyObject & {
    accept: unknown;
    contentType: unknown;
    response: unknown;
    server: unknown;
    body: unknown;
    params: unknown;
    auth: unknown;
}, import("@reduxjs/toolkit").Action<any>, import("@reduxjs/toolkit").MiddlewareArray<[import("@reduxjs/toolkit").ThunkMiddleware<import("@reduxjs/toolkit").CombinedState<{
    accept: unknown;
    contentType: unknown;
    response: unknown;
    server: unknown;
    body: unknown;
    params: unknown;
    auth: unknown;
}>, import("@reduxjs/toolkit").AnyAction>, ...any[]]>>;
export declare const createStoreWithoutState: (preloadedState: {}, middlewares: any[]) => import("@reduxjs/toolkit/dist/configureStore").ToolkitStore<import("@reduxjs/toolkit").EmptyObject & {
    accept: unknown;
    contentType: unknown;
    response: unknown;
    server: unknown;
    body: unknown;
    params: unknown;
    auth: unknown;
}, import("@reduxjs/toolkit").Action<any>, import("@reduxjs/toolkit").MiddlewareArray<[import("@reduxjs/toolkit").ThunkMiddleware<import("@reduxjs/toolkit").CombinedState<{
    accept: unknown;
    contentType: unknown;
    response: unknown;
    server: unknown;
    body: unknown;
    params: unknown;
    auth: unknown;
}>, import("@reduxjs/toolkit").AnyAction>, ...any[]]>>;
export type AppDispatch = ReturnType<typeof createStoreWithState>["dispatch"];
export {};
