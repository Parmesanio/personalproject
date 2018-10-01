window.addEventListener('load', async () => {
    if('serviceWorker' in navigator) {
        try {
            navigator.serviceWorker.register('tmpSW.js');
            console.log('tmpSW Registered');
            console.log('looool');
            
            
        } catch (error) {
            console.log('Err in tmpSW', error);
            
        }
    }
 })