export type Value = string | number | boolean | undefined | null;
export type Mapping = { [key: string]: any };
export type Argument = Value | Mapping | Argument[];

const hasOwn = {}.hasOwnProperty;

export const classNames = (...args: Argument[]) => {
    let classes: string[] = [];
    for (let i = 0; i < args.length; i++) {
        let arg: any = args[i];
        if (!arg) continue;

        let argType = typeof arg;
        if (argType === 'string' || argType === 'number') {
            classes.push(arg);
        } else if (Array.isArray(arg)) {
            if (arg.length) {
                let inner = classNames.apply(null, arg);
                if (inner) {
                    classes.push(inner);
                }
            }
        } else if (argType === 'object') {
            if (arg.toString === Object.prototype.toString) {
                for (let key in arg) {
                    if (hasOwn.call(arg, key) && arg[key]) {
                        classes.push(key);
                    }
                }
            } else {
                classes.push(arg.toString());
            }
        }
    }

    return classes.join(' ');
};

export const isValidUrl = (url?: string): boolean => {
    return /^(http|https):\/\/[^ "]+$/.test(url as string);
};

export const yesOrNo = (value?: boolean) => (value ? 'Yes' : 'No');

export const isValidEmail = (email: string) => {
    let regex = new RegExp(/^[^\s@]+@[^\s@]+\.[^\s@]+$/);
    return regex.test(email);
};
