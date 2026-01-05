
export enum FlowStep {
  PRODUCT_VIEW = 'PRODUCT_VIEW',
  PAYMENT_SHEET = 'PAYMENT_SHEET',
  ADD_CARD_MENU = 'ADD_CARD_MENU',
  TAP_INSTRUCTIONS = 'TAP_INSTRUCTIONS',
  CAMERA_SCAN = 'CAMERA_SCAN',
  CARD_FORM = 'CARD_FORM',
  CONTACTING_BANK = 'CONTACTING_BANK',
  BILLING_ADDRESS = 'BILLING_ADDRESS',
  ADD_SUCCESS = 'ADD_SUCCESS',
  VERIFICATION_FLOW = 'VERIFICATION_FLOW',
  VERIFY_SUCCESS = 'VERIFY_SUCCESS',
  DO_LATER_SUCCESS = 'DO_LATER_SUCCESS',
  BANK_SELECTOR = 'BANK_SELECTOR',
  BANK_LOGIN = 'BANK_LOGIN',
  BANK_CARD_SELECTOR = 'BANK_CARD_SELECTOR',
  ORDER_COMPLETE = 'ORDER_COMPLETE'
}

export enum EntryMode {
  TAP = 'TAP',
  CAMERA = 'CAMERA',
  MANUAL = 'MANUAL',
  BANK = 'BANK'
}

export interface Card {
  id: string;
  name: string;
  pan: string;
  lastFour: string;
  expiry: string;
  cvv?: string;
  cardArt: string;
  bank?: string;
}

export interface Bank {
  id: string;
  name: string;
  logo: string;
  cards: Card[];
}
