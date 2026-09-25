import { useState } from 'react';
import { StaticPage, useToast, navigate } from '../Shared/StaticPage';
import { Ico } from '../Shared/SiteChrome';

const METHODS = [
  { icon: 'mail', title: 'Email us', text: 'For order queries, warranty claims or general questions.', link: 'support@amihive.com' },
  { icon: 'phone', title: 'Call us', text: 'Mon–Sat, 10am–7pm IST.', link: '+91 00000 00000' },
  { icon: 'chat', title: 'Live chat', text: 'Chat with our concierge team for fastest response.', link: 'Start a chat' },
  { icon: 'pin', title: 'Visit the atelier', text: 'By appointment only — write to us to book a slot.', link: 'Get directions' },
];

function ContactUs() {
  const [toastNode, showToast] = useToast();
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });
  const [errors, setErrors] = useState({});
  const [sent, setSent] = useState(false);

  const set = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }));

  const submit = (e) => {
    e.preventDefault();
    const next = {};
    if (!form.name.trim()) next.name = 'Enter your name.';
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) next.email = 'Enter a valid email address.';
    if (!form.subject.trim()) next.subject = 'Enter a subject.';
    if (form.message.trim().length < 10) next.message = 'Message should be at least 10 characters.';

    setErrors(next);
    if (Object.keys(next).length) return;

    setSent(true);
    setForm({ name: '', email: '', subject: '', message: '' });
    showToast('Your message has been sent — we will reply within 24 hours.');
  };

  return (
    <StaticPage active="contact" title="Contact Us" subtitle="We usually reply within one business day.">
      <div className="sp-grid">
        {METHODS.map((m) => (
          <div className="sp-card" key={m.title}>
            <span className="sp-card__icon">
              <Ico name={m.icon} size={20} />
            </span>
            <strong>{m.title}</strong>
            <p>{m.text}</p>
            <span className="sp-card__link">{m.link}</span>
          </div>
        ))}
      </div>

      <form className="sp-form" onSubmit={submit}>
        <div className="sp-formgrid">
          <label className="sp-field">
            <span>Full name</span>
            <input value={form.name} onChange={set('name')} />
            {errors.name && <em style={{ color: 'var(--danger)', fontSize: 12.5 }}>{errors.name}</em>}
          </label>

          <label className="sp-field">
            <span>Email address</span>
            <input type="email" value={form.email} onChange={set('email')} />
            {errors.email && <em style={{ color: 'var(--danger)', fontSize: 12.5 }}>{errors.email}</em>}
          </label>
        </div>

        <label className="sp-field">
          <span>Subject</span>
          <input value={form.subject} onChange={set('subject')} />
          {errors.subject && <em style={{ color: 'var(--danger)', fontSize: 12.5 }}>{errors.subject}</em>}
        </label>

        <label className="sp-field">
          <span>Message</span>
          <textarea value={form.message} onChange={set('message')} />
          {errors.message && <em style={{ color: 'var(--danger)', fontSize: 12.5 }}>{errors.message}</em>}
        </label>

        <button type="submit" className="sx-btn sx-btn--signal">
          Send message
        </button>

        {sent && <p style={{ color: 'var(--ok)', fontSize: 13.5, fontWeight: 600 }}>Message sent successfully.</p>}
      </form>

      <p style={{ fontSize: 13, color: 'var(--muted)' }}>
        Looking for order help instead?{' '}
        <button type="button" onClick={() => navigate('/help')} style={{ color: 'var(--signal-dark)', fontWeight: 700 }}>
          Visit Help &amp; FAQ
        </button>
      </p>

      {toastNode}
    </StaticPage>
  );
}

export default ContactUs;