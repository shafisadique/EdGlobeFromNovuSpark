import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-about-us',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './about-us.component.html',
  styleUrl: './about-us.component.scss'
})
export class AboutUsComponent implements AfterViewInit, OnDestroy {
  currentImage = 0;
  totalImages = 3; // Update if you add more images
  interval: any;

  ngAfterViewInit() {
    this.startSlider();
  }

  startSlider() {
    this.interval = setInterval(() => {
      this.currentImage = (this.currentImage + 1) % this.totalImages;
    }, 5000); // Auto change every 5 seconds
  }

  // Manual dot click
  goToSlide(index: number) {
    this.currentImage = index;
  }

  ngOnDestroy() {
    if (this.interval) {
      clearInterval(this.interval);
    }
  }
}