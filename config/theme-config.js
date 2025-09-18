/**
 * Theme Configuration for Elevate Roasting
 * 
 * This module centralizes theme management across the entire website.
 * It provides a simple API for switching themes and ensures consistency
 * across all pages without requiring individual page modifications.
 * 
 * Usage:
 * - Apply theme classes to body element: <body class="theme-light">
 * - Switch themes programmatically: ThemeManager.setTheme('light')
 * - Get current theme: ThemeManager.getCurrentTheme()
 */

const ThemeManager = {
  // Available themes
  themes: {
    light: {
      name: 'light',
      displayName: 'Light',
      bodyClass: 'theme-light',
      description: 'Light beige background with dark text for modern readability'
    },
    dark: {
      name: 'dark', 
      displayName: 'Dark',
      bodyClass: 'theme-dark',
      description: 'Dark background with light text for coffee aesthetic'
    }
  },

  // Default theme
  defaultTheme: 'light',

  /**
   * Initialize theme management
   * Sets up the default theme and handles theme persistence
   */
  init() {
    // Get saved theme from localStorage or use default
    const savedTheme = localStorage.getItem('elevate-roasting-theme') || this.defaultTheme;
    console.log('ThemeManager: Initializing with theme:', savedTheme);
    this.setTheme(savedTheme);
    
    // Add theme toggle functionality if toggle element exists
    this.setupThemeToggle();
  },

  /**
   * Set the current theme
   * @param {string} themeName - Name of the theme to apply
   */
  setTheme(themeName) {
    const theme = this.themes[themeName];
    if (!theme) {
      console.warn(`Theme '${themeName}' not found. Using default theme.`);
      return this.setTheme(this.defaultTheme);
    }

    // Remove all theme classes from body
    Object.values(this.themes).forEach(t => {
      document.body.classList.remove(t.bodyClass);
    });

    // Add the new theme class
    document.body.classList.add(theme.bodyClass);
    
    // Save to localStorage for persistence
    localStorage.setItem('elevate-roasting-theme', themeName);
    
    // Dispatch custom event for other components to listen to
    document.dispatchEvent(new CustomEvent('themeChanged', {
      detail: { theme: themeName, themeConfig: theme }
    }));

    console.log(`Theme changed to: ${theme.displayName}`);
  },

  /**
   * Get the current active theme
   * @returns {string} Current theme name
   */
  getCurrentTheme() {
    for (const [name, theme] of Object.entries(this.themes)) {
      if (document.body.classList.contains(theme.bodyClass)) {
        return name;
      }
    }
    return this.defaultTheme;
  },

  /**
   * Toggle between light and dark themes
   */
  toggleTheme() {
    const currentTheme = this.getCurrentTheme();
    const newTheme = currentTheme === 'light' ? 'dark' : 'light';
    this.setTheme(newTheme);
  },

  /**
   * Setup theme toggle button functionality
   * Looks for elements with data-theme-toggle attribute
   */
  setupThemeToggle() {
    const toggleElements = document.querySelectorAll('[data-theme-toggle]');
    
    toggleElements.forEach(element => {
      element.addEventListener('click', (e) => {
        e.preventDefault();
        this.toggleTheme();
      });
    });
  },

  /**
   * Get theme configuration for a specific theme
   * @param {string} themeName - Name of the theme
   * @returns {Object|null} Theme configuration object
   */
  getThemeConfig(themeName) {
    return this.themes[themeName] || null;
  },

  /**
   * Get all available themes
   * @returns {Object} All theme configurations
   */
  getAllThemes() {
    return { ...this.themes };
  }
};

// Auto-initialize when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => ThemeManager.init());
} else {
  ThemeManager.init();
}

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
  module.exports = ThemeManager;
} else {
  window.ThemeManager = ThemeManager;
}
