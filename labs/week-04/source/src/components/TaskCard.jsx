function TaskCard({ task, onDeleteTask }) {
  // แปลงชื่อสถานะเป็นภาษาไทย
  const statusMap = {
    todo: 'ต้องทำ',
    doing: 'กำลังทำ',
    done: 'เสร็จแล้ว',
  };

  // แปลงชื่อประเภทเป็นภาษาไทย
  const categoryMap = {
    reading: 'อ่าน/ทบทวน',
    coding: 'เขียนโค้ด',
    review: 'ตรวจและอธิบาย',
  };

  return (
    <article className="task-card">
      <div className="task-card-main">
        <div className="badges">
          <span className={`badge badge-${task.status}`}>
            {statusMap[task.status] || task.status}
          </span>
          {task.priority === 'high' && (
            <span className="badge badge-priority">สำคัญ</span>
          )}
        </div>
        <h3>{task.title}</h3>
        <p className="task-subtext">
          {categoryMap[task.category] || task.category}
        </p>
      </div>

      <button
        type="button"
        className="btn btn-danger"
        onClick={() => onDeleteTask(task.id)}
      >
        ลบ
      </button>
    </article>
  );
}

export default TaskCard;