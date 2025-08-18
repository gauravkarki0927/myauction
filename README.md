# Online Auction System

An **Online Auction System** built with modern web technologies that allows users to list items for auction, place bids in real-time, and manage auctions securely. This project supports user authentication, role-based access, and an intuitive dashboard for buyers and sellers.

---

## Features

- **User Authentication & Authorization**
  - Secure sign up, login, and JWT-based session management.
  - Role-based access (Admin, Seller, Bidder).

- **Auction Management**
  - Both sellers and buyers have a singular account through which they can do both the works
  - Sellers can add, edit, and delete auction items.
  - Buyers can browse, search, and filter auction listings.
  - Real-time bidding system with instant updates.

- **Dashboard**
  - Personal dashboard for managing your items and bids.
  - Admin dashboard for managing all users and auctions.

- **Responsive UI**
  - Mobile-friendly design with Tailwind CSS.
  - Optimized for desktop, tablet, and mobile screens.

- **Notifications**
  - Email or in-app notifications for bid updates and auction results.

---

## Tech Stack

- **Frontend:** React, Tailwind CSS, React Router  
- **Backend:** Node.js, Express.js  
- **Database:** MySql 
- **Authentication:** JSON Web Tokens (JWT)  
---

Folder structure:
online-auction-system/
├── frontend/                # React frontend
│   ├── src/
│   │   ├── components/    # Reusable components
│   │   ├── pages/         # Application pages
│   │   ├── context/       # React contexts (e.g., Auth, Cart)
│   │   └── App.jsx
│   └── package.json
│
├── backend/                # Express backend
│   ├── productImage/       # Images of products when user uploads
│   ├── uploads/            # Images of user when they upload profile 
│   ├── mudules/            # Installed packages
│   ├── middleware/         # Authentication, validation included in server.js file
│   ├── server.js           # Main server file with all the API's and routings
│   └── package.json
│
├── README.md
└── .gitignore

