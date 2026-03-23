-- Expense Tracker Database Schema

CREATE DATABASE IF NOT EXISTS expense_tracker_db;
USE expense_tracker_db;

-- Users table
CREATE TABLE IF NOT EXISTS users (
  id INT PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(100) NOT NULL,
  email VARCHAR(100) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Categories table
CREATE TABLE IF NOT EXISTS categories (
  id INT PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(50) NOT NULL,
  description VARCHAR(255),
  icon VARCHAR(50),
  color VARCHAR(7),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Expenses table
CREATE TABLE IF NOT EXISTS expenses (
  id INT PRIMARY KEY AUTO_INCREMENT,
  user_id INT NOT NULL,
  category_id INT NOT NULL,
  description VARCHAR(255) NOT NULL,
  amount DECIMAL(10, 2) NOT NULL,
  date DATE NOT NULL,
  payment_method VARCHAR(50),
  notes TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
  FOREIGN KEY (category_id) REFERENCES categories(id) ON DELETE SET NULL
);

-- Indexes
CREATE INDEX idx_user_id ON expenses(user_id);
CREATE INDEX idx_category_id ON expenses(category_id);
CREATE INDEX idx_date ON expenses(date);
CREATE INDEX idx_email ON users(email);

-- Insert sample categories
INSERT INTO categories (name, description, icon, color) VALUES
('Food', 'Food and dining expenses', '🍔', '#FF6B6B'),
('Transportation', 'Travel and transport costs', '🚗', '#4ECDC4'),
('Shopping', 'Shopping and retail', '🛍️', '#45B7D1'),
('Entertainment', 'Entertainment and recreation', '🎬', '#FFA07A'),
('Utilities', 'Bills and utilities', '💡', '#98D8C8'),
('Healthcare', 'Medical and health expenses', '🏥', '#F7B731'),
('Education', 'Education and learning', '📚', '#5F27CD'),
('Other', 'Miscellaneous expenses', '❓', '#999999');
