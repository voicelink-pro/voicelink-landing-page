const NATIONAL_LENGTH = 9;

export function polishNationalDigits(value: string) {
  let digits = value.replace(/\D/g, "");

  if (digits.startsWith("0048") && digits.length > NATIONAL_LENGTH) {
    digits = digits.slice(4);
  } else if (digits.startsWith("48") && digits.length > NATIONAL_LENGTH) {
    digits = digits.slice(2);
  }

  return digits.slice(0, NATIONAL_LENGTH);
}

export function formatPolishNational(digits: string) {
  return [digits.slice(0, 3), digits.slice(3, 6), digits.slice(6, 9)]
    .filter((group) => group.length > 0)
    .join(" ");
}

export function toPolishE164(nationalDigits: string) {
  if (!/^[1-9]\d{8}$/.test(nationalDigits)) {
    return null;
  }

  return `+48${nationalDigits}`;
}
