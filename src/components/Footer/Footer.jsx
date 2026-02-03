import { Link } from 'react-router-dom'
import Logo from '@/components/Logo'

// Configuration for footer columns
const footerSections = [
  {
    title: "Company",
    widthClass: "lg:w-2/12",
    links: [
      { text: "Features", to: "/" },
      { text: "Pricing", to: "/" },
      { text: "Affiliate Program", to: "/" },
      { text: "Press Kit", to: "/" },
    ]
  },
  {
    title: "Support",
    widthClass: "lg:w-2/12",
    links: [
      { text: "Account", to: "/" },
      { text: "Help", to: "/" },
      { text: "Contact Us", to: "/" },
      { text: "Customer Support", to: "/" },
    ]
  },
  {
    title: "Legals",
    widthClass: "lg:w-3/12",
    links: [
      { text: "Terms & Conditions", to: "/" },
      { text: "Privacy Policy", to: "/" },
      { text: "Licensing", to: "/" },
    ]
  }
]

function Footer() {
  return (
    <section className="relative overflow-hidden py-10 bg-gray-900 border-t border-gray-800">
      <div className="relative z-10 mx-auto max-w-7xl px-4">
        <div className="-m-6 flex flex-wrap">          
          <div className="w-full p-6 md:w-1/2 lg:w-5/12">
            <div className="flex h-full flex-col justify-between">
              <div className="mb-4 inline-flex items-center">
                <Logo width="100px" />
              </div>
              <div>
                <p className="text-sm text-gray-400">
                  &copy; Copyright 2026. All Rights Reserved by MegaBlog.
                </p>
              </div>
            </div>
          </div>

          {footerSections.map((section) => (
            <div 
                key={section.title} 
                className={`w-1/2 p-6 md:w-1/2 ${section.widthClass}`}
            >
              <div className="h-full">
                <h3 className="tracking-px mb-9 text-xs font-semibold uppercase text-gray-500">
                  {section.title}
                </h3>
                <ul>
                  {section.links.map((link) => (
                    <li key={link.text} className="mb-4">
                      <Link
                        className="text-base font-medium text-gray-300 hover:text-blue-400 transition-colors"
                        to={link.to}
                      >
                        {link.text}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}

        </div>
      </div>
    </section>
  )
}

export default Footer