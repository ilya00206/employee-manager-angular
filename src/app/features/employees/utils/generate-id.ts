import { employees } from '../data/employees';

let idCounter = employees.length + 1;

export function generateId(): number {
  return idCounter++;
}
