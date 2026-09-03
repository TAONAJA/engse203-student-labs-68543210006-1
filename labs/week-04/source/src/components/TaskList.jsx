import TaskCard from './TaskCard.jsx';

function TaskList({ tasks, onDeleteTask }) {
  // Early Return: แสดง Empty State เมื่อไม่มีรายการ
  if (!tasks || tasks.length === 0) {
    return (
      <div className="panel empty-state" role="status">
        <h3>ยังไม่มีรายการในสถานะนี้</h3>
        <p>ลองเปลี่ยนตัวกรองหรือเพิ่มงานใหม่</p>
      </div>
    );
  }

  return (
    <div className="task-grid">
      {tasks.map((task) => (
        <TaskCard
          key={task.id}
          task={task}
          onDeleteTask={onDeleteTask}
        />
      ))}
    </div>
  );
}

export default TaskList;