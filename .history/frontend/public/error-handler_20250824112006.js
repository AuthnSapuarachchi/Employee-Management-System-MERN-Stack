// Console error handler - Add this to help debug browser extension issues
(function() {
  'use strict';
  
  // Log original console methods for debugging
  const originalError = console.error;
  const originalWarn = console.warn;
  
  // Override console.error to filter out known extension issues
  console.error = function(...args) {
    const message = args.join(' ');
    
    // Filter out known browser extension errors that don't affect functionality
    if (message.includes('A listener indicated an asynchronous response by returning true') ||
        message.includes('message channel closed before a response was received')) {
      console.debug('🔇 Filtered browser extension error:', message);
      return;
    }
    
    // Log genuine errors
    originalError.apply(console, args);
  };
  
  // Handle unhandled promise rejections
  window.addEventListener('unhandledrejection', function(event) {
    const message = event.reason?.message || event.reason;
    
    // Filter out extension-related promise rejections
    if (typeof message === 'string' && 
        (message.includes('Extension context invalidated') ||
         message.includes('message channel closed'))) {
      console.debug('🔇 Filtered extension promise rejection:', message);
      event.preventDefault();
      return;
    }
    
    console.warn('⚠️ Unhandled promise rejection:', event.reason);
  });
  
  console.log('✅ Enhanced error handling loaded');
})();
