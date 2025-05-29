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

    cy.contains(".event-item__title", "Ryd Vinduer").parent().find(".event-item__edit-btn").click();
    cy.get(".event-modal").should("be.visible");

    cy.get(".event-modal__button--delete").click();

    cy.window().then((win) => {
      cy.stub(win, "alert").as("windowAlert");
    });

    cy.get(".event-modal__button--save").click();

    // Verify the alert was called with the correct message
    cy.get("@windowAlert").should("have.been.calledWith", "Event deleted successfully.");

    // Wait for the modal to actually close (indicates the save process is complete)
    cy.get(".event-modal").should("not.exist");

    // Give extra time for the database operation to complete
    cy.wait(1500);
  });
});
