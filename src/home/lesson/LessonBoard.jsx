import { ORDERS } from '../../site/lesson/lessonData';
import HandMark from './HandMark';

const MARK_STAGGER_MS = 120;
const COLUMNS = ['order_id', 'customer_name', 'tip_amount'];

// Counted values get a loop, skipped ones a strike, in the order a pen would reach them.
function markFor(query, orderId, column) {
  const { rows, skipped, scope } = query.marks;
  const isTarget = scope === 'row' ? column === 'customer_name' : column === 'tip_amount';
  if (!isTarget) return null;
  const position = rows.indexOf(orderId);
  if (position >= 0) return <HandMark kind="loop" delay={position * MARK_STAGGER_MS} />;
  const skippedAt = skipped.indexOf(orderId);
  if (skippedAt >= 0) return <HandMark kind="strike" delay={(rows.length + skippedAt) * MARK_STAGGER_MS} />;
  return null;
}

function valueOf(order, column) {
  if (column === 'order_id') return order.id;
  if (column === 'customer_name') return order.name;
  return order.tip ?? 'NULL';
}

export default function LessonBoard({ query, marked }) {
  const rows = query.table === 'orders' ? ORDERS : [];
  return (
    <figure className="lesson-board hand" key={query.id}>
      <figcaption className="lesson-board__name">{query.table}</figcaption>
      <table className="lesson-board__table">
        <thead>
          <tr>
            {COLUMNS.map((column) => (
              <th key={column} scope="col">
                {column}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((order) => (
            <tr key={order.id}>
              {COLUMNS.map((column) => (
                <td key={column} className={column === 'tip_amount' && order.tip === null ? 'is-null' : undefined}>
                  <span className="lesson-board__cell">
                    {valueOf(order, column)}
                    {marked && markFor(query, order.id, column)}
                  </span>
                </td>
              ))}
            </tr>
          ))}
          {rows.length === 0 && (
            <tr>
              <td colSpan={COLUMNS.length} className="lesson-board__empty">
                no rows at all
              </td>
            </tr>
          )}
        </tbody>
      </table>
      <p className="lesson-board__query">
        <span>{query.sql}</span>
        <strong>= {query.result}</strong>
      </p>
    </figure>
  );
}
