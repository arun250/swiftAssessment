

# Swift Assessment App

A responsive React-based web application featuring a **Profile Screen** and **Comments Table** with sorting, searching, and pagination. The app demonstrates modern React patterns, Context API, and real-time state persistence using localStorage.

## 🚀 Features

- Responsive design for **desktop** and **mobile** 🖥️📱
- Profile Screen displaying:
  - User details (name, email, address, etc.)
  - Dynamic avatar initials (e.g., "Ervin Howell" → "EH")
- Comments Table:
  - Search by name, email, or comment text
  - Sort by Post ID, Name, or Email (with cycle: no sort → ascending → descending → no sort)
  - Pagination with selectable page sizes
  - State persistence (search, sort, page, page size) across page refresh


## 🔗 Live Demo

Published Url: http://swiftassess.netlify.app

## 🛠️ Tech Stack

- **React** (with Class Components)
- **React Router DOM** for navigation
- **Context API** for global state (user profile)
- **localStorage** for persistence
- **CSS Flexbox & Media Queries** for responsiveness

## 📂 Folder Structure

src/
│
├── components/
│ ├── Header/
│ ├── ProfileScreen/
│ └── CommentScreen/
│
├── context/
│ └── UserContext.js
│
├── App.js
└── index.js

- Clone the Repository: git clone (https://github.com/arun250/swiftAssessment.git)
- cd swift-assessment
- Install Dependencies: npm install
- Start the Application: npm start
- Open your browser: http://localhost:3000

### 📝 Future Improvements

🔐 Authentication

🌙 Dark Mode

📱 Better mobile optimisation

🛠 API integration with real backend

### 🙏 Acknowledgements
  - JSONPlaceholder
  - Lucide Icons



