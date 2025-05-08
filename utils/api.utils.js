export function generateApiKey() {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const keyLength = 32;
    let apiKey = '';

    for (let i = 0; i < keyLength; i++) {
        const randomIndex = Math.floor(Math.random() * characters.length);
        apiKey += characters.charAt(randomIndex);
    }

    return apiKey;
}

export function generateExpirationDate(days) {
    const currentDate = new Date();
    const expirationDate = new Date(currentDate.getTime() + days * 24 * 60 * 60 * 1000);
    return expirationDate;
}