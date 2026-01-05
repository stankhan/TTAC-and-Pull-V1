import React, { useState } from 'react';
import { EntryMode, Card } from '../types';
import { USER_NAME } from '../constants';

interface CardFormProps {
  entryMode: EntryMode;
  initialData?: Partial<Card>;
  onSubmit: (card: Card) => void;
  onBack: () => void;
}

const CardForm: React.FC<CardFormProps> = ({ entryMode, initialData, onSubmit, onBack }) => {
  const [formData, setFormData] = useState({
    name: initialData?.name || USER_NAME,
    pan: initialData?.pan || '',
    expiry: initialData?.expiry || ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const lastFour = formData.pan.replace(/\s/g, '').slice(-4);
    onSubmit({
      id: Math.random().toString(36).substr(2, 9),
      name: formData.name,
      pan: formData.pan,
      lastFour,
      expiry: formData.expiry,
      cardArt: initialData?.cardArt || 'https://picsum.photos/id/203/300/180',
      bank: initialData?.bank
    });
  };

  return (
    <div className="p-4">
      <div className="flex items-center gap-4 mb-6">
        <button onClick={onBack} className="p-2 hover:bg-gray-100 rounded-full">
           <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" /></svg>
        </button>
        <h2 className="text-xl font-bold">
          {entryMode === EntryMode.MANUAL ? 'Manual entry' : 'Verify details'}
        </h2>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Cardholder name</label>
          <input 
            type="text" 
            value={formData.name}
            onChange={e => setFormData({ ...formData, name: e.target.value })}
            className="w-full p-4 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-green-600 outline-none"
            placeholder="Stan Li"
          />
        </div>

        <div>
          <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Card number</label>
          <input 
            type="text" 
            value={formData.pan}
            onChange={e => setFormData({ ...formData, pan: e.target.value })}
            className="w-full p-4 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-green-600 outline-none"
            placeholder="0000 0000 0000 0000"
          />
        </div>

        <div>
          <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Expiry date</label>
          <input 
            type="text" 
            value={formData.expiry}
            onChange={e => setFormData({ ...formData, expiry: e.target.value })}
            className="w-full p-4 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-green-600 outline-none"
            placeholder="MM/YY"
          />
        </div>

        <div className="pt-6">
          <button type="submit" className="w-full py-3 bg-green-700 text-white font-bold rounded-full shadow-lg">
            Save and continue
          </button>
        </div>
      </form>
    </div>
  );
};

export default CardForm;