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
      {
        name: "Cappuccino",
        price: 75,
        note: "Price corrected to 75 EGP after checking the café's live POS screen — the printed menu had listed 65."
      },
      { name: "Latte", price: 65 },
      { name: "Cortado", price: 65 },
      { name: "Spanish Latte", price: 80, image: "images/menu/spanish-latte.jpg" },
      { name: "Macchiato", price: 40 },
      { name: "Nutella Coffee", price: 75, description: "Espresso · Nutella · whipped cream · cone biscuit" },
      { name: "Lotus Coffee", price: 80, description: "Espresso · lotus sauce · whipped cream · lotus biscuit" },
      { name: "Flat White", price: 70 },
      { name: "Pistachio Coffee", price: 85, description: "Espresso · pistachio sauce · whipped cream · nuts" },
      { name: "Hot Mocha", price: 65 },
      { name: "White Mocha", price: 65 },
      { name: "Turkish Coffee", price: 35 },
      { name: "Turkish Coffee Double", price: 45 },
      {
        name: "Turkish Coffee With Milk",
        price: 50,
        note: "Price corrected to 50 EGP after checking the café's live POS screen — the printed menu had listed 45."
      },
      { name: "Turkish Coffee With Flavors", price: 50 },
      { name: "Nescafé", price: 65 },
      {
        name: "TYT Caffè",
        price: 85,
        description: "Peanut butter · white chocolate sauce · chocolate powder · milk · single shot espresso",
        note: "Description printed across two lines on the menu — order transcribed as best as legible."
      },
      {
        name: "Special Coffee",
        price: 25,
        note: "Added from the café's POS system (listed there as \"Coffee خاص\" / house blend) — not on the original printed menu photo."
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
      { name: "Boba Iced Coffee", price: 95, description: "Boba · iced coffee milk · espresso", image: "images/menu/boba-iced-coffee.jpg" }
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
      { name: "Mango Peach Cocktail", price: 80, description: "Fresh mint · lime · mango" },
      { name: "Banana with Milk", price: 85, note: "Added from the café's POS system — not on the original printed menu photo." },
      { name: "Dates with Milk", price: 95, note: "Added from the café's POS system — not on the original printed menu photo." },
      { name: "Power Cocktail", price: 100, note: "Added from the café's POS system — not on the original printed menu photo. Exact fruit mix not specified there." },
      { name: "Avocado", price: 90, note: "Added from the café's POS system — not on the original printed menu photo." },
      { name: "Avocado Honey", price: 120, note: "Added from the café's POS system — not on the original printed menu photo." }
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
      { name: "Mango Shake", price: 85, description: "Ice cream · mango · whipped cream", image: "images/menu/mango-shake.jpg" },
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
      {
        name: "Scotch Mint",
        price: 65,
        description: "Lime soda · mint flavor · lime",
        note: "Price corrected to 65 EGP after checking the café's live POS screen — the printed menu had listed 105."
      },
      {
        name: "Sunshine",
        price: 70,
        description: "Lime soda · pomegranate flavor · orange · lime",
        image: "images/menu/sunshine.jpg",
        note: "Price corrected to 70 EGP after checking the café's live POS screen — the printed menu had listed 105."
      },
      {
        name: "Cherry Cola",
        price: 70,
        description: "Cherry flavor · cola",
        note: "Price corrected to 70 EGP after checking the café's live POS screen (previously 85). The second ingredient word was also unclear on the original menu photo — shown here as \"cola,\" the most likely reading."
      },
      { name: "Boba Soda", price: 90, description: "Lime soda · boba · fresh mint · lime" }
    ]
  },
  {
    id: "canned-soft-drinks",
    name: "Soft Drink",
    icon: "soda",
    description: "Canned & bottled soft drinks",
    note: "New category added from the café's POS system — not on the original printed menu photo. Item names were read from small Arabic labels on the POS screen (via video, not a clear photo), so brand/flavor names carry extra uncertainty — please double-check against the register before publishing.",
    items: [
      { name: "Pepsi Can", price: 30 },
      { name: "7Up Can", price: 30 },
      { name: "Mirinda Can", price: 25 },
      { name: "Pepsi Mojito Can", price: 25, note: "POS label read as \"Pepsi Mojito\" — an unusual flavor combination, worth confirming." },
      { name: "Mountain Dew Can", price: 30 },
      { name: "Fayrouz Pineapple", price: 30 },
      { name: "Birell Can", price: 30, note: "POS label was hard to read clearly on video; \"Birell\" (non-alcoholic malt drink) is the best guess. Please confirm." },
      { name: "V7 Flavor", price: 25, note: "Two separate POS buttons both showed \"V7\" with a flavor word that wasn't legible on video. Please confirm the two flavor names." },
      { name: "V7 Flavor", price: 25, note: "Two separate POS buttons both showed \"V7\" with a flavor word that wasn't legible on video. Please confirm the two flavor names." },
      { name: "V7 Cola", price: 30 },
      { name: "Nescafé Can", price: 40, note: "POS showed four separate Nescafé-can buttons, all at 40 EGP — likely different flavors (e.g. original, latte, mocha, caramel) but the flavor labels weren't legible on video. Shown here as one line; please confirm the actual flavor names." },
      { name: "Rani Juice", price: 30 }
    ]
  },
  {
    id: "playstation",
    name: "PlayStation",
    icon: "extra",
    description: "In-café gaming time",
    note: "New category added from the café's POS system — not on the original printed menu photo.",
    items: [
      { name: "Half Hour", price: 20 },
      { name: "Full Hour", price: 40 }
    ]
  },
  {
    id: "birthday",
    name: "Birthday",
    icon: "dessert",
    description: "Birthday reservation add-ons",
    note: "New category added from the café's POS system — not on the original printed menu photo. \"Service\" and \"Person\" appear to be flat fees (e.g. a setup/service charge plus a per-guest charge) — please confirm exact meaning before publishing.",
    items: [
      { name: "Service", price: 200 },
      { name: "Person", price: 50 }
    ]
  },
  {
    id: "cigarettes",
    name: "Cigarettes",
    icon: "extra",
    description: "Available at the register",
    note: "New category added from the café's POS system — not on the original printed menu photo. Consider whether this belongs on the public website at all (many cafés keep cigarettes register-only for age-restriction/marketing reasons) rather than displaying it online.",
    items: [
      { name: "Marlboro", price: 120 },
      { name: "Cleopatra", price: 55 },
      { name: "Cleopatra Box", price: 55 },
      { name: "Merit Yellow", price: 120 },
      { name: "Winston", price: 80 },
      { name: "Shamlan", price: 45 },
      { name: "Winston Box", price: 80, note: "POS showed two separate Winston buttons at the same price (80) — likely regular vs. box; please confirm." },
      { name: "H&P", price: 35 },
      { name: "Master", price: 35 },
      { name: "Manchester", price: 35 },
      { name: "Manchester", price: 35, note: "POS showed three separate Manchester buttons, all at 35 EGP — likely different variants; please confirm." },
      { name: "Manchester", price: 35, note: "POS showed three separate Manchester buttons, all at 35 EGP — likely different variants; please confirm." },
      { name: "Kent Black", price: 100, note: "Brand name partly obscured on video; \"Kent Black\" is the best reading. Please confirm." },
      { name: "Captain Black Green", price: 60, note: "Brand name partly obscured on video; \"Captain Black Green\" is the best reading. Please confirm." }
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
    id: "tyt-beans",
    name: "TYT Beans",
    icon: "bean",
    description: "Whole-bean coffee bags to take home",
    note: "New category added from the café's POS system — not on the original printed menu photo.",
    items: [
      { name: "Light Roast", price: 250 },
      {
        name: "Medium Roast",
        price: 280,
        note: "Listed on the POS screen as \"Medium Herb\" — almost certainly a POS typo for \"Medium Roast\"; shown here corrected. Please confirm."
      }
    ]
  },
  {
    id: "sandwiches",
    name: "Sandwiches",
    icon: "croissant",
    note: "New category added from the café's POS system — not on the original printed menu photo.",
    items: [
      { name: "Cheese & Tomato Sandwich", price: 15 },
      { name: "Halawa & Qishta Sandwich", price: 30 },
      { name: "Cheese & Luncheon Sandwich", price: 30 },
      { name: "Roumy Cheese Sandwich", price: 30 },
      {
        name: "Halawa Sandwich",
        price: 35,
        note: "POS listed both this and \"Halawa & Qishta Sandwich\" as separate lines at different prices (30 vs 35) — the exact difference between the two wasn't legible on screen. Please confirm naming/pricing."
      }
    ]
  },
  {
    id: "waffle-pancake",
    name: "Waffle & Pancake",
    icon: "dessert",
    note: "New category added from the café's POS system — not on the original printed menu photo.",
    items: [
      { name: "Waffle", price: 35 },
      { name: "Pancake (6 pieces)", price: 50 },
      { name: "Pancake (12 pieces)", price: 80 },
      { name: "Pancake (24 pieces)", price: 120 }
    ]
  },
  {
    id: "food",
    name: "Food",
    icon: "extra",
    description: "Sandwiches, snacks, donuts & danish",
    note: "New category added from the café's POS system — not on the original printed menu photo.",
    items: [
      { name: "Shish Tawook Sandwich", price: 50 },
      { name: "Instant Noodles (Small)", price: 10 },
      { name: "Instant Noodles (Large)", price: 25 },
      { name: "Fruit Salad", price: 100 },
      {
        name: "Fruit Salad with Ice Cream",
        price: 110,
        note: "Price corrected to 110 EGP after checking the café's live POS screen — the printed menu had listed 50. The POS also lists a separate, cheaper \"Ice Cream Mix\" item (added below) — please confirm these are meant to be two distinct items."
      },
      { name: "Ice Cream Mix", price: 50, note: "Added from the café's POS system — not on the original printed menu photo. Distinct from \"Fruit Salad with Ice Cream\" above; exact contents not specified on the POS." },
      { name: "Ice Cream Scoop", price: 25 },
      {
        name: "Croissant Hot Dog",
        price: 85,
        note: "Price corrected to 85 EGP after checking the café's live POS screen — the printed menu had listed 110."
      },
      {
        name: "Cream Donut",
        price: 35,
        note: "Price corrected to 35 EGP (in line with the other donuts) after checking the café's live POS screen — the printed menu had listed 85."
      },
      { name: "Nutella Donut", price: 35 },
      { name: "Lotus Donut", price: 35 },
      { name: "Raspberry Danish", price: 65 },
      { name: "Blueberry Danish", price: 65 },
      { name: "Chocolate Danish", price: 35 },
      { name: "Vanilla Danish", price: 35 }
    ]
  },
  {
    id: "desserts",
    name: "Desserts",
    icon: "dessert",
    note: "New category added from the café's POS system — not on the original printed menu photo.",
    items: [
      { name: "Molten Cake", price: 90 },
      { name: "Cheesecake", price: 80 },
      { name: "Chocolate Fudge", price: 65 },
      { name: "Red Velvet", price: 120 }
    ]
  },
  {
    id: "mochi",
    name: "Mochi",
    icon: "shake",
    note: "New category added from the café's POS system — not on the original printed menu photo.",
    items: [
      { name: "Mochi (1 piece)", price: 70 }
    ]
  },
  {
    id: "suhoor",
    name: "Suhoor",
    icon: "extra",
    description: "Ramadan Suhoor menu — seasonal, available during Ramadan only",
    note: "New category added from the café's POS system — not on the original printed menu photo. Seasonal (Ramadan) — confirm whether it should stay visible year-round or be hidden outside Ramadan.",
    items: [
      { name: "Fuul (Fava Beans)", price: 30 },
      { name: "Taameya (Falafel)", price: 30 },
      { name: "Fried Potatoes", price: 35 },
      { name: "Eggs", price: 45 },
      { name: "Cheese", price: 35 },
      { name: "Salad", price: 20 },
      { name: "Pickled Eggplant", price: 20 }
    ]
  },
  {
    id: "shisha",
    name: "Shisha",
    icon: "extra",
    description: "Hookah service",
    note: "New category added from the café's POS system — not on the original printed menu photo.",
    items: [
      { name: "Moasel (Single Flavor)", price: 30 },
      { name: "Fruit Head Shisha", price: 130 },
      { name: "Mix Shisha", price: 150 },
      {
        name: "Clay Head Add-on",
        price: 25,
        note: "Listed on the POS as \"لاي طبي\" — reading was not fully clear on screen. Please confirm exact name/meaning."
      }
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

// Flat list of items (and whole categories) that carry an uncertainty note
// — surfaced quietly in the admin/editor comment above, not shown to site
// visitors.
const MENU_NOTES = [
  ...MENU_DATA.filter((cat) => cat.note).map((cat) => ({ category: cat.name, item: null, note: cat.note })),
  ...MENU_DATA.flatMap((cat) =>
    cat.items.filter((i) => i.note).map((i) => ({ category: cat.name, item: i.name, note: i.note }))
  )
];
