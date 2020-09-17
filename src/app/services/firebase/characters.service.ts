import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class CharactersService {

  constructor(private firestore: AngularFirestore) { }

  createCharacter(data) {
    return new Promise<any>((resolve, reject) =>{
        this.firestore
            .collection("characters")
            .add(data)
            .then(res => {}, err => reject(err));
    });
  }
}
