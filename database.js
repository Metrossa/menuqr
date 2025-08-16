const sqlite3 = require('sqlite3').verbose();
const path = require('path');

// Create SQLite database file in the project directory
const dbPath = path.join(__dirname, 'menuqr.db');
const db = new sqlite3.Database(dbPath);

const initializeDB = async () => {
    return new Promise((resolve, reject) => {
        // Create the menu table if it doesn't exist
        db.run(`
            CREATE TABLE IF NOT EXISTS menu (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                name TEXT,
                arabic_name TEXT,
                description TEXT,
                price REAL,
                category TEXT,
                temperature TEXT,
                dietary TEXT,
                calories INTEGER,
                allergens TEXT
            )
        `, (err) => {
            if (err) {
                console.error('Error creating table:', err);
                reject(err);
                return;
            }

            // Check if the menu is empty
            db.get("SELECT COUNT(*) as count FROM menu", (err, row) => {
                if (err) {
                    console.error('Error checking menu count:', err);
                    reject(err);
                    return;
                }

                if (row.count === 0) {
                    console.log('Seeding database...');
                    const items = [
                        // Hot Coffee
                        ['Espresso', 'إسبريسو', 'Single shot of premium Italian espresso', 8.00, 'hot', 'hot', null, 5, null],
                        ['Espresso Macchiato', 'اسبريسو ميكاتو', 'Espresso with a dash of steamed milk', 10.00, 'hot', 'hot', null, 72, null],
                        ['Espresso Lungo', 'إسبريسو لونغو', 'Long shot espresso with more water', 10.00, 'hot', 'hot', null, 5, null],
                        ['Cortado', 'كورتادو', 'Espresso cut with a dash of milk', 10.00, 'hot', 'hot', null, 54, null],
                        ['Latte', 'لاتيه', 'Espresso with steamed milk and a light layer of foam', 10.00, 'hot', 'hot', null, 150, null],
                        ['Cappuccino', 'كابتشينو', 'Espresso with steamed milk and foam', 10.00, 'hot', 'hot', null, 138, null],
                        ['Flat White', 'فلات وايت', 'Espresso with velvety microfoam', 10.00, 'hot', 'hot', null, 94, null],
                        ['Spanish Latte', 'سبانيش لاتيه', 'Espresso, milk, and a touch of sweetness', 10.00, 'hot', 'hot', null, 254, null],
                        ['Pistachio Latte', 'فستق لاتيه', 'Creamy latte with pistachio flavor', 10.00, 'hot', 'hot', null, 360, null],
                        ['Trsk Signature', 'ترسك سيجنتشر', 'Our signature coffee blend', 10.00, 'hot', 'hot', null, 243, null],
                        ['Hot Chocolate', 'شوكولاتة ساخنة', 'Rich and creamy hot chocolate', 10.00, 'hot', 'hot', null, 339, null],
                        ['Saudi Coffee', 'قهوة سعودية', 'Traditional Saudi coffee', 8.00, 'hot', 'hot', null, 27, null],
                        ['Matcha Latte', 'ماتشا لاتيه', 'Green tea latte with steamed milk', 12.00, 'hot', 'hot', null, 175, null],
                        
                        // Cold Drinks (Ice Coffee + Ice Tea)
                        ['Iced Spanish Latte', 'سبانيش لاتيه بارد', 'Chilled Spanish latte over ice', 16.00, 'cold', 'cold', null, 340, null],
                        ['Iced Latte', 'لاتيه بارد', 'Espresso with cold milk over ice', 12.00, 'cold', 'cold', null, 280, null],
                        ['Iced Pistachio', 'فستق بارد', 'Iced pistachio latte', 16.00, 'cold', 'cold', null, 360, null],
                        ['Iced Cappuccino', 'كابتشينو بارد', 'Iced cappuccino with foam', 14.00, 'cold', 'cold', null, 190, null],
                        ['Iced Lungo', 'لونغو بارد', 'Iced long shot', 12.00, 'cold', 'cold', null, 437, null],
                        ['Iced Matcha Latte', 'ماتشا لاتيه بارد', 'Iced green tea latte', 16.00, 'cold', 'cold', null, 560, null],
                        ['Hibiscus Iced Tea', 'شاي كركديه بارد', 'Refreshing hibiscus iced tea', 9.00, 'cold', 'cold', null, 374, null],
                        ['Peach Iced Tea', 'شاي خوخ بارد', 'Peach flavored iced tea', 12.00, 'cold', 'cold', null, 180, null],
                        ['Ocean Mojito', 'موهيتو أزرق', 'Blue ocean mojito mocktail', 12.00, 'cold', 'cold', null, 145, null],
                        ['Watermelon Mojito', 'موهيتو بطيخ', 'Watermelon mojito mocktail', 12.00, 'cold', 'cold', null, 323, null],
                        ['Maracujá Mojito', 'موهيتو ماراكوجا', 'Passion fruit mojito mocktail', 12.00, 'cold', 'cold', null, 160, null],
                        
                        // Black Coffee
                        ['Coffee of the Day: Hot', 'قهوة اليوم: ساخنة', 'Today\'s special hot coffee', 8.00, 'black', 'hot', null, 8, null],
                        ['Coffee of the Day: Iced', 'قهوة اليوم: باردة', 'Today\'s special iced coffee', 8.00, 'black', 'cold', null, 8, null],
                        ['V60 - Hot', 'مقطرة حار', 'Pour-over coffee brewed with V60 method', 16.00, 'black', 'hot', null, 8, null],
                        ['V60 - Iced', 'مقطرة بارد', 'Cold brew using V60 method', 16.00, 'black', 'cold', null, 8, null],
                        ['Americano', 'أمريكانو', 'Espresso with hot water', 12.00, 'black', 'hot', null, 11, null],
                        ['Iced Americano', 'أمريكانو بارد', 'Espresso with cold water over ice', 12.00, 'black', 'cold', null, 11, null],
                        
                        // Desserts
                        ['Tiramisu', 'تيراميسو', 'Classic Italian coffee-flavored dessert', 22.00, 'dessert', null, null, 200, 'Milk, Eggs, Gluten'],
                        ['San Sebastian', 'سان سيباستيان', 'Delicious pastry creation', 22.00, 'dessert', null, null, 142, 'Milk, Eggs'],
                        ['Cheese Cake', 'تشيز كيك', 'Creamy New York style cheesecake', 20.00, 'dessert', null, null, 160, 'Milk, Eggs'],
                        ['Tamur Cake', 'كيك تمر', 'Date cake with traditional flavors', 18.00, 'dessert', null, null, 160, 'Milk, Eggs'],
                        ['Trsk Cake', 'كيك ترسك', 'Our signature cake creation', 22.00, 'dessert', null, null, 157, 'Milk, Eggs, Gluten'],
                        ['French Toast', 'توست فرنسي', 'Classic French toast with maple syrup', 18.00, 'dessert', null, null, 310, 'Milk, Eggs, Gluten'],
                        ['Waffle', 'وافل', 'Crispy Belgian waffle with maple syrup', 18.00, 'dessert', null, null, 290, 'Milk, Eggs, Gluten'],
                        
                        // Beverages
                        ['Water 330 mL', 'ماء 330 مل', 'Pure drinking water', 1.00, 'beverages', null, null, 0, null]
                    ];

                    const stmt = db.prepare("INSERT INTO menu (name, arabic_name, description, price, category, temperature, dietary, calories, allergens) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)");
                    
                    items.forEach(item => {
                        stmt.run(item);
                    });
                    
                    stmt.finalize((err) => {
                        if (err) {
                            console.error('Error seeding database:', err);
                            reject(err);
                        } else {
                            console.log('Database seeded.');
                            resolve();
                        }
                    });
                } else {
                    resolve();
                }
            });
        });
    });
};

// Helper function to run queries and return promises
const query = (sql, params = []) => {
    return new Promise((resolve, reject) => {
        db.all(sql, params, (err, rows) => {
            if (err) {
                reject(err);
            } else {
                resolve({ rows });
            }
        });
    });
};

// Helper function to run single queries (for INSERT, UPDATE, DELETE)
const run = (sql, params = []) => {
    return new Promise((resolve, reject) => {
        db.run(sql, params, function(err) {
            if (err) {
                reject(err);
            } else {
                resolve({ lastID: this.lastID, changes: this.changes });
            }
        });
    });
};

module.exports = { db, initializeDB, query, run };