const isEmpty = (someString: string) => {
  if (someString.trim() === "") {
    return true;
  }

  return false;
};

export const validateCreditCardNumber = (creditCardNumber?: string) => {
  if (creditCardNumber) {
    if (isEmpty(creditCardNumber)) {
      return false;
    }
    const creditCardNumberWithoutSpaces = creditCardNumber.replace(/ /g, "");
    if (
      creditCardNumberWithoutSpaces.length === 16 &&
      !isNaN(Number(creditCardNumberWithoutSpaces))
    ) {
      return true;
    }

    return false;
  }
  return false;
};

export const validateCvc = (cvc?: string) => {
  if (cvc) {
    if (isEmpty(cvc)) {
      return false;
    }

    if (cvc.length > 3) {
      return false;
    }
    if (isNaN(Number(cvc))) {
      return false;
    }

    return true;
  }
};

export const validateName = (name: string) => (isEmpty(name) ? false : true);

export const validateExpiryDate = (expiryDate: string) => {
  if (isEmpty(expiryDate)) {
    return false;
  }
  const arr = expiryDate.split("/");

  if (Number(arr[0]) > 12 || Number(arr[0]) <= 0) {
    return false;
  }

  // let's assume there are no cards with 2030 as an expiration date
  if (Number(arr[1]) > 30 || Number(arr[1]) <= 0) {
    return false;
  }

  return true;
};
