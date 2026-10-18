const SEPARATORS = /[\s().-]/g;

export function sanitizeContactPhoneInput(value: string) {
  let result = "";

  for (const char of value) {
    if (result.length >= 32) {
      break;
    }

    if (char === "+") {
      if (result.length === 0) {
        result += "+";
      }
      continue;
    }

    if (/[\d\s().-]/.test(char)) {
      result += char;
    }
  }

  return result;
}

export function parseContactPhone(value: string) {
  const trimmed = value.trim();

  if (!trimmed || trimmed.length > 32 || !/^[+\d\s().-]+$/.test(trimmed)) {
    return null;
  }

  const compact = trimmed.replace(SEPARATORS, "");

  if (compact.startsWith("+")) {
    const digits = compact.slice(1);
    return /^[1-9]\d{7,14}$/.test(digits) ? `+${digits}` : null;
  }

  if (compact.startsWith("00")) {
    const digits = compact.slice(2);
    return /^[1-9]\d{7,14}$/.test(digits) ? `+${digits}` : null;
  }

  if (/^48[1-9]\d{8}$/.test(compact)) {
    return `+${compact}`;
  }

  if (/^[1-9]\d{8}$/.test(compact)) {
    return compact;
  }

  return null;
}
