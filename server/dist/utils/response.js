export function sendSuccess(res, data, message, status = 200) {
    res.status(status).json({ success: true, data, ...(message ? { message } : {}) });
}
export function sendError(res, message, status = 400) {
    res.status(status).json({ success: false, message });
}
export function parseJsonField(value, fallback) {
    if (value == null)
        return fallback;
    if (typeof value === 'object')
        return value;
    try {
        return JSON.parse(String(value));
    }
    catch {
        return fallback;
    }
}
