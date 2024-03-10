import { Component, Input, OnInit } from '@angular/core';
import { Browser } from '@capacitor/browser';
import { ActionSheetButton, ActionSheetController, Platform } from '@ionic/angular';
import { Article } from 'src/app/interfaces';
import { StorageService } from 'src/app/services/storage.service';

@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.scss'],
})
export class ArticleComponent  implements OnInit {

  @Input() article!: Article;
  @Input() index!: number;
  constructor(
    private platform: Platform,
    private actionSheetCtrl: ActionSheetController,
    private storageService: StorageService,
  ) { }

  ngOnInit() {}

  openArticle() {

    if ( this.platform.is('ios') || this.platform.is('android') ) {
      //const browser = this.iab.create( this.article.url );
      //browser.show();
      Browser.open({ url: this.article.url});
      return;
    }

    window.open( this.article.url, '_blank' );

  }

  async onOpenMenu() {

    const articleInFavorite = this.storageService.articleInFavorites(this.article);

    const normalBtns: ActionSheetButton[] = [
      {
        text: articleInFavorite ? 'Remover favorito' : 'Favorito',
        icon: articleInFavorite ? 'heart' : 'heart-outline',
        handler: () => this.onToggleFavorite()
      },
      {
        text: 'Cancelar',
        icon: 'close-outline',
        role: 'cancel',
      }
    ]

    const shareBtn: ActionSheetButton = {
      text: 'Compartir',
      icon: 'share-outline',
      handler: () => this.onShareArticle()
    };

    if ( this.platform.is('capacitor') ) {
      normalBtns.unshift(shareBtn);
    }


    const actionSheet = await this.actionSheetCtrl.create({
      header: 'Opciones',
      buttons: normalBtns
    });



    await actionSheet.present();

  }

  onShareArticle() {

    const { title, source, url } = this.article;

    // this.socialSharing.share(
    //   title,
    //   source.name,
    //   null,
    //   url
    // );

  }

  onToggleFavorite() {
    this.storageService.saveRemoveArticle(this.article);
  }

}
