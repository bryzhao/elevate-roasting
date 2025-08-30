/**
 * Main application JavaScript for Elevate Roasting
 * 
 * This class implements the core application logic using an object-oriented
 * approach for better organization and maintainability. The design follows
 * the single responsibility principle with clear separation of concerns.
 * 
 * Architecture patterns:
 * - Class-based organization for state management
 * - Event-driven interactions with proper delegation
 * - Defensive programming with comprehensive error handling
 * - Configuration-driven behavior for easy customization
 * 
 * The application is designed to be lightweight and performant while
 * providing a solid foundation for future feature additions.
 */

class ElevateRoastingApp {
  constructor() {
    // Dependencies injected from global scope for modularity
    this.config = window.siteConfig;
    this.utils = window.utils;
    this.isInitialized = false;
    
    // Bind methods to preserve context in event handlers
    // This ensures 'this' refers to the class instance when methods
    // are passed as callbacks to event listeners
    this.init = this.init.bind(this);
    this.handleSubscribe = this.handleSubscribe.bind(this);
    this.handleDropDetails = this.handleDropDetails.bind(this);
    this.handleSocialLinks = this.handleSocialLinks.bind(this);
    this.updateYear = this.updateYear.bind(this);
    this.populateDrops = this.populateDrops.bind(this);
    this.setupSocialLinks = this.setupSocialLinks.bind(this);
    this.setupEventListeners = this.setupEventListeners.bind(this);
  }

  /**
   * Initialize the application with comprehensive error handling
   * 
   * Sets up all core functionality in a specific order to ensure
   * dependencies are available. Uses defensive programming to
   * prevent initialization failures from breaking the entire app.
   * 
   * Initialization order:
   * 1. Update dynamic content (year)
   * 2. Populate data-driven content (coffee drops)
   * 3. Setup interactive elements (social links)
   * 4. Bind event handlers for user interactions
   */
  init() {
    if (this.isInitialized) {
      console.warn('App already initialized - preventing duplicate setup');
      return;
    }

    try {
      this.utils.debug.log('Starting application initialization');
      
      // Initialize core functionality in dependency order
      this.updateYear();
      this.populateDrops();
      this.setupSocialLinks();
      this.setupEventListeners();
      
      this.isInitialized = true;
      this.utils.debug.log('Application initialization completed successfully');
      
    } catch (error) {
      this.utils.debug.error('Critical initialization failure', error);
      // Continue with partial functionality rather than failing completely
    }
  }

  /**
   * Update footer year dynamically to avoid manual maintenance
   * 
   * Uses the utility function for consistent date handling and
   * provides fallback behavior if the element doesn't exist.
   */
  updateYear() {
    const yearElement = this.utils.dom.getElement('current-year');
    if (yearElement) {
      yearElement.textContent = this.utils.date.getCurrentYear();
    }
  }

  /**
   * Populate coffee drops grid from configuration data
   * 
   * Dynamically generates HTML for coffee cards from the configuration
   * object, enabling easy content updates without code changes.
   * Includes error handling for missing elements or data.
   */
  populateDrops() {
    const dropsGrid = this.utils.dom.getElement('drops-grid');
    if (!dropsGrid || !this.config.coffeeDrops) {
      this.utils.debug.error('Cannot populate drops - missing grid element or data');
      return;
    }

    const dropsHTML = this.config.coffeeDrops.map(drop => this.createDropCard(drop)).join('');
    dropsGrid.innerHTML = dropsHTML;
    
    this.utils.debug.log(`Successfully populated ${this.config.coffeeDrops.length} coffee drops`);
  }

  /**
   * Create HTML for individual coffee drop cards
   * 
   * Generates semantic HTML with proper data attributes for
   * event handling and accessibility. Uses template literals
   * for readability and maintainability.
   */
  createDropCard(drop) {
    return `
      <article class="card fade-in" data-drop-id="${drop.id}">
        <div class="card-image" style="background-image: url('${drop.image}')"></div>
        <div class="card-content">
          <h3 class="card-title">${drop.name}</h3>
          <p class="card-description">${drop.description}</p>
          <div class="card-footer">
            <span class="card-price">${drop.price}</span>
            <button class="btn btn-small" onclick="app.handleDropDetails(${drop.id})">
              ${drop.available ? 'Details' : 'Sold Out'}
            </button>
          </div>
        </div>
      </article>
    `;
  }

