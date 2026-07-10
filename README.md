# 🏡 WanderLust

A full-stack Airbnb-inspired web application where users can discover, create, edit, and review property listings. WanderLust provides secure authentication, image uploads with Cloudinary, and a responsive interface for managing travel accommodations.

---

## 🚀 Features

### 👤 User Authentication

* User Signup & Login
* Secure password hashing using Passport.js
* Session-based authentication
* Logout functionality
* Flash messages for user feedback

### 🏠 Listings

* Create new property listings
* View all listings
* View detailed listing information
* Edit existing listings
* Delete listings
* Ownership-based authorization
* Upload listing images to Cloudinary

### ⭐ Reviews

* Add reviews to listings
* Give ratings (1–5)
* Delete your own reviews
* Automatic deletion of reviews when a listing is removed

### 🔒 Authorization

* Only logged-in users can create listings and reviews
* Only the listing owner can edit or delete a listing
* Only the review author can delete their review

### 🎨 UI

* Responsive Bootstrap interface
* EJS templates with EJS-Mate layouts
* Flash notifications
* Server-side form validation

---

## 🛠 Tech Stack

### Frontend

* HTML5
* CSS3
* Bootstrap 5
* EJS
* EJS-Mate

### Backend

* Node.js
* Express.js
* Passport.js
* Passport-Local
* Express Session

### Database

* MongoDB Atlas
* Mongoose

### Cloud Storage

* Cloudinary

### Validation

* Joi

### Other Packages

* Multer
* Connect-Mongo
* Connect-Flash
* Method-Override
* Dotenv

---

## 📂 Project Structure

```
wanderlust/
│
├── config/
│   └── db.js
│
├── controllers/
│   ├── listings.js
│   ├── reviews.js
│   └── user.js
│
├── models/
│   ├── listing.js
│   ├── review.js
│   └── user.js
│
├── routes/
│   ├── listings.js
│   ├── reviews.js
│   └── user.js
│
├── views/
│
├── public/
│
├── middleware.js
├── schema.js
├── app.js
└── package.json
```

---

## ⚙️ Installation

Clone the repository:

```bash
git clone https://github.com/Yashpanwar08/WanderLust.git
```

Move into the project folder:

```bash
cd WanderLust
```

Install dependencies:

```bash
npm install
```

Create a `.env` file in the project root.

Example:

```env
DB_URL=your_mongodb_connection_string

SECRET=your_session_secret

CLOUD_NAME=your_cloudinary_cloud_name
CLOUD_API_KEY=your_cloudinary_api_key
CLOUD_API_SECRET=your_cloudinary_api_secret

MAP_TOKEN=your_mapbox_token
```

Start the development server:

```bash
npm run dev
```

or

```bash
nodemon app.js
```

The application will be available at:

```
http://localhost:8080
```

---

## 🔑 Environment Variables

| Variable         | Description                     |
| ---------------- | ------------------------------- |
| DB_URL           | MongoDB Atlas connection string |
| SECRET           | Express session secret          |
| CLOUD_NAME       | Cloudinary cloud name           |
| CLOUD_API_KEY    | Cloudinary API key              |
| CLOUD_API_SECRET | Cloudinary API secret           |
| MAP_TOKEN        | Mapbox access token             |

---

## 📸 Main Functionalities

* User Authentication
* Property Listings
* Image Uploads
* Reviews & Ratings
* Authorization
* Session Management
* Flash Messages
* Responsive UI

---

## 🔮 Future Improvements

* Search and filtering
* Google OAuth login
* Wishlist/Favorites
* Booking functionality
* Payment integration
* Interactive maps
* User profiles
* Admin dashboard
* Pagination
* Email verification

---

## 👨‍💻 Author

**Yash Panwar**

* GitHub: https://github.com/Yashpanwar08
* LinkedIn: https://www.linkedin.com/in/yash-panwar-a7b595320/

---

## 📄 License

This project is built for educational and learning purposes.
