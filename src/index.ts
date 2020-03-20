/**
 * Define the aspect of imported UUIDv4 objects
 */
interface UUIDv4RuntimeValidator {
  _id: string;
}

/**
 * Base string for UUIDv4 generation. The "4" in the 3th block indicates the UUID version 
 */
const baseString = "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx";

/**
 * Validatation regular expression for runtime checks
 */
const validationRegex = /^[A-Za-z0-9]{8}-[A-Za-z0-9]{4}-4[A-Za-z0-9]{3}-[A-Za-z0-9]{4}-[A-Za-z0-9]{12}$/;

/**
 * Runtime custom type guard
 * @param arg UUIDv4-like object to check
 * @return UUIDv4-like object validity
 */
const checkRuntimeType = (arg: any): arg is UUIDv4RuntimeValidator => {
  return arg && arg._id && typeof arg._id == "string";
};

/**
 * Generate, manage and validate Universally Unique Identifiers v4. 
 * For usage and details, see the [documentation](https://github.com/JonathanMataloni/uuid-v4)
 */
export default class UUIDv4 {
  protected readonly _validationRegex = validationRegex;
  protected _id: string;
  protected readonly _baseString = baseString;
  static stopExecutionAtError: boolean = true;

  /**
   * Create a new UUIDv4 instance.
   * @param id Initialize with custom UUID v4. It will be validated at runtime and it could generate an error. If not specified, a valid random one will be generated.
   */
  constructor(id?: string) {
    if (id) {
      if (!UUIDv4.validate(id)) this._throwError(id);
      this._id = id;
    } else this._id = UUIDv4.generate();
  }

  /**
  * Generate a new Error or warn message
  * @param id Invalid UUID 
  * @private
  */
  private _throwError = (id: string): void | never => {
    if (UUIDv4.stopExecutionAtError)
      throw new Error(`The provided UUIDv4 "${id}" string doesn't pass the validation. Use a valid UUIDv4 string or generate a new one`);
    else console.warn(`The provided UUIDv4 "${id}" string doesn't pass the validation. Use a valid UUIDv4 string or generate a new one`)
  };

  /**
  * Generate a new valid UUID v4 string
  * @returns A valid UUID v4 as string
  */
  static generate = (): string =>
    baseString.replace(/[xy]/g, char => {
      const rand = (Math.random() * 16) | 0;
      return (char === "x" ? rand : (rand & 0x3) | 0x8).toString(16);
    });

  /**
  * Generate a new instance ID that override the old one
  * @returns A valid UUID v4 as string
  */
  public renewId = (): void => {
    this._id = UUIDv4.generate();
  }

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
  static validate(obj: UUIDv4 | string | Object): boolean {
    if (obj instanceof UUIDv4) return validationRegex.test(obj.id);
    else if (typeof obj == "string") return validationRegex.test(obj);
    else return checkRuntimeType(obj);
  }

  /**
   * Get or set the current UIID v4 of the instance
   * @param id A valid UIID v4 string. It will be validated at runtime and it could generate an error.
   * @returns The current UIID v4 of the instance
   */
  get id() {
    return this._id;
  }

  set id(id: string) {
    if (!UUIDv4.validate(id)) this._throwError(id);
    this._id = id;
  }
}
