export const ValidateEmail = email => {
  // Regular expression pattern for validating email
  const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  // Check if the email matches the pattern
  if (pattern.test(email?.trim())) {
    return true; // Valid email
  } else {
    return false; // Invalid email
  }
};

export const ValidateName = name => {
  return name?.trim().length > 2 && name?.trim().length <= 30;
};

export const ValidateMessage = message => {
  if (message) {
    return message?.trim().length >= 10 && message?.trim().length <= 1000;
  }
};
