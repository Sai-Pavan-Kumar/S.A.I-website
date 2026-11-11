// Every result here was run on SQLite 3.50.4 and passed: see videos/01-count-star-vs-count-col/proofs.md.
// If a query or seed row changes, re-run the proofs before shipping the page.
export const ORDERS = [
  { id: 101, name: 'Rahul', tip: '20.0' },
  { id: 102, name: 'Sneha', tip: '50.0' },
  { id: 103, name: 'Kiran', tip: null },
  { id: 104, name: 'Pooja', tip: '0.0' },
  { id: 105, name: 'Ajay', tip: null },
];

const ALL_ROWS = ORDERS.map((order) => order.id);
const ROWS_WITH_TIP = [101, 102, 104];
const ROWS_WITHOUT_TIP = [103, 105];

export const QUERIES = [
  {
    id: 'count-star',
    label: 'COUNT(*)',
    sql: 'SELECT COUNT(*) FROM orders;',
    table: 'orders',
    result: '5',
    marks: { rows: ALL_ROWS, skipped: [], scope: 'row' },
    disc: 'var(--teal)',
    line: 'COUNT(*) counts rows, not values. A row is never skipped just because its tip is missing.',
  },
  {
    id: 'count-column',
    label: 'COUNT(tip_amount)',
    sql: 'SELECT COUNT(tip_amount) FROM orders;',
    table: 'orders',
    result: '3',
    marks: { rows: ROWS_WITH_TIP, skipped: ROWS_WITHOUT_TIP, scope: 'tip' },
    disc: 'var(--amber)',
    line: 'Zero is a real value, so Pooja counts. Kiran and Ajay have no value at all: that is NULL, and COUNT skips it.',
  },
  {
    id: 'count-distinct',
    label: 'COUNT(DISTINCT tip_amount)',
    sql: 'SELECT COUNT(DISTINCT tip_amount) FROM orders;',
    table: 'orders',
    result: '3',
    marks: { rows: ROWS_WITH_TIP, skipped: ROWS_WITHOUT_TIP, scope: 'tip' },
    disc: 'var(--coral)',
    line: 'How many different tips? 20, 50 and 0. That is three. NULL is never counted as a value.',
  },
  {
    id: 'count-one',
    label: 'COUNT(1)',
    sql: 'SELECT COUNT(1) FROM orders;',
    table: 'orders',
    result: '5',
    marks: { rows: ALL_ROWS, skipped: [], scope: 'row' },
    disc: 'var(--teal)',
    line: '1 is never NULL, so COUNT(1) counts every row, exactly like COUNT(*).',
  },
  {
    id: 'empty-sum',
    label: 'SUM(tip_amount)',
    note: 'on an empty table',
    sql: 'SELECT SUM(tip_amount) FROM empty_orders;',
    table: 'empty_orders',
    result: 'NULL',
    marks: { rows: [], skipped: [], scope: 'row' },
    disc: 'var(--night)',
    line: 'On an empty table COUNT gives 0, but SUM gives NULL, not 0. This is the classic interview trap.',
  },
];
