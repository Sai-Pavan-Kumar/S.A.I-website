// The four circles of the mark are the four stages every topic moves through. SQL comes first,
// so every small proof on this section uses the same orders table as the lesson below it.
export const STEPS = [
  {
    key: 'learn',
    number: '01',
    name: 'Learn',
    title: 'First, I explain it simply.',
    body: 'With a real-life example and a drawing, step by step, until it makes sense.',
  },
  {
    key: 'prove',
    number: '02',
    name: 'Prove',
    title: 'Then you practise.',
    body: 'You try the tricky cases yourself. Your code runs for real, so you see right away if it works.',
  },
  {
    key: 'build',
    number: '03',
    name: 'Build',
    title: 'Then you build something real.',
    body: 'Small projects you can finish and show.',
  },
  {
    key: 'placed',
    number: '04',
    name: 'Get placed',
    title: 'Then you get ready for interviews.',
    body: 'Real interview questions, common mistakes, and a little practice every day.',
  },
];

// Checked on SQLite: COUNT(col) on an empty table is 0, on all-NULL values is 0, a 0 is counted,
// and repeats are counted unless DISTINCT is used.
export const EDGE_CASES = ['The table is empty', 'Every tip is NULL', 'A tip of 0', 'The same tip twice'];

export const SCALE = { from: 5, to: 1_000_000 };

export const RHYTHM_DAYS = 28;

export const formatCount = (value) => value.toLocaleString('en-US');
