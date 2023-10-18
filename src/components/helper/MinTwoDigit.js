export const minTwoDigit = (value, digits = 2) => {
    return new Intl.NumberFormat('en-IN', {
        maximumSignificantDigits: 2
    }).format(value)
}