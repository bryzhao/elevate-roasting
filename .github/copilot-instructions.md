# Elevate Roasting Website

Elevate Roasting is a static HTML website for a specialty coffee roasting business based in San Francisco. The site showcases coffee drops, subscription signup, and company information.

Always reference these instructions first and fallback to search or bash commands only when you encounter unexpected information that does not match the info here.

## Working Effectively

### Quick Start
- Serve the website locally: `python3 -m http.server 8000`
- View in browser: `http://localhost:8000`
- Stop server: `pkill -f "python3 -m http.server"`

### Technology Stack
- **Frontend**: Static HTML5 with vanilla JavaScript
- **Styling**: Tailwind CSS via CDN (no build step required)
- **Deployment**: GitHub Pages with custom domain (www.elevateroasting.com)
- **Dependencies**: None - everything loads from CDN

### Repository Structure
```
elevate-roasting/
├── index.html          # Main website file
├── README.md          # Minimal project description
├── LICENSE            # GPL license
├── CNAME              # GitHub Pages custom domain config
└── .github/
    └── copilot-instructions.md
```

## Development Workflow

### Making Changes
- **NO BUILD STEP REQUIRED** - This is a static site with CDN dependencies
- Edit `index.html` directly for all changes
- Test changes by serving locally with Python HTTP server
- All styling uses Tailwind CSS classes loaded from CDN
- JavaScript is minimal (only updates footer year)

### Local Development
1. Start local server: `cd /home/runner/work/elevate-roasting/elevate-roasting && python3 -m http.server 8000`
2. Open browser to `http://localhost:8000`
3. Make changes to `index.html`
4. Refresh browser to see changes (no build step needed)
5. Stop server when done: `pkill -f "python3 -m http.server"`

### Testing and Validation

**ALWAYS** manually test the following scenarios after making changes:

#### Core User Scenarios
1. **Navigation Testing**: Click all navigation links (About, Drops, Subscribe, Contact) - they use anchor navigation
2. **Email Subscription**: 
   - Enter email in subscription form
   - Click "Sign up" button
   - Verify alert shows "Thanks! We'll be in touch."
   - Confirm form resets after submission
3. **Coffee Details**: Click "Details" buttons on coffee cards (currently placeholder functionality)
4. **Responsive Design**: Test website at different screen sizes
5. **External Links**: Test mailto link and social media placeholders

#### Manual Validation Checklist
- [ ] Website loads without errors at `http://localhost:8000`
- [ ] All sections visible: Hero, About, Drops, Subscribe, Contact
- [ ] Navigation links scroll to correct sections
- [ ] Email form shows success alert and resets
- [ ] Coffee card details buttons are clickable
- [ ] Footer year displays current year (JavaScript working)
- [ ] Responsive layout works on mobile/desktop

### Content Areas
- **Hero Section**: Main value proposition and call-to-action buttons
- **About Section**: Company description and feature list
- **Drops Section**: Coffee product cards with pricing
- **Subscribe Section**: Email collection form (uses JavaScript alert)
- **Contact Footer**: Contact information and social links

### Key Files and Sections
- `index.html` line 15: Tailwind CSS CDN import
- `index.html` lines 115-117: Email form JavaScript
- `index.html` lines 134-136: Footer year update script
- `CNAME`: Contains custom domain configuration

## Common Tasks

### Adding New Coffee Products
1. Locate the "Drops" section (around line 70 in index.html)
2. Copy an existing `<article>` element with coffee details
3. Update the image URL, title, flavor notes, and price
4. Test that the "Details" button is clickable

### Updating Content
- **Hero Text**: Modify h1 and p elements in the hero section
- **About Information**: Update content in the "What is Elevate?" section
- **Contact Details**: Modify footer email and social links

### Styling Changes
- All styling uses Tailwind CSS classes
- No custom CSS compilation needed
- Refer to Tailwind documentation for class names
- Custom CSS variables in `<style>` section for design tokens

## Important Notes

### What NOT to do
- Do not add build tools, package.json, or npm scripts - this site intentionally has no build step
- Do not remove the Tailwind CDN script tag - styling depends on it
- Do not add complex JavaScript frameworks - keep it simple and lightweight

### Deployment
- Site auto-deploys via GitHub Pages when changes are pushed to main branch
- Custom domain configured via CNAME file
- No additional deployment steps required

### Performance Considerations
- Tailwind CSS loads from CDN (external dependency)
- Images load from Unsplash CDN
- Minimal JavaScript for optimal performance
- No build optimization needed due to simplicity

## Troubleshooting

### Common Issues
- **Website not loading locally**: Ensure Python HTTP server is running on port 8000
- **Styling missing**: Check that Tailwind CDN script tag is present and internet connection is available
- **JavaScript not working**: Check browser console for errors in minimal inline scripts

### Validation Commands
```bash
# Serve website locally
python3 -m http.server 8000

# Check if server is running
curl -I http://localhost:8000

# Stop server
pkill -f "python3 -m http.server"

# Check file structure
ls -la
```

### Expected Server Response
```
HTTP/1.0 200 OK
Server: SimpleHTTP/0.6 Python/3.12.3
Content-type: text/html
Content-Length: 7974
```

## Repository Context
- **Owner**: bryzhao/elevate-roasting
- **Main Branch**: Uses GitHub Pages for deployment
- **Custom Domain**: www.elevateroasting.com
- **License**: GPL (see LICENSE file)