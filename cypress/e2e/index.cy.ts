describe('Index page', () => {
  context('desktop', () => {
    beforeEach(() => {
      cy.viewport('macbook-15');
      cy.visit('http://localhost:3000/');
    });

    it('renders full navbar on bigger screens', () => {
      cy.get('[data-cy=desktop-navbar]').should('be.visible');
      cy.contains(/find your style/i).should('be.visible');
    });

    it('renders compact navbar on smaller screens', () => {
      cy.viewport(1200, 900);
      cy.get('[data-cy=desktop-navbar]').should('be.visible');
      cy.contains(/find your style/i).should('not.be.visible');
    });

    it('scrolls to section and changes style when clicking on navbar link', () => {
      cy.get('[data-cy=desktop-navbar]')
        .contains(/kitchen/i)
        .click();

      cy.contains(/magic/i).should('be.visible');

      // check if style is changed
      cy.get('[data-cy=desktop-navbar]')
        .contains(/living room/i)
        .children('p')
        .should('have.class', 'hover:bg-pos-100');

      cy.get('[data-cy=desktop-navbar]')
        .contains(/kitchen/i)
        .children('p')
        .should('have.class', 'bg-pos-0');
    });
  });

  context('tablet', () => {
    beforeEach(() => {
      cy.viewport('ipad-2');
      cy.visit('http://localhost:3000/');
      cy.on('window:before:load', (win) => {
        Object.defineProperty(win.navigator, 'userAgent', {
          value: 'Mozilla/5.0 (iPad; CPU OS 13_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/13.0 Mobile/15E148 Safari/604.1',
        });
      });
    });

    it('renders tablet version with mobile navbar in portrait mode', () => {
      cy.get('[data-cy=tablet-landing-page]').should('be.visible');
      cy.get('[data-cy=mobile-navbar]').should('be.visible');
    });

    it('scrolls to section when using mobile navbar', () => {
      cy.get('[data-cy=hamburger-menu]').click({ force: true, waitForAnimations: true });
      cy.get('[data-cy=hamburger-menu-content]')
        .contains(/kitchen/i)
        .click({ force: true, waitForAnimations: true });

      cy.contains(/magic/i).should('be.visible');
    });

    it('renders tablet version with tablet navbar in landscape mode', () => {
      cy.viewport('ipad-2', 'landscape');
      cy.get('[data-cy=tablet-landing-page]').should('be.visible');
      cy.get('[data-cy=tablet-navbar]').should('be.visible');
    });

    it('scrolls to section when using tablet navbar', () => {
      cy.viewport('ipad-2', 'landscape');
      cy.get('[data-cy=tablet-navbar]')
        .contains(/kitchen/i)
        .click();

      cy.contains(/magic/i).should('be.visible');
    });
  });

  context('mobile', () => {
    beforeEach(() => {
      cy.viewport('iphone-x');
      cy.visit('http://localhost:3000/');
    });

    it('renders mobile version', () => {
      cy.get('[data-cy=mobile-landing-page]').should('be.visible');
      cy.get('[data-cy=mobile-navbar]').should('be.visible');
    });

    it('scrolls to section when using mobile navbar', () => {
      cy.get('[data-cy=hamburger-menu]').click({ force: true, waitForAnimations: true });
      cy.get('[data-cy=hamburger-menu-content]')
        .contains(/kitchen/i)
        .click({ force: true, waitForAnimations: true });

      cy.contains(/magic/i).should('be.visible');
    });

    it('renders mobile version in landscape mode', () => {
      cy.viewport('iphone-x', 'landscape');
      cy.get('[data-cy=mobile-landing-page]').should('be.visible');
      cy.get('[data-cy=mobile-navbar]').should('be.visible');
    });
  });
});

export {};
