export function abbreviateNumber(value: string | number): string {
  const number = Number(value)
  const SI_SYMBOL = ['', 'k', 'm', 'b', 't']
  const tier = (Math.log10(Math.abs(number)) / 3) | 0
  if (tier == 0) return number.toFixed(2)
  const suffix = SI_SYMBOL[tier]
  const scale = Math.pow(10, tier * 3)
  const scaled = number / scale
  return scaled.toFixed(2) + suffix
}
