const { convertToMoney, isValidAlphaNumeric, isValidNumber } = require('../app/helperFunctions')


describe('Testing convertToMoney function', () => {
    test('Test converting postive number in string format', () => {
        expect(convertToMoney('1')).toBe('€ 1,-')
    })

    test('Test converting negative number in string format', () => {
        expect(convertToMoney('-1')).toBe('€ -1,-')
    })
    test('Test converting invalid input in String format', () => {
        expect(convertToMoney('a')).toBe('€ NaN,-')
    })

    test('Test converting postive number in Number format', () => {
        expect(convertToMoney(1)).toBe('€ 1,-')
    })
    test('Test converting negative number in Number format', () => {
        expect(convertToMoney(-1)).toBe('€ -1,-')
    })

    test('Test converting postive number in float format', () => {
        expect(convertToMoney(1.1)).toBe('€ 1.1,-')
    })
    test('Test converting negative number in float format', () => {
        expect(convertToMoney(-1.1)).toBe('€ -1.1,-')
    })
})

describe('Testing isValidAlphaNumeric function', () => {
    test('Test valid AlphaNumeric small letters', async () => {
        expect(isValidAlphaNumeric('aaabbcasddas')).toBe(true)
    })
    test('Test valid AlphaNumeric Captial letters', async () => {
        expect(isValidAlphaNumeric('AVCSSFASS')).toBe(true)
    })
    test('Test valid AlphaNumeric Captial & Small letters', async () => {
        expect(isValidAlphaNumeric('aAbBcCdDzZxXyY')).toBe(true)
    })

    test('Test valid AlphaNumeric Captial & Small letters & dashes', async () => {
        expect(isValidAlphaNumeric('aA-bBc-Cd-Dz-Z-x-X-y-Y')).toBe(true)
    })

    test('Test invalid AlphaNumeric Captial & Small letters & dollar sign', async () => {
        expect(isValidAlphaNumeric('aA-bBc-Cd-Dz-Z-x-X-y-Y$')).toBe(false)
    })

    test('Test invalid AlphaNumeric (empty string)', async () => {
        expect(isValidAlphaNumeric('')).toBe(false)
    })
    test('Test invalid AlphaNumeric underscore', async () => {
        expect(isValidAlphaNumeric('_')).toBe(false)
    })
    test('Test invalid AlphaNumeric dot', async () => {
        expect(isValidAlphaNumeric('.')).toBe(false)
    })
})

describe('Testing isValidNumber function', () => {
    let multipliers = [1, -1, 0, 1000000, -1000000, 1.2]

    for (let i = 0; i < multipliers.length; i++) {
        test('Test valid Numbers in String format', async () => {
            expect(isValidNumber(String(1 * multipliers[i]))).toBe(true)
        })
    }

    for (let i = 0; i < multipliers.length; i++) {
        test('Test valid Numbers in Number format', async () => {
            expect(isValidNumber(1 * multipliers[i])).toBe(true)
        })
    }

    for (let i = 0; i < multipliers.length; i++) {
        test('Test valid Numbers in float format', async () => {
            expect(isValidNumber(1.1 * multipliers[i])).toBe(true)
        })
    }
    test('Test invalid small letter', async () => {
        expect(isValidNumber('a')).toBe(false)
    })
    test('Test invalid capital letter', async () => {
        expect(isValidNumber('A')).toBe(false)
    })

    test('Test invalid $ symbol', async () => {
        expect(isValidNumber('$')).toBe(false)
    })

    test('Test invalid _ symbol', async () => {
        expect(isValidNumber('_')).toBe(false)
    })

})