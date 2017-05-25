var Companie = (function () {
    function Companie() {
        this._id = '';
        this.name = '';
        this.typeCompanie = '';
        this.phoneNumber = '';
        this.address = new Address();
        this._users = [];
        this.forms = [];
    }
    return Companie;
}());
export { Companie };
var Address = (function () {
    function Address() {
        this.address = '';
        this.city = '';
        this.state = '';
        this.zip = '';
    }
    return Address;
}());
export { Address };
// export const CompanieConst: Companie = {
//   _id: '',
//   forms: [],
//   name: '',
//   typeCompanie: '',
//   phoneNumber: '',
//   address: {
//     address : '',
//     city :  '',
//     state :  '',
//     zip :  ''
//   },
//   _users: []
// };
//# sourceMappingURL=companie.model.js.map