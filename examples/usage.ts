import UUIDv4 from '../lib'

/**
 * Create an UUIDv4 instance with a random generated UUID v4
 */
const userId = new UUIDv4()

console.log(userId)
// Expected output: UUIDv4 { _id: "s4F68hFDf-d3R5-4Rt6-dRgi-dEji85feY51s" }

console.log(userId.id)
// Return UUID as string
// Expected output: "s4F68hFDf-d3R5-4Rt6-dRgi-dEji85feY51s"


/**
 * Create a UUIDv4 instance with a custom string
 */
const userId1 = new UUIDv4("s4F68hFDf-d3R5-4Rt6-dRgi-dEji85feY51s")

console.log(userId)
// Return a UUIDv4 instance
// Expected output: UUIDv4 { _id: "s4F68hFDf-d3R5-4Rt6-dRgi-dEji85feY51s" }

const userId2 = new UUIDv4("s4F68hF")
// Execution stops due to an error
// Expected output: The provided UUIDv4 "s4F68hF" string doesn't pass the validation. Use a valid UUIDv4 string or generate a new one


/**
 * Validate an UUIDv4 instance, an UUIDv4-like object or an UUID v4 string
 */
const importedId = "s4F68hFDf-d3R5-4Rt6-dRgi-dEji85feY51s"
console.log(UUIDv4.validate(importedId))
// Return true if the provided ID respect the UUID v4 standards
// Expected output: true

const importedIdInstance = new UUIDv4()
console.log(UUIDv4.validate(importedIdInstance))
// Return true if the provided object is a valid UUIDv4 instance and the ID respects the UUID v4 standards
// Expected output: true

const importedIdObject = {
    _id: "s4F68hFDf-d3R5-4Rt6-dRgi-dEji85feY51s"
}
console.log(UUIDv4.validate(importedIdObject))
// Return true if the provided object can be cast to a valid UUIDv4 instance and the ID respect the UUID v4 standards
// Expected output: true


/**
 * Set a new custom id
 */
const uuidv4Instance = new UUIDv4()

const validId = "s4F68hFDf-d3R5-4Rt6-dRgi-dEji85feY51s"
const invalidId = "s4F68"

uuidv4Instance.id = validId

console.log(uuidv4Instance.id)
// Return true if the provided ID respect the UUID v4 standards
// Expected output: true

uuidv4Instance.id = invalidId
// Execution stops due to an error
// Expected output: The provided UUIDv4 "s4F68h" string doesn't pass the validation. Use a valid UUIDv4 string or generate a new one


/**
 * Avoid runtime error
 */

// Method 1 - Stop single error
const invalidUUID = "s4F68"
let userUUID

try {
    userUUID = new UUIDv4(invalidUUID)
} catch (error) {
    console.warn(error)
    userUUID = new UUIDv4()
}

// Mehtod 2 - Don't stop execution at runtime - NOT SAFE - This can admit the storage of invalid UUIDs
UUIDv4.stopExecutionAtError = false

const invalidUUID1 = "s4F68"
const userUUID1 = new UUIDv4(invalidUUID)
// Generated warn: The provided UUIDv4 "s4F68h" string doesn't pass the validation. Use a valid UUIDv4 string or generate a new one

console.log(userUUID1.id)
// Return the provided invalid id
// Expected output: "s4F68"