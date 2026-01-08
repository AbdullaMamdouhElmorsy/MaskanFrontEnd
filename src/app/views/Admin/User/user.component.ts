import { Component, OnInit, ViewChild, numberAttribute } from '@angular/core';
import { Table } from 'primeng/table';
import { AdminService } from '../services/admin.service';
import { UserType } from '../interfaces/userType.interface';
import {
  NamePattrenValidation,
  NationalIdPattren,
  NumberPattrenValidation,
  PasswordPattrenValidation,
  PhoneNumberValidation,
} from '../../../Global/Pattren/regex';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { GlobalService } from '../../../Global/Services/global.service';
import { User } from '../interfaces/user.interface';
import { SelectItem } from 'primeng/api';
import { Paging } from 'src/app/Global/Interfaces/Paging';
import { UserFilter } from '../interfaces/user-filter.interface';
import { UserInfo } from 'src/app/Global/Interfaces/userInfo.interface';
import { AuthService } from 'src/app/Global/Services/auth.service';
import { Roles } from 'src/app/Global/Enums/enums';

@Component({
  selector: 'maskan-user',
  templateUrl: './user.component.html',
})
export class UserComponent implements OnInit {
  users: User[];
  oldValue:User; // user Befor updated 
  user: User; //new user added
  rotateAddIcon: boolean = false;
  rotateTableIcon: boolean = false;
  userFormGroup: FormGroup;
  totalNumberOfUsers: number;
  userTypes: SelectItem[] = this.globalService.get_UserTypes();
  roles: SelectItem[] = this.globalService.get_Roles();
  userStatus = this.globalService.get_UserStatus();
  userInfo: UserInfo;
  @ViewChild('dt') dt: Table;
  constructor(
    private adminService: AdminService,
    private fb: FormBuilder,
    private globalService: GlobalService,
    private authService: AuthService
  ) {}

  loading: boolean = true;

  activityValues: number[] = [0, 100];
  createUser() {
    //console.log(this.usersTypes,"Ds");
    if (!this.isValid()) return;
 
    this.adminService.Add('User', this.userFormGroup.value).subscribe(
      (res) => (this.user = res),
      (error) => console.log(error),
      () => {
        this.globalService.addedSuccessfullyMessage();
        this.userFormGroup.reset();
        this.userFormGroup.get('nationalId')?.setValue('................');
        this.user.userStatus = this.globalService.get_UserStatusLable(
          this.user.userStatus
        );
        this.users.unshift(this.user);
      }
    );
  }
  getAllUsers() {
    this.adminService.GetAll('User').subscribe(
      (res) =>
        (this.users = res.users.map((a: User) => {
          a.userStatus = this.globalService.get_UserStatusLable(a.userStatus);
          a.uniteStatus = this.globalService.get_UniteStatusLabel(a.uniteStatus);

          return a;
        })),
      (error) => console.error(error),
      () => {
        this.loading = false;
       
      }
    );
  }
  getAllUserTypes() {
    this.adminService.GetAll('UserType').subscribe(
      (res) => (this.userTypes = res),
      (error) => console.error(error),
      () => {
        // this.loading=false;
        //console.log(this.loading,"loading");
      }
    );
  }
  paginate(table: any) {
    let userFilter: UserFilter = {
      UniteCode: null,
      FirstName: null,
      LastName: null,
      take: table.rows,
      skip: table.first,
      Email: null,
      NationalId: null,
      Job: null,
      PhoneNumber: null,
      UserName: null,
      CreatedDate: null,
      userStatus: null,
    };

    let filters = table.filters;
    //  console.log(table,"Table");
    if (filters?.uniteCode) userFilter.UniteCode = filters.uniteCode[0]?.value;

    if (filters?.userName) userFilter.UserName = filters.userName[0]?.value;

    if (filters?.firstName) userFilter.FirstName = filters.firstName[0]?.value;

    if (filters?.lastName) userFilter.LastName = filters.lastName[0]?.value;

    if (filters?.userStatus)
      userFilter.userStatus = filters.userStatus[0]?.value?.value?.value;

    if (filters?.email) userFilter.Email = filters.email[0].value;

    if (filters?.phoneNumber)
      userFilter.PhoneNumber = filters.phoneNumber[0]?.value;

    if (filters?.nationalId)
      userFilter.NationalId = filters.nationalId[0]?.value;

    if (filters?.job) userFilter.Job = filters.job[0].value;

    // if (filters.createdDate[0].value)
    // uniteBillFilters.createdDate = new Date(filters.createdDate[0].value)
    //     .toLocaleDateString()
    //     .split('T')[0];
    if (filters?.createdDate)
       if(filters?.createdDate[0].value)
      userFilter.CreatedDate = new Date(filters.createdDate[0].value)
        .toLocaleDateString()
        .split('T')[0];
    // if (filters?.createdDate[0].value)
    // userFilter.CreatedDate = new Date(filters.createdDate[0].value)
    //   .toLocaleDateString()
    //   .split('T')[0];
  // console.log(filters?.createdDate,"Date");
    
    let result = this.globalService.remove_NullFromFilters(userFilter);

    this.adminService.Get_Paging('User', result).subscribe(
      (res) => {
        (this.users = res.users.map((a: User) => {
          a.userStatus = this.globalService.get_UserStatusLable(a.userStatus);
          a.uniteStatus = this.globalService.get_UniteStatusLabel(a.uniteStatus);

          return a;
        })),
          (this.totalNumberOfUsers = res.totalRecords);
      },
      (error) => console.error(error),
      () => {
        this.loading = false;
        // console.log(this.unites,"Unites");
      }
    );
  }

