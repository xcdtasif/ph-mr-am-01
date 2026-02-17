## SwiftCart (E-Commerce Website)

### 🌐 API Endpoints

1. Get all products

   `https://fakestoreapi.com/products`

1. Get all categories

   `https://fakestoreapi.com/products/categories`

1. Get products by category

   `https://fakestoreapi.com/products/category/${category}`

   Example: `https://fakestoreapi.com/products/category/jewelery`

1. Get a single product's details

   `https://fakestoreapi.com/products/${id}`

   Example: `https://fakestoreapi.com/products/1`

### 🎯 Requirements (HTML, CSS)

1. Header
   - Show the website **logo** or **name** (SwiftCart) on the **left**.
   - Show the menu **items** (Home, Products, About, Contact) in the **center**.
   - Show a cart **button** on the **right** (show product count badge for bonus).

1. Hero Section
   - Include a background **image** (related to shopping, fashion, or electronics).
   - Include a **title** (e.g., Best Collection For You) and a **subtitle**.
   - Include a cta **button** (e.g., Shop Now).

1. Main Content Section
   - Why Choose Us
     - Include a section **heading**.
     - Include 3–4 **cards** highlighting features (e.g., Fast Delivery, 24/7 Support, Secure Payment, Easy Returns). Each card should have:
       - An icon
       - A title
       - A short description
   - Trending Now
     - Show 3 top-rated **products** based on API data or hardcoded for layout practice (you may filter products by rating or simply pick the first three).

1. Footer
   - Include quick links, social media links, and copyright info.
   - Include a newsletter subscription form with an email input field and a subscribe button.

1. Responsiveness
   - Make the site **mobile** responsive (making tablet responsive is optional).

### 🎯 Requirements (JS)

1. **Categories:** Load product categories dynamically in the UI, for example, as filter buttons or a dropdown menu.

1. **Products by Category:** When a category button is clicked, load and show the products in that category. Show the products in a grid layout (e.g., 3/4 columns).

1. **Product Card:** Each product card must include:
   - Image (from API)
   - Title (truncated, one line, ...)
   - Price
   - Category (badge)
   - Rating (stars and/or number)
   - **Details** button
   - **Add to Cart** button

1. **Details Modal:** Clicking the **Details** button on a card should open a modal showing product details, including:
   - Title (not truncated)
   - Description
   - Price
   - Rating
   - **Buy Now** and/or **Add to Cart** buttons

### 🎯 Requirements (MD)

> Do not use any AI tools to answer these questions. You must write the answers in Bangla.

1. What is the difference between `null` and `undefined`?

1. What is the use of the `map()` function in JavaScript? How is it different from `forEach()`?

1. What is the difference between `==` and `===`?

1. What is the significance of `async`/`await` when fetching API data?

1. Explain the concept of Scope in JavaScript.

### 🧪 Challenges (Optional)

1. **Add to Cart:** When **Add to Cart** button is clicked:
   - The product should be added to an array
   - The product count badge should be updated
   - (Optional) The array should be saved in `localStorage`.

1. **Cart:** Show a summary — in a sidebar, a section or a modal — that lists all added products and total price.

1. **Remove from Cart:** Allow users to remove any product from the cart. The total price should update instantly upon removal.

1. **Loading/Skeleton:** Show loading dots or skeleton while data is being fetched from the API.

1. **Active State:** Highlight the currently selected category button to indicate which filter is active.

### 🧰 Tech Stack

- HTML
- CSS (Vanilla, Tailwind, DaisyUI)
- JavaScript (Vanilla)

### 📌 Rules

- At least 5 meaningful commits are required.
- Use real data instead of dummy data.

### 🔗 Submission

- **Live Link:** YOUR_LIVE_URL_HERE
- **GitHub Repo:** YOUR_REPO_URL_HERE

### 📅 Deadline for 60 Marks: 17-02-26 (23:59)

> There is no 50-mark or 30-mark submission deadline. No submissions will be accepted after the 60-mark deadline.
