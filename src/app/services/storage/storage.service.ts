import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import 'rxjs/Rx';
import { Observable } from 'rxjs/Observable';


@Injectable({
  providedIn: 'root'
})
export class StorageService {

  public STORAGE_PREFIX = 'fs'; //Storage prefix for the app

  public localData;

  constructor( public storage: Storage ) {
    console.log('Hello StorageServiceProvider Provider');
  }

  /**
  * @desc : Function to get the localStorage data from WebStorage
  * @param : none
  * @return : none
  */
  loadStorage() {
    return new Observable(observer => {
      this.storage.get(this.STORAGE_PREFIX).then((val) => {
        console.log(val);
        if (val !== null)
          this.localData = val;
        else
          this.localData = {};

        observer.next();
      });
    });
  }

  /**
  * @desc : Function to Store a Prefix into Storage
  * @param : none
  * @return : none
  */
  public saveStorage() {
    this.storage.set(this.STORAGE_PREFIX, this.localData);
  }


  /**
  * @desc : Function to clear all storage data
  * @param : none
  * @return : none
  */
  public clearStorage() {
    this.localData = {};
    this.saveStorage();
    
  }

  /**
  * @desc : Function to get storage Object against a key
  * @param : {key}
  * @return : {Object/Value} returned storage value against key
  */
  public getObject(key) {
    return this.storage.get(this.STORAGE_PREFIX + '_' + key);
  }

  /**
  * @desc : Function to store into storage against a key
  * @param : {key} & {data}
  * @return : none
  */
  public setObject(key, data) {
  	// console.log('Key:'+ key+'/Data',data);
  	
    this.storage.set(this.STORAGE_PREFIX + '_' + key, data);
  }

  /**
  * @desc : Clear all Storage
  * @param : none
  * @return : none
  */
  public clearAll() {
    this.storage.clear();
  }

  /**
  * @desc : Clear Storage against a key
  * @param : {key}
  * @return : none
  */
  public clearObject(key) {
    this.storage.set(this.STORAGE_PREFIX + '_' + key, {});
  }

}


