import React from 'react';
import { FaPhoneAlt } from 'react-icons/fa';  // React icon for phone

const ContactUs = () => {
  return ( 
    <section className="py-12 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-semibold text-center text-gray-900 mb-6">Contact Us</h2>
        
        <div className="lg:grid lg:grid-cols-2 lg:gap-12">
          {/* Contact Form */}
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <form action="#" method="POST">
              <div className="mb-4">
                <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name</label>
                <input type="text" id="name" name="name" className="input input-bordered w-full" required />
              </div>
              
              <div className="mb-4">
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
                <input type="email" id="email" name="email" className="input input-bordered w-full" required />
              </div>
              
              <div className="mb-4">
                <label htmlFor="subject" className="block text-sm font-medium text-gray-700">Subject</label>
                <input type="text" id="subject" name="subject" className="input input-bordered w-full" />
              </div>

              <div className="mb-4">
                <label htmlFor="message" className="block text-sm font-medium text-gray-700">Message</label>
                <textarea id="message" name="message" className="textarea textarea-bordered w-full" required></textarea>
              </div>

              <button type="submit" className="btn btn-primary w-full">Send Message</button>
            </form>
          </div>

          {/* Contact Info */}
          <div className="mt-8 lg:mt-0">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">Or Reach Us By Phone</h3>
            <div className="flex items-center space-x-3 text-gray-700">
              <FaPhoneAlt className="text-xl" />
              <p className="text-lg">Phone: (123) 456-7890</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default ContactUs;
