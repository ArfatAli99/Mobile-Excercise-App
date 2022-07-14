import { Injectable } from '@angular/core';
import { AlertController, LoadingController, ToastController} from '@ionic/angular'

@Injectable({
  providedIn: 'root'
})
export class UtilsService {
	loader:any;
  	constructor(public alertCtrl: AlertController, public loading:LoadingController, public toastController: ToastController) { }


  	/**
  	* @desc : to show Alert Box on any event/warning etc
  	* @param : (_title:string, _subtitle:string, name:string)
  	*/
  	async presentToast(_message) {
  		const toast = await this.toastController.create({
	      message: _message,
	      duration: 2000,
	      position: 'bottom'
	    });
	    toast.present();
	}


  	/**
  	* @desc : to show Alert Box on any event/warning etc
  	* @param : (_title:string, _subtitle:string, name:string)
  	*/
  	showAlert(_title, _message, name='') {
  		// let name =_name || '';
	  	this.alertCtrl.create({
		    header: _title,
		    message: _message,
		    buttons: ['OK']
		}).then((alert)=>{
		  	console.log(name+' Alert Success');
		  	alert.present();
		},(error)=>{
		   	console.log('Error in '+name+ ' Alert',error)
	 	});
	}

	/**
   	* @desc : Show loading spinner function
   	* @param {string} title
   	*/
  	showLoading(title?: string,time?: number, name='') {
	  	this.loading.create({
	  		spinner: 'bubbles',
	      	message: title || 'Loading...',
	  		showBackdrop: false,
	  		duration: time || 2000
	  	}).then((_loading)=>{
	  		console.log(name+'Loading Success..');
	  		this.loader=_loading;
	  		this.loader.present();
	  	},(error)=>{
	  		console.log(name+'Loading Error.', error);
	  	});
  	}

  	/**
   	* @desc : Hide loading spinner function
   	*/
  	hideLoading() {
  		if(this.loader){
  			this.loader.dismiss();
  			this.loader=null;
  		}
  	}

}
