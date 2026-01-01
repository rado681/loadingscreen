async function loadConfiguration() {
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
    
    return {
        logoUrl: 'https://r2.fivemanage.com/1yZxR8kcMNaxcz54HnRev/download.jpg',
        videoUrl: 'https://r2.fivemanage.com/1yZxR8kcMNaxcz54HnRev/MONSTERMASH-GTAVFIVEMLOADINGSCREEN.webm',
        musicUrl: 'https://r2.fivemanage.com/1yZxR8kcMNaxcz54HnRev/I.N.I.MART!NA-.mp3',
        logoAlt: 'Server Logo',
        blurIntensity: '10px'
    };
}

document.addEventListener('DOMContentLoaded', function() {
    let blurIntensity = '10px';
    
    loadConfiguration()
        .then(config => {
            blurIntensity = config.blurIntensity || '10px';
            
            const logo = document.getElementById('logo');
            logo.src = config.logoUrl;
            logo.alt = config.logoAlt;
            
            const video = document.getElementById('background-video');
            video.src = config.videoUrl;
            video.style.filter = `blur(${blurIntensity})`; // Apply blur from config
            
            const music = document.getElementById('background-music');
            music.src = config.musicUrl;
        })
        .catch(error => {
            console.error('Unexpected error:', error);
        });
});
