import { useState } from 'react';
import AuthShell, {
  TextField,
  PasswordField,
  isEmail,
  isMobile,
  strengthOf,
  STRENGTH_LABEL,
  getNext,
  withNext,
} from './AuthShell';
import { navigate, loginUser } from '../Shared/SiteChrome';

const EMPTY = { first: '', last: '', email: '', mobile: '', password: '', confirm: '', agree: false };

function SignupForm({ showToast }) {
  const [f, setF] = useState(EMPTY);
  const [errors, setErrors] = useState({});

  const set = (k) => (e) => setF((v) => ({ ...v, [k]: e.target.value }));
  const setMobile = (e) => setF((v) => ({ ...v, mobile: e.target.value.replace(/\D/g, '').slice(0, 10) }));

  const strength = strengthOf(f.password);

  const submit = (e) => {
    e.preventDefault();
    const next = {};

    if (!f.first.trim()) next.first = 'Enter your first name.';
    if (!f.last.trim()) next.last = 'Enter your last name.';
    if (!isEmail(f.email)) next.email = 'Enter a valid email address.';
    if (!isMobile(f.mobile)) next.mobile = 'Enter a 10 digit mobile number.';
    if (f.password.length < 8) next.password = 'Use at least 8 characters.';
    if (f.confirm !== f.password) next.confirm = 'Passwords do not match.';
    if (!f.agree) next.agree = 'Please accept the Terms and Privacy Policy to continue.';

    setErrors(next);
    if (Object.keys(next).length) return;

    /* DEMO: replace this block with your real signup API call */
    loginUser({
      first: f.first.trim(),
      last: f.last.trim(),
      email: f.email.trim(),
      mobile: f.mobile,
    });

    showToast('Account created. Welcome to Amihive!');
    setTimeout(() => navigate(getNext() || '/'), 800);
  };

  return (
    <>
      <div className="au-panel__head">
        <h2>Create your account</h2>
        <p>It takes less than a minute. Use your details to get started.</p>
      </div>

      <form className="au-form" onSubmit={submit} noValidate>
        <div className="au-row2">
          <TextField
            label="First name"
            icon="user"
            value={f.first}
            onChange={set('first')}
            error={errors.first}
            autoComplete="given-name"
          />

          <TextField
            label="Last name"
            icon="user"
            value={f.last}
            onChange={set('last')}
            error={errors.last}
            autoComplete="family-name"
          />
        </div>

        <TextField
          label="Email address"
          icon="mail"
          type="email"
          value={f.email}
          onChange={set('email')}
          error={errors.email}
          autoComplete="email"
          placeholder="you@example.com"
        />

        <TextField
          label="Mobile number"
          icon="phone"
          inputMode="numeric"
          value={f.mobile}
          onChange={setMobile}
          error={errors.mobile}
          autoComplete="tel"
          placeholder="10 digit mobile number"
        />

        <div className="au-row2">
          <PasswordField
            label="Password"
            value={f.password}
            onChange={set('password')}
            error={errors.password}
            autoComplete="new-password"
          />

          <PasswordField
            label="Confirm password"
            value={f.confirm}
            onChange={set('confirm')}
            error={errors.confirm}
            autoComplete="new-password"
          />
        </div>

        {f.password && (
          <div className="au-strength" data-level={strength}>
            <div className="au-strength__bars">
              {[1, 2, 3, 4].map((n) => (
                <i key={n} className={n <= strength ? 'is-on' : ''} />
              ))}
            </div>
            <span>{STRENGTH_LABEL[strength]}</span>
          </div>
        )}

        <div>
          <label className="au-check">
            <input type="checkbox" checked={f.agree} onChange={(e) => setF((v) => ({ ...v, agree: e.target.checked }))} />
            <span>
              I agree to the{' '}
              <button type="button" onClick={() => navigate('/terms')}>
                Terms &amp; Conditions
              </button>{' '}
              and{' '}
              <button type="button" onClick={() => navigate('/privacy')}>
                Privacy Policy
              </button>
              .
            </span>
          </label>
          {errors.agree && <em className="au-err">{errors.agree}</em>}
        </div>

        <button type="submit" className="sx-btn sx-btn--signal sx-btn--block">
          Create account
        </button>
      </form>

      <p className="au-switch">
        Existing user?
        <button type="button" onClick={() => navigate(withNext('/login'))}>
          Log in
        </button>
      </p>
    </>
  );
}

function Signup() {
  return (
    <AuthShell
      active="login"
      crumb="Sign up"
      title="Looks like you're new here!"
      text="Sign up with your details to get started with orders, wishlist and member-only offers."
    >
      {(showToast) => <SignupForm showToast={showToast} />}
    </AuthShell>
  );
}

export default Signup;