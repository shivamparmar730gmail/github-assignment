import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { GithubUsersComponent } from './components/github-users/github-users.component';
import { UsersDataService } from './services/users-data.service';
import { HelperService } from "./services/helper.service";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CollapseModule } from 'ngx-bootstrap/collapse';
import { AccordionModule } from 'ngx-bootstrap/accordion';
import {NgxPaginationModule} from 'ngx-pagination';

@NgModule({
	declarations: [
		AppComponent,
		GithubUsersComponent
	],
	imports: [
		BrowserModule,
		AppRoutingModule,
		HttpClientModule,
		FormsModule,
		ReactiveFormsModule,
		BrowserAnimationsModule,
    	CollapseModule.forRoot(),
		AccordionModule.forRoot(),
		NgxPaginationModule
	],
	providers: [
		HttpClientModule,
		UsersDataService,
		HelperService
	],
	bootstrap: [AppComponent]
})
export class AppModule { }
