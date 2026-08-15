const FIELD_MODULUS =
  8444461749428370424248824938781546531375899335154063827935233455917409239041n;
const U32_MAX = 4_294_967_295n;
const U128_MAX = 340_282_366_920_938_463_463_374_607_431_768_211_455n;

function normalizeUnsigned(
  value: string,
  suffix: 'field' | 'u32' | 'u128',
  maximum: bigint,
) {
  const trimmed = value.trim();
  const withoutSuffix = trimmed.endsWith(suffix)
    ? trimmed.slice(0, -suffix.length)
    : trimmed;
  if (!/^(0|[1-9]\d*(?:_\d+)*)$/.test(withoutSuffix)) {
    throw new Error(`${suffix} values must be unsigned decimal integers.`);
  }
  const digits = withoutSuffix.replaceAll('_', '');
  const integer = BigInt(digits);
  if (integer > maximum) throw new Error(`${suffix} value is out of range.`);
  return `${digits}${suffix}`;
}

export const toField = (value: string) =>
  normalizeUnsigned(value, 'field', FIELD_MODULUS - 1n);

export const toU32 = (value: string) => normalizeUnsigned(value, 'u32', U32_MAX);

export const toU128 = (value: string) => normalizeUnsigned(value, 'u128', U128_MAX);

export function literalValue(value: string, suffix: 'u32' | 'u128') {
  const normalized = suffix === 'u32' ? toU32(value) : toU128(value);
  return BigInt(normalized.slice(0, -suffix.length));
}

export function normalizeRecord(value: string, label: string) {
  const record = value.trim();
  if (!record) throw new Error(`${label} is required.`);
  if (record.length > 100_000) throw new Error(`${label} is too large.`);
  return record;
}
