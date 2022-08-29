/* String extensions */

interface String {
    combine(pre: string): string;
    toTitleCase(): string;
}

String.prototype.combine = function (text: string) {
    return `${this}-${text}`;
};

// eslint-disable-next-line no-extend-native
String.prototype.toTitleCase = function () {
    return this.replace(/\w\S*/g, (txt) => {
        return txt.charAt(0).toUpperCase() + txt.substring(1).toLowerCase();
    });
};
