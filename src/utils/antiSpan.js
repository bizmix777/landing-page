export function isSpam(formData, clientIP, rateLimiter) {
    // Honeypot
    if (formData.get('website')?.trim() !== '') return true;

    // Rate limit básico por IP
    const now = Date.now();
    const last = rateLimiter.get(clientIP) || 0;

    if (now - last < 5000) return true;

    rateLimiter.set(clientIP, now);
    return false;
}