  /**
   * Configure social media links from configuration
   * 
   * Dynamically sets href attributes and adds click tracking
   * for analytics. Handles missing links gracefully by checking
   * for both element existence and valid URLs.
   */
  setupSocialLinks() {
    const socialLinks = {
      'instagram-link': this.config.social.instagram,
      'github-link': this.config.social.github
    };

    Object.entries(socialLinks).forEach(([id, url]) => {
      const link = this.utils.dom.getElement(id);
      if (link && url) {
        link.href = url;
        link.addEventListener('click', this.handleSocialLinks);
      }
    });
  }

  /**
   * Setup all event listeners for user interactions
   * 
   * Centralizes all event binding for easier maintenance and
   * debugging. Uses event delegation where appropriate and
   * includes proper error handling for missing elements.
   */
  setupEventListeners() {
    // Subscribe form with validation and submission handling
    const subscribeForm = this.utils.dom.getElement('subscribe-form');
    if (subscribeForm) {
      this.utils.dom.addEventListener(subscribeForm, 'submit', this.handleSubscribe);
    }

    // Real-time email validation with user feedback
    const emailInput = this.utils.dom.getElement('email-input');
    if (emailInput) {
      // Validate on blur for immediate feedback
      this.utils.dom.addEventListener(emailInput, 'blur', (e) => {
        this.validateEmail(e.target);
      });
      
      // Clear errors when user starts typing
      this.utils.dom.addEventListener(emailInput, 'input', (e) => {
        this.utils.form.clearError(e.target);
      });
    }

    // Smooth scrolling for navigation links
    // Uses event delegation to handle all anchor links with hash targets
    const navLinks = document.querySelectorAll('a[href^="#"]');
    navLinks.forEach(link => {
      this.utils.dom.addEventListener(link, 'click', (e) => {
        e.preventDefault();
        const targetId = link.getAttribute('href').substring(1);
        const targetElement = this.utils.dom.getElement(targetId);
        if (targetElement) {
          this.utils.animation.scrollTo(targetElement, 80); // Offset for fixed header
        }
      });
    });

    // Future enhancement: lazy loading for performance
    this.setupLazyLoading();
  }

  /**
   * Handle subscription form submission with comprehensive validation
   * 
   * Implements a complete form submission flow including:
   * - Input validation with user feedback
   * - Loading states for better UX
   * - Error handling with graceful degradation
   * - Success feedback and form reset
   */
  handleSubscribe(event) {
    event.preventDefault();
    
    const form = event.target;
    const emailInput = this.utils.dom.getElement('email-input');
    const email = emailInput ? emailInput.value.trim() : '';

    // Validate email before proceeding
    if (!this.validateEmail(emailInput)) {
      return;
    }

    // Show loading state to prevent double submissions
    const submitButton = form.querySelector('button[type="submit"]');
    const originalText = submitButton.textContent;
    submitButton.textContent = 'Signing up...';
    submitButton.disabled = true;

    try {
      // Simulate API call with proper async handling
      this.subscribeEmail(email).then(() => {
        this.utils.debug.log('Email subscription successful', { email });
        
        // Provide user feedback
        this.showNotification('Not supported yet. Subscriptions coming soon!', 'success');
        
        // Reset form for next use
        this.utils.form.clearForm(form);
        
      }).catch(error => {
        this.utils.debug.error('Email subscription failed', error);
        this.showNotification('Something went wrong. Please try again.', 'error');
      });

    } catch (error) {
      this.utils.debug.error('Unexpected subscription error', error);
      this.showNotification('Something went wrong. Please try again.', 'error');
    } finally {
      // Always restore button state
      submitButton.textContent = originalText;
      submitButton.disabled = false;
    }
  }

  /**
   * Validate email input with comprehensive error handling
   * 
   * Provides real-time validation feedback using utility functions.
   * Handles edge cases like empty inputs and malformed emails.
   * Returns boolean for easy integration with form submission logic.
   */
  validateEmail(emailInput) {
    if (!emailInput) return false;
    
    const email = emailInput.value.trim();
    
    if (!email) {
      this.utils.form.showError(emailInput, 'Email is required');
      return false;
    }
    
    if (!this.utils.form.isValidEmail(email)) {
      this.utils.form.showError(emailInput, 'Please enter a valid email address');
      return false;
    }
    
    this.utils.form.clearError(emailInput);
    return true;
  }

  /**
   * Process email subscription with storage and future API integration
   * 
   * Currently stores emails in localStorage for demonstration purposes.
   * Designed to be easily replaced with actual email service integration
   * (Mailchimp, ConvertKit, etc.) when ready for production.
   */
  async subscribeEmail(email) {
    // Simulate network delay for realistic UX
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Store in localStorage for demo purposes
    // In production, this would be replaced with API call
    const subscribers = this.utils.storage.get('subscribers', []);
    if (!subscribers.includes(email)) {
      subscribers.push(email);
      this.utils.storage.set('subscribers', subscribers);
    }
    
    // TODO: Replace with actual email service integration
    // Example: return this.utils.api.post('/api/subscribe', { email });
    
    return Promise.resolve();
  }

