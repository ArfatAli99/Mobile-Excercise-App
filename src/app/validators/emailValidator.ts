import {FormControl} from '@angular/forms';

export class EmailValidator {

	/**
	* @desc : To check email is valid or not
	* @param: Email Form control of FormGroup/FormBuilder
	* @return: return null if no error otherwise return True if invalid
	*/
    static isValid(control: FormControl){

      var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(control.value);

      if (re){
        return null;
      }

      return {"invalidEmail": true};
    }

}