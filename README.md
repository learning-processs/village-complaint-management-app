# 🏘️ GraamSeva - Village Complaint Management App

A full stack MERN application that empowers villagers to report local problems and helps administrators manage and resolve them efficiently.

---

## 📋 Table of Contents

- [About the Project](#about-the-project)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
- [Environment Variables](#environment-variables)
- [API Endpoints](#api-endpoints)
- [Screenshots](#screenshots)
- [Contributing](#contributing)

---

## 📖 About the Project

GraamSeva is a village complaint management system designed for rural communities. Villagers can submit complaints about local issues like roads, water supply, electricity, and sanitation. Admins can view, manage, update status, and respond to these complaints.

---

## ✨ Features

### Villager
- ✅ Register & Login with JWT authentication
- ✅ Submit complaints with title, description, category, location & photos
- ✅ Track complaint status in real time (Pending → In Progress → Resolved)
- ✅ View admin responses
- ✅ Delete own complaints

### Admin
- ✅ Secure admin login via environment credentials
- ✅ View all complaints with filters (status, category)
- ✅ Update complaint status
- ✅ Respond to villager complaints
- ✅ Dashboard with stats (total, pending, in-progress, resolved)
- ✅ Delete any complaint

---

## 🛠️ Tech Stack

### Frontend
| Technology | Purpose |
|---|---|
| React.js | UI Framework |
| Tailwind CSS | Styling & Responsive Design |
| React Router DOM | Client-side Routing |
| Axios | API Calls |
| React Hot Toast | Notifications |
| Context API | Global State Management |

### Backend
| Technology | Purpose |
|---|---|
| Node.js | Runtime Environment |
| Express.js | Web Framework |
| MongoDB | Database |
| Mongoose | ODM |
| JWT | Authentication |
| Bcryptjs | Password Hashing |
| Multer | File Upload |
| Cloudinary | Image Storage |
| CORS | Cross Origin Resource Sharing |

---

## 📁 Project Structure

```
village-complaint-management-app/
│
├── server/                          # Backend
│   ├── config/
│   │   ├── db.js                    # MongoDB connection
│   │   └── cloudinary.js            # Cloudinary config
│   │
│   ├── controllers/
│   │   ├── userController.js        # Auth logic
│   │   ├── complaintController.js   # Complaint logic
│   │   └── adminController.js       # Admin logic
│   │
│   ├── middleware/
│   │   ├── authMiddleware.js        # JWT verification
│   │   ├── adminMiddleware.js       # Admin role check
│   │   ├── uploadMiddleware.js      # Multer file upload
│   │   └── errorMiddleware.js       # Global error handler
│   │
│   ├── models/
│   │   ├── userModel.js             # User schema
│   │   └── complaintModel.js        # Complaint schema
│   │
│   ├── routes/
│   │   ├── userRouter.js            # Auth routes
│   │   ├── complaintRouter.js       # Complaint routes
│   │   └── adminRouter.js           # Admin routes
│   │
│   ├── utils/
│   │   ├── generateToken.js         # JWT token generator
│   │   └── apiResponse.js           # Uniform API responses
│   │
│   ├── .env                         # Environment variables
│   └── server.js                    # Entry point
│
├── client/                          # Frontend
│   ├── src/
│   │   ├── components/
│   │   │   ├── common/
│   │   │   │   ├── Navbar.jsx
│   │   │   │   ├── ProtectedRoute.jsx
│   │   │   │   └── StatusBadge.jsx
│   │   │   └── admin/
│   │   │       └── AdminSidebar.jsx
│   │   │
│   │   ├── context/
│   │   │   └── AutContext.jsx       # Global auth state
│   │   │
│   │   ├── pages/
│   │   │   ├── auth/
│   │   │   │   ├── Login.jsx
│   │   │   │   └── Register.jsx
│   │   │   ├── villager/
│   │   │   │   ├── Home.jsx
│   │   │   │   ├── SubmitComplaint.jsx
│   │   │   │   ├── MyComplaints.jsx
│   │   │   │   └── ComplaintDetail.jsx
│   │   │   └── admin/
│   │   │       ├── AdminLogin.jsx
│   │   │       ├── AdminDashboard.jsx
│   │   │       ├── ManageComplaints.jsx
│   │   │       ├── ComplaintView.jsx
│   │   │       └── AdminProfile.jsx
│   │   │
│   │   ├── App.jsx                  # Routes
│   │   ├── main.jsx                 # Entry point
│   │   └── index.css                # Global styles
│   │
│   ├── .env                         # Frontend env
│   └── vite.config.js
│
└── README.md
```

---

## 🚀 Getting Started

### Prerequisites
- Node.js v18+
- MongoDB Atlas account
- Cloudinary account

### Installation

**1. Clone the repository:**
```bash
git clone https://github.com/your-username/village-complaint-management-app.git
cd village-complaint-management-app
```

**2. Setup Backend:**
```bash
cd server
npm install
```

**3. Setup Frontend:**
```bash
cd client
npm install
```

**4. Create environment files (see below)**

**5. Run Backend:**
```bash
cd server
npm run dev
```

**6. Run Frontend:**
```bash
cd client
npm run dev
```

---

## 🔐 Environment Variables

### Server `.env`
```env
PORT=4000
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
JWT_EXPIRE=7d
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
NODE_ENV=development
ADMIN_EMAIL=your_admin_email
ADMIN_PASSWORD=your_admin_password
```

### Client `.env`
```env
VITE_API_URL=http://localhost:4000
```

---

## 📡 API Endpoints

### Auth Routes `/api/auth`
| Method | Endpoint | Description | Access |
|---|---|---|---|
| POST | `/register` | Register new villager | Public |
| POST | `/login` | Login user | Public |
| GET | `/me` | Get logged in user | Protected |

### Complaint Routes `/api/complaint`
| Method | Endpoint | Description | Access |
|---|---|---|---|
| POST | `/submit` | Submit complaint | Protected |
| GET | `/my` | Get my complaints | Protected |
| GET | `/:id` | Get single complaint | Protected |
| DELETE | `/:id` | Delete complaint | Protected |

### Admin Routes `/api/admin`
| Method | Endpoint | Description | Access |
|---|---|---|---|
| GET | `/complaints` | Get all complaints | Admin |
| PUT | `/complaints/:id` | Update complaint | Admin |
| DELETE | `/complaints/:id` | Delete complaint | Admin |
| GET | `/stats` | Get dashboard stats | Admin |

---

## 🎯 Usage

### As a Villager
```
1. Register at /register
2. Login at /login
3. Submit complaint at /submit
4. Track complaints at /my-complaints
5. View details at /my-complaint/:id
```

### As an Admin
```
1. Login at /admin-login
   Email    → your ADMIN_EMAIL from .env
   Password → your ADMIN_PASSWORD from .env
2. View dashboard at /admin
3. Manage complaints at /admin/complaints
4. Update status & respond at /admin/complaints/:id
```

---

## 🗂️ Complaint Categories

| Category | Description |
|---|---|
| 🛣️ Road | Potholes, broken roads, damaged streets |
| 💧 Water | Water supply issues, contamination |
| ⚡ Electricity | Power cuts, faulty street lights |
| 🧹 Sanitation | Garbage, drainage, cleanliness |
| 📋 Other | Any other village issue |

---

## 📊 Complaint Status Flow

```
Submitted → Pending → In Progress → Resolved
```

---

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch `git checkout -b feature/AmazingFeature`
3. Commit your changes `git commit -m 'Add AmazingFeature'`
4. Push to the branch `git push origin feature/AmazingFeature`
5. Open a Pull Request

---

## 👩‍💻 Author

**Anu**

---
