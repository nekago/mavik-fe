import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MainPageModule } from './modules/main-page/main-page.module';
import { ProductListModule } from './modules/product-list/product-list.module';

@NgModule({
	declarations: [AppComponent],
	imports: [BrowserModule, AppRoutingModule, MainPageModule, ProductListModule],
	providers: [],
	bootstrap: [AppComponent]
})
export class AppModule {}
