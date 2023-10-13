export default function extractNumbersFromString(str) {
  const regex = /[0-9]+(?:\.[0-9]+)?/g;
  const numbers = str.match(regex);

  if (numbers) {
    // Возвращаем первое найденное число как число типа float
    return parseFloat(numbers[0]);
  }

  return null; // Если числа в строке не найдены
}
