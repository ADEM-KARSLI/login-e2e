import React, { useState, useEffect } from 'react';
import { Form, FormGroup, Label, Input, Button, FormFeedback } from 'reactstrap';
import { useNavigate } from 'react-router-dom';

const initialForm = {
  email: '',
  password: '',
  terms: false,
};

const initialErrors = {
  email: '',
  password: '',
};

export default function Login() {
  const [form, setForm] = useState(initialForm);
  const [errors, setErrors] = useState(initialErrors);
  const [isValid, setIsValid] = useState(false);

  const navigate = useNavigate();

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d).{6,}$/;

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setForm({
      ...form,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  useEffect(() => {
    const newErrors = {};

    if (!emailRegex.test(form.email)) {
      newErrors.email = 'Geçerli bir email giriniz';
    }

    if (!passwordRegex.test(form.password)) {
      newErrors.password = 'Şifre en az 6 karakter, harf ve rakam içermeli';
    }

    setErrors(newErrors);

    setIsValid(
      emailRegex.test(form.email) &&
      passwordRegex.test(form.password) &&
      form.terms
    );
  }, [form]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!isValid) return;

    navigate('/success');
  };

  return (
    <Form onSubmit={handleSubmit}>
      <FormGroup>
        <Label>Email</Label>
        <Input
          type="email"
          name="email"
          value={form.email}
          onChange={handleChange}
          invalid={!!errors.email}
        />
        <FormFeedback>{errors.email}</FormFeedback>
      </FormGroup>

      <FormGroup>
        <Label>Password</Label>
        <Input
          type="password"
          name="password"
          value={form.password}
          onChange={handleChange}
          invalid={!!errors.password}
        />
        <FormFeedback>{errors.password}</FormFeedback>
      </FormGroup>

      <FormGroup check>
        <Input
          type="checkbox"
          name="terms"
          checked={form.terms}
          onChange={handleChange}
        />
        <Label check>Şartları kabul ediyorum</Label>
      </FormGroup>

      <FormGroup className="mt-4">
        <Button color="primary" disabled={!isValid}>
          Login
        </Button>
      </FormGroup>
    </Form>
  );
}
