"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Base string for UUIDv4 generation. The "4" in the 3th block indicates the UUID version
 */
var baseString = "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx";
/**
 * Validatation regular expression for runtime checks
 */
var validationRegex = /^[A-Za-z0-9]{8}-[A-Za-z0-9]{4}-4[A-Za-z0-9]{3}-[A-Za-z0-9]{4}-[A-Za-z0-9]{12}$/;
/**
 * Runtime custom type guard
 * @param arg UUIDv4-like object to check
 * @return UUIDv4-like object validity
 */
var checkRuntimeType = function (arg) {
    return arg && arg._id && typeof arg._id == "string";
};
/**
 * Generate, manage and validate Universally Unique Identifiers v4.
 * For usage and details, see the [documentation](https://github.com/JonathanMataloni/uuid-v4)
 */
var UUIDv4 = /** @class */ (function () {
    /**
     * Create a new UUIDv4 instance.
     * @param id Initialize with custom UUID v4. It will be validated at runtime and it could generate an error. If not specified, a valid random one will be generated.
     */
    function UUIDv4(id) {
        var _this = this;
        this._validationRegex = validationRegex;
        this._baseString = baseString;
        /**
        * Generate a new Error or warn message
        * @param id Invalid UUID
        * @private
        */
        this._throwError = function (id) {
            if (UUIDv4.stopExecutionAtError)
                throw new Error("The provided UUIDv4 \"" + id + "\" string doesn't pass the validation. Use a valid UUIDv4 string or generate a new one");
            else
                console.warn("The provided UUIDv4 \"" + id + "\" string doesn't pass the validation. Use a valid UUIDv4 string or generate a new one");
        };
        /**
        * Generate a new instance ID that override the old one
        * @returns A valid UUID v4 as string
        */
        this.renewId = function () {
            _this._id = UUIDv4.generate();
        };
        if (id) {
            if (!UUIDv4.validate(id))
                this._throwError(id);
            this._id = id;
        }
        else
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
    UUIDv4.validate = function (obj) {
        if (obj instanceof UUIDv4)
            return validationRegex.test(obj.id);
        else if (typeof obj == "string")
            return validationRegex.test(obj);
        else
            return checkRuntimeType(obj);
    };
    Object.defineProperty(UUIDv4.prototype, "id", {
        /**
         * Get or set the current UIID v4 of the instance
         * @param id A valid UIID v4 string. It will be validated at runtime and it could generate an error.
         * @returns The current UIID v4 of the instance
         */
        get: function () {
            return this._id;
        },
        set: function (id) {
            if (!UUIDv4.validate(id))
                this._throwError(id);
            this._id = id;
        },
        enumerable: true,
        configurable: true
    });
    UUIDv4.stopExecutionAtError = true;
    /**
    * Generate a new valid UUID v4 string
    * @returns A valid UUID v4 as string
    */
    UUIDv4.generate = function () {
        return baseString.replace(/[xy]/g, function (char) {
            var rand = (Math.random() * 16) | 0;
            return (char === "x" ? rand : (rand & 0x3) | 0x8).toString(16);
        });
    };
    return UUIDv4;
}());
exports.default = UUIDv4;
