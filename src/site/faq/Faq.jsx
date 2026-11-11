import { FAQ } from './faqData';
import './faq.css';

// Built from the same list the visitor reads, so search engines never see a different answer.
const FAQ_SCHEMA = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: FAQ.map(({ question, answer }) => ({
    '@type': 'Question',
    name: question,
    acceptedAnswer: { '@type': 'Answer', text: answer },
  })),
};

// An open answer takes the next petal colour, so even the questions walk through the bloom.
const OPEN_TONES = [
  { ground: 'var(--blue)', ink: 'var(--paper)' },
  { ground: 'var(--teal)', ink: 'var(--ink)' },
  { ground: 'var(--amber)', ink: 'var(--ink)' },
  { ground: 'var(--coral)', ink: 'var(--ink)' },
];

export default function Faq() {
  return (
    <section id="questions" className="faq" aria-labelledby="faq-title">
      <h2 id="faq-title" className="faq__title">
        Questions, answered
      </h2>

      <div className="faq__list">
        {FAQ.map(({ question, answer }, index) => {
          const tone = OPEN_TONES[index % OPEN_TONES.length];
          return (
            <details
              key={question}
              name="faq"
              className="faq__item"
              open={index === 0}
              data-reveal
              style={{ '--open-ground': tone.ground, '--open-ink': tone.ink, '--reveal-index': index % 4 }}
            >
              <summary>{question}</summary>
              <p>{answer}</p>
            </details>
          );
        })}
      </div>

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(FAQ_SCHEMA) }} />
    </section>
  );
}
