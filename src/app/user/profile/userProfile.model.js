var UserProfile = (function () {
    function UserProfile(email, role, createdAt, updatedAt, id, profilePic) {
        this.email = email;
        this.role = role;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
        this.id = id;
        this.profilePic = profilePic;
    }
    return UserProfile;
}());
export { UserProfile };
var newPassword = (function () {
    function newPassword(currentPassword, newPassword) {
        this.currentPassword = currentPassword;
        this.newPassword = newPassword;
    }
    return newPassword;
}());
export { newPassword };
//# sourceMappingURL=userProfile.model.js.map