import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { isValidUrl } from '../utils/methods';
import axios, { AxiosError, AxiosResponse } from 'axios';
import axiosInstance from '@common/epic-templates/axios';


// export default axiosInstance;

const useCallbackRef = <T = {}>(callback: (res?: T) => void) => {
    const callbackRef = useRef(callback);
    useLayoutEffect(() => {
        callbackRef.current = callback;
    }, [callback]);
    return callbackRef;
};

export const useRequest = <P = {} /* Payload */, D = {} /* Data */>(
    url: string,
    options: {
        method: string;
        data?: P;
        params?: object;
        onSubmit?: (values?: P) => void;
        onDataReceive: (res?: D) => void;
        onError: (err?: object) => void;
        callOnUrlChange?: boolean;
    }
) => {
    const [loading, setLoading] = useState<boolean>(false);
    const [data, setData] = useState<D>();
    const [errors, setError] = useState<object>();
    const [params, setParams] = useState(options.params);
    const [values, setValues] = useState(options.data);
    const [callOnUrlChangeValue, setCallOnUrlChangeValue] = useState(
        options.callOnUrlChange
    );

    const config = {
        url: url,
        method: options.method,
        data: values,
        params
    };

    const onSubmit = (values?: P) => {
        setCallOnUrlChangeValue(true);
        setValues(values as P);
    };

    const handleDataRecieveRef = useCallbackRef(options.onDataReceive);
    const handleErrorRef = useCallbackRef(options.onError);

    useEffect(() => {
        if (callOnUrlChangeValue && isValidUrl(url)) {
            setCallOnUrlChangeValue(options.callOnUrlChange);
            setLoading(true);
            axiosInstance.request(config)
                .then((r: AxiosResponse<any, any>) => {
                    console.log(r.data);
                    setData(r.data);
                    handleDataRecieveRef.current(r.data);
                })
                .catch((err) => {
                    if (axios.isAxiosError(err)) {
                        const axiosError = err as AxiosError;
                        if (axiosError.response) {
                            if (axiosError.response.status == 401) {
                                window.location.href = '/login';
                            } else {
                                setError(axiosError.response);
                                handleErrorRef.current(err.response);
                            }
                        }
                    } else {
                        setError(err);
                        handleErrorRef.current(err);
                    }
                })
                .finally(() => setLoading(false));
        }
    }, [url, values, handleDataRecieveRef, handleErrorRef]);

    return {
        loading,
        data,
        errors,
        onSubmit
    };
};
