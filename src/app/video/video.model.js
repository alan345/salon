var VideoClass = (function () {
    function VideoClass(sanitizer) {
        this._id = '';
        this.title = '';
        this.embed = '';
        this.categories = [];
        this.owner = [];
        this.embedSecure = sanitizer.bypassSecurityTrustResourceUrl('');
    }
    return VideoClass;
}());
export { VideoClass };
//# sourceMappingURL=video.model.js.map