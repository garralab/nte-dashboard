import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { HomeInternaComponent } from './components/home-interna/home-interna.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { ExportComponent } from './components/export/export.component';
import { ImportComponent } from './components/import/import.component';

const routes: Routes = [
  { path: 'dashboard', component: DashboardComponent },
  { path: 'home-interna', pathMatch: 'full', component: HomeInternaComponent },
  {
    path: '',
    pathMatch: 'full',
    component: HomeComponent
  },
  { path: 'home-interna', pathMatch: 'full', component: HomeInternaComponent },
  { path: 'export', component: ExportComponent },
  { path: 'import', component: ImportComponent },
  { path: '**', redirectTo: '' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
