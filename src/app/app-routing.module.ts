import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ChartsComponent } from './charts/charts.component';
import { FormComponent } from './form/form.component';

const routes: Routes = [
  { path: '', redirectTo: '/form', pathMatch: 'full' },
  { path: 'form', component: FormComponent },
  { path: 'dashboard', component: ChartsComponent },
  { path: '**', redirectTo: '/form', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
