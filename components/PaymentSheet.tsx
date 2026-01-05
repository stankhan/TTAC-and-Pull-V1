import React, { useEffect, useState } from 'react';
import { FlowStep, EntryMode, Card, Bank } from '../types';
import CardEntryMethods from './CardEntryMethods';
import CardForm from './CardForm';
import BankSelector from './BankSelector';
import CardSelector from './CardSelector';
import VerificationFlow from './VerificationFlow';
import { USER_NAME, BILLING_ADDRESS, DEVICES } from '../constants';

interface PaymentSheetProps {
  step: FlowStep;
  setStep: (step: FlowStep) => void;
  entryMode: EntryMode | null;
  addedCards: Card[];
  selectedCardId: string | null;
  setSelectedCardId: (id: string | null) => void;
  tempCards: Card[];
  selectedBank: Bank | null;
  onAddCard: () => void;
  onEntryModeSelect: (mode: EntryMode) => void;
  onCardIdentified: (card: Card) => void;
  onCardSubmit: (card: Card | Card[]) => void;
  onFinishAdd: () => void;
  onVerifyLater: () => void;
  onGoToVerify: () => void;
  onVerifyComplete: () => void;
  onBankSelect: (bank: Bank) => void;
  onPay: () => void;
  onReset: () => void;
}

