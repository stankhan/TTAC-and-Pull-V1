
import React, { useState, useEffect } from 'react';

interface VerificationFlowProps {
  onComplete: () => void;
}

const VerificationFlow: React.FC<VerificationFlowProps> = ({ onComplete }) => {
  const [step, setStep] = useState<'TOKENIZING' | 'OTP_METHOD' | 'OTP_CHALLENGE'>('TOKENIZING');

  useEffect(() => {
    if (step === 'TOKENIZING') {
      const timer = setTimeout(() => setStep('OTP_METHOD'), 2000);
      return () => clearTimeout(timer);
    }
  }, [step]);

  if (step === 'TOKENIZING') {
    return (
      <div className="p-8 flex flex-col items-center justify-center h-full text-center">
        <div className="w-16 h-16 relative mb-8">
           <div className="absolute inset-0 border-4 border-blue-100 rounded-full"></div>
           <div className="absolute inset-0 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
        </div>
        <h2 className="text-xl font-bold mb-2">Tokenizing card...</h2>
        <p className="text-gray-500">Creating a secure digital token for safer transactions.</p>
      </div>
    );
  }

  if (step === 'OTP_METHOD') {
    return (
      <div className="p-6">
        <h2 className="text-xl font-bold mb-6">Security Verification</h2>
        <p className="text-gray-600 mb-8">Choose how you'd like to receive your verification code.</p>
        <div className="space-y-4">
          <button 
            onClick={() => setStep('OTP_CHALLENGE')}
            className="w-full flex items-center justify-between p-4 border border-gray-200 rounded-2xl hover:bg-blue-50 hover:border-blue-300 transition-all text-left"
          >
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" /></svg>
              </div>
              <div>
                <p className="font-bold text-gray-800">SMS to +1 (***) ***-8890</p>
                <p className="text-xs text-gray-500">Standard rates apply</p>
              </div>
            </div>
            <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
          </button>

          <button 
            onClick={() => setStep('OTP_CHALLENGE')}
            className="w-full flex items-center justify-between p-4 border border-gray-200 rounded-2xl hover:bg-blue-50 hover:border-blue-300 transition-all text-left"
          >
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 bg-green-100 text-green-600 rounded-full flex items-center justify-center">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
              </div>
              <div>
                <p className="font-bold text-gray-800">Email to st****@google.com</p>
                <p className="text-xs text-gray-500">Instant delivery</p>
              </div>
            </div>
            <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6">
       <h2 className="text-xl font-bold mb-4">Enter Code</h2>
       <p className="text-gray-600 mb-8">Enter the 6-digit code we sent to your phone.</p>
       <div className="flex gap-2 justify-between mb-10">
          {[...Array(6)].map((_, i) => (
             <div key={i} className="w-12 h-16 border-2 border-gray-200 rounded-xl bg-gray-50 flex items-center justify-center text-2xl font-bold">
                {i < 3 ? '4' : ''}
             </div>
          ))}
       </div>
       <button 
          onClick={onComplete}
          className="w-full py-3 bg-blue-700 text-white font-bold rounded-full shadow-lg"
       >
         Verify
       </button>
       <p className="text-center text-sm text-blue-700 mt-6 font-semibold">Resend code</p>
    </div>
  );
};

export default VerificationFlow;
