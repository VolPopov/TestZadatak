const generateRandomString = length => {
  const characters =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let result = '';
  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    result += characters[randomIndex];
  }
  return result;
};

const generateRandomInt = length => {
  const characters = '0123456789';
  let result = '';
  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    result += characters[randomIndex];
  }
  return result;
};

export const generateUserCredentials = length => {
  const baseString = generateRandomString(length);

  const username = baseString;
  const email = `${baseString}@gmail.com`;
  const password = `${baseString}123`;

  return { username, email, password };
};

export const generateNewBillingInfo = () => {
  const baseCard = generateRandomInt(15);
  const customerID = 119;
  const cardholder = generateRandomString(7);
  const card_type = 'Visa';
  const card_number = `4${baseCard}`;
  const cvv = generateRandomInt(3);
  const card_expiration_date = '10/28';

  return {
    customerID,
    cardholder,
    card_type,
    card_number,
    cvv,
    card_expiration_date,
  };
};
