import React from 'react';
import emailjs from 'emailjs-com';

export const ContactForm = () => {

  function sendEmail(e) {
    e.preventDefault();
    console.log(e.target)
    emailjs.sendForm('service_0d9qh7m', 'template_wsfhg4i',e.target , 'user_Vg5JSIPncMuVbKY1zOgQG')
      .then((result) => {
          console.log(result.text);
      }, (error) => {
          console.log(error.text);
      });
  }

  return (
    <form className="contact-form" onSubmit={sendEmail}>
      <input type="hidden" name="firstName" />
      <label>Name</label>
      <input type="text" name="email" />
      <label>Email</label>
      <input type="email" name="message" />
      <label>Message</label>
      <textarea name="message" />
      <input type="submit" value="Send" />
    </form>
  );
}
