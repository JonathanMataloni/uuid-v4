/** Base pattern for UUIDv4 generation */
const uuidPattern = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx';
const validationRegex = /^[A-Za-z0-9]{8}-[A-Za-z0-9]{4}-4[A-Za-z0-9]{3}-[A-Za-z0-9]{4}-[A-Za-z0-9]{12}$/;

/**
 * UUIDv4 custom type guard
 * @param arg UUIDv4-like object to check
 * @return UUIDv4-like object validity
 */
const isUUIDv4Like = (arg: any): arg is UUIDv4 => {
    return arg && arg._id && typeof arg._id == 'string';
};

/**
 * Generate, manage and validate Universally Unique Identifiers v4.
 * For usage and details, see the [docs](https://github.com/jonamat/uuid-v4-validator)
 */
export class UUIDv4 {
    protected readonly _validationRegex = validationRegex;
    protected readonly _uuidPattern = uuidPattern;
    private _id: string;
    static blockingError = true;

    /**
     * Generate a new Error or warn message
     * @param id Invalid UUID
     * @private
     */
    private _throwInvalidIdError = (id: string): void | never => {
        if (UUIDv4.blockingError)
            throw new Error(
                `The provided UUIDv4 "${id}" string doesn't pass the validation. Use a valid UUIDv4 string or generate a new one`,
            );
        else
            console.warn(
                `The provided UUIDv4 "${id}" string doesn't pass the validation. Use a valid UUIDv4 string or generate a new one`,
            );
    };

    /**
     * Create a new UUIDv4 instance.
     * @param id Initialize with custom UUID. It will be validated at runtime and it could generate an error.
     * If not specified, a valid random one will be generated.
     */
    constructor(id?: string) {
        if (id) {
            if (!UUIDv4.validate(id)) {
                this._throwInvalidIdError(id);
                this._id = UUIDv4.generate();
            } else this._id = id;
        } else this._id = UUIDv4.generate();
    }

    /**
     * Generate a new valid UUID v4 string
     * @returns A random generated UUID v4 string
     */
    static generate = (): string =>
        uuidPattern.replace(/[xy]/g, (char) => {
            const rand = (Math.random() * 16) | 0;
            return (char === 'x' ? rand : (rand & 0x3) | 0x8).toString(16);
        });

    /**
     * Generate a new UUID that will override the old one
     */
    public refreshId = (): void => {
        this._id = UUIDv4.generate();
    };

    /**
     * Validate an UUID v4 string, instance or UUIDv4-like object
     * ```
     * // UUIDv4-like object:
     * const toValidate = {
     *   _id: "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx"
     * }
     * ```
     * @param arg An UUIDv4 instance, a string or an UUIDv4-like object
     * @returns Validity of the provided param
     */
    static validate(arg: UUIDv4 | string | Record<string, unknown>): boolean {
        if (arg instanceof UUIDv4) return validationRegex.test(arg.id);
        else if (typeof arg == 'string') return validationRegex.test(arg);
        else return isUUIDv4Like(arg) && validationRegex.test(arg._id);
    }

    /**
     * The current assigned UUID
     * @param id A valid UUID v4 string. It will be validated at runtime and it could generate an error.
     * @returns The current assigned UUID
     */
    get id(): string {
        return this._id;
    }

    set id(id: string) {
        if (!UUIDv4.validate(id)) this._throwInvalidIdError(id);
        else this._id = id;
    }
}
