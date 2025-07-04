const { Pool } = require('pg');

// Connect to PostgreSQL using the DATABASE_URL environment variable
const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: {
        rejectUnauthorized: false
    }
});

const initializeDB = async () => {
    try {
        // Create the menu table if it doesn't exist
        await pool.query(`
            CREATE TABLE IF NOT EXISTS menu (
                id SERIAL PRIMARY KEY,
                name TEXT,
                description TEXT,
                price REAL,
                category TEXT,
                temperature TEXT,
                dietary TEXT
            )
        `);

        // Check if the menu is empty
        const result = await pool.query("SELECT COUNT(*) as count FROM menu");
        if (result.rows[0].count === '0') {
            console.log('Seeding database...');
            const items = [
                // Hot Drinks
                ['Espresso', 'Single shot of premium Italian espresso', 3.50, 'hot', 'hot', null],
                ['Cappuccino', 'Espresso with steamed milk and foam', 4.50, 'hot', 'hot', null],
                ['Latte', 'Espresso with steamed milk and a light layer of foam', 4.75, 'hot', 'hot', null],
                ['Americano', 'Espresso with hot water', 3.75, 'hot', 'hot', null],
                ['Mocha', 'Espresso with chocolate and steamed milk', 5.25, 'hot', 'hot', null],
                // Cold Drinks
                ['Iced Latte', 'Espresso with cold milk over ice', 4.75, 'cold', 'cold', null],
                ['Cold Brew', 'Smooth 18-hour cold brewed coffee', 4.50, 'cold', 'cold', null],
                ['Iced Americano', 'Espresso with cold water over ice', 3.75, 'cold', 'cold', null],
                ['Frappuccino', 'Blended coffee drink with milk and ice', 5.50, 'cold', 'cold', null],
                // Food & Pastries
                ['Croissant', 'Buttery French croissant', 3.25, 'food', null, 'vegetarian'],
                ['Blueberry Muffin', 'Fresh baked muffin with wild blueberries', 3.50, 'food', null, 'vegetarian'],
                ['Avocado Toast', 'Sourdough toast with avocado, sea salt, and red pepper flakes', 8.50, 'food', null, 'vegan,gluten-free'],
                ['Chocolate Chip Cookie', 'Warm chocolate chip cookie', 2.75, 'food', null, 'vegetarian'],
                ['Quiche Lorraine', 'Classic quiche with bacon, cheese, and herbs', 9.25, 'food', null, 'gluten-free']
            ];

            const query = "INSERT INTO menu (name, description, price, category, temperature, dietary) VALUES ($1, $2, $3, $4, $5, $6)";
            
            for (const item of items) {
                await pool.query(query, item);
            }
            console.log('Database seeded.');
        }
    } catch (err) {
        console.error('Error initializing database', err);
    }
};

module.exports = { db: pool, initializeDB };