import { useState } from 'react';

function App() {
  // 1. We create "state" to hold whatever the user types into the form
  const [expense, setExpense] = useState({
    amount: '',
    description: '',
    date: '',
    category_id: '1' // We'll default to 'Food' (ID: 1)
  });
  
  // State for success/error messages
  const [message, setMessage] = useState('');

  // 2. This updates our state every time the user types a letter
  const handleChange = (e) => {
    setExpense({ ...expense, [e.target.name]: e.target.value });
  };

  // 3. THE CONNECTION: This sends the data to your Node.js backend!
  const handleSubmit = async (e) => {
    e.preventDefault(); // Stops the page from refreshing
    setMessage('Sending to cloud...');

    try {
      // Notice we are calling the exact URL and port your backend is running on
      const response = await fetch('http://127.0.0.1:5000/expenses',{
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(expense) 
      });

      const data = await response.json();

      if (response.ok) {
        setMessage('✅ ' + data.message);
        // Clear the form for the next expense
        setExpense({ amount: '', description: '', date: '', category_id: '1' }); 
      } else {
        setMessage('❌ Error: ' + data.error);
      }
    } catch (error) {
      console.error(error);
      setMessage('❌ Failed to connect to backend. Is the server running on port 5000?');
    }
  };

  return (
    <div style={{ padding: '40px', fontFamily: 'Arial, sans-serif', maxWidth: '400px', margin: '0 auto' }}>
      <h1>💸 Expense Tracker</h1>
      
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
        
        <input 
          type="number" name="amount" value={expense.amount} onChange={handleChange} 
          placeholder="Amount (e.g. 1500)" required 
          style={{ padding: '10px' }}
        />
        
        <input 
          type="text" name="description" value={expense.description} onChange={handleChange} 
          placeholder="What did you buy?" required 
          style={{ padding: '10px' }}
        />
        
        <input 
          type="date" name="date" value={expense.date} onChange={handleChange} required 
          style={{ padding: '10px' }}
        />
        
        <select name="category_id" value={expense.category_id} onChange={handleChange} style={{ padding: '10px' }}>
          <option value="1">Food</option>
          <option value="2">Transport</option>
          <option value="3">Entertainment</option>
          <option value="4">Rent/Bills</option>
          <option value="5">Other</option>
        </select>

        <button type="submit" style={{ padding: '12px', background: '#007BFF', color: 'white', border: 'none', cursor: 'pointer', fontWeight: 'bold' }}>
          Add Expense
        </button>
        
      </form>

      {message && <p style={{ marginTop: '20px', fontWeight: 'bold' }}>{message}</p>}
    </div>
  );
}

export default App;