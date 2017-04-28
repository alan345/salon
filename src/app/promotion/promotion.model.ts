

export class Promotion {
  _id= '';
  date=DatePromo;
  name='';
  form:Form[];
}


export class Form{
  _id= '';
  owner= '';
  imagePath= '';
}

export class DatePromo{
  dateBegin='';
  dateEnd='';
}
