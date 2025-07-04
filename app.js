const express = require('express');
const session = require('express-session');
const { db, initializeDB } = require('./database');

const app = express();
const port = process.env.PORT || 3000;

app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(session({
    secret: process.env.SESSION_SECRET || 'your-secret-key', // It's recommended to use an environment variable for this
    resave: false,
    saveUninitialized: true,
    cookie: { secure: process.env.NODE_ENV === 'production' } // Set to true if using HTTPS
}));

initializeDB();

// Middleware to check if the user is authenticated
const isAuthenticated = (req, res, next) => {
    if (req.session.user) {
        next();
    } else {
        res.redirect('/login');
    }
};

// Customer-facing menu
app.get('/', async (req, res) => {
    try {
        const result = await db.query("SELECT * FROM menu");
        const menu = result.rows.map(item => ({
            ...item,
            dietary: item.dietary ? item.dietary.split(',') : null
        }));
        res.render('index', { menu: menu });
    } catch (err) {
        console.error('Error fetching menu for customer:', err);
        res.status(500).send('Internal Server Error');
    }
});

// Admin Login
app.get('/login', (req, res) => {
    res.render('login');
});

app.post('/login', (req, res) => {
    const { username, password } = req.body;
    const adminUsername = process.env.ADMIN_USERNAME || 'test';
    const adminPassword = process.env.ADMIN_PASSWORD || 'test123';

    if (username === adminUsername && password === adminPassword) {
        req.session.user = { username };
        res.redirect('/admin');
    } else {
        res.redirect('/login');
    }
});

// Admin Logout
app.get('/logout', (req, res) => {
    req.session.destroy(err => {
        if (err) {
            return res.redirect('/admin');
        }
        res.clearCookie('connect.sid');
        res.redirect('/');
    });
});

// Admin Panel
app.get('/admin', isAuthenticated, async (req, res) => {
    try {
        const result = await db.query("SELECT * FROM menu");
        const menu = result.rows.map(item => ({
            ...item,
            dietary: item.dietary ? item.dietary.split(',') : null
        }));
        res.render('admin', { menu: menu });
    } catch (err) {
        console.error('Error fetching menu for admin:', err);
        res.status(500).send('Internal Server Error');
    }
});

// Add item (from admin panel)
app.post('/admin/add', isAuthenticated, async (req, res) => {
    const { name, description, price, category, temperature, dietary } = req.body;
    try {
        await db.query("INSERT INTO menu (name, description, price, category, temperature, dietary) VALUES ($1, $2, $3, $4, $5, $6)", [name, description, price, category, temperature, dietary]);
        res.redirect('/admin');
    } catch (err) {
        console.error('Error adding menu item:', err);
        res.status(500).send('Internal Server Error');
    }
});

// Delete item (from admin panel)
app.post('/admin/delete/:id', isAuthenticated, async (req, res) => {
    const { id } = req.params;
    try {
        await db.query("DELETE FROM menu WHERE id = $1", [id]);
        res.redirect('/admin');
    } catch (err) {
        console.error('Error deleting menu item:', err);
        res.status(500).send('Internal Server Error');
    }
});

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});
