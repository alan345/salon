import { Form } from '../form/form.model'


export class Promotion {
  _id : string;
  date : DatePromo;
  name : string;
  form: Form[];
}


export class DatePromo{
  dateBegin: string;
  dateEnd: string;
}
