db = db.getSiblingDB('cafe-backend');

db.users.insertOne({
  email: 'admin@cafe.com',
  password: '$2a$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/LewdBPj6QJw/02qK',
  firstName: 'Admin',
  lastName: 'User',
  role: 'admin',
  isActive: true,
  createdAt: new Date(),
  updatedAt: new Date()
});

db.menucategories.insertMany([
  {
    name: 'Appetizers',
    description: 'Start your meal with our delicious appetizers',
    displayOrder: 1,
    isActive: true,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    name: 'Main Courses',
    description: 'Our signature main dishes',
    displayOrder: 2,
    isActive: true,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    name: 'Desserts',
    description: 'Sweet endings to your perfect meal',
    displayOrder: 3,
    isActive: true,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    name: 'Beverages',
    description: 'Refreshing drinks and specialty beverages',
    displayOrder: 4,
    isActive: true,
    createdAt: new Date(),
    updatedAt: new Date()
  }
]);

const appetizerCat = db.menucategories.findOne({name: 'Appetizers'});
const mainCat = db.menucategories.findOne({name: 'Main Courses'});
const dessertCat = db.menucategories.findOne({name: 'Desserts'});
const beverageCat = db.menucategories.findOne({name: 'Beverages'});

db.menuitems.insertMany([
  {
    name: 'Caesar Salad',
    description: 'Fresh romaine lettuce with our house-made caesar dressing, parmesan cheese, and croutons',
    category: appetizerCat._id,
    price: 12.99,
    isAvailable: true,
    displayOrder: 1,
    dietaryInfo: [
      {type: 'vegetarian', isApplicable: true}
    ],
    ingredients: ['romaine lettuce', 'caesar dressing', 'parmesan cheese', 'croutons'],
    allergens: ['gluten', 'dairy'],
    preparationTime: 10,
    isActive: true,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    name: 'Grilled Salmon',
    description: 'Fresh Atlantic salmon grilled to perfection, served with seasonal vegetables and lemon butter sauce',
    category: mainCat._id,
    price: 24.99,
    isAvailable: true,
    displayOrder: 1,
    ingredients: ['atlantic salmon', 'seasonal vegetables', 'lemon butter sauce', 'herbs'],
    allergens: ['fish'],
    preparationTime: 20,
    isActive: true,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    name: 'Classic Burger',
    description: 'Juicy beef patty with lettuce, tomato, onion, and our special sauce on a brioche bun',
    category: mainCat._id,
    price: 16.99,
    isAvailable: true,
    displayOrder: 2,
    ingredients: ['beef patty', 'lettuce', 'tomato', 'onion', 'special sauce', 'brioche bun'],
    allergens: ['gluten', 'dairy'],
    preparationTime: 15,
    isActive: true,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    name: 'Chocolate Lava Cake',
    description: 'Warm chocolate cake with a molten chocolate center, served with vanilla ice cream',
    category: dessertCat._id,
    price: 8.99,
    isAvailable: true,
    displayOrder: 1,
    ingredients: ['chocolate cake', 'chocolate ganache', 'vanilla ice cream'],
    allergens: ['gluten', 'dairy', 'eggs'],
    preparationTime: 15,
    isActive: true,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    name: 'House Coffee',
    description: 'Premium coffee beans brewed to perfection, available hot or iced',
    category: beverageCat._id,
    price: 3.99,
    isAvailable: true,
    displayOrder: 1,
    dietaryInfo: [
      {type: 'vegan', isApplicable: true}
    ],
    ingredients: ['coffee beans', 'water', 'milk (optional)'],
    allergens: ['dairy'],
    preparationTime: 5,
    isActive: true,
    createdAt: new Date(),
    updatedAt: new Date()
  }
]);

print('Database initialized with sample data');
print('Admin user: admin@cafe.com / password123');