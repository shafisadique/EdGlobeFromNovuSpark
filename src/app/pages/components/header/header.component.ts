import { Component, ElementRef, ViewChild, AfterViewInit, OnDestroy, HostListener } from '@angular/core';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements AfterViewInit, OnDestroy {
  @ViewChild('mobileMenu') mobileMenu!: ElementRef;
  @ViewChild('featuresRef', { read: ElementRef }) featuresRef!: ElementRef;
  @ViewChild('mobileFeaturesRef', { read: ElementRef }) mobileFeaturesRef!: ElementRef;

  private dropdownTimeout: any;
  isScrolled = false;
  activeSection = 'home';

  private sections: string[] = ['home', 'features', 'about', 'contact']; // Add more if needed

  constructor(private router: Router) {}

  ngAfterViewInit() {
    this.updateActiveSection(); // Initial check
  }

  @HostListener('window:scroll', [])
  onWindowScroll() {
    this.isScrolled = window.scrollY > 80;
    this.updateActiveSection();
  }

  // NEW: Automatically detect which section is in view
  private updateActiveSection() {
    let current = 'home';

    for (const section of this.sections) {
      const element = document.getElementById(section);
      if (element) {
        const rect = element.getBoundingClientRect();
        if (rect.top <= 100 && rect.bottom >= 100) { // Section near top of viewport
          current = section;
          break;
        }
      }
    }

    if (this.activeSection !== current) {
      this.activeSection = current;
    }
  }

  scroll(section: string) {
    this.activeSection = section;
    const el = document.getElementById(section);
    if (el) {
      el.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  }

  // Rest of your existing methods (toggleMenu, etc.) remain unchanged
  toggleMenu() {
    if (this.mobileMenu && this.mobileMenu.nativeElement) {
      this.mobileMenu.nativeElement.classList.toggle('active');
    }
  }

  closeMenu() {
    if (this.mobileMenu && this.mobileMenu.nativeElement) {
      this.mobileMenu.nativeElement.classList.remove('active');
      this.closeFeatureDropdown();
    }
  }

  openFeatureDropdown() {
    if (this.dropdownTimeout) clearTimeout(this.dropdownTimeout);
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
    }
  }

  navigateToFeatures() {
    this.router.navigate(['/features']);
    if (this.mobileFeaturesRef && this.mobileFeaturesRef.nativeElement) {
      this.mobileFeaturesRef.nativeElement.classList.remove('open');
    }
    this.closeMenu();
  }

  navigateTo(path: string) {
    this.router.navigate([path]);
    this.closeMenu();
  }

  ngOnDestroy() {
    // Cleanup if needed
  }
}