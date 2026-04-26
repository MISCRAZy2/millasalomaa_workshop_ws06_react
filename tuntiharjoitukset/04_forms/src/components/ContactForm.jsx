// ContactForm — fully controlled form component.
//
// Props:
//   fields      – current values for all inputs
//   errors      – validation error strings keyed by field name
//   isSubmitting – disables the form while the fake POST is in flight
//   onChange    – single handler wired to every input's onChange
//   onSubmit    – called when the user clicks Submit

const TOPICS = [
  { value: '', label: '— choose a topic —' },
  { value: 'general', label: 'General enquiry' },
  { value: 'feedback', label: 'Feedback' },
  { value: 'support', label: 'Technical support' },
  { value: 'other', label: 'Other' },
]

function FieldError({ message }) {
  if (!message) return null
  return <span className="field-error" role="alert">{message}</span>
}

function ContactForm({ fields, errors, isSubmitting, onChange, onSubmit }) {
  return (
    <form className="contact-form card" onSubmit={onSubmit} noValidate>
      <p className="section-title">Contact form</p>

      {/* ── Text input ──────────────────────────────────────────────────── */}
      <div className={`field-group${errors.name ? ' field-group--error' : ''}`}>
        <label htmlFor="name">Full name</label>
        <input
          id="name"
          name="name"
          type="text"
          autoComplete="name"
          placeholder="Ada Lovelace"
          value={fields.name}
          onChange={onChange}
          disabled={isSubmitting}
          aria-describedby={errors.name ? 'name-error' : undefined}
        />
        <FieldError message={errors.name} />
      </div>

      {/* ── Email input ─────────────────────────────────────────────────── */}
      <div className={`field-group${errors.email ? ' field-group--error' : ''}`}>
        <label htmlFor="email">Email address</label>
        <input
          id="email"
          name="email"
          type="email"
          autoComplete="email"
          placeholder="ada@example.com"
          value={fields.email}
          onChange={onChange}
          disabled={isSubmitting}
          aria-describedby={errors.email ? 'email-error' : undefined}
        />
        <FieldError message={errors.email} />
      </div>

      {/* ── Select ──────────────────────────────────────────────────────── */}
      <div className={`field-group${errors.topic ? ' field-group--error' : ''}`}>
        <label htmlFor="topic">Topic</label>
        <select
          id="topic"
          name="topic"
          value={fields.topic}
          onChange={onChange}
          disabled={isSubmitting}
          aria-describedby={errors.topic ? 'topic-error' : undefined}
        >
          {TOPICS.map((opt) => (
            <option key={opt.value} value={opt.value} disabled={opt.value === ''}>
              {opt.label}
            </option>
          ))}
        </select>
        <FieldError message={errors.topic} />
      </div>

      {/* ── Textarea ────────────────────────────────────────────────────── */}
      <div className={`field-group${errors.message ? ' field-group--error' : ''}`}>
        <label htmlFor="message">
          Message
          <span className="char-count">{fields.message.length} chars</span>
        </label>
        <textarea
          id="message"
          name="message"
          rows={5}
          placeholder="Write your message here…"
          value={fields.message}
          onChange={onChange}
          disabled={isSubmitting}
          aria-describedby={errors.message ? 'message-error' : undefined}
        />
        <FieldError message={errors.message} />
      </div>

      {/* ── Checkbox ────────────────────────────────────────────────────── */}
      <div className="field-group field-group--inline">
        <input
          id="subscribe"
          name="subscribe"
          type="checkbox"
          checked={fields.subscribe}
          onChange={onChange}
          disabled={isSubmitting}
        />
        <label htmlFor="subscribe">Subscribe to the newsletter</label>
      </div>

      {/* ── Submit ──────────────────────────────────────────────────────── */}
      <button type="submit" className="btn-submit" disabled={isSubmitting}>
        {isSubmitting ? 'Sending…' : 'Send message'}
      </button>
    </form>
  )
}

export default ContactForm
