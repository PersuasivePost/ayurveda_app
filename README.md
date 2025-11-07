Personalized Ayurveda Wellness App (MERN Stack)
This repository contains the full-stack code for a personalized Ayurveda Wellness Platform, built using the MERN stack.

Project Setup Guide
Prerequisites

Node.js (v18+)

MongoDB Instance (Local or Atlas)

A Razorpay Account (for testing payments)

A Cloud Storage Account (e.g., Backblaze B2 or AWS S3) for images

1. Clone the Repository

git clone https://github.com/aswin0-0/ayurveda_app.git
cd ayurveda_app

2. Backend Setup (backend folder)

cd backend
npm install

Create a .env file in the backend directory and add the following variables:

MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_strong_secret_key
RAZORPAY_KEY_ID=rzp_test_... # Test Key
RAZORPAY_KEY_SECRET=your_razorpay_secret
# Optional: Backblaze B2/S3 Keys for image storage
B2_KEY_ID=...
B2_APP_KEY=...
PORT=5000

Start the Backend Server

npm run dev 
# Server runs on http://localhost:5000

3. Frontend Setup (frontend folder)

cd ../frontend
npm install

Create a .env.local file in the frontend directory and add:

VITE_API_BASE_URL=http://localhost:5000/api
VITE_RAZORPAY_KEY_ID=rzp_test_... # Public Key

Start the Frontend Application

npm run dev 
# App runs on http://localhost:5173 (or similar port)


4. Accessing Different Roles

After running the server, you can manually register accounts via the signup page. For immediate testing:

Admin Access: Create a user and manually change their role field to 'admin' in MongoDB for full access to the Admin Dashboard.

Doctor Access: Register via the dedicated Doctor Signup page (/doctor/signup).
