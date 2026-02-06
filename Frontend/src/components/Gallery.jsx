import React, { useState } from 'react';

const Gallery = () => {
  const images = [
    '/images/hopin_front.jpg',
    '/images/hopin_outer.jpg',
    '/images/hopin_outer2.jpg',
    '/images/hopin_outer3.jpg',
    '/images/hopin_outer4.jpg',
    '/images/hopin_interior1.jpg',
    '/images/hopin_interior2.jpg',
    '/images/hopin_interior3.jpg',
    '/images/hopin_interior5.jpg',
    '/images/hopin_interior6.jpg',
    '/images/hopin_food1.jpg',
    '/images/hopin_food2.jpg'
  ];

  const [selectedImage, setSelectedImage] = useState(null);

  const openLightbox = (index) => {
    setSelectedImage(index);
  };

  const closeLightbox = () => {
    setSelectedImage(null);
  };

  const navigateImage = (direction) => {
    if (direction === 'prev') {
      setSelectedImage(selectedImage === 0 ? images.length - 1 : selectedImage - 1);
    } else {
      setSelectedImage(selectedImage === images.length - 1 ? 0 : selectedImage + 1);
    }
  };

  return (
    <>
      <style jsx>{`
        .gallery-item {
          position: relative;
          overflow: hidden;
          border-radius: 16px;
          cursor: pointer;
          transform: translateZ(0);
          transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
        }
        
        .gallery-item::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: linear-gradient(135deg, transparent 0%, rgba(26, 77, 46, 0.1) 100%);
          opacity: 0;
          transition: opacity 0.4s ease;
          z-index: 1;
        }
        
        .gallery-item:hover::before {
          opacity: 1;
        }
        
        .gallery-item:hover {
          transform: translateY(-8px) scale(1.02);
          box-shadow: 0 20px 40px rgba(26, 77, 46, 0.2), 0 8px 16px rgba(26, 77, 46, 0.1);
        }
        
        .gallery-item img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.6s cubic-bezier(0.175, 0.885, 0.32, 1.275);
        }
        
        .gallery-item:hover img {
          transform: scale(1.1);
        }
        
        .lightbox {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: rgba(26, 77, 46, 0.95);
          backdrop-filter: blur(20px);
          display: none;
          justify-content: center;
          align-items: center;
          z-index: 1000;
          opacity: 0;
          transition: opacity 0.3s ease;
        }
        
        .lightbox.active {
          display: flex;
          opacity: 1;
        }
        
        .lightbox-content {
          position: relative;
          max-width: 90vw;
          max-height: 90vh;
          animation: lightboxIn 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
        }
        
        @keyframes lightboxIn {
          from {
            transform: scale(0.8) translateY(20px);
            opacity: 0;
          }
          to {
            transform: scale(1) translateY(0);
            opacity: 1;
          }
        }
        
        .lightbox-content img {
          max-width: 100%;
          max-height: 90vh;
          object-fit: contain;
          border-radius: 16px;
          box-shadow: 0 30px 60px rgba(0, 0, 0, 0.4);
        }
        
        .lightbox-nav {
          position: absolute;
          top: 50%;
          transform: translateY(-50%);
          background: rgba(255, 255, 255, 0.9);
          color: #1a4d2e;
          border: none;
          width: 50px;
          height: 50px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: all 0.3s ease;
          font-size: 20px;
          font-weight: bold;
          z-index: 10;
          touch-manipulation;
          min-width: 44px;
          min-height: 44px;
        }
        
        .lightbox-nav:hover {
          background: white;
          transform: translateY(-50%) scale(1.1);
          box-shadow: 0 8px 24px rgba(26, 77, 46, 0.3);
        }
        
        .lightbox-nav.prev {
          left: 20px;
        }
        
        .lightbox-nav.next {
          right: 20px;
        }
        
        .lightbox-close {
          position: absolute;
          top: 20px;
          right: 20px;
          background: rgba(255, 255, 255, 0.9);
          color: #1a4d2e;
          border: none;
          width: 50px;
          height: 50px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: all 0.3s ease;
          font-size: 24px;
          font-weight: bold;
          z-index: 10;
          touch-manipulation;
          min-width: 44px;
          min-height: 44px;
        }
        
        .lightbox-close:hover {
          background: white;
          transform: scale(1.1);
          box-shadow: 0 8px 24px rgba(26, 77, 46, 0.3);
        }
        
        @media (max-width: 768px) {
          .lightbox-nav {
            width: 44px;
            height: 44px;
            font-size: 16px;
          }
          
          .lightbox-nav.prev {
            left: 8px;
          }
          
          .lightbox-nav.next {
            right: 8px;
          }
          
          .lightbox-close {
            width: 44px;
            height: 44px;
            font-size: 20px;
            top: 8px;
            right: 8px;
          }
        }
      `}</style>

      <section id="gallery" className="py-16 lg:py-20 bg-cafe-cream">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 lg:mb-16 fade-in">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 text-forest-primary animate-element">
              Gallery
            </h2>
            <p className="text-base sm:text-lg max-w-2xl mx-auto text-forest-primary opacity-80 px-4 fade-in stagger-2">
              Take a visual tour of our beautiful patio cafe and atmosphere
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4 lg:gap-6 gallery-grid">
            {images.map((image, index) => (
              <div 
                key={index} 
                className={`gallery-item aspect-square touch-manipulation fade-in stagger-${Math.min(index % 6 + 3, 6)}`}
                onClick={() => openLightbox(index)}
              >
                <img
                  src={image}
                  alt={`Cafe gallery ${index + 1}`}
                  loading="lazy"
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      <div 
        className={`lightbox ${selectedImage !== null ? 'active' : ''}`}
        onClick={closeLightbox}
      >
        {selectedImage !== null && (
          <div className="lightbox-content" onClick={(e) => e.stopPropagation()}>
            <img
              src={images[selectedImage]}
              alt={`Cafe gallery ${selectedImage + 1}`}
            />
            <button 
              className="lightbox-nav prev"
              onClick={(e) => {
                e.stopPropagation();
                navigateImage('prev');
              }}
            >
              ‹
            </button>
            <button 
              className="lightbox-nav next"
              onClick={(e) => {
                e.stopPropagation();
                navigateImage('next');
              }}
            >
              ›
            </button>
            <button 
              className="lightbox-close"
              onClick={(e) => {
                e.stopPropagation();
                closeLightbox();
              }}
            >
              ×
            </button>
          </div>
        )}
      </div>
    </>
  );
};

export default Gallery;