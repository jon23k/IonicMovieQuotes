import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { AngularFireDatabase, FirebaseListObservable } from "angularfire2/database";
import { MovieQuote } from "../../models/MovieQuote";

/**
 * Generated class for the ListPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-list',
  templateUrl: 'list.html',
})
export class ListPage {

  movieQuoteStream: FirebaseListObservable<MovieQuote[]>;

  constructor(public navCtrl: NavController, public navParams: NavParams,
    private db: AngularFireDatabase, private alertCtrl: AlertController) {
    this.movieQuoteStream = this.db.list("/quotes");
  }

  showAddQuoteDialog(): void {
    const prompt = this.alertCtrl.create({
      title: 'Add Quote',
      message: "Enter a Famous Quote from a Movie",
      inputs: [
        {
          name: 'quote',
          placeholder: 'The Quote'
        },
        {
          name: 'movie',
          placeholder: 'From Movie'
        },
      ],
      buttons : [
        {
          text: 'Cancel',
          handler: data => {
            console.log("Cancel was clicked");
          }
        },
        {
          text: 'Save',
          handler: data => {
            console.log("Save was clicked");
            if (data.quote && data.movie){
              this.movieQuoteStream.push(data);
            }
            else{
              console.log("Not properly filled in");
              return false;
            }
          }
        },
      ]
    });
    prompt.present();
  }
}
