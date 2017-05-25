var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component, EventEmitter, ViewChild, ElementRef, Renderer, Output } from '@angular/core';
import { FormBuilder, FormControl } from '@angular/forms';
import { ToastsManager } from 'ng2-toastr';
import { Router } from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser';
import { AuthService } from '../auth/auth.service';
var FormComponent = (function () {
    function FormComponent(_fb, toastr, router, sanitizer, renderer, authService) {
        this._fb = _fb;
        this.toastr = toastr;
        this.router = router;
        this.sanitizer = sanitizer;
        this.renderer = renderer;
        this.authService = authService;
        this.onPassForm = new EventEmitter();
        // get the Auth Token from localStorage in order to Authenticate to back end while submitting the form
        this.token = localStorage.getItem('id_token');
        this.angleInDegrees = 0;
        this.url = '/uploads';
        this.maxSize = 50000000;
        this.invalidFileSizeMessage = '{0}: Invalid file size, ';
        this.invalidFileSizeMessageDetail = 'Maximum upload size is {0}.';
        this.progress = 0;
        this.onUploadFinisedChildToParent = new EventEmitter();
        this.onClear = new EventEmitter();
    }
    FormComponent.prototype.drawRotated = function (degrees, file) {
        var canvas;
        var angleInDegrees = 0;
        var image = document.createElement("img");
        if (canvas)
            document.body.removeChild(canvas);
        image.src = file.notSafeURL;
        canvas = document.createElement("canvas");
        var ctx = canvas.getContext("2d");
        canvas.style.width = "20%";
        if (degrees == 90 || degrees == 270) {
            canvas.width = image.height;
            canvas.height = image.width;
        }
        else {
            canvas.width = image.width;
            canvas.height = image.height;
        }
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        if (degrees == 90 || degrees == 270) {
            ctx.translate(image.height / 2, image.width / 2);
        }
        else {
            ctx.translate(image.width / 2, image.height / 2);
        }
        ctx.rotate(degrees * Math.PI / 180);
        ctx.drawImage(image, -image.width / 2, -image.height / 2);
        this.appendToChildEl.nativeElement.appendChild(canvas);
    };
    FormComponent.prototype.rotate = function () {
        this.angleInDegrees = (this.angleInDegrees + 90) % 360;
        this.drawRotated(this.angleInDegrees, this.files[0]);
        //  this.resizeImage(this.files[0])
        //  console.log(this.files)
    };
    // event fired when the user selects an image
    FormComponent.prototype.onFileSelect = function (event) {
        this.clear();
        var files = event.dataTransfer ? event.dataTransfer.files : event.target.files;
        for (var i = 0; i < files.length; i++) {
            var file = files[i];
            if (this.validate(file)) {
                if (this.isImage(file)) {
                    file.objectURL = this.sanitizer.bypassSecurityTrustUrl((window.URL.createObjectURL(files[i])));
                    file.notSafeURL = window.URL.createObjectURL(files[i]);
                    this.files.push(files[i]);
                    // console.log(this.files)
                    //
                    //
                    //
                    // let canvas = document.createElement('canvas');
                    // let ctx = canvas.getContext('2d');
                    // var j = 0;
                    // var shipImg = new Image();
                    // shipImg.src = 'http://localhost/assets/images/my_chair_logo.png';
                    // ctx.fillStyle = '#000';
                    // ctx.fillRect(0,0,100,100);
                    //
                    // ctx.save();
                    // ctx.translate(50, 50);
                    // ctx.rotate(i / 180 / Math.PI);
                    // ctx.drawImage(file.objectURLshipImg, -16, -16);
                    // ctx.restore();
                    // i += 10;
                }
            }
            else if (!this.isImage(file)) {
                this.toastr.error('Only images are allowed');
            }
        }
    };
    FormComponent.prototype.isImagePure = function (file) {
        if (!file.type.match('image/*')) {
            //this.toastr.error('Only images are allowed');
            return false;
        }
        return true;
    };
    // check if the image is actually an image by checking the mime type
    FormComponent.prototype.isImage = function (file) {
        if (!file.type.match('image/*') && !file.type.match('application/pdf')) {
            this.toastr.error('Only images are allowed');
            return false;
        }
        return true;
    };
    // check if the form has files ready to be uploaded
    FormComponent.prototype.hasFiles = function () {
        return this.files && this.files.length > 0;
    };
    // clears the form
    FormComponent.prototype.clear = function () {
        this.files = [];
        this.onClear.emit();
    };
    // remove the image from the preview
    FormComponent.prototype.remove = function (index) {
        this.files.splice(index, 1);
        this.fileInput.nativeElement.value = '';
    };
    // check the image file size
    FormComponent.prototype.validate = function (file) {
        if (this.maxSize && file.size > this.maxSize) {
            this.toastr.error(this.invalidFileSizeMessageDetail.replace('{0}', this.formatSize(this.maxSize)), this.invalidFileSizeMessage.replace('{0}', file.name));
            return false;
        }
        return true;
    };
    // format the size to display it in toastr in case the user uploaded a file bigger than 5MB
    FormComponent.prototype.formatSize = function (bytes) {
        if (bytes === 0) {
            return '0 B';
        }
        var k = 1000, dm = 3, sizes = ['B', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'], i = Math.floor(Math.log(bytes) / Math.log(k));
        return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
    };
    FormComponent.prototype.ngOnInit = function () {
        this.files = [];
        this.textInput1 = new FormControl('');
        this.textInput2 = new FormControl('');
        this.myForm = this._fb.group({
            textInput1: this.textInput1,
            textInput2: this.textInput2
        });
    };
    // focus on first input box after the view is initialized
    FormComponent.prototype.ngAfterViewInit = function () {
        // setTimeout(() => {
        //   this.renderer.invokeElementMethod(this.textOne.nativeElement, 'focus', []);
        // }, 50);
    };
    FormComponent.prototype.isLoggedIn = function () {
        return this.authService.isLoggedIn();
    };
    // submit the form to back end
    FormComponent.prototype.onSubmit = function () {
        var _this = this;
        this.submitStarted = true;
        var xhr = new XMLHttpRequest();
        var formData = new FormData();
        for (var i = 0; i < this.files.length; i++) {
            formData.append('fileUp', this.files[i], this.files[i].name);
        }
        xhr.upload.addEventListener('progress', function (event) {
            if (event.lengthComputable) {
                _this.progress = Math.round((event.loaded * 100) / event.total);
            }
        }, false);
        xhr.onreadystatechange = function () {
            if (xhr.readyState === 4) {
                _this.progress = 0;
                if (xhr.status === 201) {
                    //this.router.navigateByUrl('/user/forms');
                    //  location.reload();
                    var form = JSON.parse(xhr.response).obj;
                    console.log(form);
                    _this.onPassForm.emit(form);
                    _this.onUploadFinisedChildToParent.emit();
                    _this.toastr.success('Form submitted successfully');
                }
                else if (xhr.status !== 201) {
                    _this.toastr.error('There was an error!');
                }
                _this.clear();
            }
        };
        xhr.open('POST', this.url, true);
        formData.append('textInput1', this.myForm.value.textInput1);
        formData.append('textInput2', this.myForm.value.textInput2);
        xhr.withCredentials = true;
        xhr.setRequestHeader('Authorization', this.token);
        xhr.send(formData);
        console.log(xhr);
    };
    FormComponent.prototype.isAdmin = function () {
        return this.authService.isAdmin();
    };
    return FormComponent;
}());
__decorate([
    ViewChild('item'),
    __metadata("design:type", ElementRef)
], FormComponent.prototype, "item", void 0);
__decorate([
    ViewChild('appendToChildEl'),
    __metadata("design:type", ElementRef)
], FormComponent.prototype, "appendToChildEl", void 0);
__decorate([
    Output(),
    __metadata("design:type", Object)
], FormComponent.prototype, "onPassForm", void 0);
__decorate([
    ViewChild('textOne'),
    __metadata("design:type", ElementRef)
], FormComponent.prototype, "textOne", void 0);
__decorate([
    ViewChild('fileInput'),
    __metadata("design:type", ElementRef)
], FormComponent.prototype, "fileInput", void 0);
__decorate([
    Output(),
    __metadata("design:type", Object)
], FormComponent.prototype, "onUploadFinisedChildToParent", void 0);
FormComponent = __decorate([
    Component({
        selector: 'app-form',
        templateUrl: './form.component.html',
        styleUrls: ['./form.component.css']
    }),
    __metadata("design:paramtypes", [FormBuilder,
        ToastsManager,
        Router,
        DomSanitizer,
        Renderer,
        AuthService])
], FormComponent);
export { FormComponent };
//http://stackoverflow.com/questions/18033812/how-to-rotate-image-using-native-javascript
// TODO  sample code to resize image before uploading to reduce bandwidth from server
// resizeImage(file) {
//  let  reader = new FileReader();
//   reader.onloadend = function() {
//     let tempImg = new Image();
//     tempImg.src = reader.result;
//     console.log(tempImg.src)
//     tempImg.onload = function() {
//
//       let MAX_WIDTH = 400;
//       let MAX_HEIGHT = 300;
//       let tempW = tempImg.width;
//       let tempH = tempImg.height;
//       if (tempW > tempH) {
//         if (tempW > MAX_WIDTH) {
//           tempH *= MAX_WIDTH / tempW;
//           tempW = MAX_WIDTH;
//         }
//       } else {
//         if (tempH > MAX_HEIGHT) {
//           tempW *= MAX_HEIGHT / tempH;
//           tempH = MAX_HEIGHT;
//         }
//       }
//
//       let canvas = document.createElement('canvas');
//       canvas.width = tempW;
//       canvas.height = tempH;
//       let ctx = canvas.getContext('2d');
//       ctx.drawImage(this, 0, 0, tempW, tempH);
//       let dataURL = canvas.toDataURL('image/jpeg');
//     }
//
//   };
//   reader.readAsArrayBuffer(file);
// }
//# sourceMappingURL=form.component.js.map