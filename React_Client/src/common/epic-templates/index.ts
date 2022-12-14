import { Observable, ObservableInput, of, finalize, concat, from, forkJoin } from 'rxjs';
import { catchError, takeUntil, mergeMap, delay } from 'rxjs/operators';
import axios, { AxiosError, AxiosResponse } from 'axios';
import axiosInstance from './axios';

export interface Options {
    startWith?: (loading: boolean) => void;
    succeeded?: (res: any) => void;
    failed?: (err: Error) => void;
    endWith?: (loading: boolean) => void;
    cancel?: ObservableInput<any>;
    delay?: number;
}

const get = <T = {}, Params = {} | string>(
    url: string,
    queryParams?: Params,
    options?: Options
): Observable<T | void> => {
    const timeOut = options?.delay || 0;
    const start$ = of(options?.startWith!(true));
    const end$ = of(options?.endWith!(false));
    const observable$ = from(axiosInstance.get(url, { params: queryParams })).pipe(
        delay(timeOut),
        mergeMap((result) => [options?.succeeded!(result.data)]),
        catchError((err: Error | AxiosError) => {
            if (axios.isAxiosError(err) && err.response?.data)
                err.message = err.response?.data as string;
            return [options?.failed!(err)];
        }),
        takeUntil(options?.cancel!)
    );
    return concat(start$, observable$, end$);
};

const post = <T>(
    url: string,
    body: object,
    queryParams?: object,
    options?: Options
): Observable<T | void> => {
    const timeOut = options?.delay || 0;
    const start$ = of(options?.startWith!(true));
    const end$ = of(options?.endWith!(false));
    const observable$ = from(
        axiosInstance.post<T>(url, body, { params: queryParams })
    ).pipe(
        delay(timeOut),
        mergeMap((result) => [options?.succeeded!(result.data)]),
        catchError((err: Error | AxiosError) => {
            if (axios.isAxiosError(err) && err.response?.data)
                err.message = err.response?.data as string;
            return [options?.failed!(err)];
        }),
        takeUntil(options?.cancel!),
        finalize(() => of(options?.endWith!(false)))
    );
    return concat(start$, observable$, end$);
};

const put = <T>(
    url: string,
    body: object,
    queryParams?: object,
    options?: Options
): Observable<T | void> => {
    const start$ = of(options?.startWith!(true));
    const end$ = of(options?.endWith!(false));
    const observable$ = from(
        axiosInstance.put<T>(url, body, { params: queryParams })
    ).pipe(
        mergeMap((result) => [options?.succeeded!(result.data)]),
        catchError((err: Error | AxiosError) => {
            if (axios.isAxiosError(err) && err.response?.data)
                err.message = err.response?.data as string;
            return [options?.failed!(err)];
        }),
        takeUntil(options?.cancel!),
        finalize(() => of(options?.endWith!(false)))
    );
    return concat(start$, observable$, end$);
};

const patch = <T>(
    url: string,
    body: object,
    queryParams?: object,
    options?: Options
): Observable<T | void> => {
    const timeOut = options?.delay || 0;
    const start$ = of(options?.startWith!(true));
    const end$ = of(options?.endWith!(false));
    const observable$ = from(
        axiosInstance.patch<T>(url, body, { params: queryParams })
    ).pipe(
        delay(timeOut),
        mergeMap((result) => [options?.succeeded!(result.data)]),
        catchError((err: Error | AxiosError) => {
            if (axios.isAxiosError(err) && err.response?.data)
                err.message = err.response?.data as string;
            return [options?.failed!(err)];
        }),
        takeUntil(options?.cancel!),
        finalize(() => of(options?.endWith!(false)))
    );
    return concat(start$, observable$, end$);
};

const del = <T>(url: string, options?: Options) => {
    const start$ = of(options?.startWith!(true));
    const end$ = of(options?.endWith!(false));
    const observable$ = from(axiosInstance.delete(url)).pipe(
        mergeMap((result) => [options?.succeeded!(result.data)]),
        catchError((err: Error | AxiosError) => {
            if (axios.isAxiosError(err) && err.response?.data)
                err.message = err.response?.data as string;
            return [options?.failed!(err)];
        }),
        takeUntil(options?.cancel!),
        finalize(() => of(options?.endWith!(false)))
    );
    return concat(start$, observable$, end$);
};

const all = <T>(requests: Promise<AxiosResponse<any, any>>[], options?: Options) => {
    const start$ = of(options?.startWith!(true));
    const end$ = of(options?.endWith!(false));
    const observable$ = forkJoin(requests).pipe(
        mergeMap((result) => [options?.succeeded!(result.map((r) => r.data))]),
        catchError((err: Error | AxiosError) => {
            if (axios.isAxiosError(err) && err.response?.data)
                err.message = err.response?.data as string;
            return [options?.failed!(err)];
        }),
        takeUntil(options?.cancel!),
        finalize(() => of(options?.endWith!(false)))
    );
    return concat(start$, observable$, end$);
};

export { axiosInstance };

export default { get, post, put, patch, del, all };
