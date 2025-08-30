# Elevate Roasting

Small‑batch specialty coffee, roasted at home in San Francisco. We only use high-quality beans and roast with attention to detail.

The website is open-source, to be a potential resource for other folks who may be interested in website development and software integration for artisan goods. 

## 📁 Project Structure

```
elevate-roasting/
├── index.html              # Main website file
├── subscriptions.html      # Subscription page
├── about/
│   ├── contact.html        # Contact page
│   └── our-story.html      # About page
├── coffee/
│   ├── espresso.html       # Espresso coffee page
│   └── single-origin.html  # Single origin coffee page
├── css/
│   └── styles.css          # All styles and components
├── js/
│   ├── app.js             # Main application logic
│   └── utils.js           # Utility functions
├── config/
│   └── site-config.js     # Site configuration and data
├── package.json           # Project dependencies and scripts
├── LICENSE                # GPL v3 license
├── CNAME                  # GitHub Pages custom domain
└── README.md              # This file
```

## 🛠️ Development Setup

### Prerequisites

- Python 3 (for local development server)
- Node.js (optional, for linting tools)

### Local Development

1. **Clone the repository**
   ```bash
   git clone https://github.com/bryzhao/elevate-roasting.git
   cd elevate-roasting
   ```

2. **Start development server**
   ```bash
   python3 -m http.server 8000
   # or
   npm start
   ```

3. **Open in browser**
   ```
   http://localhost:8000
   ```

### Quick Commands
- `npm start` - Start local development server
- `npm run lint` - Check code quality and syntax
- `npm test` - Run all tests (currently same as lint)

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

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is licensed under the GPL v3 License - see the [LICENSE](LICENSE) file for details.

## 📞 Contact

- **Email**: hello@elevateroasting.com
- **Instagram**: [@elevateroasting](https://instagram.com/elevateroasting)
- **GitHub**: [bryzhao/elevate-roasting](https://github.com/bryzhao/elevate-roasting)

---

Built with ❤️ in San Francisco
