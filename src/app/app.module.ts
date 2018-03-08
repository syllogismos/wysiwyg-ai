import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';
import { AngularCliComponent } from './documentation/angular-cli';
import { BackdropsComponent } from './elements/backdrops';
import { ChangelogComponent } from './documentation/changelog';
import { CodeStructureComponent } from './documentation/code-structure';
import { CreateAccountComponent } from './pages/create-account';
import { CreditsComponent } from './documentation/credits';
import { CustomizationComponent } from './documentation/customization';
import { DashboardComponent } from './dashboards/dashboard';
import { EmptyPageComponent } from './pages/empty-page';
import { ErrorPageComponent } from './pages/error-page';
import { InstallationComponent } from './documentation/installation';
import { Jumbotron1Component } from './elements/jumbotron-1';
import { Jumbotron2Component } from './elements/jumbotron-2';
import { LayoutComponent } from './documentation/layout';
import { LeftSidebar1Component } from './elements/left-sidebar-1';
import { LoginComponent } from './pages/login';
import { Navbar1Component } from './elements/navbar-1';
import { ResetPasswordComponent } from './pages/reset-password';
import { RightSidebar1Component } from './elements/right-sidebar-1';
import { SampleModalsComponent } from './elements/sample-modals';
import { StylesComponent } from './documentation/styles';
import { TopNavigation1Component } from './elements/top-navigation-1';
import { TopNavigation2Component } from './elements/top-navigation-2';
import { UserProfileComponent } from './pages/user-profile';
import { SidebarHeadingComponent } from './elements/sidebar-heading';
import { SidebarWidget1Component } from './elements/sidebar-widget-1';
import { SidebarWidget2Component } from './elements/sidebar-widget-2';
import { DropdownGridComponent } from './elements/dropdown-grid';
import { DropdownTasksComponent } from './elements/dropdown-tasks';
import { DropdownMessagesComponent } from './elements/dropdown-messages';
import { DropdownUserComponent } from './elements/dropdown-user';
import { DropdownFlagsComponent } from './elements/dropdown-flags';
import { LoggedOutGuard } from "app/guards/logged-out.guard";
import { LoggedInGuard } from "app/guards/logged-in.guard";
import { AuthService } from "app/services/auth.service";
import { RlComponent } from './escher/rl.component';
import { ConsoleComponent } from './escher/console.component';
import { ExperimentComponent } from './escher/experiment.component';
import { DatasetsComponent } from './escher/datasets.component';
import { ModelzooComponent } from './escher/modelzoo.component';
import { EverythingComponent } from './escher/everything.component';
import { PaymentComponent } from './escher/payment.component';
import { SupervisedComponent } from './escher/supervised.component';
import { SupervisedExperimentComponent } from './escher/supervised-experiment.component';
import { RlExperimentComponent } from './escher/rl-experiment.component';
import { ExpCpuPlotsComponent } from './escher/exp-cpu-plots.component';
import { IntroComponent } from './dashboards/intro.component';

@NgModule({
  declarations: [
    AppComponent,
    AngularCliComponent,
    BackdropsComponent,
    ChangelogComponent,
    CodeStructureComponent,
    CreateAccountComponent,
    CreditsComponent,
    CustomizationComponent,
    DashboardComponent,
    EmptyPageComponent,
    ErrorPageComponent,
    InstallationComponent,
    Jumbotron1Component,
    Jumbotron2Component,
    LayoutComponent,
    LeftSidebar1Component,
    LoginComponent,
    Navbar1Component,
    ResetPasswordComponent,
    RightSidebar1Component,
    SampleModalsComponent,
    StylesComponent,
    TopNavigation1Component,
    TopNavigation2Component,
    UserProfileComponent,
    SidebarHeadingComponent,
    SidebarWidget1Component,
    SidebarWidget2Component,
    DropdownGridComponent,
    DropdownTasksComponent,
    DropdownMessagesComponent,
    DropdownUserComponent,
    DropdownFlagsComponent,
    RlComponent,
    ConsoleComponent,
    ExperimentComponent,
    DatasetsComponent,
    ModelzooComponent,
    EverythingComponent,
    PaymentComponent,
    SupervisedComponent,
    SupervisedExperimentComponent,
    RlExperimentComponent,
    ExpCpuPlotsComponent,
    IntroComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    RouterModule.forRoot([
      { path: 'escher/supervised', component: SupervisedComponent, canActivate: [LoggedInGuard] },
      { path: 'escher/rl', component: RlComponent, canActivate: [LoggedInGuard] },
      { path: 'escher/console', component: ConsoleComponent, canActivate: [LoggedInGuard] },
      { path: 'escher/experiment', component: ExperimentComponent, canActivate: [LoggedInGuard] },
      { path: 'escher/datasets', component: DatasetsComponent, canActivate: [LoggedInGuard] },
      { path: 'escher/model-zoo', component: ModelzooComponent, canActivate: [LoggedInGuard] },
      { path: 'escher/everything', component: EverythingComponent, canActivate: [LoggedInGuard] },
      { path: 'escher/payment', component: PaymentComponent, canActivate: [LoggedInGuard] },
      { path: 'escher/sup-experiment/:exp_id', component: SupervisedExperimentComponent, canActivate: [LoggedInGuard] },      
      { path: 'escher/rl-experiment/:exp_id', component: RlExperimentComponent, canActivate: [LoggedInGuard]},
      { path: 'pages/user-profile', component: UserProfileComponent, canActivate: [LoggedInGuard] },
      { path: 'pages/login', component: LoginComponent, canActivate: [LoggedOutGuard] },      
      { path: 'pages/create-account', component: CreateAccountComponent, canActivate: [LoggedOutGuard] },
      { path: 'pages/producthunt/create-account', component: CreateAccountComponent, canActivate: [LoggedOutGuard] },
      { path: 'dashboards/intro', component: IntroComponent, canActivate: [LoggedInGuard] },
      // { path: '', component: DashboardComponent, canActivate: [LoggedInGuard] },
      // { path: '', component: DashboardComponent },  
      { path: '', component: IntroComponent, canActivate: [LoggedInGuard] },
      // { path: 'dashboards/dashboard', component: DashboardComponent, canActivate: [LoggedInGuard] },
      { path: 'dashboards/dashboard', component: DashboardComponent },
      { path: 'documentation/angular-cli', component: AngularCliComponent },
      { path: 'documentation/changelog', component: ChangelogComponent },
      { path: 'documentation/code-structure', component: CodeStructureComponent },
      { path: 'documentation/credits', component: CreditsComponent },
      { path: 'documentation/customization', component: CustomizationComponent },
      { path: 'documentation/installation', component: InstallationComponent },
      { path: 'documentation/layout', component: LayoutComponent },
      { path: 'documentation/styles', component: StylesComponent },
      { path: 'pages/empty-page', component: EmptyPageComponent },
      { path: 'pages/error-page', component: ErrorPageComponent },
      { path: 'pages/reset-password', component: ResetPasswordComponent },
      { path: '**', component: ErrorPageComponent }
    ])
  ],
  providers: [
    AuthService,
    LoggedInGuard,
    LoggedOutGuard
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
