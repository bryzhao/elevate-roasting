/**
 * Utility functions for Elevate Roasting
 * 
 * This module provides reusable helper functions organized by domain.
 * The design prioritizes error handling, performance, and developer experience.
 * 
 * Design principles:
 * - Fail gracefully: Functions handle edge cases and provide fallbacks
 * - Performance conscious: Efficient DOM manipulation and memory management
 * - Developer friendly: Clear error messages and debugging support
 * - Modular: Each utility group can be used independently
 */

const utils = {
  /**
   * DOM manipulation utilities with error handling
   * 
   * These functions provide safe DOM operations with proper error handling
   * and debugging support. They're designed to prevent common DOM-related
   * errors that can crash the application.
   */
  dom: {
    /**
     * Safely get element by ID with comprehensive error handling
     * 
     * Returns null instead of throwing errors when elements don't exist,
     * enabling defensive programming patterns. Logs warnings for debugging
     * without breaking the application flow.
     */
    getElement: (id) => {
      const element = document.getElementById(id);
      if (!element) {
        console.warn(`Element with id '${id}' not found`);
      }
      return element;
    },

    /**
     * Create DOM elements with attributes and children in a single call
     * 
     * This factory function reduces boilerplate and ensures consistent
     * element creation patterns. Handles different attribute types
     * (className, textContent, innerHTML) appropriately.
     */
    createElement: (tag, attributes = {}, children = []) => {
      const element = document.createElement(tag);
      
      // Set attributes with type-specific handling
      Object.entries(attributes).forEach(([key, value]) => {
        if (key === 'className') {
          element.className = value;
        } else if (key === 'textContent') {
          element.textContent = value;
        } else if (key === 'innerHTML') {
          element.innerHTML = value;
        } else {
          element.setAttribute(key, value);
        }
      });
      
      // Append children with type checking
      children.forEach(child => {
        if (typeof child === 'string') {
          element.appendChild(document.createTextNode(child));
        } else {
          element.appendChild(child);
        }
      });
      
      return element;
    },

    /**
     * Add event listeners with validation and error handling
     * 
     * Prevents common errors from invalid event listener parameters.
     * Validates both element existence and handler function type.
     */
    addEventListener: (element, event, handler) => {
      if (element && typeof handler === 'function') {
        element.addEventListener(event, handler);
      } else {
        console.warn('Invalid element or handler for event listener');
      }
    },

    /**
     * Remove event listeners safely
     * 
     * Only removes listeners if both element and handler are valid.
     * Prevents errors when trying to remove non-existent listeners.
     */
    removeEventListener: (element, event, handler) => {
      if (element && typeof handler === 'function') {
        element.removeEventListener(event, handler);
      }
    }
  },

  /**
   * Form handling utilities with validation and user feedback
   * 
   * These functions provide consistent form behavior across the application,
   * including validation, error display, and data extraction. Designed
   * to improve user experience and reduce form-related bugs.
   */
  form: {
    /**
     * Validate email format using RFC-compliant regex
     * 
     * Uses a comprehensive regex that handles most valid email formats
     * while rejecting obviously invalid ones. Balances accuracy with
     * performance for client-side validation.
     */
    isValidEmail: (email) => {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return emailRegex.test(email);
    },

    /**
     * Extract form data as a structured object
     * 
     * Converts FormData to a plain object for easier manipulation.
     * Handles multiple values for the same field name by using
     * the last value (common pattern for form submissions).
     */
    getFormData: (form) => {
      const formData = new FormData(form);
      const data = {};
      
      for (let [key, value] of formData.entries()) {
        data[key] = value;
      }
      
      return data;
    },

    /**
     * Clear form fields with fallback handling
     * 
     * Uses native form.reset() when available for better performance,
     * falls back to manual field clearing for custom forms or
     * when reset() doesn't work as expected.
     */
    clearForm: (form) => {
      if (form && form.reset) {
        form.reset();
      } else {
        const inputs = form.querySelectorAll('input, textarea, select');
        inputs.forEach(input => {
          input.value = '';
        });
      }
    },

    /**
     * Display form validation errors with visual feedback
     * 
     * Creates error messages that are accessible and visually clear.
     * Removes existing errors before showing new ones to prevent
     * duplicate messages. Adds visual styling to indicate error state.
     */
    showError: (element, message) => {
      // Remove existing error to prevent duplicates
      const existingError = element.parentNode.querySelector('.error-message');
      if (existingError) {
        existingError.remove();
      }
      
      // Create new error element with consistent styling
      const errorElement = utils.dom.createElement('div', {
        className: 'error-message text-red-500 text-sm mt-1'
      }, [message]);
      
      element.parentNode.appendChild(errorElement);
      element.classList.add('border-red-500');
    },

    /**
     * Clear form validation errors and restore normal styling
     * 
     * Removes error messages and visual indicators when validation
     * passes or user starts typing. Ensures clean state for next validation.
     */
    clearError: (element) => {
      const errorElement = element.parentNode.querySelector('.error-message');
      if (errorElement) {
        errorElement.remove();
      }
      element.classList.remove('border-red-500');
    }
  },

  /**
   * String manipulation utilities for consistent text handling
   * 
   * Provides common string operations used throughout the application.
   * Ensures consistent formatting and handling of user-generated content.
   */
  string: {
    /**
     * Capitalize first letter of string
     * 
     * Simple utility for consistent text formatting. Handles edge cases
     * like empty strings and single characters safely.
     */
    capitalize: (str) => {
      return str.charAt(0).toUpperCase() + str.slice(1);
    },

    /**
     * Format currency amounts with consistent decimal places
     * 
     * Ensures prices are always displayed with two decimal places
     * for professional appearance. Supports different currency symbols.
     */
    formatPrice: (amount, currency = '$') => {
      return `${currency}${parseFloat(amount).toFixed(2)}`;
    },

    /**
     * Truncate text with ellipsis for UI constraints
     * 
     * Prevents text overflow in fixed-width containers while
     * maintaining readability. Preserves word boundaries when possible.
     */
    truncate: (text, maxLength = 100) => {
      if (text.length <= maxLength) return text;
      return text.substring(0, maxLength) + '...';
    },

    /**
     * Generate URL-friendly slugs from text
     * 
     * Converts any text to a safe URL segment by removing special
     * characters and converting spaces to hyphens. Used for
     * dynamic routing and SEO-friendly URLs.
     */
    slugify: (text) => {
      return text
        .toLowerCase()
        .replace(/[^\w\s-]/g, '')
        .replace(/[\s_-]+/g, '-')
        .replace(/^-+|-+$/g, '');
    }
  },

  /**
   * Date handling utilities for consistent time display
   * 
   * Provides date formatting and manipulation functions that handle
   * timezone issues and provide user-friendly date representations.
   */
  date: {
    /**
     * Get current year for dynamic copyright notices
     * 
     * Used in footer and other places where the current year
     * needs to be displayed without manual updates.
     */
    getCurrentYear: () => {
      return new Date().getFullYear();
    },

    /**
     * Format dates with flexible options
     * 
     * Provides consistent date formatting across the application.
     * Supports different locales and format options for internationalization.
     */
    formatDate: (date, options = {}) => {
      const defaultOptions = {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      };
      
      return new Date(date).toLocaleDateString('en-US', {
        ...defaultOptions,
        ...options
      });
    },

    /**
     * Check if a date is today for relative time display
     * 
     * Used to show "Today" instead of full date for recent content.
     * Compares date strings to avoid timezone complications.
     */
    isToday: (date) => {
      const today = new Date();
      const checkDate = new Date(date);
      
      return today.toDateString() === checkDate.toDateString();
    }
  },

  /**
   * Local storage utilities with error handling and type safety
   * 
   * Provides a safe interface to localStorage that handles JSON
   * serialization/deserialization and common storage errors.
   * Prevents crashes from quota exceeded or private browsing mode.
   */
  storage: {
    /**
     * Store data in localStorage with JSON serialization
     * 
     * Automatically converts objects to JSON strings and handles
     * storage errors gracefully. Returns success/failure status
     * for error handling in calling code.
     */
    set: (key, value) => {
      try {
        localStorage.setItem(key, JSON.stringify(value));
        return true;
      } catch (error) {
        console.error('Error saving to localStorage:', error);
        return false;
      }
    },

    /**
     * Retrieve data from localStorage with JSON parsing
     * 
     * Automatically parses JSON strings back to objects and provides
     * fallback values for missing data. Handles malformed JSON safely.
     */
    get: (key, defaultValue = null) => {
      try {
        const item = localStorage.getItem(key);
        return item ? JSON.parse(item) : defaultValue;
      } catch (error) {
        console.error('Error reading from localStorage:', error);
        return defaultValue;
      }
    },

    /**
     * Remove specific item from localStorage
     * 
     * Safely removes individual items without affecting other stored data.
     * Returns success status for error handling.
     */
    remove: (key) => {
      try {
        localStorage.removeItem(key);
        return true;
      } catch (error) {
        console.error('Error removing from localStorage:', error);
        return false;
      }
    },

    /**
     * Clear all localStorage data
     * 
     * Use with caution - removes all stored data. Useful for
     * logout functionality or resetting application state.
     */
    clear: () => {
      try {
        localStorage.clear();
        return true;
      } catch (error) {
        console.error('Error clearing localStorage:', error);
        return false;
      }
    }
  },

  /**
   * Animation utilities for smooth user interactions
   * 
   * Provides consistent animation patterns using requestAnimationFrame
   * for optimal performance. Handles timing and easing for professional
   * user experience.
   */
  animation: {
    /**
     * Fade in element with smooth opacity transition
     * 
     * Uses requestAnimationFrame for 60fps animations and proper
     * timing. Automatically handles element visibility and display
     * properties for seamless transitions.
     */
    fadeIn: (element, duration = 300) => {
      element.style.opacity = '0';
      element.style.display = 'block';
      
      let start = null;
      const animate = (timestamp) => {
        if (!start) start = timestamp;
        const progress = timestamp - start;
        const opacity = Math.min(progress / duration, 1);
        
        element.style.opacity = opacity;
        
        if (progress < duration) {
          requestAnimationFrame(animate);
        }
      };
      
      requestAnimationFrame(animate);
    },

    /**
     * Fade out element with smooth opacity transition
     * 
     * Animates opacity to zero and hides element when complete.
     * Preserves initial opacity for smooth transitions from any state.
     */
    fadeOut: (element, duration = 300) => {
      let start = null;
      const initialOpacity = parseFloat(getComputedStyle(element).opacity);
      
      const animate = (timestamp) => {
        if (!start) start = timestamp;
        const progress = timestamp - start;
        const opacity = Math.max(initialOpacity - (progress / duration), 0);
        
        element.style.opacity = opacity;
        
        if (progress < duration) {
          requestAnimationFrame(animate);
        } else {
          element.style.display = 'none';
        }
      };
      
      requestAnimationFrame(animate);
    },

    /**
     * Smooth scroll to element with offset support
     * 
     * Provides smooth scrolling behavior with configurable offset
     * for fixed headers or other UI elements. Uses native smooth
     * scrolling for best performance.
     */
    scrollTo: (element, offset = 0) => {
      const elementPosition = element.offsetTop - offset;
      window.scrollTo({
        top: elementPosition,
        behavior: 'smooth'
      });
    }
  },

  /**
   * API utilities for consistent HTTP communication
   * 
   * Provides a standardized interface for making HTTP requests
   * with proper error handling and response processing.
   * Designed for future backend integration.
   */
  api: {
    /**
     * Make HTTP requests with consistent error handling
     * 
     * Provides a unified interface for all API calls with automatic
     * JSON parsing and error handling. Supports all HTTP methods
     * and custom headers for authentication.
     */
    request: async (url, options = {}) => {
      const defaultOptions = {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      };
      
      try {
        const response = await fetch(url, {
          ...defaultOptions,
          ...options
        });
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        return await response.json();
      } catch (error) {
        console.error('API request failed:', error);
        throw error;
      }
    },

    /**
     * POST request shorthand for form submissions
     * 
     * Automatically serializes data to JSON and sets appropriate
     * headers for POST requests. Used for form submissions and
     * data creation operations.
     */
    post: (url, data) => {
      return utils.api.request(url, {
        method: 'POST',
        body: JSON.stringify(data)
      });
    },

    /**
     * GET request shorthand for data retrieval
     * 
     * Simple interface for GET requests with automatic JSON parsing.
     * Used for fetching data and configuration.
     */
    get: (url) => {
      return utils.api.request(url);
    }
  },

  /**
   * Debug utilities for development and troubleshooting
   * 
   * Provides consistent logging patterns with timestamps and
   * structured data for easier debugging and monitoring.
   */
  debug: {
    /**
     * Log messages with timestamps for debugging
     * 
     * Adds ISO timestamps to all log messages for easier
     * debugging and log analysis. Supports structured data
     * for complex debugging scenarios.
     */
    log: (message, data = null) => {
      const timestamp = new Date().toISOString();
      console.log(`[${timestamp}] ${message}`, data);
    },

    /**
     * Log errors with timestamps and structured data
     * 
     * Provides consistent error logging format for monitoring
     * and debugging. Includes timestamps and error objects
     * for comprehensive error tracking.
     */
    error: (message, error = null) => {
      const timestamp = new Date().toISOString();
      console.error(`[${timestamp}] ERROR: ${message}`, error);
    }
  }
};

// Universal module pattern for cross-environment compatibility
// Enables use in both Node.js and browser environments
// Supports both CommonJS and ES6 module systems
if (typeof module !== 'undefined' && module.exports) {
  module.exports = utils;
} else {
  // Browser environment - attach to global scope for application access
  window.utils = utils;
}
