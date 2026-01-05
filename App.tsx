
import React, { useState, useCallback } from 'react';
import { FlowStep, EntryMode, Card, Bank } from './types';
import { MOCK_BANKS, USER_NAME } from './constants';
import ProductPage from './components/ProductPage';
import PaymentSheet from './components/PaymentSheet';

const App: React.FC = () => {
  const [step, setStep] = useState<FlowStep>(FlowStep.PRODUCT_VIEW);
  const [entryMode, setEntryMode] = useState<EntryMode | null>(null);
  const [addedCards, setAddedCards] = useState<Card[]>([]);
  const [selectedCardId, setSelectedCardId] = useState<string | null>(null);
  const [tempCards, setTempCards] = useState<Card[]>([]); // For current card being added/edited
  const [selectedBank, setSelectedBank] = useState<Bank | null>(null);

  const handlePurchase = useCallback(() => {
    setStep(FlowStep.PAYMENT_SHEET);
  }, []);

  const handleAddCardClick = useCallback(() => {
    setStep(FlowStep.ADD_CARD_MENU);
  }, []);

  const handleEntryModeSelect = useCallback((mode: EntryMode) => {
    setEntryMode(mode);
    switch (mode) {
      case EntryMode.TAP:
        setStep(FlowStep.TAP_INSTRUCTIONS);
        break;
      case EntryMode.CAMERA:
        setStep(FlowStep.CAMERA_SCAN);
        break;
      case EntryMode.MANUAL:
        setStep(FlowStep.CARD_FORM);
        break;
      case EntryMode.BANK:
        setStep(FlowStep.BANK_SELECTOR);
        break;
    }
  }, []);

  // Called when Tap or Camera identifies a card
  const handleCardIdentified = useCallback((card: Card) => {
    setTempCards([card]);
    setStep(FlowStep.CARD_FORM);
  }, []);

  // Called when the card form is submitted OR when bank cards are selected
  const handleCardSubmit = useCallback((card: Card | Card[]) => {
    const cards = Array.isArray(card) ? card : [card];
    setTempCards(cards);
    
    if (entryMode === EntryMode.BANK) {
      // Pull from bank bypasses the "Contacting Bank" step as it's already verified
      setStep(FlowStep.ADD_SUCCESS);
    } else {
      setStep(FlowStep.CONTACTING_BANK);
    }
  }, [entryMode]);

  const handleFinishAdd = useCallback(() => {
    setAddedCards(prev => [...prev, ...tempCards]);
    if (tempCards.length > 0) {
      setSelectedCardId(tempCards[0].id);
    }
    setStep(FlowStep.PAYMENT_SHEET);
    setTempCards([]);
  }, [tempCards]);

  const handleVerifyLater = useCallback(() => {
    setStep(FlowStep.DO_LATER_SUCCESS);
  }, []);

  const handleGoToVerify = useCallback(() => {
    setStep(FlowStep.VERIFICATION_FLOW);
  }, []);

  const handleVerifyComplete = useCallback(() => {
    setStep(FlowStep.VERIFY_SUCCESS);
  }, []);

  const handleBankSelect = useCallback((bank: Bank) => {
    setEntryMode(EntryMode.BANK);
    setSelectedBank(bank);
    setStep(FlowStep.BANK_LOGIN);
  }, []);

  const handleFinalPay = useCallback(() => {
    setStep(FlowStep.ORDER_COMPLETE);
  }, []);

  const handleReset = useCallback(() => {
    setStep(FlowStep.PRODUCT_VIEW);
    setAddedCards([]);
    setSelectedCardId(null);
    setEntryMode(null);
  }, []);

  return (
    <div className="relative w-full h-screen bg-black overflow-hidden flex items-center justify-center">
      <div className="relative w-full max-w-md h-full md:h-[90vh] bg-white md:rounded-[3rem] shadow-2xl overflow-hidden flex flex-col border-[8px] border-gray-800">
        <div className="h-8 w-full bg-white flex items-center justify-between px-6 pt-2">
            <span className="text-xs font-semibold">9:41</span>
            <div className="flex gap-1.5 items-center">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z"/></svg>
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M12 21l-12-18h24z"/></svg>
            </div>
        </div>

        <div className="flex-1 relative overflow-y-auto">
          <ProductPage onPurchase={handlePurchase} />
          
          {step !== FlowStep.PRODUCT_VIEW && (
            <PaymentSheet
              step={step}
              setStep={setStep}
              entryMode={entryMode}
              addedCards={addedCards}
              selectedCardId={selectedCardId}
              setSelectedCardId={setSelectedCardId}
              tempCards={tempCards}
              selectedBank={selectedBank}
              onAddCard={handleAddCardClick}
              onEntryModeSelect={handleEntryModeSelect}
              onCardIdentified={handleCardIdentified}
              onCardSubmit={handleCardSubmit}
              onFinishAdd={handleFinishAdd}
              onVerifyLater={handleVerifyLater}
              onGoToVerify={handleGoToVerify}
              onVerifyComplete={handleVerifyComplete}
              onBankSelect={handleBankSelect}
              onPay={handleFinalPay}
              onReset={handleReset}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default App;
