# Brew & Bean - Coffee Shop QR Menu

A modern, minimalist QR code menu application for coffee shops. Built with Node.js, Express, and EJS, featuring a beautiful coffee shop design with interactive category filtering.

## ✨ Features

### Customer-Facing Menu
- **Modern Coffee Shop Design** - Warm earth tones and elegant typography
- **Interactive Category Filtering** - Hot Drinks, Cold Drinks, Food & Pastries
- **Temperature Indicators** - Visual icons for hot/cold drinks
- **Dietary Badges** - Vegan, Gluten-free, Dairy-free indicators
- **Responsive Design** - Mobile-optimized for QR code scanning
- **Smooth Animations** - Elegant transitions and hover effects
- **Loading Screen** - Beautiful coffee-themed loading animation
- **Accessibility** - Full keyboard navigation and screen reader support

### Admin Panel
- **Menu Management** - Add, edit, and delete menu items
- **Category Organization** - Organize items by type
- **Temperature Settings** - Mark items as hot or cold
- **Dietary Information** - Add dietary restrictions and preferences
- **Secure Authentication** - Simple login system for admin access

## 🚀 Quick Start

1. **Install Dependencies**
   ```bash
   npm install
   ```

2. **Start the Server**
   ```bash
   node app.js
   ```

3. **Access the Application**
   - Customer Menu: `http://localhost:3000`
   - Admin Panel: `http://localhost:3000/admin`
   - Login: `http://localhost:3000/login`

## 🔧 Admin Access

- **Username**: `test`
- **Password**: `test123`

## 📱 QR Code Usage

1. Generate a QR code pointing to your server URL
2. Display the QR code in your coffee shop
3. Customers scan to access the menu on their phones
4. Perfect for contactless menu browsing

## 🎨 Design Features

### Color Palette
- **Primary**: Rich coffee brown (#8B4513)
- **Secondary**: Caramel orange (#D2691E)
- **Accent**: Sage green (#90EE90)
- **Background**: Cream white (#FDF5E6)

### Typography
- **Headings**: Poppins (Google Fonts)
- **Body**: Inter (Google Fonts)
- **Icons**: Font Awesome 6.0

### Responsive Design
- Mobile-first approach
- Touch-friendly interface
- Optimized for portrait orientation
- Fast loading with minimal assets

## 🛠️ Technical Stack

- **Backend**: Node.js + Express.js
- **Database**: SQLite3
- **Template Engine**: EJS
- **Styling**: CSS3 with Custom Properties
- **Icons**: Font Awesome
- **Fonts**: Google Fonts (Inter, Poppins)

## 📁 Project Structure

```
menuqr/
├── app.js              # Main Express server
├── database.js         # Database initialization
├── menu.db            # SQLite database
├── package.json       # Dependencies
├── public/
│   └── style.css     # Main stylesheet
└── views/
    ├── index.ejs     # Customer menu
    ├── admin.ejs     # Admin panel
    └── login.ejs     # Login page
```

## 🎯 Key Features for Coffee Shops

### Menu Categories
- **Hot Drinks**: Espresso, Cappuccino, Latte, Americano, Mocha
- **Cold Drinks**: Iced Latte, Cold Brew, Iced Americano, Frappuccino
- **Food & Pastries**: Croissants, Muffins, Avocado Toast, Cookies, Quiche

### Customer Experience
- **Quick Scanning** - Easy to read on mobile devices
- **Category Navigation** - Filter by drink type
- **Dietary Information** - Clear dietary restriction indicators
- **Professional Presentation** - Premium coffee shop aesthetic

### Admin Features
- **Easy Management** - Simple interface for menu updates
- **Real-time Updates** - Changes appear immediately
- **Category Organization** - Keep menu organized
- **Dietary Tracking** - Manage dietary information

## 🔒 Security Notes

- Change default admin credentials in production
- Use environment variables for sensitive data
- Consider HTTPS for production deployment
- Implement proper session management

## 🚀 Deployment

### Local Development
```bash
npm install
node app.js
```

### Production Considerations
- Use environment variables for configuration
- Set up proper logging
- Configure HTTPS
- Use a process manager (PM2)
- Set up database backups

## 📱 Mobile Optimization

- Touch-friendly buttons (44px minimum)
- Fast loading times
- Optimized for portrait orientation
- Minimal scrolling required
- Clear visual hierarchy

## ♿ Accessibility

- Full keyboard navigation
- Screen reader support
- High contrast ratios
- Proper ARIA labels
- Focus indicators
- Reduced motion support

## 🎨 Customization

### Colors
Edit CSS custom properties in `public/style.css`:
```css
:root {
  --color-primary: #8B4513;      /* Main brand color */
  --color-secondary: #D2691E;    /* Accent color */
  --color-accent: #90EE90;       /* Highlight color */
  /* ... */
}
```

### Menu Items
Add new items through the admin panel or edit `database.js` for initial data.

### Branding
Update the hero section in `views/index.ejs` to match your coffee shop brand.

## 📞 Support

For questions or customization requests, please refer to the codebase documentation or contact the development team.

---

**Made with ☕ for coffee lovers everywhere** 