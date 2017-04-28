

export interface Press {
  _id: string;
  title: string;
  link: string;
  owner:{
    _id: string;
  };
  formPDF:[{
    _id: string;
    owner: string;
    imagePath: string;
  }];
  form:[{
    _id: string;
    owner: string;
    imagePath: string;
  }];
  // date: {
  //   dateBegin:Date;
  //   dateEnd:Date;
  // }
}
//
export interface FormPDF {
  _id: string;
  owner: string;
  imagePath: string;

}
