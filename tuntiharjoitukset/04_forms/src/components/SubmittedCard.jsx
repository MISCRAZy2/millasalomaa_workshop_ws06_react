// SubmittedCard — shown after the form is successfully "posted".
// Displays a read-only summary of what was submitted and a Reset button.

function Row({ label, value }) {
  return (
    <div className="summary-row">
      <span className="summary-label">{label}</span>
      <span className="summary-value">{value}</span>
    </div>
  )
}

function SubmittedCard({ data, onReset }) {
  return (
    <div className="submitted-card card">
      <p className="submitted-icon" aria-hidden="true">✓</p>
      <h2>Message sent!</h2>
      <p className="submitted-sub">Here's what we received:</p>

      <div className="summary">
        <Row label="Name" value={data.name} />
        <Row label="Email" value={data.email} />
        <Row label="Topic" value={data.topic} />
        <Row label="Message" value={data.message} />
        <Row label="Newsletter" value={data.subscribe ? 'Yes' : 'No'} />
      </div>

      <button className="btn-reset" onClick={onReset}>
        Send another message
      </button>
    </div>
  )
}

export default SubmittedCard
