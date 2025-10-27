// loading-manager.js - Zero intervention solution

(function() {
    'use strict';
    
    // CREATE LOADING SCREEN
    const loadingHTML = `
        <div id="externalLoadingScreen" style="
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            z-index: 9999;
            color: white;
            font-family: Arial, sans-serif;
            transition: opacity 0.5s ease;
        ">
            <div style="
                width: 40px;
                height: 40px;
                border: 3px solid rgba(255,255,255,0.3);
                border-top: 3px solid white;
                border-radius: 50%;
                animation: externalSpin 1s linear infinite;
                margin-bottom: 15px;
            "></div>
            <div>Loading Spam Hunters...</div>
        </div>
        
        <style>
            @keyframes externalSpin {
                0% { transform: rotate(0deg); }
                100% { transform: rotate(360deg); }
            }
            
            .external-content-loaded #externalLoadingScreen {
                opacity: 0;
                pointer-events: none;
            }
        </style>
    `;
    
    // INJECT LOADING SCREEN
    document.body.insertAdjacentHTML('afterbegin', loadingHTML);
    
    // WAIT FOR PAGE TO LOAD
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', hideLoading);
    } else {
        setTimeout(hideLoading, 1000);
    }
    
    function hideLoading() {
        // WAIT A BIT MORE FOR DYNAMIC CONTENT
        setTimeout(() => {
            document.body.classList.add('external-content-loaded');
            
            // REMOVE COMPLETELY AFTER ANIMATION
            setTimeout(() => {
                const loadingElement = document.getElementById('externalLoadingScreen');
                if (loadingElement) {
                    loadingElement.remove();
                }
            }, 500);
        }, 800);
    }
})();