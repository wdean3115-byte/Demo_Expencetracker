import { useState } from 'react';

export default function ExpenseTracker() {
  const [expenses, setExpenses] = useState([]);
  const [description, setDescription] = useState('');
  const [amount, setAmount] = useState('');

  const addExpense = () => {
    if (description && amount) {
      setExpenses([...expenses, {
        id: Date.now(),
        description,
        amount: parseFloat(amount)
      }]);
      setDescription('');
      setAmount('');
    }
  };

  const deleteExpense = (id) => {
    setExpenses(expenses.filter(exp => exp.id !== id));
  };

  const total = expenses.reduce((sum, exp) => sum + exp.amount, 0);

  return (
    <div className="p-8 max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Expense Tracker</h1>
      
      <div className="mb-6 p-4 bg-blue-100 rounded">
        <div className="text-sm text-gray-600">Total</div>
        <div className="text-3xl font-bold">${total.toFixed(2)}</div>
      </div>

      <div className="mb-6 space-y-3">
        <input
          type="text"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Description"
          className="w-full p-2 border rounded"
        />
        <input
          type="number"
          step="0.01"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          placeholder="Amount"
          className="w-full p-2 border rounded"
        />
        <button
          onClick={addExpense}
          className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
        >
          Add Expense
        </button>
      </div>

      <div className="space-y-2">
        {expenses.map(exp => (
          <div key={exp.id} className="flex justify-between items-center p-3 bg-gray-100 rounded">
            <span>{exp.description}</span>
            <div className="flex items-center gap-3">
              <span className="font-bold">${exp.amount.toFixed(2)}</span>
              <button
                onClick={() => deleteExpense(exp.id)}
                className="text-red-500 hover:text-red-700"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}