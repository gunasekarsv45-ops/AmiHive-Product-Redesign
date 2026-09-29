import { useState } from 'react';
import AuthShell, { TextField, PasswordField, isIdentifier, strengthOf, STRENGTH_LABEL, withNext } from './AuthShell';
import { Ico, navigate } from '../Shared/SiteChrome';

function ForgotForm({ showToast }) {
  const [step, setStep] = useState(1); // 1 = request code, 2 = verify + new password, 3 = done
  const [identifier, setIdentifier] = useState('');
  const [otp, setOtp] = useState('');
  const [pw, setPw] = useState('');
  const [confirm, setConfirm] = useState('');
  const [errors, setErrors] = useState({});

  const strength = strengthOf(pw);

  /* DEMO: replace with your real "send reset code" API call */
  const sendCode = (e) => {
    e.preventDefault();

    if (!isIdentifier(identifier)) {
      setErrors({ identifier: 'Enter a valid email address or 10 digit mobile number.' });
      return;
    }

    setErrors({});
    setStep(2);
    showToast('A 6 digit code has been sent to you.');
  };

  const resend = () => showToast('A new code has been sent.');

  /* DEMO: replace with your real "verify code + reset password" API call */
  const resetPassword = (e) => {
    e.preventDefault();
    const next = {};

    if (!/^\d{6}$/.test(otp)) next.otp = 'Enter the 6 digit code.';
    if (pw.length < 8) next.pw = 'Use at least 8 characters.';
    if (confirm !== pw) next.confirm = 'Passwords do not match.';

    setErrors(next);
    if (Object.keys(next).length) return;

    setStep(3);
  };

  if (step === 3) {
    return (
      <div className="au-success">
        <span className="au-success__icon">
          <Ico name="check" size={30} />
        </span>
        <h2>Password updated</h2>
        <p>Your password has been reset successfully. You can now log in with your new password.</p>

        <button type="button" className="sx-btn sx-btn--signal" onClick={() => navigate(withNext('/login'))}>
          Back to login
        </button>
      </div>
    );
  }

  return (
    <>
      <div className="au-steps" aria-hidden="true">
        <i className="is-on" />
        <i className={step === 2 ? 'is-on' : ''} />
      </div>

      <div className="au-panel__head">
        <h2>{step === 1 ? 'Forgot your password?' : 'Set a new password'}</h2>
        <p>
          {step === 1
            ? 'Enter the email or mobile number linked to your account and we will send you a 6 digit code.'
            : `Enter the code we sent to ${identifier.trim()} and choose a new password.`}
        </p>
      </div>

      {step === 1 && (
        <form className="au-form" onSubmit={sendCode} noValidate>
          <TextField
            label="Email or mobile number"
            icon="user"
            value={identifier}
            onChange={(e) => setIdentifier(e.target.value)}
            error={errors.identifier}
            autoComplete="username"
            placeholder="you@example.com or 9876543210"
          />

          <button type="submit" className="sx-btn sx-btn--signal sx-btn--block">
            Send code
          </button>
        </form>
      )}

      {step === 2 && (
        <form className="au-form" onSubmit={resetPassword} noValidate>
          <TextField
            label="6 digit code"
            icon="shield"
            className="au-input--otp"
            inputMode="numeric"
            value={otp}
            onChange={(e) => setOtp(e.target.value.replace(/\D/g, '').slice(0, 6))}
            error={errors.otp}
            autoComplete="one-time-code"
            placeholder="••••••"
          />

          <span className="au-hint">
            Did not get it?{' '}
            <button type="button" className="au-link" onClick={resend}>
              Resend code
            </button>
          </span>

          <PasswordField
            label="New password"
            value={pw}
            onChange={(e) => setPw(e.target.value)}
            error={errors.pw}
            autoComplete="new-password"
          />

          {pw && (
            <div className="au-strength" data-level={strength}>
              <div className="au-strength__bars">
                {[1, 2, 3, 4].map((n) => (
                  <i key={n} className={n <= strength ? 'is-on' : ''} />
                ))}
              </div>
              <span>{STRENGTH_LABEL[strength]}</span>
            </div>
          )}

          <PasswordField
            label="Confirm new password"
            value={confirm}
            onChange={(e) => setConfirm(e.target.value)}
            error={errors.confirm}
            autoComplete="new-password"
          />

          <button type="submit" className="sx-btn sx-btn--signal sx-btn--block">
            Reset password
          </button>
        </form>
      )}

      <p className="au-switch">
        Remembered it?
        <button type="button" onClick={() => navigate(withNext('/login'))}>
          Back to login
        </button>
      </p>
    </>
  );
}

function ForgotPassword() {
  return (
    <AuthShell
      active="login"
      crumb="Forgot password"
      title="Reset your password"
      text="We will verify it is you, then help you get back into your account in a minute."
    >
      {(showToast) => <ForgotForm showToast={showToast} />}
    </AuthShell>
  );
}

export default ForgotPassword;