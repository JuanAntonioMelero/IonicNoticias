import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ArticleComponent } from './article/article.component';
import { IonicModule } from '@ionic/angular';
import { ArticlesComponent } from './articles/articles.component';



@NgModule({
  declarations: [
    ArticleComponent,
    ArticlesComponent],
  imports: [
    CommonModule,
    IonicModule
  ],
  exports: [
    ArticlesComponent,
  ]
})
export class ComponentsModule { }
