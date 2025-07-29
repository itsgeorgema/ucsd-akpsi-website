// This script ensures Resources tab appears persistently when user is authenticated

(function() {
  'use strict';
  
  function isAuthenticated() {
    try {
      return localStorage.getItem('akpsi-auth') === 'true';
    } catch {
      return false;
    }
  }
  
  function addResourcesTabToNavbar() {
    const navbar = document.querySelector('nav');
    if (!navbar || !isAuthenticated()) return false;
    
    // Check if Resources tab already exists
    const existingResourcesTab = Array.from(navbar.querySelectorAll('a')).find(a => a.textContent.includes('Resources'));
    
    if (!existingResourcesTab) {
      console.log('🔧 Adding Resources tab via script');
      
      // Find the recruitment link and add Resources after it
      const recruitmentLink = Array.from(navbar.querySelectorAll('a')).find(a => a.textContent.includes('Recruitment'));
      
      if (recruitmentLink) {
        const resourcesLink = recruitmentLink.cloneNode(true);
        resourcesLink.textContent = 'Resources';
        resourcesLink.href = '/members';
        resourcesLink.setAttribute('data-injected', 'true'); // Mark as script-injected
        recruitmentLink.parentNode.insertBefore(resourcesLink, recruitmentLink.nextSibling);
        return true;
      }
    }
    return false;
  }
  
  function persistentResourcesCheck() {
    if (!isAuthenticated()) return;
    
    // Continuously check and re-add Resources tab if it gets removed
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.type === 'childList') {
          // Check if navbar was modified and Resources tab is missing
          const navbar = document.querySelector('nav');
          if (navbar && isAuthenticated()) {
            const resourcesTab = Array.from(navbar.querySelectorAll('a')).find(a => a.textContent.includes('Resources'));
            if (!resourcesTab) {
              console.log('🔄 Resources tab removed, re-adding...');
              setTimeout(addResourcesTabToNavbar, 100); // Small delay to let React finish
            }
          }
        }
      });
    });
    
    // Watch for changes to the entire document
    observer.observe(document.body, {
      childList: true,
      subtree: true
    });
    
    // Also check periodically as backup
    setInterval(() => {
      if (isAuthenticated()) {
        addResourcesTabToNavbar();
      }
    }, 1000);
  }
  
  function initializeResourcesTab() {
    // Wait for navbar to be rendered
    const checkForNavbar = setInterval(() => {
      if (addResourcesTabToNavbar()) {
        clearInterval(checkForNavbar);
        // Start persistent monitoring
        persistentResourcesCheck();
      }
    }, 50);
    
    // Stop checking after 10 seconds
    setTimeout(() => clearInterval(checkForNavbar), 10000);
  }
  
  // Run immediately when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeResourcesTab);
  } else {
    initializeResourcesTab();
  }
  
  // Also run when page becomes visible (handles tab switching)
  document.addEventListener('visibilitychange', () => {
    if (!document.hidden && isAuthenticated()) {
      setTimeout(addResourcesTabToNavbar, 100);
    }
  });
})(); 