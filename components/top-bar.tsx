interface TopBarProps {
  className?: string
}

export default function TopBar({ className = "" }: TopBarProps) {
  return (
    <div className={`bg-white py-2.5 border-b border-gray-200 ${className}`}>
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center text-sm">
          <div className="flex items-center gap-6 text-gray-700">
            <span>
              Landline:{" "}
              <a 
                href="tel:+924235272601-02" 
                className="text-blue-600 hover:text-blue-800 transition-colors"
              >
                +92 42 35272601-02
              </a>
            </span>
            <span>
              Contact:{" "}
              <a 
                href="tel:+923330184756" 
                className="text-blue-600 hover:text-blue-800 transition-colors"
              >
                +92-333-0184756
              </a>
            </span>
          </div>
          
          <div className="flex items-center gap-3">
            <a
              href="https://www.facebook.com/detechnicspk"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:text-blue-800 transition-colors"
              aria-label="Follow us on Facebook"
            >
              <i className="fab fa-facebook-f"></i>
            </a>
            <a
              href="https://www.youtube.com/@DETechnicsPK"
              target="_blank"
              rel="noopener noreferrer"
              className="text-red-600 hover:text-red-800 transition-colors"
              aria-label="Subscribe to our YouTube channel"
            >
              <i className="fab fa-youtube"></i>
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}
