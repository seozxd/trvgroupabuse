// loading-manager.js - IMMEDIATE EXECUTION
(function() {
    'use strict';
    
    // IMMEDIATELY CREATE LOADING SCREEN - DON'T WAIT FOR DOM
    const loadingHTML = `
        <div id="externalLoadingScreen" style="
            position: fixed;
            top: 0;
            left: 0;
            width: 100vw;
            height: 100vh;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            z-index: 99999;
            color: white;
            font-family: Arial, sans-serif;
            margin: 0;
            padding: 0;
            border: 0;
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
            <div>Loading Site List Please Wait</div>
        </div>
        <style>
            @keyframes externalSpin {
                0% { transform: rotate(0deg); }
                100% { transform: rotate(360deg); }
            }
            body.external-content-loaded #externalLoadingScreen {
                opacity: 0;
                visibility: hidden;
                transition: opacity 0.5s ease, visibility 0.5s ease;
            }
            #externalLoadingScreen {
                transition: opacity 0.5s ease;
            }
        </style>
    `;
    
    // INJECT IMMEDIATELY - BEFORE ANY CONTENT RENDERS
    document.addEventListener('readystatechange', function() {
        if (document.readyState === 'loading') {
            document.body.style.visibility = 'hidden';
            document.body.insertAdjacentHTML('afterbegin', loadingHTML);
        }
    });
    
    // HIDE WHEN PAGE LOADS
    window.addEventListener('load', function() {
        document.body.style.visibility = 'visible';
        document.body.classList.add('external-content-loaded');
        
        // REMOVE AFTER ANIMATION
        setTimeout(() => {
            const loadingElement = document.getElementById('externalLoadingScreen');
            if (loadingElement) {
                loadingElement.remove();
            }
        }, 500);
    });
    
    // FALLBACK - HIDE AFTER 3 SECONDS MAX
    setTimeout(() => {
        document.body.classList.add('external-content-loaded');
    }, 3000);
    
})();