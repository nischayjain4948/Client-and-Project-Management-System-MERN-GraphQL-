import React, { useState } from "react";
import { FaEnvelope, FaLock, FaEye, FaEyeSlash } from "react-icons/fa";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const handleTogglePassword = () => {
    setShowPassword((prev) => !prev);
  };

  //   const dispatch = useDispatch();
  //   const email = useSelector(selectEmail);
  //   const password = useSelector(selectPassword);

  //   const handleEmailChange = (e) => {
  //     dispatch(setEmail(e.target.value));
  //   };

  //   const handlePasswordChange = (e) => {
  //     dispatch(setPassword(e.target.value));
  //   };

  //   const handleSubmit = (e) => {
  //     e.preventDefault();
  //     // Add your login logic here using email and password
  //     console.log("Email:", email);
  //     console.log("Password:", password);
  //   };

  return (
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card">
            <div className="card-body">
              <h2 className="card-title text-center mb-4">Login</h2>
              <form>
                <div className="mb-3">
                  <label htmlFor="email" className="form-label">
                    <div>
                      <FaEnvelope />
                    </div>
                    Email address
                  </label>
                  <input
                    type="email"
                    className="form-control"
                    id="email"
                    placeholder="Enter email"
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="password" className="form-label">
                    <div>
                      <FaLock />
                    </div>
                    Password
                  </label>

                  <button
                    className="btn btn-sm"
                    type="button"
                    onClick={handleTogglePassword}
                  >
                    {showPassword ? <FaEye /> : <FaEyeSlash />}
                  </button>
                  <input
                    type={showPassword ? "text" : "password"}
                    className="form-control"
                    id="password"
                    placeholder="Password"
                  />
                </div>
                <div className="d-grid gap-2">
                  <button type="submit" className="btn btn-primary">
                    Login
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
