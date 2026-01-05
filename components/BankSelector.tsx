
import React from 'react';
import { Bank } from '../types';
import { MOCK_BANKS } from '../constants';

interface BankSelectorProps {
  onSelect: (bank: Bank) => void;
  onBack: () => void;
}

const BankSelector: React.FC<BankSelectorProps> = ({ onSelect, onBack }) => {
  return (
    <div className="p-4">
      <div className="flex items-center gap-4 mb-8">
        <button onClick={onBack} className="p-2 hover:bg-gray-100 rounded-full">
           <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" /></svg>
        </button>
        <h2 className="text-xl font-bold">Select your bank</h2>
      </div>

      <div className="grid grid-cols-1 gap-4">
        {MOCK_BANKS.map(bank => (
          <button
            key={bank.id}
            onClick={() => onSelect(bank)}
            className="flex items-center gap-4 p-4 bg-white border border-gray-200 rounded-2xl hover:border-blue-600 hover:bg-blue-50 transition-all group"
          >
            <img src={bank.logo} className="w-10 h-10 rounded shadow-sm" alt={bank.name} />
            <span className="font-bold text-gray-800 flex-1 text-left">{bank.name}</span>
            <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
          </button>
        ))}
        <button className="flex items-center gap-4 p-4 border border-dashed border-gray-300 rounded-2xl hover:bg-gray-50 text-gray-500 font-medium text-left">
           <div className="w-10 h-10 bg-gray-100 flex items-center justify-center rounded-full">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 12h14m-7-7v14" /></svg>
           </div>
           <span>More banks</span>
        </button>
      </div>

      <p className="mt-10 text-[10px] text-gray-400 text-center px-6 leading-relaxed">
        Google will redirect you to your bank's secure login page. Your credentials will never be shared with Google.
      </p>
    </div>
  );
};

export default BankSelector;
