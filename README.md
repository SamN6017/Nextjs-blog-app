# 📝 Blog App  

A full-stack **Next.js 14** blog application with authentication, CRUD operations, and a **Buy Me a Coffee** feature for donations.  

## 🚀 Features  

✅ User authentication (Register/Login/Logout)  
✅ Protected routes (only logged-in users can add/edit/delete blogs)  
✅ Create, read, update, and delete (CRUD) blogs  
✅ Display blogs with thumbnails, authors, and dates  
✅ JWT-based authentication with cookies  
✅ "Buy Me a Coffee" feature for payments  

## 🛠 Tech Stack  

- **Next.js 14** (App Router)  
- **MongoDB & Mongoose** (Database)  
- **Tailwind CSS** (Styling)  
- **JWT Authentication** (Secure login system)  
- **Stripe API** (Payment integration for Buy Me a Coffee)  

## 📺 Folder Structure  

```
/blog-app
│── app/
│   ├── auth/ (Login & Register pages)
│   ├── blog/ (Blog pages)
│   │   ├── [id]/ (Individual blog details)
│   │   ├── add-blog/ (Add new blog)
│   ├── api/
│   │   ├── auth/ (Login/Register API)
│   │   ├── blog/ (Blog CRUD API)
│   │   ├── payment/ (Buy Me a Coffee API)
│── components/ (Reusable components like Navbar)
│── models/ (MongoDB models)
│── utils/ (Helper functions for DB, JWT, etc.)
│── middleware.ts (Protected routes logic)
│── .env (Environment variables)
```

## 🛠 Setup Instructions  

### 1️⃣ Clone the Repository  
```bash
git clone https://github.com/your-username/blog-app.git
cd blog-app
```

### 2️⃣ Install Dependencies  
```bash
npm install
```

### 3️⃣ Configure Environment Variables  
Create a `.env.local` file and add:  
```
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
NEXT_PUBLIC_STRIPE_KEY=your_stripe_public_key
STRIPE_SECRET_KEY=your_stripe_secret_key
```

### 4️⃣ Run the App  
```bash
npm run dev
```
The app will run at **http://localhost:3000**  

## 🔒 Authentication & Protected Routes  

- Users must **log in** to access `/blogs` or `/blog/add-blog`  
- **Middleware** (`middleware.ts`) checks authentication before allowing access  
- JWT tokens are stored in **httpOnly cookies** for security  

## 💰 Buy Me a Coffee (Stripe Integration)  

To support creators, users can donate via **Stripe Checkout**.  
- API Route: `app/api/payment/route.ts`  
- Calls **Stripe API** to process payments  

## 🖼 Screenshots  

🎨 Coming soon...  

## 🐝 License  

This project is **MIT Licensed**. Feel free to contribute! 🚀  

