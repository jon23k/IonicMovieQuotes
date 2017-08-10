import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { AngularFireDatabase, FirebaseObjectObservable } from "angularfire2/database";
import { MovieQuote } from "../../models/MovieQuote";
import { Subscription } from "rxjs/Subscription";

@IonicPage()
@Component({
  selector: 'page-quote-detail',
  templateUrl: 'quote-detail.html',
})
export class QuoteDetailPage {

  movieQuoteStream : FirebaseObjectObservable<MovieQuote>;
  movieQuote: MovieQuote;
  private movieQuoteSubscription: Subscription;

  constructor(public navCtrl: NavController, public navParams: NavParams,
     private db: AngularFireDatabase, private alertCtrl: AlertController){}

  ngOnInit(): void {   
    const movieQuoteKey = this.navParams.get("key");
    console.log("Making a stream to " + movieQuoteKey);
    this.movieQuoteStream = this.db.object(`/quotes/${movieQuoteKey}`);
    this.movieQuoteStream.subscribe( (movieQuote: MovieQuote) => { 
      this.movieQuote = movieQuote;
     })
    }

      ngOnDestroy(): void {
        this.movieQuoteSubscription.unsubscribe();
  }

  editQuote(){
    const prompt = this.alertCtrl.create({
      title: 'Add Quote',
      message: "Enter a Famous Quote from a Movie",
      inputs: [
        {
          name: 'quote',
          placeholder: 'The Quote',
          value: this.movieQuote.quote,
        },
        {
          name: 'movie',
          placeholder: 'From Movie',
          value: this.movieQuote.movie,
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
              this.movieQuoteStream.set(data);
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
