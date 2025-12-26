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
    <div style={s.wrapper}>
      {/* Background Glows */}
      <div style={s.glowTop}></div>
      <div style={s.glowBottom}></div>

      <div style={s.card}>


        {/* Total Box */}
        <div style={s.totalBox}>
          <p style={s.label}>TOTAL EXPENSES</p>
          <div style={s.totalAmount}>${total.toFixed(2)}</div>
        </div>

        {/* Inputs */}
        <div style={s.inputGroup}>
          <div style={s.inputWrapper}>
            <label style={s.label}>DESCRIPTION</label>
            <input 
              style={s.input} 
              value={description} 
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Rent, Food, etc."
            />
          </div>
          <div style={s.inputWrapper}>
            <label style={s.label}>AMOUNT</label>
            <input 
              style={s.input} 
              type="number" 
              value={amount} 
              onChange={(e) => setAmount(e.target.value)}
              placeholder="0.00"
            />
          </div>
          <button style={s.mainBtn} onClick={addExpense}>Add Transaction</button>
        </div>

        {/* List */}
        <div style={s.listArea}>
          <p style={s.label}>HISTORY</p>
          {expenses.map(exp => (
            <div key={exp.id} style={s.listItem}>
              <div>
                <div style={{color: 'white', fontWeight: 'bold'}}>{exp.description}</div>
                <div style={{color: '#555', fontSize: '10px'}}>Today</div>
              </div>
              <div style={{display: 'flex', alignItems: 'center', gap: '15px'}}>
                <span style={{color: 'white', fontWeight: 'bold', fontFamily: 'monospace'}}>-${exp.amount.toFixed(2)}</span>
                <button style={s.delBtn} onClick={() => deleteExpense(exp.id)}>✕</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// --- GUARANTEED STYLES ---
const s = {
  wrapper: {
    position: 'fixed', inset: 0, backgroundColor: '#121212',
    display: 'flex', alignItems: 'center', justifyContent: 'center',
    fontFamily: 'sans-serif', color: 'white', overflow: 'hidden'
  },
  glowTop: {
    position: 'absolute', top: '-10%', left: '-10%', width: '40%', height: '40%',
    backgroundColor: '#FF1493', opacity: 0.1, filter: 'blur(100px)', borderRadius: '50%'
  },
  glowBottom: {
    position: 'absolute', bottom: '-10%', right: '-10%', width: '40%', height: '40%',
    backgroundColor: '#3b82f6', opacity: 0.1, filter: 'blur(100px)', borderRadius: '50%'
  },
  card: {
    position: 'relative', width: '90%', maxWidth: '450px', height: '85vh',
    backgroundColor: '#1e1e1e', borderRadius: '32px', border: '1px solid #333',
    padding: '30px', display: 'flex', flexDirection: 'column', boxSizing: 'border-box'
  },
  header: { textAlign: 'center', marginBottom: '20px' },
  stepText: { color: '#FF1493', fontSize: '10px', fontWeight: 'bold', letterSpacing: '2px' },
  title: { fontSize: '28px', margin: '5px 0' },
  totalBox: {
    backgroundColor: '#262626', padding: '20px', borderRadius: '20px',
    textAlign: 'center', border: '1px solid #333', marginBottom: '20px'
  },
  totalAmount: { fontSize: '36px', fontWeight: '900', marginTop: '5px' },
  label: { color: '#8E8E8E', fontSize: '10px', fontWeight: 'bold', marginBottom: '8px', display: 'block' },
  inputGroup: { display: 'flex', flexDirection: 'column', gap: '12px' },
  input: {
    width: '100%', height: '50px', backgroundColor: '#262626', border: '1px solid #333',
    borderRadius: '12px', color: 'white', padding: '0 15px', boxSizing: 'border-box', outline: 'none'
  },
  mainBtn: {
    height: '55px', backgroundColor: '#D81B60', border: 'none', borderRadius: '15px',
    color: 'white', fontWeight: 'bold', cursor: 'pointer', fontSize: '16px', marginTop: '10px'
  },
  listArea: { flex: 1, overflowY: 'auto', marginTop: '25px' },
  listItem: {
    display: 'flex', justifyContent: 'space-between', alignItems: 'center',
    padding: '15px', backgroundColor: '#262626', borderRadius: '15px', marginBottom: '10px'
  },
  delBtn: { background: 'none', border: 'none', color: '#ff4d4d', cursor: 'pointer', fontSize: '16px' }
};
