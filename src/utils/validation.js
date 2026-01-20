// Email regex - temel email doğrulama
export const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// Password regex - en az 4 karakter
export const passwordRegex = /^.{4,}$/;

// Validasyon hata mesajları
export const validationMessages = {
  invalidEmail: "Lütfen geçerli bir email girin",
  weakPassword: "Şifre en az 4 karakter olmalı",
  termsNotAccepted: "Şartları kabul etmelisiniz",
};

// Email doğrulama fonksiyonu
export const validateEmail = (email) => {
  return emailRegex.test(email);
};

// Password doğrulama fonksiyonu
export const validatePassword = (password) => {
  return passwordRegex.test(password);
};
