# 🚀 Quick Start Guide

## Step 1: Install Dependencies

### Frontend

```bash
cd frontend
npm install
```

### Backend

```bash
cd backend
npm install
```

## Step 2: Database Setup

1. **Create MySQL Database:**

   ```bash
   mysql -u root -p
   ```

2. **Run the schema script:**

   ```bash
   mysql -u root -p < backend/database_schema.sql
   ```

   Or copy-paste the SQL from `backend/database_schema.sql` into MySQL client

## Step 3: Configure Environment

### Backend Configuration

1. Copy the example file:

   ```bash
   cd backend
   cp .env.example .env
   ```

2. Edit `backend/.env` with your MySQL credentials:
   ```
   DB_HOST=localhost
   DB_USER=root
   DB_PASSWORD=your_mysql_password
   DB_NAME=expense_tracker_db
   ```

## Step 4: Run the Application

### Terminal 1 - Backend Server

```bash
cd backend
npm run dev
```

✅ Backend will start at `http://localhost:5000`

### Terminal 2 - Frontend Application

```bash
cd frontend
npm run dev
```

✅ Frontend will start at `http://localhost:5173`

Open your browser and navigate to `http://localhost:5173`

## Step 5: Test API with Postman

1. Open Postman
2. Click **Import** and select `Postman_Collection.json`
3. Set the `base_url` variable to `http://localhost:5000`
4. Start testing the endpoints!

## 📋 API Endpoints

| Method | Endpoint    | Description        |
| ------ | ----------- | ------------------ |
| GET    | `/`         | API Health Check   |
| GET    | `/expenses` | Get all expenses   |
| POST   | `/expenses` | Create new expense |

## 🔧 Troubleshooting

### Issue: Cannot connect to MySQL

- Ensure MySQL service is running
- Check your username and password in `.env`
- Verify the database name in `.env`

### Issue: Port 5000 already in use

- Change `PORT` in `backend/.env`
- Or kill the process: `netstat -ano | findstr :5000` (Windows)

### Issue: Frontend cannot connect to backend

- Check that backend is running on port 5000
- Ensure CORS is properly configured in backend
- Check `CORS_ORIGIN` in `.env`

### Issue: npm install fails

- Delete `node_modules` folder
- Delete `package-lock.json`
- Run `npm install` again

## 📚 Next Steps

1. Implement user authentication
2. Add expense filtering and searching
3. Create expense statistics dashboard
4. Add expense export functionality
5. Implement budget tracking

## 📝 Project Files Overview

### Frontend

- `package.json` - React dependencies
- `vite.config.js` - Vite build configuration
- `tailwind.config.js` - Tailwind CSS customization
- `src/App.jsx` - Main React component
- `src/main.jsx` - Application entry point

### Backend

- `server.js` - Express server setup
- `package.json` - Node dependencies
- `config/database.js` - MySQL connection
- `controllers/expenseController.js` - Business logic
- `models/Expense.js` - Database models
- `database_schema.sql` - Database structure

## 🎯 Development Workflow

1. **Frontend Development**: Changes auto-reload with Vite
2. **Backend Development**: Changes auto-reload with Nodemon
3. **Database Changes**: Update `database_schema.sql` and run again

## 💡 Tips

- Use Postman to test API endpoints before adding frontend features
- Check browser DevTools Network tab for API call debugging
- Use VS Code REST Client extension for quick API testing
- Keep `.env` files private, never commit them!

Happy Coding! 🎉
