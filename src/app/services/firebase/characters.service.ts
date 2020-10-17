import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class CharactersService {

  constructor(private firestore: AngularFirestore) { }

  createCharacter(data, callback) {
    return new Promise<any>((resolve, reject) =>{
        this.firestore
            .collection("characters")
            .add(data)
            .then(res => callback, err => reject(err));
    });
  }
}
