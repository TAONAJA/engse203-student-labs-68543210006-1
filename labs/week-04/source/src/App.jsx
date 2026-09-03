import { useState } from 'react';
import { initialTasks } from './data/initialTasks.js';
import AppHeader from './components/AppHeader.jsx';
import SummaryPanel from './components/SummaryPanel.jsx';
import FilterBar from './components/FilterBar.jsx';
import TaskForm from './components/TaskForm.jsx';
import TaskList from './components/TaskList.jsx';

function App() {
  const [tasks, setTasks] = useState(initialTasks);
  const [statusFilter, setStatusFilter] = useState('all');

  // ฟังก์ชันหา status อัตโนมัติจากประเภทที่เลือก
  function getStatusByCategory(category) {
    if (category === 'coding') return 'doing';   // เขียนโค้ด -> กำลังทำ
    if (category === 'review') return 'todo';    // ตรวจสอบและอธิบาย -> ต้องทำ
    if (category === 'reading') return 'done';   // อ่าน/ทบทวน -> เสร็จแล้ว
    return 'todo'; // ค่าเริ่มต้นกรณีอื่นๆ
  }

  function handleAddTask(taskData) {
    const newTask = {
      id: `TASK-${Date.now()}`,
      ...taskData,
      status: getStatusByCategory(taskData.category), // 👈 กำหนด status ตามประเภท
    };
    setTasks((current) => [newTask, ...current]);
  }

  function handleDeleteTask(taskId) {
    setTasks((current) => current.filter((t) => t.id !== taskId));
  }

  const filteredTasks =
    statusFilter === 'all'
      ? tasks
      : tasks.filter((t) => t.status === statusFilter);

  return (
    <>
      <AppHeader />
      <main className="container page-content">
        <SummaryPanel tasks={tasks} />

        <div className="main-grid">
          <TaskForm onAddTask={handleAddTask} />

          <div className="panel tasks-panel">
            <div className="tasks-header">
              <div>
                <p className="eyebrow-small">TASKS</p>
                <h2>รายการฝึกของฉัน</h2>
              </div>
              <FilterBar
                statusFilter={statusFilter}
                onFilterChange={setStatusFilter}
              />
            </div>
            <TaskList tasks={filteredTasks} onDeleteTask={handleDeleteTask} />
          </div>
        </div>
      </main>
    </>
  );
}

export default App;