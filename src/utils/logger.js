export function logLead(name, email, phone) {
    console.log(`[LEAD] ${new Date().toISOString()} — ${name}, ${email}, ${phone}`);
}
