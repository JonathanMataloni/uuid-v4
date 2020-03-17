/**
 * Generate, manage and validate Universally Unique Identifiers v4.
 * For usage and details, see the [documentation](https://github.com/JonathanMataloni/uuidv4)
 */
export default class UUIDv4 {
    protected readonly _validationRegex: RegExp;
    protected _id: string;
    protected readonly _baseString = "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx";
    /**
     * Create a new UUIDv4 instance.
     * @param id Initialize with custom UUID v4. It will be validated at runtime and it could be throw an error. If not specified, a valid random one will be generated.
     */
    constructor(id?: string);
    private _throwError;
    /**
    * Generate a new valid UUID v4 string
    * @returns A valid UUID v4 as string
    */
    static generate: () => string;
    /**
    * Generate a new instance ID that override the old one
    * @returns A valid UUID v4 as string
    */
    renewId: () => void;
    /**
    * Validate an UUID v4 string, instance or UUIDv4-like object
    * ```
    * // UUIDv4-like object:
    * const toValidate = {
    *   _id: "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx"
    * }
    * ```
    * @param obj An UUIDv4 instance, a string or an UUIDv4-like object
    * @returns Validity of the provided object
    */
    static validate(obj: UUIDv4 | string | Object): boolean;
    /**
     * Return the current UIID v4 of the instance
     * @returns The current UIID v4 of the instance
     */
    get id(): string;
    /**
     * Re-assign a custom UIID v4 to the UUIDv4 instance.
     * @param id A valid UIID v4 string. It will be validated at runtime and it could be throw an error.
     */
    set id(id: string);
}
