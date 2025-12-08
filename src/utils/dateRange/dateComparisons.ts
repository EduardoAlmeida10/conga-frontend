export function isBefore(a?: string, b?: string) {
  if (!a || !b) return false;
  return new Date(a) < new Date(b);
}

export function isAfter(a?: string, b?: string) {
  if (!a || !b) return false;
  return new Date(a) > new Date(b);
}

