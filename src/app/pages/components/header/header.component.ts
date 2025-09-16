import { Component, ElementRef, ViewChild, AfterViewInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements AfterViewInit {
  @ViewChild('mobileMenu') mobileMenu!: ElementRef;
  @ViewChild('featuresRef', { read: ElementRef }) featuresRef!: ElementRef;
  @ViewChild('mobileFeaturesRef', { read: ElementRef }) mobileFeaturesRef!: ElementRef;
  private dropdownTimeout: any;

  constructor(private router: Router) {}

  ngAfterViewInit() {
    
  }

  toggleMenu() {
    if (this.mobileMenu && this.mobileMenu.nativeElement) {
      this.mobileMenu.nativeElement.classList.toggle('active');
    } else {
      console.warn('mobileMenu is not available yet.');
    }
  }

  closeMenu() {
    if (this.mobileMenu && this.mobileMenu.nativeElement) {
      this.mobileMenu.nativeElement.classList.remove('active');
      this.closeFeatureDropdown(); // Close dropdown when menu closes
    }
  }

  openFeatureDropdown() {
    if (this.dropdownTimeout) {
      clearTimeout(this.dropdownTimeout);
    }
    if (this.featuresRef && this.featuresRef.nativeElement) {
      this.featuresRef.nativeElement.classList.add('open');
    }
  }

  closeFeatureDropdown() {
    this.dropdownTimeout = setTimeout(() => {
      if (this.featuresRef && this.featuresRef.nativeElement) {
        this.featuresRef.nativeElement.classList.remove('open');
      }
      if (this.mobileFeaturesRef && this.mobileFeaturesRef.nativeElement) {
        this.mobileFeaturesRef.nativeElement.classList.remove('open');
      }
    }, 200);
  }

  toggleFeatureDropdown() {
    if (this.mobileFeaturesRef && this.mobileFeaturesRef.nativeElement) {
      this.mobileFeaturesRef.nativeElement.classList.toggle('open');
    } else {
      console.warn('mobileFeaturesRef is not available yet.');
    }
  }

  navigateToFeatures() {
    this.router.navigate(['/features']);
    if (this.mobileFeaturesRef && this.mobileFeaturesRef.nativeElement) {
      this.mobileFeaturesRef.nativeElement.classList.remove('open');
    }
    this.closeMenu(); // Close mobile menu after navigation
  }

  navigateTo(path: string) {
    this.router.navigate([path]);
    this.closeMenu();
  }
}