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
                        ['Espresso', 'إسبريسو', null, 8.00, 'hot', 'hot', null, 5, null],
                        ['Espresso Macchiato', 'اسبريسو ميكاتو', null, 10.00, 'hot', 'hot', null, 72, null],
                        ['Espresso Lungo', 'إسبريسو لونغو', null, 10.00, 'hot', 'hot', null, 5, null],
                        ['Cortado', 'كورتادو', null, 10.00, 'hot', 'hot', null, 54, null],
                        ['Latte', 'ايس لاتيه', null, 10.00, 'hot', 'hot', null, 150, null],
                        ['Cappuccino', 'كابتشينو', null, 10.00, 'hot', 'hot', null, 138, null],
                        ['Flat White', 'فلات وايت', null, 10.00, 'hot', 'hot', null, 94, null],
                        ['Spanish Latte', 'ايس سبانيش لاتيه', null, 10.00, 'hot', 'hot', null, 254, null],
                        ['Pistachio Latte', 'بستاشيو لاتيه', null, 10.00, 'hot', 'hot', null, 360, null],
                        ['Trsk Signature', 'ترسك سيجنتشر', null, 10.00, 'hot', 'hot', null, 243, null],
                        ['Hot Chocolate', 'هوت شوكلت', null, 10.00, 'hot', 'hot', null, 339, null],
                        ['Saudi Coffee', 'قهوة سعودية', null, 8.00, 'hot', 'hot', null, 27, null],
                        ['Matcha Latte', 'ماتشا لاتيه', null, 12.00, 'hot', 'hot', null, 175, null],
                        
                        // Cold Drinks (Ice Coffee + Ice Tea)
                        ['Iced Spanish Latte', 'سبانيش لاتيه بارد', null, 16.00, 'cold', 'cold', null, 340, null],
                        ['Iced Latte', 'لاتيه بارد', null, 12.00, 'cold', 'cold', null, 280, null],
                        ['Iced Pistachio', 'ايس بستاشيو لاتيه', null, 16.00, 'cold', 'cold', null, 360, null],
                        ['Iced Cappuccino', 'ايس كابتشينو', null, 14.00, 'cold', 'cold', null, 190, null],
                        ['Iced Lungo', 'ايس اسبريسو لونغو', null, 12.00, 'cold', 'cold', null, 437, null],
                        ['Iced Matcha Latte', 'ايس ماتشا لاتيه', null, 16.00, 'cold', 'cold', null, 560, null],
                        ['Hibiscus Iced Tea', 'ايس تي كركدية', null, 9.00, 'cold', 'cold', null, 374, null],
                        ['Peach Iced Tea', 'ايس تي خوخ', null, 12.00, 'cold', 'cold', null, 180, null],
                        ['Ocean Mojito', 'موهيتو بلو اوشن', null, 12.00, 'cold', 'cold', null, 145, null],
                        ['Watermelon Mojito', 'موهيتو بطيخ', null, 12.00, 'cold', 'cold', null, 323, null],
                        ['Maracujá Mojito', 'موهيتو باشن فروت', null, 12.00, 'cold', 'cold', null, 160, null],
                        
                        // Black Coffee
                        ['Coffee of the Day: Hot', 'قهوة اليوم حار', null, 8.00, 'black', 'hot', null, 8, null],
                        ['Coffee of the Day: Iced', 'قهوه اليوم بارد', null, 8.00, 'black', 'cold', null, 8, null],
                        ['V60 - Hot', 'حار V60 قهوة مقطرة', null, 16.00, 'black', 'hot', null, 8, null],
                        ['V60 - Iced', 'بارد V60 قهوة مقطرة', null, 16.00, 'black', 'cold', null, 8, null],
                        ['Americano', 'أمريكانو', null, 12.00, 'black', 'hot', null, 11, null],
                        ['Iced Americano', 'ايس امريكانو', null, 12.00, 'black', 'cold', null, 11, null],
                        
                        // Desserts
                        ['Tiramisu', 'تيراميسو', null, 22.00, 'dessert', null, null, 200, 'Milk, Eggs, Gluten'],
                        ['San Sebastian', 'سان سيباستيان', null, 22.00, 'dessert', null, null, 142, 'Milk, Eggs'],
                        ['Cheese Cake', 'تشيز كيك', null, 20.00, 'dessert', null, null, 160, 'Milk, Eggs'],
                        ['Tamur Cake', 'كيك تمر', null, 18.00, 'dessert', null, null, 160, 'Milk, Eggs'],
                        ['Trsk Cake', 'كيك ترسك', null, 22.00, 'dessert', null, null, 157, 'Milk, Eggs, Gluten'],
                        ['French Toast', 'توست فرنسي', 'Classic French toast with maple syrup (Choose 1 sauce) - (صوص واحد من اختيارك)', 18.00, 'dessert', null, null, 310, 'Milk, Eggs, Gluten'],
                        ['Waffle', 'وافل', null, 18.00, 'dessert', null, null, 290, 'Milk, Eggs, Gluten'],
                        
                        // Beverages
                        ['Water 330 mL', 'ماء 330 مل', 'Pure drinking water (3 SAR when adding any sauce) - ثلاثة ريال عند اضافة اي صوص', 1.00, 'beverages', null, null, 0, null]
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