
import React from 'react';
import { EntryMode, Bank } from '../types';
import { MOCK_BANKS } from '../constants';

interface CardEntryMethodsProps {
  onSelect: (mode: EntryMode) => void;
  onBankSelect: (bank: Bank) => void;
  onBack: () => void;
}

const CardEntryMethods: React.FC<CardEntryMethodsProps> = ({ onSelect, onBankSelect, onBack }) => {
  const primaryOptions = [
    { id: EntryMode.CAMERA, label: 'Scan with camera', icon: <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" /></svg> },
    { id: EntryMode.MANUAL, label: 'Enter manually', icon: <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" /></svg> },
    { id: EntryMode.TAP, label: 'Tap to add a card', icon: <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg> },
  ];

  return (
    <div className="flex flex-col h-full bg-white animate-in slide-in-from-right duration-300">
      <div className="flex items-center gap-4 px-4 py-4 border-b">
        <button onClick={onBack} className="p-2 hover:bg-gray-100 rounded-full transition-colors">
           <svg className="w-6 h-6 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" /></svg>
        </button>
        <h2 className="text-xl font-bold text-gray-900">Add card</h2>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-6">
        <section>
          <h3 className="text-sm font-bold text-gray-500 uppercase tracking-wider mb-4">Quick Entry</h3>
          <div className="space-y-3">
            {primaryOptions.map(opt => (
              <button
                key={opt.id}
                onClick={() => onSelect(opt.id)}
                className="w-full flex items-center gap-4 p-4 rounded-2xl bg-gray-50 border border-transparent hover:border-green-600 hover:bg-green-50 transition-all group"
              >
                <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center text-gray-600 group-hover:text-green-700 shadow-sm">
                   {opt.icon}
                </div>
                <div className="flex-1 text-left">
                  <p className="font-bold text-gray-900">{opt.label}</p>
                </div>
                <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
              </button>
            ))}
          </div>
        </section>

        <section>
          <h3 className="text-sm font-bold text-gray-500 uppercase tracking-wider mb-4">Pull from your bank</h3>
          <div className="grid grid-cols-1 gap-3">
            {MOCK_BANKS.map(bank => (
              <button
                key={bank.id}
                onClick={() => onBankSelect(bank)}
                className="flex items-center gap-4 p-4 bg-gray-50 border border-transparent rounded-2xl hover:border-blue-600 hover:bg-blue-50 transition-all group"
              >
                <img src={bank.logo} className="w-10 h-10 rounded shadow-sm bg-white p-1" alt={bank.name} />
                <span className="font-bold text-gray-800 flex-1 text-left">{bank.name}</span>
                <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
              </button>
            ))}
            <button className="flex items-center gap-4 p-4 border border-dashed border-gray-300 rounded-2xl hover:bg-gray-50 text-gray-500 font-medium text-left">
               <div className="w-10 h-10 bg-white flex items-center justify-center rounded-full shadow-sm">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 12h14m-7-7v14" /></svg>
               </div>
               <span>Search more banks</span>
            </button>
          </div>
        </section>
      </div>
      
      <div className="p-6 bg-gray-50 border-t">
        <p className="text-[10px] text-gray-400 text-center leading-relaxed">
          Adding a payment method to your Google Account is secure and protected by Google Pay's advanced security features.
        </p>
      </div>
    </div>
  );
};

export default CardEntryMethods;
