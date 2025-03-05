describe('Sign In Page Test', () => {
  beforeEach(() => {
    // Clear local storage before each test to ensure a clean state
    cy.clearLocalStorage();
  });

  it('should open the Sign In page by default', () => {
    // Visit the root URL which should redirect to /signin
    cy.visit('http://localhost:51042/SignIn'); // Assuming this redirects to /signin

    // Assert that the URL includes /signin
    cy.url().should('include', '/SignIn');

    // Check if the Sign In heading is visible
    cy.get('h2').should('contain', 'Sign In'); // Adjust this selector based on your actual heading
  });

  it('should allow access to Sign Up page', () => {
    cy.visit('http://localhost:51042/SignUp');
    cy.get('h2').should('contain', 'Sign Up'); // Adjust this selector based on your actual heading
  });

  it('should redirect to Food Stalls when logged in', () => {
    // Simulate logging in by setting isLoggedIn to true
    cy.window().then((win) => {
      win.localStorage.setItem('isLoggedIn', 'true'); // Simulate logged-in state
    });

    // Visit the Sign In page
    cy.visit('http://localhost:51042/signin');

    //cy.get('.input-group').eq(0).find('input').type('First Input Selected')
    //cy.get('.input-group').eq(1).find('input').type('First Input Selected')
    //cy.get('.signin-btn').click()
      
  });
});
