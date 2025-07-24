import { FormControl } from "@angular/forms";

export interface IRegisterFormRequest {
  firstName: FormControl<string|null>,
  lastName: FormControl<string|null>,
  username: FormControl<string|null>,
  email: FormControl<string|null>,
  password:FormControl<string|null>,
}
export interface IRegisterRequest {
  firstName: string|null,
  lastName: string|null,
  username: string|null,
  email: string|null,
  password:string|null,
}