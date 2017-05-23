import { Form } from '../form/form.model';


export class Promotion {
  _id: string;
  date: DatePromo;
  name: string;
  form: Form[];
}


export class DatePromo {
  dateBegin: string;
  dateEnd: string;
}

export const PromotionConst: Promotion = {
  _id: '',
  date: {
    dateBegin: new Date().toISOString().substr(0, 10),
    dateEnd: new Date().toISOString().substr(0, 10),
  },
  name: '',
  form: []
};
