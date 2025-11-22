export function isSpam(formData, clientIP, rateLimiter) {
    if (formData.get('website')?.trim() !== '') return true;

    const now = Date.now();
    const last = rateLimiter.get(clientIP) || 0;

    if (now - last < 5000) return true;

    rateLimiter.set(clientIP, now);
    return false;
}
