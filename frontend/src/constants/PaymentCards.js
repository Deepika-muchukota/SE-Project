export const TEST_CARDS = [
  {
    number: '9111592350718765',
    expiry: '12/26',
    cvv: '465',
    type: 'Visa'
  },
  {
    number: '9765908754321980',
    expiry: '06/26',
    cvv: '321',
    type: 'Mastercard'
  },
  {
    number: '378282246313005',
    expiry: '09/27',
    cvv: '456',
    type: 'American Express'
  }
];

// Function to validate if a card is a test card
export const isTestCard = (cardNumber) => {
  return TEST_CARDS.some(card => card.number === cardNumber);
}; 
