import { FormControl } from "@angular/forms";

export interface ILoginFormRequest {
  email: FormControl<string|null>,
  password:FormControl<string|null>,
}
export interface ILoginRequest {
  email: string|null,
  password:string|null,
}