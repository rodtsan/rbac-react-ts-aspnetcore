import { isEmpty } from 'lodash';
import { ChangeEvent, FormEvent, useState } from 'react';

interface Validation {
    required?: {
        value: boolean;
        message: string;
    };
    pattern?: {
        value: string;
        message: string;
    };
    custom?: {
        isValid: (value: string) => boolean;
        message: string;
    };
}

type Validations<T extends {}> = Partial<Record<keyof T, Validation>>;

type ErrorRecord<T> = Partial<Record<keyof T, string>>;

export const useForm = <T extends Record<keyof T, any> = {}>(options?: {
    // We will soon see how to create this interface
    validations?: Validations<T>;
    // Allows a subset of T
    initialValues?: Partial<T>;
    onSubmit?: () => void;
}) => {
    const [data, setData] = useState<T>((options?.initialValues || {}) as T);
    const [errors, setErrors] = useState<ErrorRecord<T>>({});

    const validateOnBlur = (key: keyof T) => {
        const validations = options?.validations;
        const setError = (message?: string) => {
            setErrors((prevState) => {
                return {
                    ...prevState,
                    [key]: message
                };
            });
        };
        setError();
        if (validations) {
            const value = data[key];
            const validation = validations[key];
            if (validation?.required?.value && isEmpty(value)) {
                setError(validation?.required?.message);
                return;
            }

            const pattern = validation?.pattern;
            if (pattern?.value && !RegExp(pattern.value).test(value)) {
                setError(pattern.message);
                return;
            }

            const custom = validation?.custom;
            if (custom?.isValid && !custom.isValid(value)) {
                setError(custom.message);
                return;
            }
        }
    };

    const handleBlur = (e: React.FocusEvent<HTMLInputElement & HTMLSelectElement>) => {
        let key = e.target.id as keyof T;
        validateOnBlur(key)
    };

    const handleChange =
        <S extends unknown>(key: keyof T, sanitizeFn?: (value: string) => S) =>
        (e: ChangeEvent<HTMLInputElement & HTMLSelectElement>) => {
            const value = sanitizeFn ? sanitizeFn(e.target.value) : e.target.value;
            setData((prevState) => {
                return {
                    ...prevState,
                    [key]: value
                };
            });
        };

    const setFields = (fields: T | {}) => {
        setData((prevState) => {
            return {
                ...prevState,
                ...fields
            };
        });
    };

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const validations = options?.validations;
        if (validations) {
            let valid = true;
            let newErrors: ErrorRecord<T> = {};
            for (const key in validations) {
                const value = data[key as keyof T];
                const validation = validations[key];
                if (validation?.required?.value && isEmpty(value)) {
                    valid = false;
                    newErrors[key] = validation?.required?.message;
                }

                const pattern = validation?.pattern;
                if (pattern?.value && !RegExp(pattern.value).test(value)) {
                    valid = false;
                    newErrors[key] = pattern.message;
                }

                const custom = validation?.custom;
                if (custom?.isValid && !custom.isValid(value)) {
                    valid = false;
                    newErrors[key] = custom.message;
                }
            }

            if (!valid) {
                setErrors(newErrors);
                return;
            }
        }

        setErrors({});

        if (options?.onSubmit) {
            options.onSubmit();
        }
    };

    return {
        setFields,
        data,
        handleBlur,
        handleChange,
        handleSubmit,
        errors
    };
};
