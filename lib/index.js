"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var baseString = "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx";
var validationRegex = /^[A-Za-z0-9]{8}-[A-Za-z0-9]{4}-4[A-Za-z0-9]{3}-[A-Za-z0-9]{4}-[A-Za-z0-9]{12}$/;
var checkRuntimeType = function (arg) {
    return arg && arg._id && typeof arg._id == "string";
};
/**
 * Generate, manage and validate Universally Unique Identifiers v4. For usage and details, see the [documentation](https://github.com/JonathanMataloni/uuidv4)
 */
var UUIDv4 = /** @class */ (function () {
    /**
     * Create a new UUIDv4 instance.
     * @param id Initialize with custom UUID v4. It will be validated at runtime and it could be throw an error. If not specified, a valid random one will be generated.
     */
    function UUIDv4(id) {
        var _this = this;
        this._validationRegex = validationRegex;
        this._baseString = baseString;
        this._throwError = function (id) {
            throw new Error("The provided UUIDv4 \"" + id + "\" string did't pass the validation. Use a valid UUIDv4 string or generate a new one");
        };
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
         * Return the current UIID v4 of the instance
         * @returns The current UIID v4 of the instance
         */
        get: function () {
            return this._id;
        },
        /**
         * Re-assign a custom UIID v4 to the UUIDv4 instance.
         * @param id A valid UIID v4 string. It will be validated at runtime and it could be throw an error.
         */
        set: function (id) {
            if (!UUIDv4.validate(id))
                this._throwError(id);
            this._id = id;
        },
        enumerable: true,
        configurable: true
    });
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
