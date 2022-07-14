import {FormControl, AbstractControl} from '@angular/forms';

export class PasswordValidator {

    /**
    * @desc : To Match/Confirm two passwords
    * @param : Form Builder/ Form Group
    * @return : return null if no error otherwise return True if mismatched
    */
    static MatchPassword(AC: AbstractControl) {
       let password = AC.get('newPassword').value; // to get value in input tag
       let confirmPassword = AC.get('confirmPassword').value; // to get value in input tag
        if(password != confirmPassword) {
            // console.log('false');
            AC.get('confirmPassword').setErrors( {MatchPassword: true} )
        } else {
            // console.log('true');
            return null
        }
    }

    /**
    * @desc : To valid Old password from Local Storage and user input
    * @param : Old password form control of Form Builder/group
    * @return : return null if no error otherwise return True if invalid
    */
    static validOldPassword(control: FormControl) {
       let oldPassword = JSON.parse(localStorage.getItem('user')).password;
       let enteredPassword = control.value; // to get value in input tag
        if(oldPassword != enteredPassword) {
            // console.log('false');
           return {"invalidPassword": true};
        } else {
            // console.log('true');
            return null
        }
    }

}