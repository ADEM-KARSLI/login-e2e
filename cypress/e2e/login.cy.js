describe("Login Form E2E Testleri", () => {
  beforeEach(() => {
    cy.visit("http://localhost:5173/");
  });

  it("Başarılı form submit edebiliyor", () => {
    cy.get('input[name="email"]').type("testuser@example.com");
    cy.get('input[name="password"]').type("Abc12345!");
    cy.get('input[name="terms"]').check();

    cy.get('button[type="submit"]').should("not.be.disabled").click();

    cy.url().should("include", "/success");
  });

  it("Hatalı email ve password: button disabled ve hata mesajı gösteriliyor", () => {
    cy.get('input[name="email"]').type("wrong@example.com");
    cy.get('input[name="password"]').type("123");
    cy.get('input[name="terms"]').check();

    cy.get('button[type="submit"]').should("be.disabled");

    cy.contains("Lütfen geçerli bir email girin").should("be.visible");
    cy.contains("Şifre en az 4 karakter olmalı").should("be.visible");
  });

  it("Email ve password doğru ama şartları kabul etmedim: button disabled", () => {
    cy.get('input[name="email"]').type("testuser@example.com");
    cy.get('input[name="password"]').type("Abc12345!");

    cy.get('button[type="submit"]').should("be.disabled");
    cy.contains("Şartları kabul etmelisiniz").should("be.visible");
  });
});
