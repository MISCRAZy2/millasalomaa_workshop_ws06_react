# 04 – Forms

A focused demo of HTML form handling in React using only built-in hooks — no form library required.

## What this covers

| # | Concept | Where |
|---|---------|-------|
| 1 | **Controlled inputs** — React state as the single source of truth | All inputs in `ContactForm.jsx` |
| 2 | **Single `onChange` handler** — computed property `[name]` updates any field | `handleChange` in `App.jsx` |
| 3 | **Multiple input types** — `text`, `email`, `select`, `textarea`, `checkbox` | `ContactForm.jsx` |
| 4 | **Inline validation** — errors on submit, cleared per-field as user types | `validate()` + `handleChange` in `App.jsx` |
| 5 | **Submission lifecycle** — `idle → submitting → success` state machine | `status` state in `App.jsx` |
| 6 | **Disabled state during submit** — prevents double-clicks | `disabled={isSubmitting}` on all inputs |
| 7 | **Success view + reset** — swap form for summary card, restore blank form | `SubmittedCard.jsx` + `handleReset` |

## Key patterns

### Controlled input
Every input's value is driven by React state. The DOM never holds its own value.

```jsx
<input
  name="email"
  type="email"
  value={fields.email}   // ← React controls the value
  onChange={onChange}    // ← React updates state on every keystroke
/>
```

### Single change handler
One function handles all fields using `e.target.name` as a dynamic key.

```jsx
function handleChange(e) {
  const { name, value, type, checked } = e.target
  setFields((prev) => ({
    ...prev,
    [name]: type === 'checkbox' ? checked : value,
  }))
}
```

### Validation on submit, clear on change
Errors are computed only when the user attempts to submit. Each field's error is removed as soon as the user starts typing a correction — no premature red borders while typing.

```jsx
function handleSubmit(e) {
  e.preventDefault()
  const errors = validate(fields)
  if (Object.keys(errors).length > 0) {
    setErrors(errors)   // show errors, stop here
    return
  }
  // proceed with submission ...
}
```

### Submission lifecycle
Three states model the full lifecycle without a library:

```
'idle'  →  user clicks Submit
'submitting'  →  async POST in flight (form disabled)
'success'  →  swap to SubmittedCard
```

## Project structure

```
src/
  App.jsx                  # state, validation, and submission logic
  components/
    ContactForm.jsx        # presentational form — props in, events up
    SubmittedCard.jsx      # success summary with reset button
  App.css                  # component styles
  index.css                # global reset and CSS variables
```

## Running

```bash
npm install
npm run dev
```
