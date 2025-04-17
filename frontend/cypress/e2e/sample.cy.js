describe('Sign In Page Test', () => {
  beforeEach(() => {
    // Clear local storage before each test to ensure a clean state
    cy.clearLocalStorage();
  });


  it('should allow access to Sign Up page', () => {
    cy.visit('http://localhost:3000/SignUp');
    cy.get('h2').should('contain', 'Sign Up'); // Adjust this selector based on your actual heading
  });

  it('should redirect to Food Stalls when logged in', () => {
    // Simulate logging in by setting isLoggedIn to true
    cy.window().then((win) => {
      win.localStorage.setItem('isLoggedIn', 'true'); // Simulate logged-in state
    });

    // Visit the Sign In page
    cy.visit('http://localhost:3000/signin');

    //cy.get('.input-group').eq(0).find('input').type('First Input Selected')
    //cy.get('.input-group').eq(1).find('input').type('First Input Selected')
    //cy.get('.signin-btn').click()
      
  });

  describe("Logout Functionality", () => {
    beforeEach(() => {
      // Simulate a logged-in state
      cy.window().then((win) => {
        win.localStorage.setItem("authToken", "test-token"); // Mock auth token
      });
  
      // Visit the Food Stalls page (assuming user is logged in)
      cy.visit("http://localhost:3000/foodstalls");
    });
  
    it("should log out and redirect to Sign In page", () => {
      // Ensure we're on the Food Stalls page
      cy.url().should("include", "/foodstalls");
  
      // Click the Logout button (update selector based on your actual button class or ID)
      cy.get(".logout-btn").click(); 
  
      // Verify redirection to Sign In page
      cy.url().should("include", "/signin");
  
      // Check if Sign In heading is visible
      cy.get("h2").should("contain", "Sign In");
    });

    describe("Burger Button Navigation", () => {
      it("should navigate to Burger Options page when Burger button is clicked", () => {
        // Visit the Food Stalls page
        cy.visit("http://localhost:3000/foodstalls");
    
        // Ensure the page loaded correctly
        cy.url().should("include", "/foodstalls");
    
        // Click on the Burger button (adjust the selector as needed)
        cy.get(".stall-button", { timeout: 10000 }).should("be.visible").contains("Burger 352").click(); 
    
        // Verify navigation to Burger Options page
        cy.url().should("include", "/burger352");  // Adjust this URL if your actual route is different
    
      });
    });
    

    describe('Burger Options - Checking Quantity Buttons and Display', () => {
      it('should display quantity buttons and quantity display for each item', () => {
        // Visit the Burger Options page
        cy.visit('http://localhost:3000/foodstalls/burger352/burger');
    
        // Check if the quantity buttons and display are visible for "The Classic"
        cy.contains('The Classic')
          .parent()
          .find('.b-quantity-controls')
          .should('be.visible'); // Check if quantity controls are visible
    
        cy.contains('The Classic')
          .parent()
          .find('.b-quantity-controls button')
          .should('have.length', 2) // Ensure both + and - buttons exist
          .and('be.visible'); // Check if both buttons are visible
    
        cy.contains('The Classic')
          .parent()
          .find('.b-quantity-controls span')
          .should('be.visible'); // Check if the quantity display is visible
      });
    });
    
    
    
  });
  
});
