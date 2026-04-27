import React from 'react';
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn } from 'react-icons/fa';

function Footer() {
  return (
    <footer className="bg-background text-foreground border-t border-border mt-auto">
      <div className="container mx-auto py-16 px-6">
        <div className="flex flex-wrap justify-between gap-10 md:gap-0">
          {/* About Section */}
          <div className="w-full sm:w-1/2 md:w-1/4">
            <h2 className="text-2xl font-light tracking-tight mb-4">
              Ease<span className="text-primary">Learn</span>
            </h2>
            <p className="text-sm text-muted-foreground leading-relaxed pr-4">
              EaseLearn is your go-to platform for quality learning. Whether you want to upskill or explore new knowledge areas, we've got you covered.
            </p>
          </div>

          {/* Quick Links */}
          <div className="w-full sm:w-1/2 md:w-1/4">
            <h3 className="text-lg font-light mb-4 text-foreground">Quick Links</h3>
            <ul className="space-y-3">
              <li>
                <a href="/courses" className="text-muted-foreground hover:text-primary transition-colors text-sm">Courses</a>
              </li>
              <li>
                <a href="/about" className="text-muted-foreground hover:text-primary transition-colors text-sm">About Us</a>
              </li>
              <li>
                <a href="/blog" className="text-muted-foreground hover:text-primary transition-colors text-sm">Blog</a>
              </li>
              <li>
                <a href="/contact" className="text-muted-foreground hover:text-primary transition-colors text-sm">Contact Us</a>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="w-full sm:w-1/2 md:w-1/4">
            <h3 className="text-lg font-light mb-4 text-foreground">Contact Us</h3>
            <ul className="space-y-3">
              <li className="text-sm text-muted-foreground">
                <span className="font-light text-foreground mr-2">Email:</span>fardeen@easelearn.com
              </li>
              <li className="text-sm text-muted-foreground">
                <span className="font-light text-foreground mr-2">Phone:</span>+123 456 7890
              </li>
             
            </ul>
          </div>

          {/* Social Media */}
          <div className="w-full sm:w-1/2 md:w-1/4">
            <h3 className="text-lg font-light mb-4 text-foreground">Follow Us</h3>
            <div className="flex space-x-4">
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-muted flex items-center justify-center text-muted-foreground hover:bg-primary hover:text-primary-foreground transition-all">
                <FaFacebookF size={18} />
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-muted flex items-center justify-center text-muted-foreground hover:bg-primary hover:text-primary-foreground transition-all">
                <FaTwitter size={18} />
              </a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-muted flex items-center justify-center text-muted-foreground hover:bg-primary hover:text-primary-foreground transition-all">
                <FaInstagram size={18} />
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-muted flex items-center justify-center text-muted-foreground hover:bg-primary hover:text-primary-foreground transition-all">
                <FaLinkedinIn size={18} />
              </a>
            </div>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="mt-16 pt-8 border-t border-border flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-muted-foreground">
            &copy; {new Date().getFullYear()} EaseLearn. All rights reserved.
          </p>
          <p className="text-sm text-muted-foreground">
            Designed and developed by <span className="text-foreground font-light">Fardeen Khan</span>
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
