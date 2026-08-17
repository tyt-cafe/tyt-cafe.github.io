/**
 * TYT – Take Your Time | Menu Data
 * -----------------------------------------------------------------
 * Every name, description and price below was transcribed directly
 * from the café's printed menu photo. Nothing here was invented.
 * A few words on the original menu were hard to read clearly —
 * those items carry a `note` field explaining exactly what was
 * uncertain, instead of silently guessing.
 *
 * TO EDIT THE MENU: change the values in this file only. Every
 * price is in EGP (Egyptian Pounds) as printed on the menu.
 * -----------------------------------------------------------------
 */

const MENU_DATA = [
  {
    id: "hot-coffee",
    name: "Hot Coffee",
    icon: "coffee",
    items: [
      { name: "Single Espresso", price: 40 },
      { name: "Double Espresso", price: 55 },
      { name: "American Coffee", price: 55 },
      { name: "Cappuccino", price: 65 },
      { name: "Latte", price: 65 },
      { name: "Cortado", price: 65 },
      { name: "Spanish Latte", price: 80 },
      { name: "Macchiato", price: 40 },
      { name: "Nutella Coffee", price: 75, description: "Espresso · Nutella · whipped cream · cone biscuit" },
      { name: "Lotus Coffee", price: 80, description: "Espresso · lotus sauce · whipped cream · lotus biscuit" },
      { name: "Flat White", price: 70 },
      { name: "Pistachio Coffee", price: 85, description: "Espresso · pistachio sauce · whipped cream · nuts" },
      { name: "Hot Mocha", price: 65 },
      { name: "White Mocha", price: 65 },
      { name: "Turkish Coffee", price: 35 },
      { name: "Turkish Coffee Double", price: 45 },
      { name: "Turkish Coffee With Milk", price: 45 },
      { name: "Turkish Coffee With Flavors", price: 50 },
      { name: "Nescafé", price: 65 },
      {
        name: "TYT Caffè",
        price: 85,
        description: "Peanut butter · white chocolate sauce · chocolate powder · milk · single shot espresso",
        note: "Description printed across two lines on the menu — order transcribed as best as legible."
      }
    ]
  },
  {
    id: "iced-coffee",
    name: "Iced Coffee",
    icon: "iced",
    items: [
      { name: "Iced Latte", price: 75 },
      { name: "Iced Spanish Latte", price: 75 },
      { name: "Iced Cappuccino", price: 60 },
      { name: "Iced Mocha", price: 75 },
      { name: "Iced White Mocha", price: 75 },
      { name: "Matcha Latte", price: 90 },
      { name: "Caramel Macchiato", price: 75 },
      { name: "Salted Caramel Latte", price: 80 },
      { name: "Spanish Matcha", price: 80, description: "Milk · condensed milk · matcha" },
      { name: "Strawberry Matcha", price: 80, description: "Strawberry · matcha · milk · ice" },
      { name: "Mango Matcha", price: 80, description: "Mango · matcha · milk · ice" },
      { name: "Bottle Iced Spanish Latte", price: 95 },
      { name: "Boba Iced Coffee", price: 95, description: "Boba · iced coffee milk · espresso" }
    ]
  },
  {
    id: "specialty-coffee",
    name: "Specialty Coffee",
    icon: "bean",
    description: "Specialty coffee beans",
    items: [
      { name: "V60", price: 120, description: "Hot or cold" },
      { name: "Syphon", price: 120, description: "Hot or cold" },
      { name: "Chemex", price: 120, description: "Hot or cold" },
      { name: "Cold Brew", price: 110 },
      { name: "Aeropress", price: 120, description: "Hot or cold" },
      { name: "French Press", price: 80 }
    ]
  },
  {
    id: "hot-non-coffee",
    name: "Hot Non-Coffee",
    icon: "tea",
    items: [
      { name: "Red Tea", price: 25 },
      { name: "Green Tea", price: 25 },
      { name: "Flavored Tea", price: 35 },
      { name: "Anise", price: 25 },
      { name: "Mint", price: 25 },
      { name: "Herbal Cocktail", price: 45, description: "Anise · fresh mint · lemon · honey" },
      { name: "Apple Cider", price: 45, description: "Apple juice · cinnamon sticks" },
      { name: "Hot Chocolate", price: 70, description: "Chocolate powder · whipped cream · milk" },
      { name: "Hot Avocado", price: 70, description: "Avocado · vanilla ice cream" },
      { name: "Hot Lotus", price: 85, description: "Lotus sauce · milk · caramel flavor · whipped cream" }
    ]
  },
  {
    id: "fresh-juices",
    name: "Fresh Juices",
    icon: "citrus",
    items: [
      { name: "Mango", price: 70 },
      { name: "Guava", price: 70 },
      { name: "Strawberry", price: 75 },
      { name: "Orange", price: 75 },
      { name: "Lemon or Lemon Mint", price: 55, description: "Fresh mint · lime · mint flavor" },
      { name: "Alaska Cocktail", price: 75, description: "Pineapple · peach · fresh mint · pineapple slice" },
      { name: "Mango Peach Cocktail", price: 80, description: "Fresh mint · lime · mango" }
    ]
  },
  {
    id: "smoothies",
    name: "Smoothies",
    icon: "smoothie",
    items: [
      { name: "Smooth Lemon Mint", price: 80, description: "Fresh mint · milk" },
      { name: "TYT Smoothie", price: 85 },
      { name: "Smoothie Mixed Berry", price: 85, description: "Mixed berries" },
      { name: "Smoothie Passion Fruit", price: 85, description: "Passion fruit" },
      { name: "Smoothie Piña Colada", price: 85, description: "Blue curaçao · coconut flavor · pineapple · pineapple slice" },
      { name: "Smoothie Blueberry", price: 85, description: "Blueberry" }
    ]
  },
  {
    id: "milkshakes",
    name: "Milkshakes",
    icon: "shake",
    items: [
      { name: "Vanilla Shake", price: 85, description: "Ice cream · milk · whipped cream" },
      { name: "Blueberry Vanilla Shake", price: 90, description: "Ice cream · blueberry · milk · whipped cream" },
      { name: "Strawberry Shake", price: 85, description: "Ice cream · milk · whipped cream" },
      { name: "Pistachio Shake", price: 95, description: "Pistachio sauce · milk · whipped cream" },
      {
        name: "Cake Shake",
        price: 105,
        description: "Ice cream · whipped cream · dessert of your choice",
        note: "Menu lists this as add a dessert of your choice — the specific dessert options aren't specified on the menu."
      },
      { name: "Cookies Shake", price: 105, description: "Cookies-flavor ice cream · whipped cream" },
      { name: "Mango Shake", price: 85, description: "Ice cream · mango · whipped cream" },
      { name: "Oreo Shake", price: 90, description: "Ice cream · Oreo · whipped cream" }
    ]
  },
  {
    id: "coffee-frappe",
    name: "Coffee Frappé",
    icon: "frappe",
    items: [
      { name: "Vanilla Coffee Frappé", price: 95, description: "Vanilla flavor · milk · whipped cream" },
      { name: "Caramel Frappé", price: 95, description: "Caramel flavor · milk · caramel sauce · whipped cream" },
      { name: "Mocha Frappé", price: 105, description: "Chocolate powder · milk · chocolate sauce · whipped cream" },
      { name: "Lotus Frappé", price: 95, description: "Lotus sauce · milk · lotus biscuit · whipped cream" },
      { name: "Cookies Frappé", price: 105, description: "Cookies flavor · milk · chocolate powder · whipped cream" },
      {
        name: "TYT Frappé",
        price: 105,
        description: "Milk · caramel sauce · whipped cream · condensed milk",
        note: "One word in the flavor description was not clearly legible on the menu photo and has been left out rather than guessed."
      },
      { name: "White Mocha Frappé", price: 95, description: "White chocolate sauce · milk · caramel sauce · whipped cream" },
      { name: "Irish Frappé", price: 105, description: "Irish flavor · milk · caramel sauce · whipped cream" }
    ]
  },
  {
    id: "non-coffee-frappe",
    name: "Non-Coffee Frappé",
    icon: "frappe",
    items: [
      { name: "Vanilla Frappé", price: 95 },
      { name: "Strawberry Frappé", price: 95, description: "Strawberry · milk" },
      { name: "Mango Frappé", price: 95, description: "Mango · milk" },
      { name: "Blueberry Frappé", price: 100, description: "Blueberry · milk" },
      { name: "Passion Frappé", price: 95, description: "Passion fruit · milk" }
    ]
  },
  {
    id: "soda-soft-drinks",
    name: "Refresh Soda & Soft Drinks",
    icon: "soda",
    items: [
      { name: "Soft Drink", price: 85 },
      { name: "Red Bull", price: 90 },
      { name: "Mojito Soda", price: 95, description: "Lime soda · mint flavor · mojito flavor · fresh mint · lime" },
      { name: "Red Bull Coffee", price: 85, description: "Single shot espresso" },
      { name: "Red Bull Mix Berry", price: 95, description: "Mixed berries" },
      { name: "Scotch Mint", price: 105, description: "Lime soda · mint flavor · lime" },
      { name: "Sunshine", price: 105, description: "Lime soda · pomegranate flavor · orange · lime" },
      {
        name: "Cherry Cola",
        price: 85,
        description: "Cherry flavor · cola",
        note: "The second ingredient word was unclear on the menu photo — shown here as \"cola,\" the most likely reading."
      },
      { name: "Boba Soda", price: 90, description: "Lime soda · boba · fresh mint · lime" }
    ]
  },
  {
    id: "croissant",
    name: "Croissant",
    icon: "croissant",
    items: [
      { name: "Plain Croissant", price: 60 },
      { name: "Cheese Croissant", price: 70 },
      { name: "Turkey Cheese Croissant", price: 130 }
    ]
  },
  {
    id: "extras",
    name: "Extras",
    icon: "extra",
    description: "Add to any drink",
    items: [
      { name: "Shot", price: 25 },
      { name: "Sauce", price: 25 },
      { name: "Flavor", price: 25 },
      { name: "Ice Cream", price: 30 },
      { name: "Honey", price: 30 },
      { name: "Whipped Cream", price: 35 },
      { name: "Nuts", price: 25 },
      { name: "Nutella", price: 25 },
      { name: "Milk", price: 25 }
    ]
  }
];

// Flat list of items that carry an uncertainty note — surfaced quietly
// in the admin/editor comment above, not shown to site visitors.
const MENU_NOTES = MENU_DATA.flatMap((cat) =>
  cat.items.filter((i) => i.note).map((i) => ({ category: cat.name, item: i.name, note: i.note }))
);