  /**
   * Handle coffee drop detail requests with comprehensive data display
   * 
   * Currently shows details in an alert for simplicity, but designed
   * to be replaced with modal dialogs or detail pages. Includes
   * all available coffee information for customer education.
   */
  handleDropDetails(dropId) {
    const drop = this.config.coffeeDrops.find(d => d.id === dropId);
    if (!drop) {
      this.utils.debug.error('Requested drop not found in configuration', { dropId });
      return;
    }

    // TODO: Replace with modal or detail page implementation
    // For now, show comprehensive details in alert
    const details = `
      ${drop.name}
      
      ${drop.description}
      Price: ${drop.price}
      Origin: ${drop.origin}
      Process: ${drop.process}
      Roast Level: ${drop.roastLevel}
      Elevation: ${drop.elevation}
      Varietal: ${drop.varietal}
    `;
    
    alert(details);
    
    this.utils.debug.log('Coffee drop details viewed', { dropId, dropName: drop.name });
  }

  /**
   * Track social media link clicks for analytics
   * 
   * Captures click events on social links for future analytics
   * integration. Extracts platform information from element IDs
   * for structured data collection.
   */
  handleSocialLinks(event) {
    const link = event.target;
    const platform = link.id.replace('-link', '');
    
    this.utils.debug.log('Social media link clicked', { 
      platform, 
      url: link.href 
    });
    
    // Track for future analytics integration
    this.trackEvent('social_click', { platform });
  }

  /**
   * Setup lazy loading for performance optimization
   * 
   * Placeholder for future image lazy loading implementation
   * using Intersection Observer API. Will improve initial
   * page load performance for image-heavy content.
   */
  setupLazyLoading() {
    // TODO: Implement lazy loading for better performance
    // This would use Intersection Observer API to load images
    // only when they're about to enter the viewport
    this.utils.debug.log('Lazy loading setup (future enhancement)');
  }

  /**
   * Display user notifications with consistent styling and timing
   * 
   * Creates temporary notification elements that appear and disappear
   * automatically. Uses CSS animations for smooth transitions and
   * provides different styles for different message types.
   */
  showNotification(message, type = 'info') {
    // Create notification element with type-specific styling
    const notification = this.utils.dom.createElement('div', {
      className: `notification notification-${type} fixed top-4 right-4 p-4 rounded-lg shadow-lg z-50 max-w-sm`,
      textContent: message
    });

    // Add to page and animate in
    document.body.appendChild(notification);
    this.utils.animation.fadeIn(notification);

    // Auto-remove after delay with smooth fade out
    setTimeout(() => {
      this.utils.animation.fadeOut(notification, 300);
      setTimeout(() => {
        if (notification.parentNode) {
          notification.parentNode.removeChild(notification);
        }
      }, 300);
    }, 3000);
  }

  /**
   * Track user events for analytics and debugging
   * 
   * Centralized event tracking for future analytics integration.
   * Currently logs to console but designed to be easily replaced
   * with Google Analytics, Mixpanel, or other tracking services.
   */
  trackEvent(eventName, data = {}) {
    // TODO: Implement analytics tracking
    // Example: gtag('event', eventName, data);
    this.utils.debug.log('Event tracked', { eventName, data });
  }

  /**
   * Get current application state for debugging and monitoring
   * 
   * Returns a snapshot of the application's current state including
   * initialization status, configuration, and stored data. Useful
   * for debugging and monitoring application health.
   */
  getState() {
    return {
      isInitialized: this.isInitialized,
      config: this.config,
      subscribers: this.utils.storage.get('subscribers', [])
    };
  }

  /**
   * Reset application state for testing and debugging
   * 
   * Clears all stored data and resets initialization state.
   * Useful for testing scenarios or when users need to start fresh.
   * Use with caution in production environments.
   */
  reset() {
    this.utils.storage.clear();
    this.isInitialized = false;
    this.utils.debug.log('Application state reset');
  }
}

// Create global app instance for event handler access
// This enables onclick handlers in generated HTML to access app methods
let app;

// Initialize application when DOM is fully loaded
// Ensures all elements are available before setting up event handlers
document.addEventListener('DOMContentLoaded', () => {
  app = new ElevateRoastingApp();
  app.init();
});

// Export for testing and external use
// Supports both Node.js and browser environments
if (typeof module !== 'undefined' && module.exports) {
  module.exports = ElevateRoastingApp;
} else {
  window.ElevateRoastingApp = ElevateRoastingApp;
}
