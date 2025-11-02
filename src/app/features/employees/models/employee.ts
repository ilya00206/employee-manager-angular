import { Gender } from './gender';

export interface Employee {
  readonly id: number;
  readonly employeeId: string;
  readonly firstName: string;
  readonly lastName: string;
  readonly gender: Gender;
}
