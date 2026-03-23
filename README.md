# 📊 Expense Tracker

A full-stack expense tracking application built with React, Node.js, Express, and MySQL.

## 🏗️ Project Structure

```
expense-tracker/
├── frontend/                # React + Tailwind CSS
│   ├── src/
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── index.css
│   ├── package.json
│   ├── vite.config.js
│   ├── tailwind.config.js
│   └── index.html
├── backend/                 # Node.js + Express
│   ├── config/
│   │   └── database.js
│   ├── controllers/
│   │   └── expenseController.js
│   ├── models/
│   │   └── Expense.js
│   ├── routes/
│   ├── server.js
│   ├── package.json
│   └── database_schema.sql
├── Postman_Collection.json  # API Testing
└── README.md
```

## 🚀 Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- MySQL Server
- Postman (for API testing)

## 📦 Installation

### Frontend Setup

```bash
cd frontend
npm install
```

### Backend Setup

```bash
cd backend
npm install
cp .env.example .env
```

Update `.env` with your MySQL credentials:

```
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_password
DB_NAME=expense_tracker_db
```

### Database Setup

1. Open MySQL
2. Run the SQL script:
   ```bash
   mysql -u root -p < database_schema.sql
   ```

## 🎯 Running the Application

### Start Backend Server

```bash
cd backend
npm run dev
```

The server will run on `http://localhost:5000`

### Start Frontend Application

In a new terminal:

```bash
cd frontend
npm run dev
```

The app will run on `http://localhost:5173`

## 📮 API Testing with Postman

1. Import `Postman_Collection.json` into Postman
2. Set the `base_url` variable to `http://localhost:5000`
3. Test the available endpoints:
   - `GET /` - Health check
   - `GET /expenses` - Get all expenses
   - `POST /expenses` - Create a new expense

## 🗄️ Database Schema

### Tables

- **users** - User accounts
- **categories** - Expense categories
- **expenses** - Expense records

Pre-populated categories:

- 🍔 Food
- 🚗 Transportation
- 🛍️ Shopping
- 🎬 Entertainment
- 💡 Utilities
- 🏥 Healthcare
- 📚 Education
- ❓ Other

## 🛠️ Tech Stack

- **Frontend**: React 18, Vite, Tailwind CSS, Axios
- **Backend**: Node.js, Express.js, MySQL2
- **Database**: MySQL
- **API Testing**: Postman

## 📝 Features

- ✅ Create, read, update, delete expenses
- ✅ Categorize expenses
- ✅ Track spending by category
- ✅ Date-based filtering
- ✅ Responsive UI with Tailwind CSS
- ✅ RESTful API

## 📄 Environment Variables

### Backend (`backend/.env`)

```
PORT=5000
NODE_ENV=development
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_password_here
DB_NAME=expense_tracker_db
DB_PORT=3306
API_URL=http://localhost:5000
CORS_ORIGIN=http://localhost:5173
```

## 🐛 Troubleshooting

- **MySQL Connection Error**: Ensure MySQL is running and credentials are correct
- **Port Already in Use**: Change PORT in `.env` or kill the process using the port
- **CORS Issues**: Check `CORS_ORIGIN` in backend configuration

## 📚 Scripts

### Frontend

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build

### Backend

- `npm run dev` - Start with nodemon (auto-reload)
- `npm start` - Start server
- `npm test` - Run tests

## 🤝 Contributing

Feel free to contribute! Please fork the repository and create a pull request.

## 📄 License

ISC

## 📧 Support

For issues or questions, please open an issue in the repository.
