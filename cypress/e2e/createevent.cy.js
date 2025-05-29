describe("Create Event", () => {
  beforeEach(() => {
    cy.visit("/");
  });

  it("should complete the full create event flow", () => {
    // Login with valid credentials
    cy.get('.login-page__input[type="email"]').type("john@doe.com");
    cy.get('.login-page__input[type="password"]').type("123456");
    cy.get('.login-page__button[type="submit"]').click();

    cy.url().should("not.include", "/login");
    cy.get(".home-view").should("be.visible");

    // Navigate to the calendar page
    cy.get('.sidenav__link[href="/calendar"]').click();
    cy.url().should("include", "/calendar");
    cy.get(".calendar-view").should("be.visible");

    // Select a date in the calendar
    cy.get(".calendar__grid").should("be.visible");
    cy.get(".calendar__cell").contains("15").click();

    cy.get(".event-list").should("be.visible");
    cy.get(".event-list__title").should("contain", "Events for Thu May 15 2025");

    // Open the CreateEvent modal via the add button
    cy.get(".event-list__add-btn").click();
    cy.get(".event-modal").should("be.visible");

    // Fill in the CreateEvent form and submit
    cy.get(".date-input").clear().type("2025-05-15");

    // Fixed dropdown interactions - target by label and use correct Danish text
    cy.contains("label", "Skema").parent().find(".dropdown__header").click();
    cy.get(".dropdown__search-input").type("Ryd");
    cy.get(".dropdown__item").contains("Ryd").click();

    cy.contains("label", "Virksomhed").parent().find(".dropdown__header").click();
    cy.get(".dropdown__search-input").type("Boston");
    cy.get(".dropdown__item").contains("Boston").click();

    cy.contains("label", "Lokation").parent().find(".dropdown__header").click();
    cy.get(".dropdown__search-input").type("veggie");
    cy.get(".dropdown__item").contains("Veggie").click();

    cy.contains("label", "Bruger").parent().find(".dropdown__header").click();
    cy.get(".dropdown__search-input").type("1");
    cy.get(".dropdown__item").contains("1").click();

    cy.contains("label", "Objekt").parent().find(".dropdown__header").click();
    cy.get(".dropdown__search-input").type("vindue");
    cy.get(".dropdown__item").contains("W19").click();

    // Stub the alert before clicking save
    cy.window().then((win) => {
      cy.stub(win, "alert").as("windowAlert");
    });

    cy.get(".event-modal__button--save").click();

    // Verify the alert was called with the correct message
    cy.get("@windowAlert").should("have.been.calledWith", "Event saved successfully!");

    // Wait for the modal to actually close (indicates the save process is complete)
    cy.get(".event-modal").should("not.exist");

    // Give extra time for the database operation to complete
    cy.wait(1500);
  });
});
