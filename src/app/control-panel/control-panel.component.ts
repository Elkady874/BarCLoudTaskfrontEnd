import { Component, ViewChild } from '@angular/core';
import { DataBindingDirective, GridModule } from "@progress/kendo-angular-grid";
import { StocksService } from '../Services/Stock/stocks.service';
import { Ticker } from '../Types/Ticker';
import { UsersService } from '../Services/User/users.service';
import { User } from '../Types/User';
import { clients } from '../ConstantsData/clients';
import { process } from '@progress/kendo-data-query';
import { FormGroup, Validators, FormBuilder } from "@angular/forms";

 
@Component({
  selector: 'app-control-panel',
  templateUrl: './control-panel.component.html',
  styleUrl: './control-panel.component.css'
})
export class ControlPanelComponent {
  
  @ViewChild(DataBindingDirective) dataBinding = DataBindingDirective;
  gridData:any;
  gridView:User[]=[];
   mySelection: string[] = [];
   
   public formGroup: FormGroup = this.formBuilder.group({
    ProductName: "",
  });
 
  constructor(private formBuilder: FormBuilder, private userService:UsersService) {
   
  }

  
  public ngOnInit(){
   this.userService.getUsers().subscribe(
      e=>{this.gridData=e.users
      this.gridView = this.gridData}

    )

  }

  public onFilter(value: Event): void {
    const inputValue = value;
    
  this.gridView = process(this.gridData, {
    filter: {
      logic: "or",
      filters: [
        {
          field: "id",
          operator: "contains",
          value: inputValue,
        },
        {
          field: "userName",
          operator: "contains",
          value: inputValue,
        },
        {
          field: "email",
          operator: "contains",
          value: inputValue,
        },
      ],
    },
  }).data;

  //this.dataBinding.skip = 0;
}


}