  onRowEditInit(data: User) {
    this.oldValue=Object.assign({},data);
    
  }
  onRowEditCancel(data: User, index: number) {
    this.users[index]=this.oldValue;
  }

  
  onRowEditSave(data: User) {


  if(!this.globalService.validationCheck(PhoneNumberValidation,data.phoneNumber))
    {
      this.globalService.errorMessage("Phone Number is not valid");
      this.dt.initRowEdit(data);
      return;
    }
        
    let editedData = {
      userStatus: this.globalService.get_UserStatusId(data.userStatus),
      phoneNumber: data.phoneNumber,
      nationalId: data.nationalId,
      userTypeId: this.globalService.get_UserTypeId(data.userTypeName),
      id: data.id,
    };

    this.adminService.edit('User', editedData).subscribe(
      (res) => res,
      (error) => console.log(error),
      () => {
        this.globalService.EditSuccessfullyMessage();
      }
    );
  }

 
  delete(id: number, index: number) {
    this.adminService.delete('User', id).subscribe(
      (res) => res,
      (error) => console.log(error),
      () => {
        this.UpdateTableAfterDelete(index);

        console.log('Deleted');
      }
    );
  }
  UpdateTableAfterDelete(index: number) {
    this.users.splice(index, 1);
  }
  confirmDelete(dataName: string, id: number, index: number) {
    this.globalService.confirmDelete(dataName, () => {
      this.delete(id, index);
    });
  }

  /*----------Rotate the Icon of Header Cards-----------------------*/
  slideToggle(slideName: string) {
    if (slideName == 'add') this.rotateAddIcon = !this.rotateAddIcon;
    else this.rotateTableIcon = !this.rotateTableIcon;
  }
  applyFilterGlobal(event: Event, stringVal: string) {
   // console.log((event.target as HTMLInputElement).value, 'search');
    this.dt?.filterGlobal((event.target as HTMLInputElement).value, stringVal);
  }
  pattrenValidation(fromControlName: any) {
    if(fromControlName=="password")
    console.log(this.userFormGroup.get(fromControlName)?.errors,"pass");
    return this.userFormGroup.get(fromControlName)?.errors?.['pattern'];
  }
  isValid() {
    // console.log(this.userFormGroup,"dasdasd");
    return this.userFormGroup.valid;
  }
  isAdmin() {
    this.userInfo = this.authService.getLoggedUserInfo();
    return this.userInfo.roles?.includes(Roles[Roles.Admin]);
  }
  clear(table: Table) {
    table.clear();
  }
  ngOnInit(): void {
    // this.userInfo=this.authService.getLoggedUserInfo();

    this.userFormGroup = this.fb.group({
      firstName: [
        null,
        [
          Validators.required,
          Validators.maxLength(30),
          Validators.pattern(NamePattrenValidation),
        ],
      ],
      lastName: [
        null,
        [
          Validators.required,
          Validators.maxLength(30),
          Validators.pattern(NamePattrenValidation),
        ],
      ],
      userName: [null, [Validators.required]],
      password: [
        null,
        [Validators.required, Validators.pattern(new RegExp(PasswordPattrenValidation))],
      ],
      confirmPassowrd: [null, [Validators.required]],
      email: [null, [Validators.required, Validators.email]],
      nationalId: ['................'],
      job: [null, [Validators.pattern(NamePattrenValidation)]],
      phoneNumber: [
        null,
        [Validators.required, Validators.pattern(PhoneNumberValidation)],
      ],
      defaultRoleName: [null, [Validators.required]],
      // userTypeId:[null,[Validators.required]]
    });

    // this.getAllUsers();
  }
}
