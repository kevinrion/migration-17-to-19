export function StatusMessage({ message = '' }) {
  return (
    <div className="status-message" role="status">
      {message}
    </div>
  );
}