
import React from 'react';
import { Bank, Card } from './types';

export const USER_NAME = "Stan Li";
export const BILLING_ADDRESS = {
  line1: "1600 Amphitheatre Pkwy",
  city: "Mountain View",
  state: "CA",
  zip: "94043"
};

export const DEVICES = [
  "Stance Pixel 10 Pro",
  "Moto device project ARRA"
];

export const MOCK_BANKS: Bank[] = [
  {
    id: 'chase',
    name: 'Chase',
    logo: 'https://logo.clearbit.com/chase.com',
    cards: [
      { id: 'c1', name: 'Sapphire Preferred', pan: '4111 2222 3333 4444', lastFour: '4444', expiry: '09/28', cardArt: 'https://picsum.photos/id/201/300/180', bank: 'Chase' },
      { id: 'c2', name: 'Freedom Unlimited', pan: '4111 2222 3333 5555', lastFour: '5555', expiry: '11/27', cardArt: 'https://picsum.photos/id/202/300/180', bank: 'Chase' },
      { id: 'c3', name: 'Ink Business', pan: '4111 2222 3333 6666', lastFour: '6666', expiry: '02/29', cardArt: 'https://picsum.photos/id/203/300/180', bank: 'Chase' },
    ]
  },
  {
    id: 'amex',
    name: 'American Express',
    logo: 'https://logo.clearbit.com/americanexpress.com',
    cards: [
      { id: 'a1', name: 'Gold Card', pan: '3712 345678 95005', lastFour: '5005', expiry: '05/26', cardArt: 'https://picsum.photos/id/204/300/180', bank: 'Amex' },
      { id: 'a2', name: 'Platinum Card', pan: '3712 345678 96006', lastFour: '6006', expiry: '12/28', cardArt: 'https://picsum.photos/id/206/300/180', bank: 'Amex' },
      { id: 'a3', name: 'Blue Cash', pan: '3712 345678 97007', lastFour: '7007', expiry: '08/27', cardArt: 'https://picsum.photos/id/208/300/180', bank: 'Amex' },
    ]
  },
  {
    id: 'capitalone',
    name: 'Capital One',
    logo: 'https://logo.clearbit.com/capitalone.com',
    cards: [
      { id: 'cp1', name: 'Venture X', pan: '4111 2222 3333 8888', lastFour: '8888', expiry: '01/30', cardArt: 'https://picsum.photos/id/210/300/180', bank: 'Capital One' },
      { id: 'cp2', name: 'SavorOne', pan: '4111 2222 3333 9999', lastFour: '9999', expiry: '04/28', cardArt: 'https://picsum.photos/id/211/300/180', bank: 'Capital One' },
      { id: 'cp3', name: 'Quicksilver', pan: '4111 2222 3333 1111', lastFour: '1111', expiry: '10/26', cardArt: 'https://picsum.photos/id/212/300/180', bank: 'Capital One' },
    ]
  }
];
