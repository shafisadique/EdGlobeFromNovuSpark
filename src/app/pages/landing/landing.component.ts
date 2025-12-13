import { AfterViewInit, Component, ElementRef, ViewChildren, QueryList, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatCardModule } from '@angular/material/card';
import { ContactUsComponent } from '../components/contact-us/contact-us.component';
import { AboutUsComponent } from '../components/about-us/about-us.component';
import { FeaturesComponent } from '../../features/features.component';

@Component({
  selector: 'app-landing',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    MatToolbarModule,
    MatButtonModule,
    MatCardModule,
    MatIconModule,
    MatSidenavModule,
    MatListModule,
    MatMenuModule,
    AboutUsComponent,
    ContactUsComponent,
    FeaturesComponent
  ],
  templateUrl: './landing.component.html',
  styleUrl: './landing.component.scss'
})
export class LandingComponent implements AfterViewInit, OnDestroy {
  currentSlide = 0;
  totalSlides = 5;
  interval: any;

  // Use ViewChildren to safely get all sections with #scrollSection
  @ViewChildren('scrollSection') scrollSections!: QueryList<ElementRef>;

  ngAfterViewInit() {
    this.startSlider();

    // Intersection Observer for scroll animations
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('in-view');
            observer.unobserve(entry.target); // Animate only once
          }
        });
      },
      { threshold: 0.1 }
    );

    // Observe all sections after view init
    this.scrollSections.forEach((section) => {
      observer.observe(section.nativeElement);
    });
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
    if (this.interval) {
      clearInterval(this.interval);
    }
  }

  scroll(id: string) {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  }
}