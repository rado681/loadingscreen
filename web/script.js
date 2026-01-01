// Function to load configuration with fallbacks for local file access
async function loadConfiguration() {
    // Try multiple paths for config.json
    const paths = ['../config.json', 'config.json', './config.json'];
    
    for (const path of paths) {
        try {
            const response = await fetch(path);
            if (response.ok) {
                return await response.json();
            }
        } catch (error) {
            console.warn(`Could not load config from ${path}:`, error);
        }
    }
    
    console.warn('Could not load config.json from any path, using default values');
    
    // Default configuration for local testing - using the same URLs from the config
    return {
        logoUrl: 'https://r2.fivemanage.com/1yZxR8kcMNaxcz54HnRev/download.jpg',
        videoUrl: 'https://r2.fivemanage.com/1yZxR8kcMNaxcz54HnRev/MONSTERMASH-GTAVFIVEMLOADINGSCREEN.webm',
        musicUrl: 'https://r2.fivemanage.com/1yZxR8kcMNaxcz54HnRev/I.N.I.MART!NA-.mp3',
        logoAlt: 'Server Logo',
        blurIntensity: '10px'
    };
}

document.addEventListener('DOMContentLoaded', function() {
    let blurIntensity = '10px'; // Default blur intensity
    
    // Load configuration
    loadConfiguration()
        .then(config => {
            // Store blur intensity for toggle
            blurIntensity = config.blurIntensity || '10px';
            
            // Set logo
            const logo = document.getElementById('logo');
            logo.src = config.logoUrl;
            logo.alt = config.logoAlt;
            
            // Set video
            const video = document.getElementById('background-video');
            video.src = config.videoUrl;
            video.style.filter = `blur(${blurIntensity})`; // Apply blur from config
            
            // Set music
            const music = document.getElementById('background-music');
            music.src = config.musicUrl;
        })
        .catch(error => {
            console.error('Unexpected error:', error);
        });
});