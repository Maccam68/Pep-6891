import React, { useState } from 'react';
import { Plus, Minus, Save, Edit, Trash2 } from 'lucide-react';

interface PeptideStock {
  id: number;
  name: string;
  quantity: number;
}

const StockManagement: React.FC = () => {
  const [stock, setStock] = useState<PeptideStock[]>([
    { id: 1, name: 'Peptide A', quantity: 100 },
    { id: 2, name: 'Peptide B', quantity: 150 },
  ]);
  const [newPeptide, setNewPeptide] = useState({ name: '', quantity: 0 });
  const [editingId, setEditingId] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);

  const addPeptide = () => {
    if (newPeptide.name && newPeptide.quantity > 0) {
      const existingPeptide = stock.find(p => p.name.toLowerCase() === newPeptide.name.toLowerCase());
      if (existingPeptide) {
        setStock(stock.map(p => 
          p.id === existingPeptide.id 
            ? { ...p, quantity: p.quantity + newPeptide.quantity } 
            : p
        ));
        setError(`Added ${newPeptide.quantity} to existing ${existingPeptide.name}`);
      } else {
        setStock([...stock, { id: Date.now(), ...newPeptide }]);
        setError(null);
      }
      setNewPeptide({ name: '', quantity: 0 });
    }
  };

  const updateQuantity = (id: number, amount: number) => {
    setStock(stock.map(peptide => 
      peptide.id === id ? { ...peptide, quantity: Math.max(0, peptide.quantity + amount) } : peptide
    ));
  };

  const handleQuantityChange = (id: number, newQuantity: number) => {
    setStock(stock.map(peptide => 
      peptide.id === id ? { ...peptide, quantity: Math.max(0, newQuantity) } : peptide
    ));
  };

  const handleNameChange = (id: number, newName: string) => {
    setStock(stock.map(peptide => 
      peptide.id === id ? { ...peptide, name: newName } : peptide
    ));
  };

  const startEditing = (id: number) => {
    setEditingId(id);
  };

  const saveEdit = () => {
    setEditingId(null);
  };

  const deletePeptide = (id: number) => {
    setStock(stock.filter(peptide => peptide.id !== id));
  };

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-6">Stock Management</h2>
      {error && <p className="text-yellow-600 mb-4 bg-yellow-100 p-3 rounded">{error}</p>}
      <div className="mb-6 flex items-center space-x-4">
        <input
          type="text"
          placeholder="Peptide Name"
          className="border border-gray-300 p-2 rounded flex-grow focus:outline-none focus:ring-2 focus:ring-indigo-500"
          value={newPeptide.name}
          onChange={(e) => setNewPeptide({ ...newPeptide, name: e.target.value })}
        />
        <input
          type="number"
          placeholder="Quantity"
          className="border border-gray-300 p-2 rounded w-24 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          value={newPeptide.quantity}
          onChange={(e) => setNewPeptide({ ...newPeptide, quantity: Math.max(0, parseInt(e.target.value)) })}
        />
        <button
          className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700 transition-colors flex items-center hover-scale"
          onClick={addPeptide}
        >
          <Plus className="mr-2" size={18} /> Add Peptide
        </button>
      </div>
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="bg-gray-100">
              <th className="p-3 text-left">Name</th>
              <th className="p-3 text-left">Quantity</th>
              <th className="p-3 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {stock.map((peptide) => (
              <tr key={peptide.id} className="border-t border-gray-200">
                <td className="p-3">
                  {editingId === peptide.id ? (
                    <input
                      type="text"
                      className="border border-gray-300 p-1 rounded w-full focus:outline-none focus:ring-2 focus:ring-indigo-500"
                      value={peptide.name}
                      onChange={(e) => handleNameChange(peptide.id, e.target.value)}
                    />
                  ) : (
                    peptide.name
                  )}
                </td>
                <td className="p-3">
                  {editingId === peptide.id ? (
                    <input
                      type="number"
                      className="border border-gray-300 p-1 rounded w-20 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                      value={peptide.quantity}
                      onChange={(e) => handleQuantityChange(peptide.id, parseInt(e.target.value))}
                    />
                  ) : (
                    peptide.quantity
                  )}
                </td>
                <td className="p-3">
                  <div className="flex items-center space-x-2">
                    <button
                      className="text-blue-600 p-1 rounded hover:bg-blue-100 transition-colors"
                      onClick={() => updateQuantity(peptide.id, 1)}
                    >
                      <Plus size={18} />
                    </button>
                    <button
                      className="text-yellow-600 p-1 rounded hover:bg-yellow-100 transition-colors"
                      onClick={() => updateQuantity(peptide.id, -1)}
                    >
                      <Minus size={18} />
                    </button>
                    {editingId === peptide.id ? (
                      <button
                        className="text-green-600 p-1 rounded hover:bg-green-100 transition-colors"
                        onClick={saveEdit}
                      >
                        <Save size={18} />
                      </button>
                    ) : (
                      <button
                        className="text-gray-600 p-1 rounded hover:bg-gray-100 transition-colors"
                        onClick={() => startEditing(peptide.id)}
                      >
                        <Edit size={18} />
                      </button>
                    )}
                    <button
                      className="text-red-600 p-1 rounded hover:bg-red-100 transition-colors"
                      onClick={() => deletePeptide(peptide.id)}
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default StockManagement;