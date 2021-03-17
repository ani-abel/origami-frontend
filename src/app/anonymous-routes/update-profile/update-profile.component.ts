import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { SharedUtilityService } from '../../shared-module/services/shared-utility.service';
import { Person } from 'src/app/services/origamiGraphql.service';
import { MimeTypeValidator, FileSizeValidator } from 'src/app/validators/file.validator';
import { UpdateProfile } from '../../types/internal-types.type';

@Component({
  selector: 'app-update-profile',
  templateUrl: './update-profile.component.html',
  styleUrls: ['./update-profile.component.css']
})
export class UpdateProfileComponent implements OnInit {
  updateProfileForm: FormGroup;
  passportUrl: string;
  fullName: string;

  constructor(
    private readonly sharedUtilitySrv: SharedUtilityService
  ) { }

  ngOnInit(): void {
    this.initForm();
    this.sharedUtilitySrv
        .getProfile()
        .subscribe(
          (response: Person) => {
            const { FirstName, LastName, Username, PassportUrl } = response;

            this.updateProfileForm.patchValue({
              firstName: FirstName,
              lastName: LastName,
              username: Username,
              profileImage: PassportUrl
            });

            //Update the Forms Values and validitity
            this.updateProfileForm.updateValueAndValidity();

            this.passportUrl = PassportUrl;
            this.fullName = `${FirstName} ${LastName}`;
          },
          (error) => {
            throw error;
          }
        )
  }

  initForm(): void {
    this.updateProfileForm = new FormGroup({
      "profileImage": new FormControl(null, {
        validators: Validators.compose([
          Validators.required
        ]),
        asyncValidators: [
          MimeTypeValidator,
          FileSizeValidator
        ]//set up validators to check for filetypes using MIMETYPE and FILESIZE
    }),
      "firstName": new FormControl(null, Validators.required),
      "lastName": new FormControl(null, Validators.required),
      "username": new FormControl(null, Validators.compose([
                                          Validators.required,
                                          Validators.email
                                      ]))
    });
  }

  onImagePicked(event: Event): void {
    //Extract the <file> Object that was added
    const file = (event.target as HTMLInputElement).files[0];

    //patch the form selector control to the formGroup
    this.updateProfileForm.patchValue({
      "profileImage": file
    });
    this.updateProfileForm.get("profileImage").updateValueAndValidity();//make sure that <postImage> is patched into the form behind the scenes and updates its validity

    //get the postImageUrl
    const fileReader = new FileReader();//open the fileReader handle
    //set the imagePreviewUrl while file reading is happening
    fileReader.onload = () => this.passportUrl = (fileReader.result as string)
    //create a dataUrl for the uploaded <postImage>
    fileReader.readAsDataURL(file);
  }

  submitForm(): void {
    if(this.updateProfileForm.invalid) {
      return;
    }

    const { firstName, lastName, username, profileImage } = this.updateProfileForm.value;
    const updatedData: UpdateProfile = {
      FirstName: firstName,
      LastName: lastName,
      Username: username,
      ProfileImage: (profileImage && typeof profileImage !== "string") ? profileImage : null
    };

    if(updatedData.ProfileImage && typeof updatedData.ProfileImage !== "string") {
      this.sharedUtilitySrv.updateProfileWithImage(updatedData);
    }
    else {
      this.sharedUtilitySrv.updateProfileWithoutImage(updatedData);
    }
  }
}
