import { useWaitlist } from '../../site/join/useWaitlist';

export default function WaitlistForm() {
  const { status, message, join } = useWaitlist();
  const isSending = status === 'sending';

  function handleSubmit(event) {
    event.preventDefault();
    join(new FormData(event.currentTarget).get('email') ?? '');
  }

  if (status === 'joined') {
    return (
      <p className="signup__done" role="status">
        {message}
      </p>
    );
  }

  return (
    <form className="signup__form" onSubmit={handleSubmit} noValidate>
      <label className="visually-hidden" htmlFor="signup-email">
        Your email
      </label>
      <input
        id="signup-email"
        name="email"
        type="email"
        inputMode="email"
        autoComplete="email"
        placeholder="you@example.com"
        aria-invalid={status === 'invalid'}
        aria-describedby="signup-message"
        required
      />
      <button className="button" type="submit" disabled={isSending}>
        {isSending ? 'Joining…' : 'Join the waitlist'}
      </button>
      <p id="signup-message" className="signup__message" role="status" aria-live="polite">
        {message}
      </p>
    </form>
  );
}
