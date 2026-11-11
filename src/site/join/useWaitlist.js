import { useState } from 'react';

// Same-origin Pages Function, so the URL is correct on every deploy without config.
const WAITLIST_ENDPOINT = '/api/waitlist';
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export const WAITLIST_MESSAGES = {
  idle: '',
  sending: 'Saving your spot…',
  joined: "You're on the list. I'll write once, when I'm ready for you.",
  invalid: "That email doesn't look right. Check it once and try again.",
  offline: "You're offline. Nothing was sent; connect and try again.",
  error: "We couldn't save that just now. Please try again in a minute.",
};

function isOffline() {
  return typeof navigator !== 'undefined' && navigator.onLine === false;
}

export function useWaitlist() {
  const [status, setStatus] = useState('idle');

  async function join(rawEmail) {
    const email = rawEmail.trim();
    if (!EMAIL_PATTERN.test(email)) {
      setStatus('invalid');
      return;
    }
    if (isOffline()) {
      setStatus('offline');
      return;
    }

    setStatus('sending');
    try {
      const response = await fetch(WAITLIST_ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, tier: 'Website waitlist', role: 'student' }),
      });
      setStatus(response.ok ? 'joined' : 'error');
    } catch {
      setStatus(isOffline() ? 'offline' : 'error');
    }
  }

  return { status, message: WAITLIST_MESSAGES[status], join };
}
