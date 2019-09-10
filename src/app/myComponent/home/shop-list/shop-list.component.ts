import { Component, OnInit, TemplateRef } from '@angular/core';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { ShopsService } from '../../../_Services/shops.service';
import { Router } from '@angular/router';
import {App} from '../../../_models/role';
import {User} from '../../../_models/user';
import {AuthenticationService} from '../../../_Services/authentication.service';


@Component({
  selector: 'app-shop-list',
  templateUrl: './shop-list.component.html',
  styles: ['accordion{ margin: 40px}', 'button{margin:10px;}', 'p{color:red}', 'form{margin:10px}','h1{text-align:center;margin:10px}']
})
export class ShopListComponent implements OnInit {
  shops = '';
  modalRef: BsModalRef;
  form: FormGroup;
  submitted: boolean = false;
  errorMsg: string = '';
  temp : boolean = false;
  currentUser: User;
  constructor(
    private shopService: ShopsService,
    private router: Router,
    private modalService: BsModalService,
    private fb: FormBuilder,
    private authenticationService: AuthenticationService
  ) {
    this.authenticationService.currentUser.subscribe(x => this.currentUser = x);
   }

  ngOnInit() {
    this.form = this.fb.group({
      shopName: ['', Validators.required],
      shopBody: ['', Validators.required],
    });
    this.getShops();
    console.log(this.currentUser);
  }
  get f() {
    return this.form.controls;
  }

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }
  openMod(temp: TemplateRef<any>) {
    this.modalRef = this.modalService.show(temp);
  }
  
         //post
  onSubmit() {
    this.submitted = true;
    if (this.form.invalid) {
      return;
    }
    this.shopService.createShop(this.form.value)
      .subscribe(
        data => {
          console.log(data);
          this.getShops();
        },
        error => {
          this.errorMsg = error.error || error.statusText;
          console.log(error);
        });
  }
      //get
  getShops() {
    this.shopService.getShops().subscribe(shop => {
      this.shops = shop;
    });
  } 
     //delete
  delete(_id) {
    this.shopService.deleteShop(_id).subscribe((data) => {
      this.getShops();
      console.log(data);
    })
  }
  //update
  update(_id){
    this.submitted = true;
    if (this.form.invalid) {
      return;
    }
    this.shopService.updateShop(_id,this.form.value)
      .subscribe(
        data => {
          console.log(data);
          this.getShops();
        },
        error => {
          this.errorMsg = error.error || error.statusText;
          console.log(error);
        });
  }
  get isAdmin() {
    return this.currentUser && this.currentUser.role === App.Role.admin;
}
get customer() {
  return this.currentUser && this.currentUser.role === App.Role.customer;
}
get shopAdmin() {
  return this.currentUser && this.currentUser.role === App.Role.shopAdmin;
}
}
