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
    cardholderName: USER_NAME, // Always default to Stan Li as requested
    pan: initialData?.pan || '',
    expiry: initialData?.expiry || ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const lastFour = formData.pan.replace(/\s/g, '').slice(-4);
    onSubmit({
      id: initialData?.id || Math.random().toString(36).substr(2, 9),
      name: initialData?.name || 'Credit Card', // Preserve product name or use fallback
      cardholderName: formData.cardholderName,
      pan: formData.pan,
      lastFour,
      expiry: formData.expiry,
      cardArt: initialData?.cardArt || 'https://picsum.photos/id/203/300/180',
      bank: initialData?.bank
    });
  };

  return (
    <div className="flex flex-col h-full bg-white">
      <div className="flex items-center gap-4 px-4 py-4 border-b">
        <button onClick={onBack} className="p-2 hover:bg-gray-100 rounded-full transition-colors">
           <svg className="w-6 h-6 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" /></svg>
        </button>
        <h2 className="text-xl font-bold text-gray-900">
          {entryMode === EntryMode.MANUAL ? 'Manual entry' : 'Verify details'}
        </h2>
      </div>

      <form onSubmit={handleSubmit} className="p-6 space-y-6 flex-1 overflow-y-auto">
        <div className="space-y-1">
          <label className="block text-[11px] font-bold text-gray-500 uppercase tracking-wider ml-1">Cardholder name</label>
          <input 
            type="text" 
            value={formData.cardholderName}
            onChange={e => setFormData({ ...formData, cardholderName: e.target.value })}
            className="w-full p-4 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-green-700 focus:bg-white outline-none transition-all font-medium"
            placeholder="Stan Li"
          />
        </div>

        <div className="space-y-1">
          <label className="block text-[11px] font-bold text-gray-500 uppercase tracking-wider ml-1">Card number</label>
          <input 
            type="text" 
            value={formData.pan}
            onChange={e => setFormData({ ...formData, pan: e.target.value })}
            className="w-full p-4 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-green-700 focus:bg-white outline-none transition-all font-medium"
            placeholder="0000 0000 0000 0000"
          />
        </div>

        <div className="space-y-1">
          <label className="block text-[11px] font-bold text-gray-500 uppercase tracking-wider ml-1">Expiry date</label>
          <input 
            type="text" 
            value={formData.expiry}
            onChange={e => setFormData({ ...formData, expiry: e.target.value })}
            className="w-full p-4 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-green-700 focus:bg-white outline-none transition-all font-medium"
            placeholder="MM/YY"
          />
        </div>

        <div className="pt-4">
          <button type="submit" className="w-full py-4 bg-[#137333] hover:bg-[#0d5a28] text-white font-bold rounded-full shadow-lg transition-colors text-lg">
            Save and continue
          </button>
        </div>
      </form>
    </div>
  );
};

export default CardForm;