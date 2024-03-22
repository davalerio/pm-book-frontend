import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from './layout.component';
import { PerumoneyComponent } from '../perumoney/perumoney.component';
import { QullquiComponent } from '../qullqui/qullqui.component';

const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
  },
  {
    path: 'libro-reclamaciones',
    component: PerumoneyComponent,
  },
  {
    path: 'libro-reclamaciones-virtual',
    component: QullquiComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LayoutRoutingModule { }
