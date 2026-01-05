import React, { useState } from 'react';
import { Bank, Card } from '../types';
import { USER_NAME } from '../constants';

interface CardSelectorProps {
  bank: Bank;
  onConfirm: (cards: Card[]) => void;
  onBack: () => void;
}

const CardSelector: React.FC<CardSelectorProps> = ({ bank, onConfirm, onBack }) => {
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());

  const getCardBrand = (pan: string) => {
    if (pan.replace(/\s/g, '').startsWith('4')) return 'Visa';
    if (pan.replace(/\s/g, '').startsWith('3')) return 'Amex';
    return 'Visa';
  };

  const toggleCard = (id: string) => {
    const next = new Set(selectedIds);
    if (next.has(id)) next.delete(id);
    else next.add(id);
    setSelectedIds(next);
  };

  const handleConfirm = () => {
    const cards = bank.cards.map(c => ({
        ...c,
        cardholderName: USER_NAME // Ensure Stan Li is attached when pulled from bank
    })).filter(c => selectedIds.has(c.id));
    onConfirm(cards);
  };

  return (
    <div className="p-4 h-full flex flex-col bg-white">
      <div className="flex items-center gap-4 mb-6">
        <button onClick={onBack} className="p-2 hover:bg-gray-100 rounded-full transition-colors">
           <svg className="w-6 h-6 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" /></svg>
        </button>
        <div>
          <h2 className="text-xl font-bold text-gray-900">Select cards</h2>
          <p className="text-xs text-gray-500 font-medium">Add from {bank.name}</p>
        </div>
      </div>

      <div className="space-y-4 flex-1 overflow-y-auto pb-6">
        {bank.cards.map(card => (
          <button
            key={card.id}
            onClick={() => toggleCard(card.id)}
            className={`w-full flex items-center gap-4 p-3 rounded-2xl border-2 transition-all ${selectedIds.has(card.id) ? 'border-blue-600 bg-blue-50' : 'border-gray-100'}`}
          >
            <img src={card.cardArt} className="w-16 h-10 rounded shadow-md object-cover" alt="Art" />
            <div className="flex-1 text-left">
              <p className="font-bold text-sm text-gray-800">
                {card.bank} {card.name} {getCardBrand(card.pan)}**{card.lastFour}
              </p>
              <p className="text-xs text-gray-500 font-medium">{USER_NAME}</p>
              <p className="text-[10px] text-gray-400 mt-1 uppercase font-bold tracking-tighter">Secure Link: Active</p>
            </div>
            <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-colors ${selectedIds.has(card.id) ? 'bg-blue-600 border-blue-600' : 'border-gray-300'}`}>
              {selectedIds.has(card.id) && <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20"><path d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"/></svg>}
            </div>
          </button>
        ))}
      </div>

      <div className="pt-4 mt-auto">
        <button
          disabled={selectedIds.size === 0}
          onClick={handleConfirm}
          className="w-full py-3 bg-blue-700 disabled:bg-gray-300 text-white font-bold rounded-full shadow-lg transition-colors"
        >
          Add {selectedIds.size} {selectedIds.size === 1 ? 'card' : 'cards'} to Google Account
        </button>
      </div>
    </div>
  );
};

export default CardSelector;