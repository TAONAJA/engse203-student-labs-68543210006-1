import React from 'react';

const items = [
  ['total', 'ทั้งหมด'],
  ['pending', 'รอดำเนินการ'],
  ['in-progress', 'กำลังดำเนินการ'], // ✅ แก้ไข Key ให้ตรงกับข้อมูลจริง
  ['completed', 'เสร็จสิ้น'],
];

function SummaryPanel({ summary }) {
  return (
    <section className="summary-grid" aria-label="สรุปคำร้อง">
      {items.map(([key, label]) => (
        <article key={key} className="summary-card"> {/* ✅ ใส่ key prop เพื่อแก้ Warning */}
          <span>{label}</span>
          <strong>{summary[key] ?? 0}</strong>
        </article>
      ))}
    </section>
  );
}

export default SummaryPanel;