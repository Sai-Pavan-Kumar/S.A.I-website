import { ORDERS } from './lessonData';
import RoughMark from './RoughMark';

const MARK_STAGGER_MS = 110;

function markFor(query, orderId, column) {
  const { rows, skipped, scope } = query.marks;
  const isTarget = scope === 'row' ? column === 'name' : column === 'tip';
  if (!isTarget) return null;
  const position = rows.indexOf(orderId);
  if (position >= 0) return <RoughMark kind="loop" delay={position * MARK_STAGGER_MS} />;
  if (skipped.includes(orderId)) return <RoughMark kind="strike" delay={(rows.length + skipped.indexOf(orderId)) * MARK_STAGGER_MS} />;
  return null;
}

function Cell({ query, order, column, children }) {
  return (
    <td className={column === 'tip' && order.tip === null ? 'is-null' : undefined}>
      <span className="board__cell">
        {children}
        {markFor(query, order.id, column)}
      </span>
    </td>
  );
}

export default function OrdersBoard({ query }) {
  const rows = query.table === 'orders' ? ORDERS : [];
  return (
    <figure className="board" key={query.id}>
      <figcaption className="board__table-name">{query.table}</figcaption>
      <table className="board__table">
        <thead>
          <tr>
            <th scope="col">
              <code>order_id</code>
            </th>
            <th scope="col">
              <code>customer_name</code>
            </th>
            <th scope="col">
              <code>tip_amount</code>
            </th>
          </tr>
        </thead>
        <tbody>
          {rows.map((order) => (
            <tr key={order.id}>
              <Cell query={query} order={order} column="id">{order.id}</Cell>
              <Cell query={query} order={order} column="name">{order.name}</Cell>
              <Cell query={query} order={order} column="tip">{order.tip ?? 'NULL'}</Cell>
            </tr>
          ))}
          {rows.length === 0 && (
            <tr>
              <td colSpan="3" className="board__empty">0 rows</td>
            </tr>
          )}
        </tbody>
      </table>
      <p className="board__result">
        <code>{query.sql}</code>
        <strong>= {query.result}</strong>
      </p>
    </figure>
  );
}
