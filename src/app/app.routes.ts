import { Routes } from '@angular/router';
import { LandingComponent } from './pages/landing/landing.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { AboutUsComponent } from './pages/components/about-us/about-us.component';
import { ContactUsComponent } from './pages/components/contact-us/contact-us.component';
import { FeaturesComponent } from './features/features.component';

export const routes: Routes = [
      { path: '', component: LandingComponent, title: 'EdGlobe — Home' },
      // { path: 'about-us', component: AboutUsComponent, title: 'EdGlobe — about-us' },
      // { path: 'contact-us', component: ContactUsComponent, title: 'EdGlobe — contact-us' },
      // { path: 'features', component: FeaturesComponent, title: 'EdGlobe — features' },

  { path: 'dashboard', component: DashboardComponent, title: 'Dashboard | EdGlobe' },
  { path: '**', redirectTo: '' }

];
