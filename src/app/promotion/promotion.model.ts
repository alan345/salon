import { Form } from '../form/form.model'


export class Promotion {
  _id = '';
  date = DatePromo;
  name = '';
  form: Form[];
}


export class DatePromo{
  dateBegin='';
  dateEnd='';
}
