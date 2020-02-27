import { Component, OnInit } from '@angular/core';
import { ConsultantService} from '../services/consultant.service';
import { DataStorageService } from "../services/data-storage.service";
import { Consultant } from '../classes';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
import { RxFormBuilder, RxFormGroup } from '@rxweb/reactive-form-validators';

@Component({
  selector: 'app-consultant-form',
  templateUrl: './consultant-form.component.html',
  styleUrls: ['./consultant-form.component.css']
})
export class ConsultantFormComponent implements OnInit {

  consultant: Consultant;
  consultantForm: RxFormGroup;
  isPatched = false;
  navigationSubscription;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private fb: RxFormBuilder,
    private dataStorageService: DataStorageService,
    private consultantService: ConsultantService
    ) {
      this.navigationSubscription = this.router.events.subscribe((e: any) => {
        if (e instanceof NavigationEnd) {
          this.ngOnInit();
        }
      });
    }

  ngOnInit() {
    const id = +this.route.snapshot.paramMap.get('id');
    this.createForm();
    this.patchForm(id);
  }

  ngOnDestroy() {
    // avoid memory leaks here by cleaning up after ourselves.
    if (this.navigationSubscription) {
       this.navigationSubscription.unsubscribe();
    }
  }

  createForm(){
    this.consultantForm = this.fb.formGroup(new Consultant()) as RxFormGroup;
  }

  patchForm(id: number){
    this.dataStorageService.getConsultant(id).subscribe(
      data =>
        {
          this.consultant = data;
          this.consultantForm.patchValue(data);
          this.consultantForm.patchValue({birthday: new Date(data.birthday)});
        },
      err =>
      {
        console.log(err);
      },
      () =>
      {
        this.isPatched = true;
        console.log("The form is patched");
      }
    );
  }

  onSubmit(editCompetences?)
  {
    if (this.consultantForm.valid)
    {
      let consultant = this.consultantForm.value;

      consultant.projets.forEach(projet =>
      {
        projet.details = projet.details.filter(detail => detail.description!="");
      });

      consultant.parcours.forEach(parcour =>
      {
        parcour.details = parcour.details.filter(detail => detail.description!="");
      });

      this.consultantService.update(consultant).subscribe(result=>
      {
        this.dataStorageService.consultant = result;
        if(editCompetences)
        {
          this.goTo(`edit_competences/${result.id}`);
        }
        else{
          this.goTo(`detail/${result.id}`);
        }
      });
    }
  }

  goTo(route: string){
    this.router.navigate([route]);
  }

}
