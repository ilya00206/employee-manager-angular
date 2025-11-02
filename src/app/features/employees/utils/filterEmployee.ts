import { Employee } from '../models/employee';

export function filterEmployee(data: Employee[], search: string) {
  search = search.toLocaleLowerCase();
  return data.filter((employee) => {
    const fullName = `${employee.firstName} ${employee.lastName}`.toLocaleLowerCase();
    return fullName.includes(search);
  });
}
