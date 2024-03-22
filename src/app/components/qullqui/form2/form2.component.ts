import { Component, OnInit, ViewChild } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import * as Notiflix from 'notiflix';
import { DatePipe } from '@angular/common';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSelect } from '@angular/material/select';

@Component({
  selector: 'app-form2',
  templateUrl: './form2.component.html',
  styleUrls: ['./form2.component.scss'],
  providers: [DatePipe],
})
export class Form2Component implements OnInit {
  @ViewChild('dep') selectDep: MatSelect | undefined;
  @ViewChild('pro') selectPro: MatSelect | undefined;
  @ViewChild('dis') selectDis: MatSelect | undefined;

  selectForm!: FormGroup;
  limitDoc: number = 0;
  limitRuc: number = 11;
  showData: Boolean = false;

  patterDocument: string = "";
  patterNumber = "^([0-9])*$";
  patterAlphanumeric = "^([a-zA-Z0-9])*$";

  profiles = [
    { profile_id: 1, name: 'PERSONA NATURAL' },
    { profile_id: 2, name: 'PERSONA JURIDICA' },
  ];

  departments: any[] = [];
  provinces: any[] = [];
  districts: any[] = [];
  documents: any[] = [];
  services = [
    {
      service_id: 1,
      name: 'CAMBIO DE DIVISAS',
    },
  ];
  requests: any[] = [];

  constructor(
    public fb: FormBuilder,
    private apiService: ApiService,
    private datePipe: DatePipe
  ) {
    this.selectForm = this.fb.group({
      profile: [1, [Validators.required]],
      ruc: [
        '00000000000',
        [
          Validators.required,
          Validators.minLength(11),
          Validators.maxLength(11),
          Validators.pattern(/^([0-9])*$/),
        ],
      ],
      businessname: [
        'QULLQUI',
        [Validators.required, Validators.pattern(/^[A-Za-z\s\xF1\xD1]+$/)],
      ],
      typedoc: [null, [Validators.required]],
      numberdoc: [
        '',
        [
          Validators.required,
          Validators.minLength(8),
          Validators.maxLength(12),
          Validators.pattern(this.patterDocument),
        ],
      ],
      firstname: [
        '',
        [
          Validators.required,
          Validators.minLength(2),
          Validators.maxLength(30),
          Validators.pattern(/^[A-Za-z\s\xF1\xD1]+$/),
        ],
      ],
      lastnamefather: [
        '',
        [
          Validators.required,
          Validators.minLength(2),
          Validators.maxLength(30),
          Validators.pattern(/^[A-Za-z\s\xF1\xD1]+$/),
        ],
      ],
      lastnamemother: [
        '',
        [
          Validators.required,
          Validators.minLength(2),
          Validators.maxLength(30),
          Validators.pattern(/^[A-Za-z\s\xF1\xD1]+$/),
        ],
      ],
      address: ['', [Validators.required]],
      department: [null, [Validators.required]],
      province: [null, Validators.required],
      district: [null, Validators.required],
      email: [
        '',
        [
          Validators.required,
          Validators.pattern(/^([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/),
        ],
      ],
      phone: [
        '',
        [
          Validators.required,
          Validators.minLength(9),
          Validators.maxLength(9),
          Validators.pattern(/^([0-9])*$/),
        ],
      ],
      service: ['CAMBIO DE DIVISAS', [Validators.required]],
      amount: ['', [Validators.required]],
      typerequest: [null, [Validators.required]],
      day: ['', [Validators.required]],
      message: ['', [Validators.required]],
    });
  }

  ngOnInit(): void {
    this.AllDepartament();
    this.AllDocument();
    this.AllRequest();
  }

  valProfile() {
    let profile = this.selectForm.get('profile')?.value;
    if (profile === 1) {
      this.showData = false;
      this.selectForm.get('ruc')?.setValue('00000000000');
      this.selectForm.get('businessname')?.setValue('QULLQUI');
    } else {
      this.showData = true;
      this.selectForm.get('ruc')?.setValue('');
      this.selectForm.get('businessname')?.setValue('');
    }
  }

  valDocument() {
    let document = this.selectForm.get('typedoc')?.value;
    if (document === 'DNI') {
      this.limitDoc = 8;
      this.patterDocument = this.patterNumber;
    }

    if (document === 'PASAPORTE') {
      this.limitDoc = 12;
      this.patterDocument = this.patterAlphanumeric;
    }

    if (document === 'CARNET EXT.') {
      this.limitDoc = 12;
      this.patterDocument = this.patterNumber;
    }
  }

  AllDepartament() {
    this.apiService.getAllDepartment().subscribe((data) => {
      this.departments = data;
    });
  }

  AllProvince() {
    const departmentID = this.selectForm.get('department')?.value;
    this.apiService.getAllProvince(departmentID).subscribe((data) => {
      this.provinces = data;
    });
  }

  AllDistrict() {
    const provinceID = this.selectForm.get('province')?.value;
    this.apiService.getAllDistrict(provinceID).subscribe((data) => {
      this.districts = data;
    });
  }

  AllDocument() {
    this.apiService.getAllDocument().subscribe((data) => {
      this.documents = data;
    });
  }

  AllRequest() {
    this.apiService.getAllRequest().subscribe((data) => {
      this.requests = data;
    });
  }

  SendEmail(form: any) {
    const day = this.datePipe.transform(
      this.selectForm.value.day,
      'YYYY-MM-dd'
    );
    const hour = this.datePipe.transform(this.selectForm.value.day, 'h:mm:ss');

    let params = {
      ruc: this.selectForm.value.ruc,
      business: this.selectForm.value.businessname,
      document_id: this.selectForm.value.typedoc,
      document_num: this.selectForm.value.numberdoc,
      first_name: this.selectForm.value.firstname,
      father_surname: this.selectForm.value.lastnamefather,
      mother_surname: this.selectForm.value.lastnamemother,
      email: this.selectForm.value.email,
      phone: this.selectForm.value.phone,
      address: this.selectForm.value.address,
      department_id: this.selectDep?.triggerValue,
      province_id: this.selectPro?.triggerValue,
      district_id: this.selectDis?.triggerValue,
      service_id: this.selectForm.value.service,
      amount: this.selectForm.value.amount,
      request_id: this.selectForm.value.typerequest,
      day: day,
      hour: hour,
      agency_id: 'VIRTUAL',
      message: this.selectForm.value.message,
    };

    if (this.selectForm.invalid) {
      this.selectForm.markAllAsTouched();
      Notiflix.Notify.failure('Datos imcompletos');
      return;
    } else {
      Notiflix.Loading.standard('Enviando...');
      this.apiService.postSendEmailQullqui(params).subscribe((data) => {
        Notiflix.Loading.remove();
        Notiflix.Notify.success('Formulario enviado');
        this.selectForm.reset();
      });
    }
  }

  Cancel() {
    window.location.href = 'https://perumoney.pe';
  }
}
