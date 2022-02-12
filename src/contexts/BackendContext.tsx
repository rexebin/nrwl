import {BackendService} from "../backend";
import {createContext, PropsWithChildren, useContext, useMemo} from "react";


export interface BackendContext {
    backend: BackendService
}

const Context = createContext<BackendContext>((null as unknown) as BackendContext);
Context.displayName = "BackendProvider";

export function BackendProvider(props: PropsWithChildren<unknown>) {
    const value = useMemo(() => ({backend: new BackendService()}), []);
    return <Context.Provider value={value} {...props}/>;
}

export function useBackend() {
    const context = useContext<BackendContext>(Context);
    if (context === undefined) {
        throw new Error("useBackend must be used within a BackendProvider");
    }
    return context;
}
