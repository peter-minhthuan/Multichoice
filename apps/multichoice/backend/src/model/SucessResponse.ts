export class SucessResponse {
  code: number
  data: any
  success: boolean
  constructor(code: number, data: any, success: boolean) {
    this.code = code;
    this.data = data;
    this.success = success;
  }
}
