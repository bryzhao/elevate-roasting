# Elevate Roasting

Small‑batch specialty coffee, roasted at home in San Francisco. We only use high-quality beans and roast with attention to detail.

The website is open-source, to be a potential resource for other folks who may be interested in website development and software integration for artisan goods. 

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
