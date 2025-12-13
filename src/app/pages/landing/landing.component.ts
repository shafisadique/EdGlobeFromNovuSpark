import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import {MatSidenavModule } from '@angular/material/sidenav';
import {MatListModule } from '@angular/material/list';
import {MatCardModule } from '@angular/material/card';
import { RouterLink, RouterModule } from "@angular/router";
import { ContactUsComponent } from '../components/contact-us/contact-us.component';
import { AboutUsComponent } from '../components/about-us/about-us.component';
import { FeaturesComponent } from '../../features/features.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-landing',
  standalone: true,
  imports: [MatToolbarModule,CommonModule, RouterModule, MatButtonModule, MatCardModule, MatIconModule, MatSidenavModule, MatListModule, MatMenuModule,AboutUsComponent,ContactUsComponent,FeaturesComponent],
  templateUrl: './landing.component.html',
  styleUrl: './landing.component.scss',
  
})
export class LandingComponent implements AfterViewInit {
 currentSlide = 0;
  totalSlides = 5;
  interval: any;
  @ViewChild('featuresSection') featuresSection!: ElementRef;
  @ViewChild('modulesSection') modulesSection!: ElementRef;
  @ViewChild('aboutUs') aboutUs!: ElementRef;

  ngAfterViewInit() {
    this.startSlider();
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('in-view');
          observer.unobserve(entry.target); // Animate only once
        }
      });
    }, { threshold: 0.1 });

    // Observe all sections
    if (this.featuresSection) observer.observe(this.featuresSection.nativeElement);
    if (this.modulesSection) observer.observe(this.modulesSection.nativeElement);
    if (this.aboutUs) observer.observe(this.aboutUs.nativeElement);
  
  }

  startSlider() {
    this.interval = setInterval(() => {
      this.currentSlide = (this.currentSlide + 1) % this.totalSlides;
    }, 5000);
  }

  goToSlide(i: number) {
    this.currentSlide = i;
    clearInterval(this.interval);
    this.startSlider();
  }

  ngOnDestroy() {
    clearInterval(this.interval);
  }

  scroll(id: string) {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  }
}
