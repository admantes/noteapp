import bgImage from './bg1.webp';

export function Background() {    
    return (
        <div className="fixed inset-0 -z-10">
            {/* Static background image */}
            <div 
                className="absolute inset-0 bg-cover bg-center bg-no-repeat"
                style={{ 
                    backgroundImage: `url(${bgImage})`,
                }}
            />
            
            {/* Overlay gradients for better readability */}
            <div className="absolute inset-0 bg-gradient-to-b from-gray-900/80 via-gray-900/50 to-gray-900/80" />
            
            {/* Subtle texture overlay */}
            <div className="absolute inset-0 bg-black/10 backdrop-filter backdrop-blur-[2px]" />
            
            {/* Orange accent gradient */}
            <div className="absolute inset-0 bg-gradient-to-tr from-orange-500/10 via-transparent to-transparent mix-blend-overlay" />
        </div>
    );
}

