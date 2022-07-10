describe("Searching scenario ", () => {
  let title = "";
  let releaseYear = "";
  let genres = "";

  it("Verify the search page is empty ", () => {
    cy.visit("http://localhost:7070");

    cy.get(".search-bar").should("have.value", "");
  });

  it("Verify that search results match the search query", () => {
    const text = "Transformers";
    cy.get(".search-bar").type(text);
    cy.contains("Search").click();
    cy.url().should("include", `search/${text}`);
  });

  it("Find and set values", () => {
    cy.get(".movie-card")
      .first()
      .should(($div) => {
        title = $div.children(".title").children("p").text();
        releaseYear = $div.children(".title").children("div").text();
        genres = $div.children(".description").text();
      })
      .click();
  });

  it("Verify that correct movie page is displayed", () => {
    cy.get(".movie-detail")
      .children(".content")
      .children(".right-content")
      .children(".header")
      .contains(title);

    cy.get(".movie-detail")
      .children(".content")
      .children(".right-content")
      .children(".genre")
      .contains(genres);

    cy.get(".movie-detail")
      .children(".content")
      .children(".right-content")
      .children(".duration")
      .contains(releaseYear);
  });
});
