import { useState } from 'react';
import '../Account/Account.css';
import { TopTicker, SiteHeader, SiteFooter, navigate, useToast } from '../Shared/SiteChrome';

const EMPTY = {
  name: '',
  phone: '',
  pincode: '',
  city: '',
  state: '',
  line1: '',
  line2: '',
  landmark: '',
  type: 'home',
  isDefault: false,
};

function AddAddress({ editingAddress = null }) {
  const [form, setForm] = useState(editingAddress || EMPTY);
  const [errors, setErrors] = useState({});
  const [toastNode, showToast] = useToast();

  const setField = (key) => (e) => setForm((cur) => ({ ...cur, [key]: e.target.value }));

  const setPincode = (e) =>
    setForm((cur) => ({ ...cur, pincode: e.target.value.replace(/\D/g, '').slice(0, 6) }));

  const setPhone = (e) =>
    setForm((cur) => ({ ...cur, phone: e.target.value.replace(/\D/g, '').slice(0, 10) }));

  const setType = (value) => () => setForm((cur) => ({ ...cur, type: value }));

  const toggleDefault = (e) => setForm((cur) => ({ ...cur, isDefault: e.target.checked }));

  const validate = () => {
    const next = {};
    if (!form.name.trim()) next.name = 'Full name is required.';
    if (form.phone.length !== 10) next.phone = 'Enter a valid 10-digit number.';
    if (form.pincode.length !== 6) next.pincode = 'Enter a valid 6-digit pincode.';
    if (!form.city.trim()) next.city = 'City is required.';
    if (!form.state.trim()) next.state = 'State is required.';
    if (!form.line1.trim()) next.line1 = 'Address line is required.';
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) {
      showToast('Please fix the highlighted fields.');
      return;
    }
    showToast(editingAddress ? 'Address updated.' : 'Address saved.');
    navigate('/account?tab=addresses');
  };

  return (
    <div className="sx-root ac-root">
      <TopTicker />
      <SiteHeader active="account" onToast={showToast} />

      <div className="sx-wrap">
        <nav className="sx-crumb" aria-label="Breadcrumb">
          <button type="button" onClick={() => navigate('/')}>Home</button>
          <span>/</span>
          <button type="button" onClick={() => navigate('/account?tab=addresses')}>Addresses</button>
          <span>/</span>
          <strong>{editingAddress ? 'Edit address' : 'Add new address'}</strong>
        </nav>

        <div className="ac-panel" style={{ paddingBottom: 'var(--section-y)', maxWidth: 760 }}>
          <div className="ac-panelhead">
            <h1>{editingAddress ? 'Edit address' : 'Add new address'}</h1>
            <p>Fill in the details for accurate, on-time delivery.</p>
          </div>

          <form className="ac-card" onSubmit={handleSubmit} noValidate>
            <div className="ac-card__head">
              <h3>Contact details</h3>
            </div>

            <div className="ac-formgrid">
              <label className="ac-field">
                <span>Full name</span>
                <input className="ac-input" value={form.name} onChange={setField('name')} placeholder="e.g. Priya Sharma" />
                {errors.name && <em className="ac-field__err">{errors.name}</em>}
              </label>

              <label className="ac-field">
                <span>Phone number</span>
                <input className="ac-input" value={form.phone} onChange={setPhone} inputMode="numeric" placeholder="10-digit mobile number" />
                {errors.phone && <em className="ac-field__err">{errors.phone}</em>}
              </label>
            </div>

            <div className="ac-card__head">
              <h3>Address</h3>
            </div>

            <div className="ac-formgrid">
              <label className="ac-field ac-formgrid__full">
                <span>Address line 1</span>
                <input className="ac-input" value={form.line1} onChange={setField('line1')} placeholder="House no., building, street" />
                {errors.line1 && <em className="ac-field__err">{errors.line1}</em>}
              </label>

              <label className="ac-field ac-formgrid__full">
                <span>Address line 2 (optional)</span>
                <input className="ac-input" value={form.line2} onChange={setField('line2')} placeholder="Area, colony" />
              </label>

              <label className="ac-field">
                <span>Landmark (optional)</span>
                <input className="ac-input" value={form.landmark} onChange={setField('landmark')} placeholder="Near..." />
              </label>

              <label className="ac-field">
                <span>Pincode</span>
                <input className="ac-input" value={form.pincode} onChange={setPincode} inputMode="numeric" placeholder="6-digit pincode" />
                {errors.pincode && <em className="ac-field__err">{errors.pincode}</em>}
              </label>

              <label className="ac-field">
                <span>City</span>
                <input className="ac-input" value={form.city} onChange={setField('city')} placeholder="City" />
                {errors.city && <em className="ac-field__err">{errors.city}</em>}
              </label>

              <label className="ac-field">
                <span>State</span>
                <input className="ac-input" value={form.state} onChange={setField('state')} placeholder="State" />
                {errors.state && <em className="ac-field__err">{errors.state}</em>}
              </label>
            </div>

            <div className="ac-card__head">
              <h3>Address type</h3>
            </div>

            <div className="ac-radios">
              <label className="ac-radio">
                <input type="radio" name="type" checked={form.type === 'home'} onChange={setType('home')} />
                <span>Home</span>
              </label>
              <label className="ac-radio">
                <input type="radio" name="type" checked={form.type === 'work'} onChange={setType('work')} />
                <span>Work</span>
              </label>
              <label className="ac-radio">
                <input type="radio" name="type" checked={form.type === 'other'} onChange={setType('other')} />
                <span>Other</span>
              </label>
            </div>

            <div className="ac-row">
              <div>
                <h3>Set as default address</h3>
                <p>Use this address automatically at checkout.</p>
              </div>
              <label className="ac-switch">
                <input type="checkbox" checked={form.isDefault} onChange={toggleDefault} aria-label="Set as default address" />
                <span />
              </label>
            </div>

            <div className="ac-actions">
              <button type="submit" className="sx-btn sx-btn--signal">
                {editingAddress ? 'Save changes' : 'Save address'}
              </button>
              <button type="button" className="sx-btn sx-btn--ghost" onClick={() => navigate('/account?tab=addresses')}>
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>

      {toastNode}
      <SiteFooter onToast={showToast} />
    </div>
  );
}

export default AddAddress;