const PaymentSheet: React.FC<PaymentSheetProps> = ({ 
  step, setStep, entryMode, addedCards, selectedCardId, setSelectedCardId,
  tempCards, selectedBank, onAddCard, onEntryModeSelect, onCardIdentified, onCardSubmit,
  onFinishAdd, onVerifyLater, onGoToVerify, onVerifyComplete, onBankSelect,
  onPay, onReset
}) => {
  const [closing, setClosing] = useState(false);

  // Helper to determine card brand based on PAN or mock value
  const getCardBrand = (pan: string) => {
    if (pan.replace(/\s/g, '').startsWith('4')) return 'Visa';
    if (pan.replace(/\s/g, '').startsWith('3')) return 'Amex';
    return 'Visa'; // Default for demo
  };

  useEffect(() => {
    if (step === FlowStep.CONTACTING_BANK) {
      const timer = setTimeout(() => {
        setStep(FlowStep.BILLING_ADDRESS);
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [step, setStep]);

  const handleClose = () => {
    setClosing(true);
    setTimeout(() => {
      onReset();
      setClosing(false);
    }, 300);
  };

  const isFullScreenFlow = [
    FlowStep.ADD_CARD_MENU,
    FlowStep.TAP_INSTRUCTIONS,
    FlowStep.CAMERA_SCAN,
    FlowStep.CARD_FORM,
    FlowStep.CONTACTING_BANK,
    FlowStep.BILLING_ADDRESS,
    FlowStep.ADD_SUCCESS,
    FlowStep.VERIFICATION_FLOW,
    FlowStep.VERIFY_SUCCESS,
    FlowStep.DO_LATER_SUCCESS,
    FlowStep.BANK_SELECTOR,
    FlowStep.BANK_LOGIN,
    FlowStep.BANK_CARD_SELECTOR
  ].includes(step);

  const renderContent = () => {
    switch (step) {
      case FlowStep.PAYMENT_SHEET:
        return (
          <div className="p-4 animate-in slide-in-from-bottom duration-300">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold text-gray-900">Google Play</h2>
              <button onClick={handleClose} className="p-2 hover:bg-gray-100 rounded-full">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
              </button>
            </div>

            <div className="flex items-center gap-4 mb-6 pb-6 border-b">
              <img src="https://picsum.photos/id/1/100/100" className="w-12 h-12 rounded-lg" alt="App" />
              <div className="flex-1">
                <p className="font-semibold text-gray-800">Pixel Master Pro Subscription</p>
                <p className="text-sm text-gray-500">Monthly Plan</p>
              </div>
              <p className="font-bold text-gray-900">$9.99</p>
            </div>

            {addedCards.length === 0 ? (
              <button 
                onClick={onAddCard}
                className="w-full flex items-center justify-between p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors border border-dashed border-gray-300"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-green-100 flex items-center justify-center rounded-full text-green-700">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" /></svg>
                  </div>
                  <span className="font-medium">Add payment method</span>
                </div>
                <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
              </button>
            ) : (
              <div className="space-y-4 mb-6">
                <p className="text-xs font-bold text-gray-500 uppercase tracking-wider">Payment Method</p>
                {addedCards.map(card => (
                  <button
                    key={card.id}
                    onClick={() => setSelectedCardId(card.id)}
                    className={`w-full flex items-center gap-4 p-3 rounded-xl border-2 transition-all ${selectedCardId === card.id ? 'border-green-600 bg-green-50' : 'border-gray-200 hover:border-gray-300'}`}
                  >
                    <img src={card.cardArt} className="w-16 h-10 rounded shadow-sm object-cover" alt="Card Art" />
                    <div className="flex-1 text-left">
                      <p className="font-semibold text-sm">
                        {card.bank ? `${card.bank} ` : ''}{card.name} {getCardBrand(card.pan)}**{card.lastFour}
                      </p>
                      <p className="text-xs text-gray-500">{USER_NAME}</p>
                    </div>
                    {selectedCardId === card.id && (
                      <div className="w-5 h-5 bg-green-600 rounded-full flex items-center justify-center text-white">
                        <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20"><path d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"/></svg>
                      </div>
                    )}
                  </button>
                ))}
                <button 
                  onClick={onAddCard}
                  className="w-full py-2 text-green-700 text-sm font-semibold flex items-center justify-center gap-1"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" /></svg>
                  Add another card
                </button>
              </div>
            )}

            <div className="mt-8">
              <button 
                disabled={!selectedCardId}
                onClick={onPay}
                className="w-full py-3 bg-green-700 disabled:bg-gray-300 text-white font-bold rounded-full shadow-lg transition-all"
              >
                1-tap Buy
              </button>
              <p className="text-[10px] text-gray-400 text-center mt-3 px-6">
                By clicking "1-tap Buy", you agree to the Google Play Terms of Service.
              </p>
            </div>
          </div>
        );

      case FlowStep.ADD_CARD_MENU:
        return (
          <CardEntryMethods 
            onSelect={onEntryModeSelect} 
            onBankSelect={onBankSelect}
            onBack={() => setStep(FlowStep.PAYMENT_SHEET)} 
          />
        );

      case FlowStep.TAP_INSTRUCTIONS:
        return (
          <div className="flex flex-col h-full animate-in fade-in duration-500 bg-white">
             <div className="flex items-center gap-4 p-4 border-b">
                <button onClick={() => setStep(FlowStep.ADD_CARD_MENU)} className="p-2 hover:bg-gray-100 rounded-full">
                   <svg className="w-6 h-6 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" /></svg>
                </button>
                <h2 className="text-xl font-bold">Tap to add</h2>
             </div>
             
             <div className="flex-1 flex flex-col items-center justify-center p-8">
               <div className="relative w-full max-w-xs aspect-[3/4] mb-8">
                  <div className="absolute inset-0 bg-gray-100 rounded-[2.5rem] border-8 border-gray-800 flex flex-col items-center justify-center shadow-xl">
                     <div className="w-20 h-20 text-blue-600 mb-4 animate-pulse">
                        <svg fill="currentColor" viewBox="0 0 24 24"><path d="M2.38 10a11.02 11.02 0 0119.24 0c-.86.49-1.38 1.41-1.38 2.4s.52 1.91 1.38 2.4a11.02 11.02 0 01-19.24 0c.86-.49 1.38-1.41 1.38-2.4s-.52-1.91-1.38-2.4zM12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z"/></svg>
                     </div>
                  </div>
                  <div className="absolute -right-4 top-1/2 -translate-y-1/2 w-40 h-24 bg-gradient-to-br from-blue-700 to-blue-900 rounded-lg shadow-2xl border border-white/20 p-3 flex flex-col justify-between animate-card-tap transform rotate-12">
                     <div className="w-8 h-6 bg-yellow-400 rounded-sm opacity-80" />
                     <div className="flex gap-1">
                        <div className="h-1 w-10 bg-white/40 rounded" />
                        <div className="h-1 w-6 bg-white/40 rounded" />
                     </div>
                  </div>
               </div>
               
               <h3 className="text-2xl font-bold text-center mb-4">Hold card to phone</h3>
               <p className="text-gray-500 text-center max-w-xs leading-relaxed">
                 Place your card against the top back of your device until you feel a vibration.
               </p>
             </div>

             <div className="p-6 bg-gray-50 border-t space-y-4">
                <button 
                   onClick={() => onCardIdentified({ id: 'tap1', name: 'Freedom', pan: '4111 2222 3333 7777', lastFour: '7777', expiry: '07/28', cardArt: 'https://picsum.photos/id/201/300/180', bank: 'Chase' })}
                   className="w-full py-4 bg-green-700 text-white font-bold rounded-full shadow-lg hover:bg-green-800 transition-colors"
                >
                  Confirm Card Read
                </button>
             </div>
             <style>{`
                @keyframes card-tap {
                  0%, 100% { transform: translate(0, -50%) rotate(12deg); opacity: 0.8; }
                  50% { transform: translate(-80px, -50%) rotate(0deg); opacity: 1; }
                }
                .animate-card-tap {
                  animation: card-tap 3s infinite ease-in-out;
                }
             `}</style>
          </div>
        );

      case FlowStep.CAMERA_SCAN:
        return (
          <div className="relative h-full bg-black text-white flex flex-col items-center">
             <div className="w-full p-4 flex items-center gap-4 absolute top-0 z-10">
                <button onClick={() => setStep(FlowStep.ADD_CARD_MENU)} className="p-2 bg-white/10 hover:bg-white/20 rounded-full backdrop-blur-md">
                   <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" /></svg>
                </button>
                <h2 className="text-xl font-bold">Position card</h2>
             </div>

             <div className="flex-1 flex flex-col items-center justify-center w-full px-8">
                <div className="w-full aspect-[1.586/1] border-4 border-white/80 rounded-2xl relative overflow-hidden shadow-[0_0_50px_rgba(255,255,255,0.2)]">
                   <div className="absolute inset-x-0 top-1/2 h-0.5 bg-green-500 shadow-[0_0_15px_rgba(34,197,94,1)] animate-pulse" />
                   <div className="absolute inset-0 flex items-center justify-center bg-gray-900/40">
                      <p className="text-xs text-white/80 font-medium">Position card within the white border</p>
                   </div>
                   <div className="absolute top-0 left-0 w-8 h-8 border-t-8 border-l-8 border-green-500" />
                   <div className="absolute top-0 right-0 w-8 h-8 border-t-8 border-r-8 border-green-500" />
                   <div className="absolute bottom-0 left-0 w-8 h-8 border-b-8 border-l-8 border-green-500" />
                   <div className="absolute bottom-0 right-0 w-8 h-8 border-b-8 border-r-8 border-green-500" />
                </div>
                <div className="mt-8 text-center space-y-2">
                  <h3 className="text-xl font-bold">Scanning...</h3>
                  <p className="text-sm text-gray-400">Keep your card steady</p>
                </div>
             </div>
             
             <div className="w-full p-6 pb-10 space-y-4">
               <button 
                  onClick={() => onCardIdentified({ id: 'cam1', name: 'Sapphire Reserved', pan: '4111 1111 0000 1234', lastFour: '1234', expiry: '05/29', cardArt: 'https://picsum.photos/id/202/300/180', bank: 'Chase' })}
                  className="w-full py-4 bg-white text-black rounded-full font-bold shadow-lg"
               >
                 Capture Details
               </button>
             </div>
          </div>
        );

      case FlowStep.CARD_FORM:
        return <CardForm entryMode={entryMode!} onSubmit={onCardSubmit} onBack={() => setStep(FlowStep.ADD_CARD_MENU)} initialData={tempCards[0]} />;

      case FlowStep.CONTACTING_BANK:
        return (
          <div className="h-full flex flex-col items-center justify-center p-8 animate-in fade-in bg-white">
            <div className="w-16 h-16 border-4 border-green-700 border-t-transparent rounded-full animate-spin mb-6"></div>
            <h2 className="text-xl font-bold mb-2">Contacting your bank</h2>
            <p className="text-gray-500 text-center">We're verifying your card details and security with your financial institution.</p>
          </div>
        );

      case FlowStep.BILLING_ADDRESS:
        return (
          <div className="p-6 h-full bg-white flex flex-col">
            <div className="flex-1">
              <h2 className="text-2xl font-bold mb-6">Confirm Billing Address</h2>
              <p className="text-gray-500 mb-8 leading-relaxed">Your bank shared this address for payment verification.</p>
              
              <div className="bg-gray-50 p-6 rounded-2xl mb-8 border border-gray-100 shadow-sm">
                <div className="flex items-start justify-between mb-4">
                  <div className="w-12 h-12 bg-green-100 text-green-700 rounded-full flex items-center justify-center">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                  </div>
                  <span className="bg-green-700 text-white text-[10px] font-bold px-2 py-1 rounded-full uppercase tracking-tighter">Verified</span>
                </div>
                <p className="font-bold text-lg text-gray-900 mb-1">{USER_NAME}</p>
                <p className="text-gray-600 leading-tight">{BILLING_ADDRESS.line1}</p>
                <p className="text-gray-600 leading-tight">{BILLING_ADDRESS.city}, {BILLING_ADDRESS.state} {BILLING_ADDRESS.zip}</p>
              </div>
            </div>
            <button 
              onClick={() => setStep(FlowStep.ADD_SUCCESS)}
              className="w-full py-4 bg-green-700 text-white font-bold rounded-full shadow-lg mb-4"
            >
              This is correct
            </button>
          </div>
        );

      case FlowStep.ADD_SUCCESS:
        return (
          <div className="p-8 text-center h-full bg-white flex flex-col justify-between animate-in zoom-in duration-500">
            <div className="flex-1 flex flex-col justify-center">
              <div className="w-20 h-20 bg-green-100 text-green-700 rounded-full flex items-center justify-center mx-auto mb-6 shadow-inner">
                  <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" /></svg>
              </div>
              <h2 className="text-3xl font-bold text-gray-900 mb-2">Card saved!</h2>
              <p className="text-gray-600 mb-8 px-4 leading-relaxed">
                Congratulations, your card has already been saved to your Google account.
              </p>

              <div className="bg-gray-50 rounded-[2rem] p-6 space-y-6 text-left border border-gray-100 shadow-sm mb-8">
                <h3 className="text-sm font-bold text-gray-800 uppercase tracking-widest text-center border-b pb-4 mb-4">Why verify your card?</h3>
                
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-white rounded-2xl flex items-center justify-center text-green-600 shadow-sm flex-shrink-0">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 11c0 3.517-1.009 6.799-2.753 9.571m-1.17-1.969L6.33 15.67m.008 0A8.115 8.115 0 016 12a10.082 10.082 0 00.83-4.29V5a2 2 0 012-2h4a2 2 0 012 2v1.71c0 .766.383 1.482 1.015 1.912l.216.147M7.972 10.703a4 4 0 011.942-1.51" /></svg>
                  </div>
                  <div>
                    <p className="font-bold text-gray-900 text-sm">Express Checkout</p>
                    <p className="text-xs text-gray-500">Fast and secure 1-tap purchases with your biometrics.</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-white rounded-2xl flex items-center justify-center text-blue-600 shadow-sm flex-shrink-0">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.38 10a11.02 11.02 0 0119.24 0c-.86.49-1.38 1.41-1.38 2.4s.52 1.91 1.38 2.4a11.02 11.02 0 01-19.24 0c.86-.49 1.38-1.41 1.38-2.4s-.52-1.91-1.38-2.4zM12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z"/></svg>
                  </div>
                  <div>
                    <p className="font-bold text-gray-900 text-sm">Offline Tap & Pay</p>
                    <p className="text-xs text-gray-500">Use your phone to pay in stores anywhere contactless is accepted.</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-white rounded-2xl flex items-center justify-center text-orange-500 shadow-sm flex-shrink-0">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
                  </div>
                  <div>
                    <p className="font-bold text-gray-900 text-sm">No verification needed later</p>
                    <p className="text-xs text-gray-500">Skip the 3DS verification steps for all future transactions.</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-4 w-full">
              <button 
                onClick={onGoToVerify}
                className="w-full py-4 bg-green-700 text-white font-bold rounded-full shadow-xl hover:bg-green-800 transition-colors"
              >
                Verify my card
              </button>
              <button 
                onClick={onVerifyLater}
                className="w-full py-4 bg-gray-100 text-gray-800 font-bold rounded-full hover:bg-gray-200 transition-colors"
              >
                Do this later
              </button>
            </div>
          </div>
        );

      case FlowStep.VERIFICATION_FLOW:
        return <VerificationFlow onComplete={onVerifyComplete} />;

      case FlowStep.VERIFY_SUCCESS:
        return (
          <div className="p-8 text-center h-full bg-white flex flex-col justify-center">
             <div className="w-20 h-20 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mx-auto mb-8">
                <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.952 11.952 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg>
             </div>
             <h2 className="text-2xl font-bold mb-4">Successfully Verified</h2>
             <p className="text-gray-600 mb-12 leading-relaxed">Your card is now tokenized and ready for 1-tap checkouts and tap & pay in stores.</p>
             <button onClick={onFinishAdd} className="w-full py-4 bg-green-700 text-white font-bold rounded-full shadow-lg">Return to purchase</button>
          </div>
        );

      case FlowStep.DO_LATER_SUCCESS:
        return (
          <div className="p-6 h-full bg-white flex flex-col">
            <h2 className="text-2xl font-bold mb-4">Set up for later</h2>
            <p className="text-gray-600 mb-8 leading-relaxed">We'll automatically send a reminder to finish verification to your signed-in devices:</p>
            <div className="space-y-4 mb-10 flex-1">
              {DEVICES.map(device => (
                <div key={device} className="flex items-center gap-4 p-4 bg-gray-50 rounded-2xl border border-gray-100 shadow-sm">
                  <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center text-blue-600 shadow-sm">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" /></svg>
                  </div>
                  <span className="font-bold text-gray-800">{device}</span>
                </div>
              ))}
              <div className="mt-8 p-6 bg-blue-50 rounded-2xl border border-blue-100 shadow-sm">
                 <p className="text-sm text-blue-800 leading-relaxed">
                   We've sent an <b>education email</b> to your mailbox with instructions on how to manually finish this flow anytime.
                 </p>
              </div>
            </div>
            <button onClick={onFinishAdd} className="w-full py-4 bg-green-700 text-white font-bold rounded-full shadow-lg mb-6">Continue purchase</button>
          </div>
        );

      case FlowStep.BANK_LOGIN:
        return (
          <div className="p-6 h-full flex flex-col bg-white animate-in fade-in duration-500">
            <div className="flex items-center gap-2 mb-10">
               <img src={selectedBank?.logo} className="w-8 h-8 rounded" alt="Logo" />
               <span className="font-bold text-lg">{selectedBank?.name} Login</span>
            </div>
            <div className="flex-1 space-y-6">
              <div className="space-y-1">
                 <label className="text-xs font-bold text-gray-500 uppercase">Username</label>
                 <div className="p-4 bg-gray-50 border border-gray-100 rounded-xl text-gray-400 font-medium">stanli_creative</div>
              </div>
              <div className="space-y-1">
                 <label className="text-xs font-bold text-gray-500 uppercase">Password</label>
                 <div className="p-4 bg-gray-50 border border-gray-100 rounded-xl text-gray-400 font-medium">••••••••••••</div>
              </div>
              <div className="flex flex-col items-center justify-center p-10 bg-blue-50 rounded-[2rem] border-2 border-dashed border-blue-200">
                 <div className="text-center">
                    <svg className="w-16 h-16 text-blue-600 mx-auto mb-4 animate-bounce" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" /></svg>
                    <p className="text-sm font-bold text-blue-800">Secure connection with {selectedBank?.name}</p>
                 </div>
              </div>
            </div>
            <button 
              onClick={() => setStep(FlowStep.BANK_CARD_SELECTOR)}
              className="w-full py-4 bg-blue-700 text-white font-bold rounded-full mt-auto shadow-lg"
            >
              Sign In
            </button>
          </div>
        );

      case FlowStep.BANK_CARD_SELECTOR:
        return (
          <CardSelector 
            bank={selectedBank!} 
            onConfirm={(cards) => onCardSubmit(cards)} 
            onBack={() => setStep(FlowStep.ADD_CARD_MENU)} 
          />
        );

      case FlowStep.ORDER_COMPLETE:
        return (
          <div className="p-10 flex flex-col items-center justify-center h-full text-center bg-white">
             <div className="w-24 h-24 bg-green-500 text-white rounded-full flex items-center justify-center mb-8 shadow-2xl animate-bounce">
                <svg className="w-14 h-14" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" /></svg>
             </div>
             <h2 className="text-3xl font-bold text-gray-900 mb-4">Payment Success!</h2>
             <button onClick={handleClose} className="w-full py-4 border-2 border-gray-200 text-gray-800 font-bold rounded-full hover:bg-gray-50 transition-colors">Finish</button>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className={`absolute inset-0 z-50 flex items-end transition-all duration-300 ${closing ? 'opacity-0' : 'opacity-100'}`}>
      <div 
        className={`absolute inset-0 bg-black/50 transition-opacity duration-300 ${isFullScreenFlow ? 'bg-black/80' : ''}`}
        onClick={isFullScreenFlow ? undefined : handleClose}
      />
      <div 
        className={`w-full bg-white relative shadow-2xl transition-all duration-300 transform 
          ${isFullScreenFlow ? 'h-full translate-y-0 rounded-none' : 'rounded-t-[2rem] max-h-[92%] translate-y-0'}
          ${closing ? 'translate-y-full opacity-0 scale-95' : 'translate-y-0 opacity-100 scale-100'}`}
      >
        {!isFullScreenFlow && <div className="w-12 h-1.5 bg-gray-300 rounded-full mx-auto my-3" />}
        {renderContent()}
      </div>
    </div>
  );
};

export default PaymentSheet;