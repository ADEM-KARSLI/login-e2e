import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Form, FormGroup, Label, Input, Button, FormFeedback } from "reactstrap";

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const passwordRegex = /^.{4,}$/; // en az 4 karakter

export default function Login() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    email: "",
    password: "",
    terms: false,
  });

  const [errors, setErrors] = useState({
    email: "",
    password: "",
    terms: "",
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    const val = type === "checkbox" ? checked : value;

    setForm((prev) => ({
      ...prev,
      [name]: val,
    }));

    // Hata mesajlarını güncelle
    const newErrors = { ...errors };

    if (name === "email") {
      newErrors.email = emailRegex.test(val) ? "" : "Lütfen geçerli bir email girin";
    }
    if (name === "password") {
      newErrors.password = passwordRegex.test(val)
        ? ""
        : "Şifre en az 4 karakter olmalı";
    }
    if (name === "terms") {
      newErrors.terms = val ? "" : "Şartları kabul etmelisiniz";
    }

    setErrors(newErrors);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Tüm validasyonları kontrol et
    if (!errors.email && !errors.password && !errors.terms) {
      navigate("/success");
    }
  };

  const isDisabled =
    !form.email ||
    !form.password ||
    !form.terms ||
    !!errors.email ||
    !!errors.password ||
    !!errors.terms;

  return (
    <Form onSubmit={handleSubmit}>
      <FormGroup>
        <Label for="email">Email</Label>
        <Input
          type="email"
          name="email"
          id="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          invalid={!!errors.email}
        />
        {errors.email && <FormFeedback>{errors.email}</FormFeedback>}
      </FormGroup>

      <FormGroup>
        <Label for="password">Password</Label>
        <Input
          type="password"
          name="password"
          id="password"
          placeholder="Password"
          value={form.password}
          onChange={handleChange}
          invalid={!!errors.password}
        />
        {errors.password && <FormFeedback>{errors.password}</FormFeedback>}
      </FormGroup>

      <FormGroup check>
        <Input
          type="checkbox"
          name="terms"
          id="terms"
          checked={form.terms}
          onChange={handleChange}
        />
        <Label check htmlFor="terms">
          Şartları kabul ediyorum
        </Label>
        {errors.terms && <div className="text-danger">{errors.terms}</div>}
      </FormGroup>

      <Button
        type="submit"
        color="primary"
        className="mt-3"
        disabled={isDisabled}
      >
        Login
      </Button>
    </Form>
  );
}
