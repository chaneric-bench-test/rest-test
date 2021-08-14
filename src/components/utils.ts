import { Currency } from '../types/Currency';

export const formatCurrency = (amount: string | number, currency = Currency.CAD): string => {
  let returnString = '';
  if (typeof amount === 'string') {
    amount = parseFloat(amount);
  }
  if (amount < 0) {
    returnString += '-';
  }

  // EC - Tech Debt: instead of using own string builder, utilize ES6 NumberFormat Locale
  amount = new Intl.NumberFormat(undefined, { minimumFractionDigits: 2 }).format(Math.abs(amount));
  
  switch (currency) {
    case Currency.CAD:
      returnString += `$${amount}`
      break;
    case Currency.EUR:
      returnString += `€${amount}`;
      break;
    default:
      returnString += `$${amount}`;
      break;
  }

  return returnString;
}