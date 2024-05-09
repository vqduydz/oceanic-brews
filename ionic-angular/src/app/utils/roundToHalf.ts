function roundToHalf(num: number): number {
  const remainder = num % 1;
  if (remainder <= 0.25) {
    return Math.floor(num);
  } else if (remainder >= 0.75) {
    return Math.ceil(num);
  } else {
    return Math.floor(num) + 0.5;
  }
}

export default roundToHalf;
