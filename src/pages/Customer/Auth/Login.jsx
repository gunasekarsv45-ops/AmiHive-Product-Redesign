import { useState } from 'react';
import AuthShell, { TextField, PasswordField, isIdentifier, isEmail, firstNameFrom, getNext, withNext } from './AuthShell';
import { navigate, loginUser } from '../Shared/SiteChrome';

function LoginForm({ showToast }) {
  const [identifier, setIdentifier] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({});

  const submit = (e) => {
    e.preventDefault();
    const next = {};

    if (!isIdentifier(identifier)) next.identifier = 'Enter a valid email address or 10 digit mobile number.';
    if (password.length < 6) next.password = 'Password must be at least 6 characters.';

    setErrors(next);
    if (Object.keys(next).length) return;

    /* DEMO: replace this block with your real login API call */
    loginUser({
      first: firstNameFrom(identifier),
      last: '',
      email: isEmail(identifier) ? identifier.trim() : '',
      mobile: isEmail(identifier) ? '' : identifier.trim(),
    });

    showToast('Welcome back! You are signed in.');
    setTimeout(() => navigate(getNext() || '/'), 700);
  };

  return (
    <>
      <div className="au-panel__head">
        <h2>Welcome back</h2>
        <p>Login with your email or mobile number to continue.</p>
      </div>

      <form className="au-form" onSubmit={submit} noValidate>
        <TextField
          label="Email or mobile number"
          icon="user"
          value={identifier}
          onChange={(e) => setIdentifier(e.target.value)}
          error={errors.identifier}
          autoComplete="username"
          placeholder="you@example.com or 9876543210"
        />

        <PasswordField
          label="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          error={errors.password}
          autoComplete="current-password"
          placeholder="Enter your password"
          action={
            <button type="button" className="au-link" onClick={() => navigate(withNext('/forgot-password'))}>
              Forgot password?
            </button>
          }
        />

        <button type="submit" className="sx-btn sx-btn--signal sx-btn--block">
          Login
        </button>

        <div className="au-or">or</div>

        <button type="button" className="sx-btn sx-btn--line sx-btn--block" onClick={() => navigate(withNext('/signup'))}>
          New to Amihive? Create an account
        </button>
      </form>

      <p className="au-switch">
        Need a hand?
        <button type="button" onClick={() => navigate('/help')}>
          Visit Help &amp; FAQ
        </button>
      </p>
    </>
  );
}

function Login() {
  return (
    <AuthShell
      active="login"
      crumb="Login"
      title="Login"
      text="Get access to your orders, wishlist and personal recommendations."
    >
      {(showToast) => <LoginForm showToast={showToast} />}
    </AuthShell>
  );
}

export default Login;