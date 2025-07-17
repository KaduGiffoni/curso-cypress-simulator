describe("Cypress Simulator", () => {
  beforeEach(() => {
    cy.login();
    cy.visit("./src/index.html?skipCaptcha=true", {
      onBeforeLoad(win) {
        win.localStorage.setItem("cookieConsent", "accepted");
      },
    });
  });

  it("checks the run button disabled and enabled states", () => {
    cy.contains("button", "Run").should("be.disabled");
    cy.get("textarea[placeholder='Write your Cypress code here...']").type(
      "cy.log('Yay!')"
    );
    cy.contains("button", "Run").should("be.enabled");
    cy.get("textarea[placeholder='Write your Cypress code here...']").clear();
    cy.contains("button", "Run").should("be.disabled");
  });

  it("clears the code input when logging off then logging in again", () => {
    cy.get("textarea[placeholder='Write your Cypress code here...']").type(
      "cy.log('Yay!')"
    );
    cy.get("#sandwich-menu").click();
    cy.contains("button", "Logout").click();

    cy.contains("button", "Login").click();
    cy.get("textarea[placeholder='Write your Cypress code here...']").should(
      "have.value",
      ""
    );

    it("disables the run button when logging off then logging in again", () => {
      cy.get("textarea[placeholder='Write your Cypress code here...']").type(
        "cy.log('Yay!')"
      );
      cy.get("#sandwich-menu").click();
      cy.contains("button", "Logout").click();

      cy.contains("button", "Login").click();
      cy.contains("button", "Run").should("be.disabled");
    });
  });

  it("clears the code output when logging off then logging in again", () => {
    cy.run("cy.log('Yay!')");
    cy.get("#outputArea", { timeout: 6000 })
      .should("contain", "Success")
      .and("contain", "cy.log('Yay!') // Logged message 'Yay!'")
      .and("be.visible");
    cy.get("#sandwich-menu").click();
    cy.contains("button", "Logout").click();

    cy.contains("button", "Login").click();
    cy.get("#outputArea").should("not.contain", "cy.log('Yay!')");
  });

  it("doesn't show the cookie consent banner on the login page", () => {
    cy.clearLocalStorage();
    cy.reload();
    cy.contains("button", "Login").should("be.visible");
    cy.get("#cookieConsent").should("not.be.visible");
  });
});

describe("Cipress simulator - Coockies consent", () => {
  beforeEach(() => {
    cy.login();
    cy.visit("./src/index.html?skipCaptcha=true");
  });
  it("consents on the cookies usage", () => {
    cy.get("#cookieConsent")
      .as("cookieConsentBanner")
      .find("button:contains('Accept')")
      .click();

    cy.get("@cookieConsentBanner").should("not.be.visible");
    cy.window().its("localStorage.cookieConsent").should("eq", "accepted");
  });
});
