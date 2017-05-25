// export class User {
//
//   constructor( public address: string) {
//     this.address = address;
//
//   }
// }
var User = (function () {
    function User() {
        this._id = '';
        this.email = '';
        this.lastVisit = new Date;
        this.role = [];
        this.forms = [];
        this.profile = new Profile();
        this.notes = [];
    }
    return User;
}());
export { User };
var Profile = (function () {
    function Profile() {
        this.name = '';
        this.isFeatured = false;
        this.lastName = '';
        this.title = '';
        this.phoneNumber = '';
        this.parentUser = [];
        this._profilePicture = [];
        this.hair = new Hair();
    }
    return Profile;
}());
export { Profile };
var Hair = (function () {
    function Hair() {
        this.hairTexture = '';
        this.hairCondition = '';
        this.scalpCondition = '';
    }
    return Hair;
}());
export { Hair };
//
// export const UserConst : User = {
//   _id: '',
//   lastVisit: new Date,
//   email: '',
//   profile:{
//     parentUser:[],
//     isFeatured:false,
//     phoneNumber: '',
//     name: '',
//     lastName: '',
//     title: '',
//     _profilePicture:[],
//     hair:{
//       hairCondition : 'Normal',
//       scalpCondition : 'Healthy',
//       hairTexture : 'Fine',
//     }
//   },
//   notes:[],
//   forms:[],
//   role:['stylist'],
// }
//# sourceMappingURL=user.model.js.map