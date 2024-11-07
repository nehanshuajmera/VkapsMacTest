import { useState } from "react";
import axios from "axios";
const apiUrl = import.meta.env.VITE_API_URL;
import { FormInput } from "../form-input/form-input.component";
import "./sign-in.styles.scss";

export const SignIn = () => {
  const [formData, setFormData] = useState({
    usernameOrEmail: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const signInData = {
      usernameOrEmail: formData?.usernameOrEmail,
      password: formData?.password,
    };

    setLoading(true);
    setError(null);

    try {
      await axios.post(
        `${apiUrl}/admin/signin`,
        signInData,
        console.log(signInData),
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );

      setFormData({
        usernameOrEmail: "",
        password: "",
      });
    } catch (err) {
      setError(err.response?.data?.error || "An error occurred during signin");
      console.error("SignIn error:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { value, name } = e.target;

    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };
  return (
    <div className="sign-in">
      <form className="sign-in_form" onSubmit={handleSubmit}>
        <FormInput
          label="Username Or Email"
          name="usernameOrEmail"
          type="text"
          placeholder="Username Or Email"
          value={formData.usernameOrEmail}
          onChange={handleChange}
          required
        />
        <FormInput
          label="Password"
          name="password"
          type="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          required
        />
        <button className="btn-text" type="submit" disabled={loading}>
        {loading ? "Signing In..." : "Sign In"}
        </button>
        {error && <p className="error-message">{error}</p>}
      </form>
    </div>
  );
};
