/**
 * Site configuration for Elevate Roasting
 * 
 * This centralized configuration object serves as the single source of truth
 * for all site data, making it easy to update content without touching
 * application logic. The structure is designed to support future integrations
 * like Stripe payments and Instagram feeds.
 * 
 * Design rationale:
 * - Separation of concerns: Content separate from presentation logic
 * - Feature flags: Enable gradual rollout of new features
 * - Extensible structure: Easy to add new coffee drops, social links, etc.
 * - Environment agnostic: Works in both browser and Node.js environments
 */

const siteConfig = {
  // Core site metadata used across the application
  // These values are used in meta tags, titles, and dynamic content
  site: {
    name: 'Elevate Roasting',
    description: 'Small‑batch specialty coffee, roasted at home in San Francisco. We only use high-quality beans and roast with attention to detail.',
    location: 'San Francisco, CA',
    email: 'hello@elevateroasting.com',
    year: new Date().getFullYear() // Dynamic year for copyright notices
  },

  // Social media configuration with fallback handling
  // URLs are set to placeholder values until real accounts are established
  // The structure supports easy addition of new platforms
  social: {
    instagram: 'https://instagram.com/elevateroasting',
    github: 'https://github.com/bryzhao/elevate-roasting',
    twitter: null, // Reserved for future use - set to null to hide from UI
    facebook: null // Reserved for future use - set to null to hide from UI
  },

  // Coffee inventory with detailed product information
  // Each drop includes comprehensive data for future e-commerce features
  // The structure supports filtering, sorting, and detailed product pages
  coffeeDrops: [
    {
      id: 1, // Unique identifier for database integration
      name: 'Kenya Nyeri – Washed',
      description: 'Blackcurrant, grapefruit, florals',
      price: '$18 / 200g',
      image: 'https://images.unsplash.com/photo-1503481766315-7a586b20f66f?q=80&w=1200&auto=format&fit=crop',
      available: true, // Controls whether "Buy" or "Sold Out" is shown
      roastLevel: 'Light', // For filtering and brewing recommendations
      origin: 'Kenya', // Geographic origin for customer education
      process: 'Washed', // Processing method affects flavor profile
      elevation: '1600-1800m', // Elevation affects bean density and flavor
      varietal: 'SL-28, SL-34' // Specific coffee varieties for connoisseurs
    },
    {
      id: 2,
      name: 'Colombia Huila – Washed',
      description: 'Stonefruit, panela, cocoa',
      price: '$16 / 200g',
      image: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?q=80&w=1200&auto=format&fit=crop',
      available: true,
      roastLevel: 'Medium',
      origin: 'Colombia',
      process: 'Washed',
      elevation: '1500-1700m',
      varietal: 'Caturra, Castillo'
    },
    {
      id: 3,
      name: 'Ethiopia Guji – Natural',
      description: 'Blueberry, bergamot, candy',
      price: '$18 / 200g',
      image: 'https://images.unsplash.com/photo-1445077100181-a33e9ac94db0?q=80&w=1200&auto=format&fit=crop',
      available: true,
      roastLevel: 'Light',
      origin: 'Ethiopia',
      process: 'Natural', // Natural process creates fruitier, more complex flavors
      elevation: '1800-2200m',
      varietal: 'Heirloom' // Ethiopian heirloom varieties are genetically diverse
    }
  ],

  // Subscription tiers for future Stripe integration
  // Pricing structure supports different customer preferences and budgets
  // The interval field enables automatic recurring billing
  subscriptionOptions: [
    {
      id: 'weekly', // Used as Stripe product ID
      name: 'Weekly',
      price: '$18',
      description: 'Fresh coffee every week',
      interval: 'week' // Maps to Stripe billing interval
    },
    {
      id: 'biweekly',
      name: 'Bi-weekly',
      price: '$32', // Slight discount for larger orders
      description: 'Fresh coffee every two weeks',
      interval: '2 weeks'
    },
    {
      id: 'monthly',
      name: 'Monthly',
      price: '$60', // Best value for regular customers
      description: 'Fresh coffee every month',
      interval: 'month'
    }
  ],

  // API endpoint configuration for future backend integration
  // Centralized API structure enables easy environment switching
  // Base URL can be changed for staging/production environments
  api: {
    baseUrl: '/api', // Relative path for same-origin requests
    endpoints: {
      subscribe: '/subscribe', // Email subscription endpoint
      coffee: '/coffee', // Coffee inventory management
      orders: '/orders' // Order processing and tracking
    }
  },

  // Feature flags for gradual rollout and A/B testing
  // Enables safe deployment of new features without breaking existing functionality
  // Can be controlled via environment variables or admin panel
  features: {
    stripeEnabled: false, // Payment processing - enable when Stripe is configured
    emailServiceEnabled: false, // Email marketing - enable when service is chosen
    instagramFeedEnabled: false, // Social media integration - enable when API is ready
    analyticsEnabled: false // User tracking - enable when analytics are configured
  }
};

// Universal module pattern for compatibility across environments
// Supports both Node.js (CommonJS) and browser (global) environments
// This enables the same config to be used in server-side rendering or build processes
if (typeof module !== 'undefined' && module.exports) {
  module.exports = siteConfig;
} else {
  // Browser environment - attach to global scope for application access
  window.siteConfig = siteConfig;
}
