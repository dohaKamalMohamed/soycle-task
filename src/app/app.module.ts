import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
          //validation
import { ReactiveFormsModule,FormsModule } from '@angular/forms';
          //integration
import {HttpClientModule} from '@angular/common/http';
         //component
import { AppComponent } from './app.component';
import { LogInComponent } from './myComponent/users/log-in/log-in.component';
import { RegisterComponent } from './myComponent/users/register/register.component';
import { HomeComponent } from './myComponent/home/home.component';
import { ShopListComponent } from './myComponent/home/shop-list/shop-list.component';
          //services
import { AuthenticationService } from './_Services/authentication.service';
import { ShopsService } from './_Services/shops.service';
import { UserService } from './_Services/user.service';
import { AuthService } from './_Guard/auth.service';
         //ngx-bootstrap
import { AccordionModule } from 'ngx-bootstrap/accordion';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ModalModule } from 'ngx-bootstrap/modal';


@NgModule({
  declarations: [
    AppComponent,
    LogInComponent,
    RegisterComponent,
    HomeComponent,
    ShopListComponent,
  
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AccordionModule.forRoot(),
    BrowserAnimationsModule,
    ModalModule.forRoot(),
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [AuthenticationService,ShopsService,UserService,AuthService],
  bootstrap: [AppComponent]
})
export class AppModule { }
