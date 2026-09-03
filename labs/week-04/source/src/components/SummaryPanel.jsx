function SummaryPanel({ tasks }) {
  const total = tasks.length;
  const todo = tasks.filter((t) => t.status === 'todo').length;
  const doing = tasks.filter((t) => t.status === 'doing').length;
  const done = tasks.filter((t) => t.status === 'done').length;

  return (
    <div className="summary-grid">
      <div className="summary-card">
        <span>ทั้งหมด</span>
        <strong>{total}</strong>
      </div>
      <div className="summary-card">
        <span>ต้องทำ</span>
        <strong>{todo}</strong>
      </div>
      <div className="summary-card">
        <span>กำลังทำ</span>
        <strong>{doing}</strong>
      </div>
      <div className="summary-card">
        <span>เสร็จแล้ว</span>
        <strong>{done}</strong>
      </div>
    </div>
  );
}

export default SummaryPanel;