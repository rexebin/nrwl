import React, {createContext, PropsWithChildren, ReactNode, useCallback, useContext, useMemo, useState,} from 'react';

type Message = {
    message: ReactNode;
    type: 'error' | 'info' | 'warning' | 'success';
};

type MessageContext = {
    message?: Message;
    sendMessage: (message: ReactNode) => void;
    sendError: (message: ReactNode) => void;
    sendInfo: (message: ReactNode) => void;
    sendWarning: (message: ReactNode) => void;
};

const Context = createContext<MessageContext>((null as unknown) as MessageContext);
Context.displayName = 'MessageContext';

export function MessageProvider(props: PropsWithChildren<unknown>) {
    const [message, setMessage] = useState<Message>((null as unknown) as Message);
    const sendSuccess = useCallback(
        (message: ReactNode) => {
            setMessage({message: message, type: 'success'});
        },
        [setMessage]
    );
    const sendInfo = useCallback(
        (message: ReactNode) => {
            setMessage({message: message, type: 'info'});
        },
        [setMessage]
    );
    const sendWarning = useCallback(
        (message: ReactNode) => {
            setMessage({message: message, type: 'warning'});
        },
        [setMessage]
    );
    const sendError = useCallback(
        (message: ReactNode) => {
            setMessage({message: message, type: 'error'});
        },
        [setMessage]
    );

    const value = useMemo(
        () => ({
            message,
            sendMessage: sendSuccess,
            sendError,
            sendInfo,
            sendWarning,
        }),
        [message, sendSuccess, sendError, sendInfo, sendWarning]
    );

    return <Context.Provider value={value} {...props} />;
};

export function useMessage() {
    const context = useContext<MessageContext>(Context);
    if (context === undefined) {
        throw new Error(`useMessage must be used within a MessageProvider`);
    }
    return context;
}
