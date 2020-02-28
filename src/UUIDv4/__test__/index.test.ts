import '../';
import { UUIDv4 } from '../';

const validationRegex = /^[A-Za-z0-9]{8}-[A-Za-z0-9]{4}-4[A-Za-z0-9]{3}-[A-Za-z0-9]{4}-[A-Za-z0-9]{12}$/;

const consoleWarn = jest.fn();
Object.defineProperty(console, 'warn', {
    get() {
        return consoleWarn;
    },
});

describe('Funcionality', () => {
    it('generates valid uuid v4', () => {
        const uuid = new UUIDv4();
        expect(validationRegex.test(uuid.id)).toBeTruthy();
    });

    it('validates user ids', () => {
        expect(() => new UUIDv4('12345')).toThrowError();
    });

    // This test COULD not pass. Consider it as not passed if doesn't pass 2 times consecutively
    // It takes some time so call it when necessary
    it.skip('generates non-collisioning random ids for at least for 1 million instances', () => {
        expect(() => {
            const uuids = [];
            for (let i = 0; i < 1000000; i++) {
                const uuid = UUIDv4.generate();
                if (uuids.includes(uuid)) throw new Error();
                uuids.push(uuid);
            }
        }).not.toThrowError();
    });
});

describe('Dev flow', () => {
    it('throws non-blocking errors on request', () => {
        UUIDv4.blockingError = false;
        expect(() => new UUIDv4('12345')).not.toThrowError();
        expect(consoleWarn).toBeCalledTimes(1);
        UUIDv4.blockingError = true;
    });

    it("doesn't give direct access to private methods & properties", () => {
        const uuid = new UUIDv4();
        expect(() => uuid._id()).toThrowError();
        expect(() => uuid._uuidPattern()).toThrowError();
        expect(() => uuid._validationRegex()).toThrowError();
        expect(() => uuid._throwInvalidIdError('opp')).toThrowError();
    });

    it('give access to protected methods & properties to children classes', () => {
        class Child extends UUIDv4 {
            get validationRegex() {
                return this._validationRegex;
            }
            get uuidPattern() {
                return this._validationRegex;
            }
        }

        const uuid = new Child();
        expect(uuid.validationRegex).toBeTruthy();
        expect(uuid.uuidPattern).toBeTruthy();
    });
});
