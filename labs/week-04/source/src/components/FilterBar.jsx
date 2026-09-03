function FilterBar({ statusFilter, onFilterChange }) {
  return (
    <div className="filter-buttons">
      <button
        type="button"
        className={`filter-btn ${statusFilter === 'all' ? 'active' : ''}`}
        onClick={() => onFilterChange('all')}
      >
        ทั้งหมด
      </button>
      <button
        type="button"
        className={`filter-btn ${statusFilter === 'todo' ? 'active' : ''}`}
        onClick={() => onFilterChange('todo')}
      >
        ต้องทำ
      </button>
      <button
        type="button"
        className={`filter-btn ${statusFilter === 'doing' ? 'active' : ''}`}
        onClick={() => onFilterChange('doing')}
      >
        กำลังทำ
      </button>
      <button
        type="button"
        className={`filter-btn ${statusFilter === 'done' ? 'active' : ''}`}
        onClick={() => onFilterChange('done')}
      >
        เสร็จแล้ว
      </button>
    </div>
  );
}

export default FilterBar;