import { useState } from 'react';
import { FAQ } from '../../site/faq/faqData';
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

const ORB_ORDER = ['learn', 'prove', 'build', 'placed'];

// One answer open at a time. A button and a height transition instead of <details>, because
// <details> snaps open and shut in most browsers, and the jump is exactly what should not happen here.
function FaqItem({ question, answer, index, open, onToggle }) {
  const panelId = `faq-answer-${index}`;
  return (
    <div className={`faq__item${open ? ' is-open' : ''}`}>
      <h3 className="faq__heading">
        <button type="button" className="faq__button" aria-expanded={open} aria-controls={panelId} onClick={onToggle}>
          <span className={`faq__orb orb orb--${ORB_ORDER[index % ORB_ORDER.length]}`} aria-hidden="true" />
          <span className="faq__question">{question}</span>
          <span className="faq__toggle" aria-hidden="true" />
        </button>
      </h3>
      <div className="faq__panel" id={panelId} inert={!open}>
        <div className="faq__panel-inner">
          <p>{answer}</p>
        </div>
      </div>
    </div>
  );
}

export default function Faq() {
  const [openIndex, setOpenIndex] = useState(0);
  return (
    <section id="questions" className="faq" aria-labelledby="faq-title">
      <div className="section-head faq__head">
        <span className="kicker-orb orb orb--placed" aria-hidden="true" />
        <h2 id="faq-title" data-rise>
          Ask me anything.
        </h2>
        <p>Short, honest answers.</p>
      </div>

      <div className="faq__list">
        {FAQ.map(({ question, answer }, index) => (
          <FaqItem
            key={question}
            question={question}
            answer={answer}
            index={index}
            open={index === openIndex}
            onToggle={() => setOpenIndex(index === openIndex ? -1 : index)}
          />
        ))}
      </div>

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(FAQ_SCHEMA) }} />
    </section>
  );
}
