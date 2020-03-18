## UUID-v4
Generate, manage and validate easily Universally Unique Identifiers v4

### Description
This package provides the essential methods to generate and validate [Universally Unique Identifiers](https://en.wikipedia.org/wiki/Universally_unique_identifier#Version_4_(random)) v4, that you can use for naming or identify elements in a list, documents in a databases, variables or whatever you want.

**Is a collision between 2 randomly generated UUIDs possible?**
According to the [Birthday Paradox](https://en.wikipedia.org/wiki/Birthday_problem), the probability of finding a collision between 2 UUID within 103 trillion UUIDs is one in a billion.  The number of random UUIDs which need to be generated in order to have a 50% probability of at least one collision is 2.71 quintillion.

### Supported languages

* Typescript
* Javascript ES5

### Installation

``` 
$npm install @JonathanMataloni/uuid-v4
```

### Usage

| Property                    | Description                                                                                      |
| :-------------------------- | :----------------------------------------------------------------------------------------------- |
| *get* id                    | Return the current UUID of the instance. It's always valid                                       |
| *set* id                    | Set a new custom UUID. It can generate an error if the provided UUID doesn't pass the validation |
| stopExecutionAtError        | NOT SAFE - Generate a warn instead of stopping execution at runtime                              |
| renewId(): void             | Generate a new instance ID that override the old one                                             |
| generate(): string          | Return a valid UUID v4 string                                                                    |
| validate(*string*): boolean | Return true if the provided UUID string passes the validation                                    |
| validate(*Object*): boolean | Return true if the provided Object has a valid UUID and format                                   |
| validate(*UUIDv4*): boolean | Return true if the provided UUIDv4 instance has a valid UUID and format                          |

### Examples


* Create an UUIDv4 instance with a random generated UUID v4

``` js
import UUIDv4 from 'uuid-v4'

const userId = new UUIDv4()

console.log(userId)
// Return a UUIDv4 instance
// Expected output: UUIDv4 { _id: "s4F68hFDf-d3R5-4Rt6-dRgi-dEji85feY51s" }

console.log(userId.id)
// Return UUID as string
// Expected output: "s4F68hFDf-d3R5-4Rt6-dRgi-dEji85feY51s"
```


* Create a UUIDv4 instance with a custom string

``` js
import UUIDv4 from 'uuid-v4'

const userId1 = new UUIDv4("s4F68hFDf-d3R5-4Rt6-dRgi-dEji85feY51s")

console.log(userId)
// Return a UUIDv4 instance
// Expected output: UUIDv4 { _id: "s4F68hFDf-d3R5-4Rt6-dRgi-dEji85feY51s" }

const userId2 = new UUIDv4("s4F68hF")
// Execution stops due to an error
// Expected output: The provided UUIDv4 "s4F68hF" string did't pass the validation. Use a valid UUIDv4 string or generate a new one
```


* Validate an UUIDv4 instance, an UUIDv4-like object or an UUID v4 string

``` js
import UUIDv4 from 'uuid-v4'

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
```


* Set a new custom id

``` js
import UUIDv4 from 'uuid-v4'

const uuidv4Instance = new UUIDv4()

const validId = "s4F68hFDf-d3R5-4Rt6-dRgi-dEji85feY51s"
const invalidId = "s4F68"

uuidv4Instance.id = validId

console.log(uuidv4Instance.id)
// Return true if the provided ID respect the UUID v4 standards
// Expected output: true

uuidv4Instance.id = invalidId
// Execution stops due to an error
// Expected output: The provided UUIDv4 "s4F68h" string did't pass the validation. Use a valid UUIDv4 string or generate a new one
```

#### Links

* [RFC 4122](http://tools.ietf.org/html/rfc4122)
* [DCE 1.1: Authentication and Security Services](http://pubs.opengroup.org/onlinepubs/9696989899/chap5.htm#tagcjh_08_02_01_01)

#### License

UUID-v4 package released under MIT License. See LICENSE for details.

