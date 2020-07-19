import React, { useState, useEffect, useContext } from "react";
import { useHttp } from "../hooks/http.hook";
import { useMessage } from "../hooks/message.hook";
import { AuthContext } from "../context/AuthContext";

export const AuthPage = () => {
  const auth = useContext(AuthContext);

  const message = useMessage();
  const { loading, request, error, clearError } = useHttp();

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  useEffect(() => {
    message(error);
    clearError();
  }, [error, message, clearError]);

  //Убирает баг на инпуты при входе!
  useEffect(() => {
    window.M.updateTextFields();
  });

  const changeHandler = (event) => {
    setForm({
      ...form,
      [event.target.name]: event.target.value,
    });
  };
  //REGISTER
  const registerHandler = async () => {
    try {
      const data = await request("/api/auth/register", "POST", { ...form }); // 3 параметр это то что передаем (email && password)
      message(data.message);
    } catch (e) {}
  };
  //LOGIN
  const loginHandler = async () => {
    try {
      const data = await request("/api/auth/login", "POST", { ...form }); // 3 параметр это то что передаем (email && password)
      auth.login(data.token, data.userId);
    } catch (e) {}
  };

  return (
    <div className="row">
      <div className="col s6 offset-s3">
        <h1>Сократи ссылку</h1>
        <div className="card blue darken-1">
          <div className="card-content white-text">
            <span className="card-title">Авторизация</span>
            <div>
              <div className="input-field">
                <input
                  placeholder="Введите email"
                  id="email"
                  type="text"
                  name="email"
                  className="yellow-input"
                  onChange={changeHandler}
                  value={form.email}
                />
                <label htmlFor="first_name">Email</label>
              </div>
              <div className="input-field">
                <input
                  placeholder="Введите пароль"
                  id="password"
                  type="password"
                  name="password"
                  className="yellow-input"
                  onChange={changeHandler}
                  value={form.password}
                />
                <label htmlFor="first_name">Пароль</label>
              </div>
            </div>
          </div>
          <div className="card-action">
            <button
              className="btn yellow darken-4"
              style={{ marginRight: "10px" }}
              disabled={loading}
              onClick={loginHandler}
            >
              Войти
            </button>
            <button
              className="btn grey lighten-1 black-text"
              onClick={registerHandler}
              disabled={loading}
            >
              Регистрация
            </button>
          </div>
        </div>
      </div>
      й
    </div>
  );
};
