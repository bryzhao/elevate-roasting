# Elevate Roasting

Small‑batch specialty coffee, roasted at home in San Francisco. We only use high-quality beans and roast with attention to detail.

## 🚀 Features

- **Modern, minimalist design** - Clean, professional coffee roasting website
- **Responsive layout** - Works perfectly on desktop, tablet, and mobile
- **Modular architecture** - Separated concerns for easy maintenance and extension
- **Future-ready** - Prepared for Instagram integration and Stripe payments
- **Accessible** - Built with accessibility best practices

## 📁 Project Structure

```
elevate-roasting/
├── index.html              # Main HTML file
├── css/
│   └── styles.css          # All styles and components
├── js/
│   ├── app.js             # Main application logic
│   └── utils.js           # Utility functions
├── config/
│   └── site-config.js     # Site configuration and data
├── assets/
│   └── images/            # Image assets (future use)
├── package.json           # Project dependencies and scripts
└── README.md              # This file
```

## 🛠️ Development Setup

### Prerequisites

- Node.js (v16 or higher)
- Python 3 (for local development server)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/elevateroasting/elevate-roasting.git
   cd elevate-roasting
   ```

2. **Install dependencies** (optional, for development tools)
   ```bash
   npm install
   ```

### Local Development

#### Start Development Server
```bash
npm start
# or
python3 -m http.server 8000
```

#### Open in Browser
```
http://localhost:8000
```

#### Run Linting
```bash
npm run lint
```

#### Run Tests
```bash
npm test
```

### Quick Commands
- `npm start` - Start local development server
- `npm run lint` - Check code quality and syntax
- `npm test` - Run all tests (currently same as lint)
- `npm run lint:css` - Check CSS syntax only
- `npm run lint:js` - Check JavaScript syntax only

## 🎨 Design System

### Colors
- **Primary**: White (`#ffffff`)
- **Secondary**: Light Gray (`#a3a3a3`)
- **Background**: Black (`#000000`)
- **Borders**: Dark Gray (`#404040`)

### Typography
- **Font Stack**: Apple system fonts with fallbacks
- **Headings**: Semibold weight with tight letter spacing
- **Body**: Regular weight with good line height

### Components
- **Buttons**: Rounded corners with hover effects
- **Cards**: Clean borders with subtle animations
- **Forms**: Minimal styling with focus states
- **Navigation**: Sticky header with smooth scrolling

## 🔧 Configuration

All site configuration is centralized in `config/site-config.js`:

- **Site metadata** - Name, description, contact info
- **Social links** - Instagram, GitHub, etc.
- **Coffee drops** - Inventory and product details
- **Subscription options** - Future Stripe integration
- **Feature flags** - Enable/disable features gradually

### Adding New Coffee Drops

Edit `config/site-config.js` and add to the `coffeeDrops` array:

```javascript
{
  id: 4,
  name: 'New Coffee Name',
  description: 'Flavor notes',
  price: '$20 / 200g',
  image: 'image-url',
  available: true,
  roastLevel: 'Medium',
  origin: 'Country',
  process: 'Process Type',
  elevation: 'Elevation Range',
  varietal: 'Coffee Varietal'
}
```

## 🚀 Future Integrations

### Instagram Integration
1. Update `config/site-config.js` with your Instagram handle
2. Implement Instagram API or embed feed
3. Add Instagram feed component to homepage

### Stripe Payment Integration
1. Set up Stripe account and get API keys
2. Enable `stripeEnabled` in feature flags
3. Implement subscription buttons with Stripe Checkout
4. Add webhook handling for payment confirmations

### Email Service Integration
1. Choose email service (Mailchimp, ConvertKit, etc.)
2. Enable `emailServiceEnabled` in feature flags
3. Replace placeholder in `app.js` with actual API calls

## 📝 Development Guidelines

### Code Style
- Use consistent indentation (2 spaces)
- Follow Google coding style guidelines
- Write clear, descriptive comments
- Use semantic HTML and CSS class names

### JavaScript
- Use ES6+ features
- Implement proper error handling
- Write modular, reusable functions
- Use TypeScript for future projects

### CSS
- Use CSS custom properties for theming
- Follow BEM methodology for class naming
- Implement responsive design patterns
- Optimize for performance

### Git Workflow
- Use descriptive commit messages
- Create feature branches for new development
- Review code before merging
- Keep commits atomic and focused

## 🧪 Testing

### Manual Testing Checklist
- [ ] Responsive design on all screen sizes
- [ ] Form validation and submission
- [ ] Navigation and smooth scrolling
- [ ] Social media links
- [ ] Coffee drop details
- [ ] Accessibility (keyboard navigation, screen readers)

### Automated Testing (Future)
- Unit tests for utility functions
- Integration tests for form handling
- Visual regression tests
- Performance testing

## 📊 Performance

### Current Optimizations
- Minified CSS and JavaScript
- Optimized images
- Efficient DOM manipulation
- Lazy loading (planned)

### Future Optimizations
- Image compression and WebP format
- Service worker for caching
- Critical CSS inlining
- Bundle splitting and code splitting

## 🔒 Security

### Current Measures
- Input validation and sanitization
- Secure form handling
- HTTPS enforcement (when deployed)

### Future Enhancements
- Content Security Policy (CSP)
- Rate limiting for forms
- CSRF protection
- Security headers

## 📈 Analytics

### Current Tracking
- Basic event logging in console
- Social media click tracking

### Future Analytics
- Google Analytics 4 integration
- Conversion tracking
- User behavior analysis
- A/B testing framework

## 🚀 Deployment

### Static Hosting
This site is designed for static hosting platforms:

- **Netlify** - Drag and drop deployment
- **Vercel** - Git-based deployment
- **GitHub Pages** - Free hosting for public repos
- **AWS S3 + CloudFront** - Scalable static hosting

### Environment Variables
Set these in your hosting platform:
- `STRIPE_PUBLIC_KEY` - For payment integration
- `EMAIL_SERVICE_API_KEY` - For email subscriptions
- `INSTAGRAM_ACCESS_TOKEN` - For Instagram feed

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 📞 Contact

- **Email**: hello@elevateroasting.com
- **Instagram**: [@elevateroasting](https://instagram.com/elevateroasting)
- **GitHub**: [elevateroasting](https://github.com/elevateroasting)

---

Built with ❤️ in San Francisco
