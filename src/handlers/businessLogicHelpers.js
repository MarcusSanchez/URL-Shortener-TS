const BASE62 = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
export function generateShortenedUrl() {
    return `localhost:3000/s/${encodeBase62(generateRandomInt())}`;
}
export function generateRandomInt() {
    return Math.floor(Math.random() * 10000) + 1;
}
export function encodeBase62(number) {
    if (number === 0) {
        return BASE62[0];
    }
    let base62 = '';
    while (number > 0) {
        number = Math.floor(number / 62);
        const remainder = number % 62;
        base62 = BASE62[remainder] + base62;
    }
    return base62;
}
//# sourceMappingURL=businessLogicHelpers.js.map