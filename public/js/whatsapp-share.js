// WhatsApp Share Functionality
function setupWhatsAppShare() {
    // Get all WhatsApp share buttons
    const whatsappButtons = document.querySelectorAll('.btn-whatsapp');
    
    whatsappButtons.forEach(button => {
        // Get the product name from the page title or a data attribute
        const productName = document.querySelector('.product-title')?.textContent || 'Product';
        
        // Get the current page URL
        const currentUrl = window.location.href;
        
        // Create the WhatsApp share URL
        const whatsappNumber = '923330184756'; // Your WhatsApp number with country code
        const message = `Hello! I visited your website and am interested in this product: ${productName} ${currentUrl}`;
        const encodedMessage = encodeURIComponent(message);
        
        // Update the href attribute
        button.href = `https://wa.me/${whatsappNumber}?text=${encodedMessage}`;
    });
}

// Run the setup when the DOM is loaded
document.addEventListener('DOMContentLoaded', setupWhatsAppShare);
