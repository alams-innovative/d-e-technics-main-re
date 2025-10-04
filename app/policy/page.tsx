import Link from 'next/link'
import Footer from '@/components/footer'
import './policy-styles.css'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: "Privacy Policy & Terms | D.E. Technics - Packing Machine Manufacturer",
  description:
    "D.E. Technics privacy policy, terms of service, and company policies for packing machine services, automatic packing machine warranty, food packaging machines, powder packaging machines, blister packaging machines, and customer data protection. Information for packaging machine lahore clients as well.",
  keywords: [
    "D.E. Technics",
    "privacy policy",
    "terms of service",
    "cookie policy",
    "warranty policy",
    "return policy",
    "packing machines",
    "automatic packing machine",
    "packing machine price in Pakistan",
    "food packaging machine",
    "powder packaging machine", 
    "blister packaging machine",
    "sachet packaging machine",
    "pillow packaging machine",
    "plastic packaging machine",
    "snack food packaging machine",
    "bakery packaging machine",
    "juice packaging machine",
    "candy packaging machine",
    "filling and packaging machine",
    "sealing machines for packaging",
    "machine manufacturer",
    "packaging machine lahore"
  ],
  alternates: {
    canonical: "https://detechnics.com/policy",
  },
  openGraph: {
    type: "website",
    url: "https://detechnics.com/policy",
    title: "Privacy Policy & Terms | D.E. Technics - Packing Machine Manufacturer",
    description:
      "D.E. Technics privacy policy, terms of service, and company policies for packing machine services and customer data protection.",
    images: [
      {
        url: "/images/logo.png",
        width: 1200,
        height: 630,
        alt: "D.E. Technics Logo",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Privacy Policy & Terms | D.E. Technics - Packing Machine Manufacturer",
    description:
      "D.E. Technics privacy policy, terms of service, and company policies for packing machine services and customer data protection.",
    images: ["/images/logo.png"],
  },
}

export default function PolicyPage() {
  return (
    <div className="policyContainer">
      <header className="policyHeader">
        <h1>Company Policies</h1>
        <p>Privacy Policy, Terms of Service, Cookies, Warranty, and Returns</p>
      </header>

      {/* JSON-LD: Breadcrumbs */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            itemListElement: [
              { "@type": "ListItem", position: 1, name: "Home", item: "https://detechnics.com/" },
              { "@type": "ListItem", position: 2, name: "Policies", item: "https://detechnics.com/policy" },
            ],
          }),
        }}
      />

      {/* JSON-LD: FAQ (subset reflecting on-page FAQ) */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: [
              {
                "@type": "Question",
                name: "What personal information do you collect?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text:
                    "When you register, place an order, subscribe to the newsletter or request information, D.E. Technics may collect your name, email address, postal address, phone number and payment information.",
                },
              },
              {
                "@type": "Question",
                name: "How do you use my information?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text:
                    "We use it to provide services, process orders, send administrative and marketing communications, respond to inquiries and improve the website.",
                },
              },
              {
                "@type": "Question",
                name: "Do you share my information?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text:
                    "Information may be shared with service providers, to comply with legal obligations, to protect the company's rights or with your consent.",
                },
              },
              {
                "@type": "Question",
                name: "What rights do I have over my data?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text:
                    "Depending on your location, you may have rights to access, correct, delete, restrict processing or obtain a copy of your personal information.",
                },
              },
              {
                "@type": "Question",
                name: "How can I contact you about privacy?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text:
                    "Email privacy@detechnics.com or call +92 42 35272601‑02 with any questions or concerns.",
                },
              },
            ],
          }),
        }}
      />

      {/* JSON-LD: Organization */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Organization",
            name: "D.E. Technics (Pvt) Limited",
            alternateName: "D.E. Technics",
            url: "https://detechnics.com",
            logo: "https://detechnics.com/images/logo.png",
            description:
              "Leading manufacturer of packing machines and automation solutions since 1984, specializing in automatic packing machines, small packing machine, and competitive packing machine price in Pakistan.",
            foundingDate: "1984",
            address: {
              "@type": "PostalAddress",
              streetAddress: "Lahore",
              addressLocality: "Lahore",
              addressRegion: "Punjab",
              addressCountry: "Pakistan",
            },
            contactPoint: [
              { "@type": "ContactPoint", telephone: "+92-333-0184756", contactType: "customer service", availableLanguage: ["English", "Urdu"] },
              { "@type": "ContactPoint", email: "info@detechnics.com", contactType: "customer service" },
            ],
            sameAs: ["https://detechnics.com"],
            industry: "Packing Machine Manufacturing",
            numberOfEmployees: "10-50",
          }),
        }}
      />

      <nav className="policyNav">
        <a href="#privacy-policy">Privacy Policy</a>
        <a href="#terms-of-service">Terms of Service</a>
        <a href="#cookie-policy">Cookie Policy</a>
        <a href="#warranty-policy">Warranty Policy</a>
        <a href="#return-policy">Return Policy</a>
      </nav>

      <section id="privacy-policy" className="policySection">
        <div className="sectionHeader">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
          </svg>
          <h2>Privacy Policy</h2>
        </div>
        <div className="sectionContent">
          <p className="lastUpdated">Last Updated: January 15, 2023</p>
          <p>
            At D.E. Technics (Pvt) Limited, we are committed to protecting your privacy and ensuring the security of your personal information. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website or use our services.
          </p>
          
          <h3>Information We Collect</h3>
          <p>We may collect personal information that you voluntarily provide to us when you:</p>
          <ul>
            <li>Register on our website</li>
            <li>Place an order for our products or services</li>
            <li>Subscribe to our newsletter</li>
            <li>Request information or assistance</li>
            <li>Participate in promotions or surveys</li>
          </ul>
          
          <p>The personal information we collect may include your name, email address, postal address, phone number, and payment information.</p>
          
          <h3>How We Use Your Information</h3>
          <ul>
            <li>Providing and maintaining our services</li>
            <li>Processing and fulfilling your orders</li>
            <li>Sending you administrative information</li>
            <li>Sending marketing and promotional communications</li>
            <li>Responding to your inquiries and requests</li>
            <li>Improving our website and services</li>
            <li>Protecting our rights and interests</li>
          </ul>
          
          <h3>Information Sharing</h3>
          <p>We may share your information with:</p>
          <ul>
            <li>Service providers who perform services on our behalf</li>
            <li>To comply with legal obligations</li>
            <li>To protect and defend our rights and property</li>
            <li>With your consent or at your direction</li>
          </ul>
          
          <h3>Data Security</h3>
          <p>We implement appropriate technical and organizational measures to protect the security of your personal information. However, please be aware that no method of transmission over the Internet or electronic storage is 100% secure.</p>
          
          <h3>Your Rights</h3>
          <p>Depending on your location, you may have certain rights regarding your personal information, including:</p>
          <ul>
            <li>The right to access your personal information</li>
            <li>The right to correct inaccurate or incomplete information</li>
            <li>The right to request deletion of your personal information</li>
            <li>The right to restrict or object to processing</li>
            <li>The right to data portability</li>
          </ul>
          
          <h3>Contact Us</h3>
          <p>If you have any questions about this Privacy Policy, please contact us at:</p>
          <p>
            Email: privacy@detechnics.com<br />
            Phone: +92 42 35272601-02<br />
            Address: Lahore, Pakistan
          </p>
        </div>
      </section>
      
      <section id="terms-of-service" className="policySection">
        <div className="sectionHeader">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
            <polyline points="14 2 14 8 20 8"></polyline>
            <line x1="16" y1="13" x2="8" y2="13"></line>
            <line x1="16" y1="17" x2="8" y2="17"></line>
            <polyline points="10 9 9 9 8 9"></polyline>
          </svg>
          <h2>Terms of Service</h2>
        </div>
        <div className="sectionContent">
          <p className="lastUpdated">Last Updated: January 15, 2023</p>
          
          <h3>1. Acceptance of Terms</h3>
          <p>By accessing or using the D.E. Technics website, you agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use our website.</p>
          
          <h3>2. Use of Website</h3>
          <p>You agree to use our website only for lawful purposes and in accordance with these Terms of Service. You agree not to:</p>
          <ul>
            <li>Use our website in any way that violates any applicable laws or regulations</li>
            <li>Engage in any conduct that restricts or inhibits anyone's use or enjoyment of the website</li>
            <li>Impersonate or attempt to impersonate D.E. Technics, a D.E. Technics employee, another user, or any other person or entity</li>
            <li>Engage in any other conduct that restricts or inhibits anyone's use or enjoyment of the website</li>
          </ul>
          
          <h3>3. Intellectual Property</h3>
          <p>The content, organization, graphics, design, and other matters related to the website are protected under applicable copyrights, trademarks, and other proprietary rights. The copying, redistribution, use, or publication by you of any such matters or any part of the website is strictly prohibited.</p>
          
          <h3>4. Products and Services</h3>
          <p>All products and services are subject to availability. We reserve the right to discontinue any products or services at any time. We reserve the right to refuse any order you place with us.</p>
          
          <h3>5. Limitation of Liability</h3>
          <p>In no event shall D.E. Technics, nor its directors, employees, partners, agents, suppliers, or affiliates, be liable for any indirect, incidental, special, consequential, or punitive damages, including without limitation, loss of profits, data, use, goodwill, or other intangible losses, resulting from your access to or use of or inability to access or use the website.</p>
          
          <h3>6. Changes to Terms</h3>
          <p>We reserve the right to modify these terms at any time. We will provide notice of any changes by updating the "Last Updated" date of these Terms of Service. Your continued use of the website after any such changes constitutes your acceptance of the new Terms of Service.</p>
          
          <h3>7. Contact Us</h3>
          <p>If you have any questions about these Terms of Service, please contact us at:</p>
          <p>
            Email: legal@detechnics.com<br />
            Phone: +92 42 35272601-02
          </p>
        </div>
      </section>
      
      <section id="cookie-policy" className="policySection">
        <div className="sectionHeader">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 2a10 10 0 1 0 10 10 4 4 0 0 1-5-5 4 4 0 0 1-5-5"></path>
            <path d="M8.5 8.5v.01"></path>
            <path d="M16 15.5v.01"></path>
            <path d="M12 12v.01"></path>
            <path d="M11 17v.01"></path>
            <path d="M7 14v.01"></path>
          </svg>
          <h2>Cookie Policy</h2>
        </div>
        <div className="sectionContent">
          <p className="lastUpdated">Last Updated: January 15, 2023</p>
          
          <p>This Cookie Policy explains how D.E. Technics ("we", "us", or "our") uses cookies and similar technologies to recognize you when you visit our website. It explains what these technologies are and why we use them, as well as your rights to control our use of them.</p>
          
          <h3>What are cookies?</h3>
          <p>Cookies are small data files that are placed on your computer or mobile device when you visit a website. Cookies are widely used by website owners to make their websites work, or to work more efficiently, as well as to provide reporting information.</p>
          
          <h3>Why do we use cookies?</h3>
          <p>We use first and third-party cookies for several reasons. Some cookies are required for technical reasons in order for our website to operate, and we refer to these as "essential" or "strictly necessary" cookies. Other cookies enable us to track and target the interests of our users to enhance the experience on our website.</p>
          
          <h3>What types of cookies do we use?</h3>
          <p>The specific types of first and third-party cookies served through our website and the purposes they perform are described below:</p>
          
          <h4>Essential website cookies:</h4>
          <p>These cookies are strictly necessary to provide you with services available through our website and to use some of its features, such as access to secure areas.</p>
          
          <h4>Performance and functionality cookies:</h4>
          <p>These cookies are used to enhance the performance and functionality of our website but are non-essential to their use. However, without these cookies, certain functionality may become unavailable.</p>
          
          <h4>Analytics and customization cookies:</h4>
          <p>These cookies collect information that is used either in aggregate form to help us understand how our website is being used or how effective our marketing campaigns are, or to help us customize our website for you.</p>
          
          <h3>Managing Cookies</h3>
          <p>You can set or amend your web browser controls to accept or refuse cookies. If you choose to reject cookies, you may still use our website though your access to some functionality and areas of our website may be restricted.</p>
          
          <h3>Changes to This Policy</h3>
          <p>We may update this Cookie Policy from time to time to reflect changes to our use of cookies or for other operational, legal, or regulatory reasons.</p>
          
          <h3>Contact Us</h3>
          <p>If you have any questions about our use of cookies or other technologies, please contact us at:</p>
          <p>
            Email: privacy@detechnics.com<br />
            Phone: +92 42 35272601-02
          </p>
        </div>
      </section>
      
      <section id="warranty-policy" className="policySection">
        <div className="sectionHeader">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M20 12c0-1.2-.4-2.3-1-3.2V5c0-.6-.4-1-1-1h-4.8c-.4-1.2-1.5-2-2.7-2-1.2 0-2.3.8-2.7 2H5c-.6 0-1 .4-1 1v3.8c-.6.9-1 2-1 3.2 0 1.2.4 2.3 1 3.2V19c0 .6.4 1 1 1h4.8c.4 1.2 1.5 2 2.7 2 1.2 0 2.3-.8 2.7-2H18c.6 0 1-.4 1-1v-3.8c.6-.9 1-2 1-3.2z"></path>
            <path d="M12 15c1.7 0 3-1.3 3-3s-1.3-3-3-3-3 1.3-3 3 1.3 3 3 3z"></path>
          </svg>
          <h2>Warranty Policy</h2>
        </div>
        <div className="sectionContent">
          <p className="lastUpdated">Last Updated: January 15, 2023</p>
          
          <h3>1. Warranty Coverage</h3>
          <p>D.E. Technics (Pvt) Limited ("we", "us", or "our") warrants that our products will be free from defects in materials and workmanship under normal use and service for the warranty period specified in the product documentation.</p>
          
          <h3>2. Warranty Period</h3>
          <p>The standard warranty period for our products is 12 months from the date of delivery unless otherwise specified in the product documentation or purchase agreement.</p>
          
          <h3>3. What This Warranty Covers</h3>
          <p>This warranty covers any defects in materials or workmanship that occur during normal use of the product. We will, at our option, either repair or replace any defective product or part thereof.</p>
          
          <h3>4. What This Warranty Does Not Cover</h3>
          <p>This warranty does not cover:</p>
          <ul>
            <li>Damage caused by accident, abuse, misuse, or negligence</li>
            <li>Improper installation, operation, or maintenance</li>
            <li>Unauthorized modifications or repairs</li>
            <li>Normal wear and tear</li>
            <li>Use of the product with non-D.E. Technics accessories or parts</li>
            <li>Acts of God, including but not limited to fire, flood, or other natural disasters</li>
          </ul>
          
          <h3>5. Warranty Claim Process</h3>
          <p>To make a warranty claim, please contact our customer service department with the following information:</p>
          <ul>
            <li>Your name and contact information</li>
            <li>Product model and serial number</li>
            <li>Date of purchase</li>
            <li>Description of the issue</li>
            <li>Proof of purchase</li>
          </ul>
          
          <h3>6. Limitation of Liability</h3>
          <p>Our liability under this warranty is limited to the repair or replacement of the defective product. In no event shall we be liable for any indirect, incidental, special, or consequential damages arising out of or in connection with the use or performance of our products.</p>
          
          <h3>7. Contact Us</h3>
          <p>For warranty claims or questions about this warranty, please contact us at:</p>
          <p>
            Email: support@detechnics.com<br />
            Phone: +92 42 35272601-02<br />
            Address: Lahore, Pakistan
          </p>
        </div>
      </section>
      
      <section id="return-policy" className="policySection">
        <div className="sectionHeader">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
            <polyline points="7 10 12 15 17 10"></polyline>
            <line x1="12" y1="15" x2="12" y2="3"></line>
          </svg>
          <h2>Return Policy</h2>
        </div>
        <div className="sectionContent">
          <p className="lastUpdated">Last Updated: January 15, 2023</p>
          
          <h3>1. Returns</h3>
          <p>We want you to be completely satisfied with your purchase. If you are not satisfied with your purchase for any reason, you may return it within 30 days of the delivery date for a full refund or exchange, subject to the conditions below.</p>
          
          <h3>2. Return Conditions</h3>
          <p>To be eligible for a return, your item must be:</p>
          <ul>
            <li>In its original packaging</li>
            <li>Unused and in the same condition as when you received it</li>
            <li>Accompanied by the original receipt or proof of purchase</li>
          </ul>
          
          <h3>3. Non-Returnable Items</h3>
          <p>The following items are not eligible for return:</p>
          <ul>
            <li>Custom or special order items</li>
            <li>Items marked as final sale or clearance</li>
            <li>Items that have been installed, used, or damaged</li>
            <li>Items not in their original condition</li>
          </ul>
          
          <h3>4. Return Process</h3>
          <p>To initiate a return, please follow these steps:</p>
          <ol>
            <li>Contact our customer service department to obtain a Return Merchandise Authorization (RMA) number</li>
            <li>Package the item securely in its original packaging</li>
            <li>Include a copy of your receipt and the RMA number with your return</li>
            <li>Ship the package to the address provided by our customer service team</li>
          </ol>
          
          <p>If you have any questions about our return policy, please contact us at:</p>
          <p>
            Email: returns@detechnics.com<br />
            Phone: +92 42 35272601-02<br />
            Address: Lahore, Pakistan
          </p>
        </div>
      </section>
      
      <section className="faqSection">
        <h2>Frequently Asked Questions</h2>
        <div className="faqContainer">
          <details className="faqItem">
            <summary className="faqQuestion">
              <h3>How do I update my personal information?</h3>
            </summary>
            <div className="faqAnswer">
              <p>You can update your personal information by logging into your account and navigating to the account settings page. If you need assistance, please contact our customer service team.</p>
            </div>
          </details>
          
          <details className="faqItem">
            <summary className="faqQuestion">
              <h3>How can I contact customer support?</h3>
            </summary>
            <div className="faqAnswer">
              <p>You can reach our customer support team by email at support@detechnics.com or by phone at +92 42 35272601-02. Our support hours are Monday through Friday, 9:00 AM to 5:00 PM PKT.</p>
            </div>
          </details>
          
          <details className="faqItem">
            <summary className="faqQuestion">
              <h3>What payment methods do you accept?</h3>
            </summary>
            <div className="faqAnswer">
              <p>We accept various payment methods including credit/debit cards, bank transfers, and in some cases, cash on delivery. All online payments are processed through secure payment gateways.</p>
            </div>
          </details>
          
          <details className="faqItem">
            <summary className="faqQuestion">
              <h3>How do I track my order?</h3>
            </summary>
            <div className="faqAnswer">
              <p>Once your order has shipped, you will receive a confirmation email with a tracking number. You can use this number to track your order on our website or the shipping carrier's website.</p>
            </div>
          </details>
          
          <details className="faqItem">
            <summary className="faqQuestion">
              <h3>Do you ship internationally?</h3>
            </summary>
            <div className="faqAnswer">
              <p>Yes, we offer international shipping to most countries. Shipping costs and delivery times vary depending on the destination. Please contact us for specific details about shipping to your location.</p>
            </div>
          </details>
        </div>
      </section>

      <Footer />
    </div>
  )
}
