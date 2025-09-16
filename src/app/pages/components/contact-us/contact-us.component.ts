import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import emailjs from '@emailjs/browser';
import { environment } from '../../../../environments/environment';

@Component({
  selector: 'app-contact-us',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './contact-us.component.html',
  styleUrls: ['./contact-us.component.scss']
})
export class ContactUsComponent implements OnInit {
  handleSubmit(form: NgForm): void {
    if (form.valid) {
      const formData = form.value;
      console.log('Form Data:', formData); // See what’s sent

      // Use your IDs (replace templateId with your actual ID)
      const serviceId = environment.serviceId;
      const publicKey = environment.publicKey;
      const templateId = environment.templateId; // From EmailJS dashboard

      // Send email
      emailjs.send(serviceId, templateId, formData, publicKey)
        .then((response) => {
          console.log('Success:', response);
          alert('Message sent! Check your email.');
          form.reset();
        })
        .catch((error) => {
          console.error('Error:', error);
          alert('Failed to send. Error: ' + (error.text || 'Check console for details'));
        });
    } else {
      alert('Please fill all required fields.');
    }
  }

  ngOnInit(): void {
    // Initialize EmailJS with your Public Key
    emailjs.init('n7_nAF4V4OTpJHfve');
  }
}