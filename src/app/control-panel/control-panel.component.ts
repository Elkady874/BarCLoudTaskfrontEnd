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
  gridData: any;
  gridView: User[] = [];
  mySelection: string[] = [];
  test: any
  stockss = [{
    "ticker": "A",
    "name": "Agilent Technologies Inc.",
    "market": "stocks",
    "locale": "us",
    "primary_exchange": "XNYS",
    "type": "CS",
    "active": true,
    "currency_name": "usd",
    "cik": "0001090872",
    "composite_figi": "BBG000C2V3D6",
    "share_class_figi": "BBG001SCTQY4",
    "last_updated_utc": "2024-05-17T00:00:00Z"
  },
  {
    "ticker": "AA",
    "name": "ALCOA INC",
    "market": "stocks",
    "locale": "us",
    "primary_exchange": "XNYS",
    "type": "CS",
    "active": true,
    "currency_name": "usd",
    "cik": "0000004281",
    "last_updated_utc": "2016-05-18T00:00:00Z"
  },
  {
    "ticker": "AAA",
    "name": "Alternative Access First Priority CLO Bond ETF",
    "market": "stocks",
    "locale": "us",
    "primary_exchange": "ARCX",
    "type": "ETF",
    "active": true,
    "currency_name": "usd",
    "cik": "0001776878",
    "composite_figi": "BBG01B0JRCS6",
    "share_class_figi": "BBG01B0JRCT5",
    "last_updated_utc": "2024-05-17T00:00:00Z"
  }]
  formGroup: FormGroup = this.formBuilder.group({
    email: new FormControl(
      "",
      Validators.compose([
        Validators.required,
        Validators.pattern("[A-Za-z0-9._%-]+@[A-Za-z0-9._%-]+\\.[a-z]{2,3}"),
      ])
    ),
    userName: "",
    stocks: this.stockss
  });

  constructor(private formBuilder: FormBuilder, private userService: UsersService) {
    this.createFormGroup = this.createFormGroup.bind(this);
    console.log(this.formBuilder)

  }


  ngOnInit() {
    this.userService.getUsers().subscribe(
      e => {
        this.gridData = e.users
        this.gridView = this.gridData
      }

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

  onRemove(args: RemoveEvent) {
    //  this.editService.remove(args.dataItem);

    console.log(this.mySelection)
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
      userName: new FormControl(
        item.userName,
        Validators.compose([
          Validators.required,
        ])
      ),
      stocks: item.stocks
    });
    console.log(item.stocks)
    console.log(this.formGroup.get('stocks')!.value)

    return this.formGroup;
  }


}
