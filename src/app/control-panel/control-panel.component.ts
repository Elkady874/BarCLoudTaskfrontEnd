import { Component, ViewChild } from '@angular/core';
import { AddEvent, DataBindingDirective, RemoveEvent } from "@progress/kendo-angular-grid";
import { StocksService } from '../Services/Stock/stocks.service';
import { Ticker } from '../Types/Ticker';
import { UsersService } from '../Services/User/users.service';
import { User } from '../Types/User';
import { clients } from '../ConstantsData/clients';
import { process } from '@progress/kendo-data-query';
import { FormGroup, Validators, FormBuilder, FormControl } from "@angular/forms";
import { CreateFormGroupArgs } from "@progress/kendo-angular-grid";


 
@Component({
  selector: 'app-control-panel',
  templateUrl: './control-panel.component.html',
  styleUrl: './control-panel.component.css'
})
export class ControlPanelComponent {
  
  // @ViewChild(DataBindingDirective) dataBinding = DataBindingDirective;
  gridData:any;
  gridView:User[]=[];
  mySelection: string[] = [];
   
   public formGroup: FormGroup = this.formBuilder.group({
    ProductName: "",
  });
 
  constructor(private formBuilder: FormBuilder, private userService:UsersService) {
    this.createFormGroup = this.createFormGroup.bind(this);

  }

  
    ngOnInit(){
   this.userService.getUsers().subscribe(
      e=>{this.gridData=e.users
      this.gridView = this.gridData}

    )

  }

    onFilter(value: Event): void {
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

   onRemove(args: RemoveEvent){
  //  this.editService.remove(args.dataItem);

    console.log("testSuccess")
   }

   
   onAdd(args: AddEvent){
    //  this.editService.remove(args.dataItem);
  return
      console.log(args)
     }
    createFormGroup(args: CreateFormGroupArgs): FormGroup {
    const item = args.isNew ? {} : args.dataItem;
    this.formGroup = this.formBuilder.group({
      email: new FormControl(
      item.email,
      Validators.compose([
        Validators.required,
        Validators.pattern("[A-Za-z0-9._%-]+@[A-Za-z0-9._%-]+\\.[a-z]{2,3}"),
      ])
    ),
      userName: item.userName,
    });

    return this.formGroup;
  }


}
