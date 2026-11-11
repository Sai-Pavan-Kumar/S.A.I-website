import BloomMark from '../shared/BloomMark';
import { useWaitlist } from './useWaitlist';
import './join.css';

export function WaitlistForm() {
  const { status, message, join } = useWaitlist();
  const isSending = status === 'sending';

  function handleSubmit(event) {
    event.preventDefault();
    join(new FormData(event.currentTarget).get('email') ?? '');
  }

  if (status === 'joined') {
    return (
      <p className="join__done" role="status">
        {message}
      </p>
    );
  }

  return (
    <form className="join__form" onSubmit={handleSubmit} noValidate>
      <label className="visually-hidden" htmlFor="join-email">
        Your email
      </label>
      <input
        id="join-email"
        name="email"
        type="email"
        inputMode="email"
        autoComplete="email"
        placeholder="you@gmail.com"
        aria-invalid={status === 'invalid'}
        aria-describedby="join-message"
        required
      />
      <button className="button" type="submit" disabled={isSending}>
        {isSending ? 'Joining…' : 'Join the waitlist'}
      </button>
      <p id="join-message" className="join__message" role="status" aria-live="polite">
        {message}
      </p>
    </form>
  );
}

export default function Join() {
  return (
    <section id="join" className="join" aria-labelledby="join-title">
      <figure className="join__side join__side--picture" data-reveal>
        <img
          src="/media/handwriting-ai-notes.webp"
          alt="Sai's handwritten board notes: AI, LLM, tokens, agents"
          width="900"
          height="600"
          loading="lazy"
          decoding="async"
        />
      </figure>

      <div className="join__tile" data-reveal style={{ '--reveal-index': 1 }}>
        <BloomMark size={64} title="SAI logo" />
        <h2 id="join-title">Get in when it opens</h2>
        <p className="join__lead">Free to join. We only ask for your email, and we'll write when Sai Anna is ready for you.</p>
        <WaitlistForm />
      </div>

      <div className="join__side join__side--colour" data-reveal style={{ '--reveal-index': 2 }} aria-hidden="true" />
    </section>
  );
}
