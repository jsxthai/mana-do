import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import Service from "../../service";
import "./styles.css";

const SignInPage = () => {
  const [form, setForm] = useState({
    userId: "",
    password: "",
  });
  const history = useHistory();

  const signIn = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const resp = await Service.signIn(form.userId, form.password);

    localStorage.setItem("token", resp);
    history.push("/todo");
  };

  const onChangeField = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.persist();
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <div className="SignIn">
      <div className="SignIn__title">User Login</div>
      <form onSubmit={signIn} className="SignIn__form">
        <input
          id="user_id"
          name="userId"
          value={form.userId}
          style={{ marginTop: 12 }}
          onChange={onChangeField}
          placeholder="User ID"
        />
        <br />
        <input
          id="password"
          name="password"
          type="password"
          style={{ marginTop: 12 }}
          value={form.password}
          onChange={onChangeField}
          placeholder="Password"
        />
        <br />
        <button type="submit" style={{ marginTop: 12 }}>
          Sign in
        </button>
      </form>
    </div>
  );
};

export default SignInPage;
