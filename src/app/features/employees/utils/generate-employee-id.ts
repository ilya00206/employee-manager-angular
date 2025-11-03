export function generateEmployeeId(num: number): string {
  return num.toString().padStart(8, '0');
}
