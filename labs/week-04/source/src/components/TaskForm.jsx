import { useState } from 'react';

const initialForm = { title: '', category: '', priority: 'normal' };

function TaskForm({ onAddTask }) {
  const [formData, setFormData] = useState(initialForm);

  function handleChange(e) {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (!formData.title || formData.title.trim().length < 3) return;
    if (!formData.category) return;

    onAddTask(formData);
    setFormData(initialForm);
  }

  return (
    <div className="panel task-form-panel">
      <p className="eyebrow-small">CONTROLLED FORM</p>
      <h2>เพิ่มงานฝึก</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="title">ชื่องาน</label>
          <input
            id="title"
            name="title"
            type="text"
            className="form-control"
            value={formData.title}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label htmlFor="category">ประเภท</label>
          <select
            id="category"
            name="category"
            className="form-control"
            value={formData.category}
            onChange={handleChange}
          >
            <option value="">-- เลือกประเภท --</option>
            <option value="reading">อ่าน/ทบทวน</option>
            <option value="coding">เขียนโค้ด</option>
            <option value="review">ตรวจและอธิบาย</option>
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="priority">ความสำคัญ</label>
          <select
            id="priority"
            name="priority"
            className="form-control"
            value={formData.priority}
            onChange={handleChange}
          >
            <option value="low">ต่ำ</option>
            <option value="normal">ปกติ</option>
            <option value="high">สำคัญ</option>
          </select>
        </div>

        <button type="submit" className="btn btn-primary">
          เพิ่มงาน
        </button>
      </form>
    </div>
  );
}

export default TaskForm;