import { Component, ViewChild } from '@angular/core';
import { AddEvent, DataBindingDirective, EditEvent, RemoveEvent, SaveEvent } from "@progress/kendo-angular-grid";
import { StocksService } from '../Services/Stock/stocks.service';
import { Ticker } from '../Types/Ticker';
import { UsersService } from '../Services/User/users.service';
import { User } from '../Types/User';
import { clients } from '../ConstantsData/clients';
import { process } from '@progress/kendo-data-query';
import { FormGroup, Validators, FormBuilder, FormControl } from "@angular/forms";
import { CreateFormGroupArgs } from "@progress/kendo-angular-grid";
import { tick } from '@angular/core/testing';
import { concatMap, tap } from 'rxjs';



@Component({
  selector: 'app-control-panel',
  templateUrl: './control-panel.component.html',
  styleUrl: './control-panel.component.css'
})
export class ControlPanelComponent {

  // @ViewChild(DataBindingDirective) dataBinding = DataBindingDirective;
  gridData: any;
  gridView: User[] = [];
  mySelection: string[] = [];
   availAbleStocks :Ticker[]=[]
  formGroup: FormGroup = this.formBuilder.group({
    email: new FormControl(
      "",
      Validators.compose([
        Validators.required,
        Validators.pattern("[A-Za-z0-9._%-]+@[A-Za-z0-9._%-]+\\.[a-z]{2,3}"),
      ])
    ),
    firstName: new FormControl(
      "",
      Validators.compose([
        Validators.required,
      ])
    ),
    lastName: new FormControl(
      "",
      Validators.compose([
        Validators.required,
      ])
    ),
    phoneNumber: new FormControl(
      "",
      Validators.compose([
        Validators.required,
        Validators.pattern("^01[0125][0-9]{8}$")
      ])
    ),
    registeredStock:new FormControl([])
  });

  constructor(private formBuilder: FormBuilder, private userService: UsersService,private stockService:StocksService) {
   stockService.getTickers().pipe(
     concatMap( (stocks:Ticker[])=>{
      this.availAbleStocks=stocks
      return this.userService.getUsers();
    })
   
  ).subscribe(
    e => {
      this.gridData = e 
      this.gridView = this.gridData
    }
  );

    this.createFormGroup = this.createFormGroup.bind(this);
 
  }


  ngOnInit() { 
   

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
            field: "firstName",
            operator: "contains",
            value: inputValue,
          },
          {
            field: "lastName",
            operator: "contains",
            value: inputValue,
          },
          {
            field: "phoneNumber",
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

  onRemove(args: RemoveEvent) {
    //  this.editService.remove(args.dataItem);

    this.userService.removeUsers(args.dataItem.id).subscribe()
  }
  onEdit(args: EditEvent) {
    //  this.editService.remove(args.dataItem);

   }
  onSave(args: SaveEvent) {
    //  this.editService.remove(args.dataItem);
  const stockArray = args.formGroup.get('registeredStock')?.value as any
  args.dataItem.registeredStock=stockArray
    if(!args.isNew){
      this.userService.updateUsers(args.dataItem).subscribe()
    }else{
      this.userService.addUsers(args.dataItem).subscribe(e=> args.dataItem.id=e)
    }     
 
  }

  onAdd(args: AddEvent) {
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
      firstName: new FormControl(
        item.firstName,
        Validators.compose([
          Validators.required,
        ])
      ),
      lastName: new FormControl(
        item.lastName,
        Validators.compose([
          Validators.required,
        ])
      ),
      phoneNumber: new FormControl(
        item.phoneNumber,
        Validators.compose([
          Validators.required,
          Validators.pattern("^01[0125][0-9]{8}$")
        ])
      ),
      registeredStock: new FormControl( item.registeredStock)
    });
    console.log(item.registeredStock)

    return this.formGroup;
  }

  stockValueChanged(e:any,id:any) {
   }

}
