import React, { useEffect } from "react";
import { Helmet } from "react-helmet";
import { toast } from "react-toastify";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import * as Routes from "../../routes";
import { AuthHooks } from "../../hooks";
import { SignIn, Auth } from "../../services/redux";

const LogIn = () => {
  const { authInputs, setAuthInputs, authHandleChange, user, setUser } =
    AuthHooks();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const { session, message } = useSelector((state) => state.AuthSlice);

  useEffect(() => {
    message && toast.error(message);
  }, [message]);

  const handleSubmit = (event) => {
    event.preventDefault();
    setTimeout(() => setAuthInputs({ email: "", password: "" }), 500);
    dispatch(SignIn(authInputs));
    authControl();
  };

  const authControl = () => {
    dispatch(Auth());
    if (localStorage.getItem("session")) {
      setUser(JSON.parse(localStorage.getItem("session")).user);
      navigate(Routes.Home);
    } else {
      setUser(null);
    }
  };

  useEffect(() => {
    authControl()
  }, [session]);

  return (
    <>
      <Helmet>
        <title>Log In | Todo App</title>
        <meta name="description" content="Giriş Yap | Todo App" />
      </Helmet>

      <main className="page-content">
        <div className="container">
          <div className="row vh-100 d-flex justify-content-center">
            <div className="col-lg-4 col-md-7 col-sm-12">
              <h3 className="text-center mt-5 mb-4">Todo App</h3>

              <div className="card p-3 shadow-lg">
                <form onSubmit={handleSubmit}>
                  <div className="form-group mb-3">
                    <label htmlFor="emailAddress">Email*</label>
                    <input
                      type="text"
                      className="form-control"
                      id="emailAddress"
                      name="email"
                      placeholder="Email*"
                      value={authInputs.email}
                      onChange={authHandleChange}
                      required
                    />
                  </div>
                  <div className="form-group mb-3">
                    <label htmlFor="password">Password*"</label>
                    <input
                      type="password"
                      className="form-control"
                      id="password"
                      name="password"
                      placeholder="Password*"
                      value={authInputs.password}
                      onChange={authHandleChange}
                      required
                    />
                  </div>
                  <button type="submit" className="btn btn-primary w-100">
                    Sign In
                  </button>
                </form>
              </div>
              <div className="mt-2 d-flex align-items-center justify-content-center">
                <button
                  className="btn btn-warning me-1"
                  onClick={() =>
                    setAuthInputs({
                      email: "akara@email.com",
                      password: "akara12345",
                    })
                  }
                >
                  Ahmet
                  <br />
                  (Kullanıcı 1)
                </button>
                <button
                  className="btn btn-secondary me-1"
                  onClick={() =>
                    setAuthInputs({
                      email: "mkara@email.com",
                      password: "mkara12345",
                    })
                  }
                >
                  Mehmet
                  <br />
                  (Kullanıcı 2)
                </button>
                <button
                  className="btn btn-info ms-1"
                  onClick={() =>
                    setAuthInputs({
                      email: "yasingokhanerdogan@gmail.com",
                      password: "admin12345",
                    })
                  }
                >
                  Gökhan
                  <br />
                  (Yönetici)
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
};

export default LogIn;
