import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

interface Order {
  id: number;
  customerId: number;
  items: { peptideId: number; quantity: number }[];
  status: 'Pending' | 'Shipped' | 'Delivered';
}

interface Peptide {
  id: number;
  name: string;
}

interface AnalyticsProps {
  orders: Order[];
  peptides: Peptide[];
}

const Analytics: React.FC<AnalyticsProps> = ({ orders, peptides }) => {
  const calculateSales = () => {
    const sales: { [key: string]: number } = {};
    orders.forEach(order => {
      order.items.forEach(item => {
        const peptideName = peptides.find(p => p.id === item.peptideId)?.name || 'Unknown';
        sales[peptideName] = (sales[peptideName] || 0) + item.quantity;
      });
    });
    return Object.entries(sales).map(([name, quantity]) => ({ name, quantity }));
  };

  const salesData = calculateSales();

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Sales Analytics</h2>
      <div className="bg-white p-4 rounded-lg shadow">
        <ResponsiveContainer width="100%" height={400}>
          <BarChart data={salesData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="quantity" fill="#8884d8" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default Analytics;