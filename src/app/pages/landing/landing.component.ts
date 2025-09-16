import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import {MatSidenavModule } from '@angular/material/sidenav';
import {MatListModule } from '@angular/material/list';
import {MatCardModule } from '@angular/material/card';
import { RouterLink, RouterModule } from "@angular/router";

@Component({
  selector: 'app-landing',
  standalone: true,
  imports: [MatToolbarModule,RouterModule, MatButtonModule, MatCardModule, MatIconModule, MatSidenavModule, MatListModule, MatMenuModule, RouterLink],
  templateUrl: './landing.component.html',
  styleUrl: './landing.component.scss',
  
})
export class LandingComponent implements AfterViewInit {
 @ViewChild('heroSection') heroSection!: ElementRef;
  @ViewChild('featuresSection') featuresSection!: ElementRef;
  @ViewChild('modulesSection') modulesSection!: ElementRef;
  @ViewChild('benefitsSection') benefitsSection!: ElementRef;
  @ViewChild('modulesGridSection') modulesGridSection!: ElementRef;
  // @ViewChild('testimonialsSection') testimonialsSection!: ElementRef; // Uncomment if testimonials are used

  private observer: IntersectionObserver | null = null;

  ngAfterViewInit() {
    this.observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            // Optionally, unobserve the section after animation to improve performance
            // this.observer?.unobserve(entry.target);
          }
        });
      },
      {
        root: null,
        threshold: 0.1,
      }
    );

    if (this.heroSection) this.observer.observe(this.heroSection.nativeElement);
    if (this.featuresSection) this.observer.observe(this.featuresSection.nativeElement);
    if (this.modulesSection) this.observer.observe(this.modulesSection.nativeElement);
    if (this.benefitsSection) this.observer.observe(this.benefitsSection.nativeElement);
    if (this.modulesGridSection) this.observer.observe(this.modulesGridSection.nativeElement);
    // if (this.testimonialsSection) this.observer.observe(this.testimonialsSection.nativeElement);
  }

  ngOnDestroy() {
    if (this.observer) {
      this.observer.disconnect();
    }
  }

}
