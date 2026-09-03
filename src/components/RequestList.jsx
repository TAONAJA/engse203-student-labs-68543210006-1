import RequestCard from './RequestCard.jsx';

function RequestCard({ request, onDeleteRequest, onAcknowledge }) {
  return (
    <div className="request-card">
      <div className="card-header">
        <h3>{request.title}</h3>
        <span className={`status-badge ${request.status}`}>{request.status}</span>
      </div>
      
      <p>{request.description}</p>
      
      <div className="card-actions">
        {/* 🟢 B3.1: แสดงปุ่มรับเรื่องเฉพาะสถานะ pending */}
        {request.status === 'pending' && (
          <button
            type="button"
            className="button secondary"
            onClick={() => onAcknowledge?.(request.id)}
          >
            รับเรื่อง
          </button>
        )}

        <button
          type="button"
          className="button danger"
          onClick={() => onDeleteRequest(request.id)}
        >
          ลบ
        </button>
      </div>
    </div>
  );
}

export default RequestCard;
