import React, { useState, useEffect, useRef, useCallback, useMemo } from "react";
import "./MenuImageGallery.css";

const MenuImageGallery = () => {
  const images = [
    "/menu-images/image1.jpg",
    "/menu-images/image2.jpg",
    "/menu-images/image3.jpg",
    "/menu-images/image4.jpg",
    "/menu-images/image5.jpg",
    "/menu-images/image6.jpg",
    "/menu-images/image7.jpg",
    "/menu-images/image8.jpg",
    "/menu-images/image9.jpg",
    "/menu-images/image10.jpg",
    "/menu-images/image11.jpg",
    "/menu-images/image12.jpg",
    "/menu-images/image13.jpg",
    "/menu-images/image14.jpg",
    "/menu-images/image15.jpg",
    "/menu-images/image16.jpg",
    "/menu-images/image17.jpg",
    "/menu-images/image18.jpg",
    "/menu-images/image19.jpg",
    "/menu-images/image20.jpg",
  ];

  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [selectedImage, setSelectedImage] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [lightboxScale, setLightboxScale] = useState(1);
  const [lightboxPosition, setLightboxPosition] = useState({ x: 0, y: 0 });

  const carouselRef = useRef(null);
  const touchStartX = useRef(0);
  const touchEndX = useRef(0);
  const thumbnailObserver = useRef(null);
  const lightboxRef = useRef(null);
  const lastTouchDistance = useRef(0);

  useEffect(() => {
    // Preload images to check if they exist
    const preloadImages = async () => {
      try {
        const imagePromises = images.map((src) => {
          return new Promise((resolve, reject) => {
            const img = new Image();
            img.onload = () => resolve(src);
            img.onerror = () => resolve(src); // Resolve even on error to continue
            img.src = src;
          });
        });

        await Promise.all(imagePromises);
        setIsLoading(false);
      } catch (error) {
        console.error("Error preloading images:", error);
        setIsLoading(false);
      }
    };

    preloadImages();
  }, []);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (selectedImage !== null) {
        // Lightbox is open, handle lightbox navigation
        switch (e.key) {
          case "ArrowLeft":
            navigateImage("prev");
            break;
          case "ArrowRight":
            navigateImage("next");
            break;
          case "Escape":
            closeLightbox();
            break;
          default:
            break;
        }
      } else {
        // Carousel view, handle carousel navigation
        switch (e.key) {
          case "ArrowLeft":
            navigateCarousel("prev");
            break;
          case "ArrowRight":
            navigateCarousel("next");
            break;
          default:
            break;
        }
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [selectedImage, currentImageIndex]);

  // Setup Intersection Observer for thumbnail lazy loading
  useEffect(() => {
    thumbnailObserver.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const img = entry.target.querySelector('img');
            if (img && img.dataset.src) {
              img.src = img.dataset.src;
              img.removeAttribute('data-src');
              img.classList.add('loaded');
            }
            thumbnailObserver.current.unobserve(entry.target);
          }
        });
      },
      { rootMargin: '50px', threshold: 0.1 }
    );

    return () => {
      if (thumbnailObserver.current) {
        thumbnailObserver.current.disconnect();
      }
    };
  }, []);

  // Observe thumbnails when they are mounted
  useEffect(() => {
    if (!isLoading && thumbnailObserver.current) {
      const thumbnails = document.querySelectorAll(
        '.thumbnail[data-observe="true"]',
      );
      thumbnails.forEach((thumbnail) => {
        thumbnailObserver.current.observe(thumbnail);
      });
    }
  }, [isLoading, currentImageIndex]);

  const openLightbox = (index) => {
    setSelectedImage(index);
    // Prevent body scroll when lightbox is open
    document.body.style.overflow = "hidden";
  };

  const closeLightbox = () => {
    setSelectedImage(null);
    setLightboxScale(1);
    setLightboxPosition({ x: 0, y: 0 });
    // Restore body scroll
    document.body.style.overflow = "unset";
  };

  // Lightbox zoom functionality - memoized for performance
  const handleLightboxZoom = useCallback((scale) => {
    setLightboxScale(Math.min(Math.max(scale, 0.5), 3)); // Limit zoom between 0.5x and 3x
  }, []);

  const handleLightboxWheel = useCallback((e) => {
    e.preventDefault();
    const delta = e.deltaY > 0 ? 0.9 : 1.1;
    handleLightboxZoom(lightboxScale * delta);
  }, [lightboxScale, handleLightboxZoom]);

  // Touch zoom for lightbox
  const handleLightboxTouchStart = (e) => {
    if (e.touches.length === 2) {
      const distance = Math.hypot(
        e.touches[0].clientX - e.touches[1].clientX,
        e.touches[0].clientY - e.touches[1].clientY
      );
      lastTouchDistance.current = distance;
    }
  };

  const handleLightboxTouchMove = (e) => {
    if (e.touches.length === 2) {
      e.preventDefault();
      const distance = Math.hypot(
        e.touches[0].clientX - e.touches[1].clientX,
        e.touches[0].clientY - e.touches[1].clientY
      );
      const scale = distance / lastTouchDistance.current;
      handleLightboxZoom(lightboxScale * scale);
      lastTouchDistance.current = distance;
    }
  };

  const navigateImage = (direction) => {
    if (selectedImage === null) return;

    if (direction === "prev") {
      setSelectedImage(
        selectedImage === 0 ? images.length - 1 : selectedImage - 1,
      );
    } else {
      setSelectedImage(
        selectedImage === images.length - 1 ? 0 : selectedImage + 1,
      );
    }
  };

  const handleImageError = (e, index) => {
    e.target.src = "/menu-images/placeholder.jpg"; // Fallback image
    e.target.alt = `Menu image ${index + 1} not available`;
  };

  // Touch gesture handlers
  const handleTouchStart = (e) => {
    touchStartX.current = e.changedTouches[0].screenX;
  };

  const handleTouchMove = (e) => {
    touchEndX.current = e.changedTouches[0].screenX;
  };

  const handleTouchEnd = () => {
    if (!touchStartX.current || !touchEndX.current) return;

    const distance = touchStartX.current - touchEndX.current;
    const isLeftSwipe = distance > 50;
    const isRightSwipe = distance < -50;

    if (isLeftSwipe && !isTransitioning) {
      navigateCarousel("next");
    } else if (isRightSwipe && !isTransitioning) {
      navigateCarousel("prev");
    }

    // Reset touch values
    touchStartX.current = 0;
    touchEndX.current = 0;
  };

  // Enhanced navigation with transition state - memoized for performance
  const navigateCarousel = useCallback((direction) => {
    if (isTransitioning) return;

    setIsTransitioning(true);

    setTimeout(() => {
      if (direction === "prev") {
        setCurrentImageIndex(
          currentImageIndex === 0 ? images.length - 1 : currentImageIndex - 1,
        );
      } else {
        setCurrentImageIndex(
          currentImageIndex === images.length - 1 ? 0 : currentImageIndex + 1,
        );
      }
      setIsTransitioning(false);
    }, 150);
  }, [isTransitioning, currentImageIndex, images.length]);

  return (
    <>

      <section id="menu" className="py-8 lg:py-12 bg-cafe-cream">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8 lg:mb-12 fade-in">
            <h2 className="text-3xl sm:text-3xl md:text-4xl font-bold mb-4 text-forest-primary animate-element">
             Our Menu
            </h2>
            <p className="text-base sm:text-lg text-gray-700 max-w-2xl mx-auto leading-relaxed px-4 fade-in stagger-2">
            Discover our curated selection of <b>premium coffees</b> and <b>fresh foods</b>
          </p>
          </div>

          {isLoading ? (
            <div className="carousel-container">
              <div className="carousel-viewport" />
              <div className="carousel-thumbnails">
                {Array.from({ length: 8 }).map((_, index) => (
                  <div key={index} className="thumbnail" />
                ))}
              </div>
            </div>
          ) : (
            <div className="carousel-container">
              <div
                ref={carouselRef}
                className={`carousel-viewport ${isTransitioning ? 'transitioning' : ''}`}
                onTouchStart={handleTouchStart}
                onTouchMove={handleTouchMove}
                onTouchEnd={handleTouchEnd}
              >
                {/* Render only current image for simplicity and performance */}
                <img
                  key={currentImageIndex}
                  src={images[currentImageIndex]}
                  srcSet={`${images[currentImageIndex]} 1x, ${images[currentImageIndex]} 2x`}
                  sizes="(max-width: 768px) 100vw, (max-width: 1024px) 80vw, 70vw"
                  alt={`Menu item ${currentImageIndex + 1}`}
                  className={`carousel-image active ${isTransitioning ? "transitioning" : ""}`}
                  style={{
                    opacity: 1,
                    transform: "scale(1)",
                    zIndex: 1,
                    visibility: "visible",
                  }}
                  loading="eager"
                  decoding="async"
                  onError={(e) => handleImageError(e, currentImageIndex)}
                  onClick={() => openLightbox(currentImageIndex)}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      e.preventDefault();
                      openLightbox(currentImageIndex);
                    }
                  }}
                  aria-label={`View full-size menu image ${currentImageIndex + 1}`}
                />

                <button
                  className="carousel-nav prev"
                  onClick={(e) => {
                    e.stopPropagation();
                    navigateCarousel("prev");
                  }}
                  aria-label="Previous image"
                >
                  ‹
                </button>
                <button
                  className="carousel-nav next"
                  onClick={(e) => {
                    e.stopPropagation();
                    navigateCarousel("next");
                  }}
                  aria-label="Next image"
                >
                  ›
                </button>

                <div className="carousel-counter">
                  {currentImageIndex + 1} / {images.length}
                </div>
              </div>

              <div className="carousel-thumbnails">
                {images.map((image, index) => {
                  const isVisible = Math.abs(index - currentImageIndex) <= 2; // Load thumbnails within 2 of current
                  return (
                    <div
                      key={index}
                      data-observe="true"
                      className={`thumbnail ${index === currentImageIndex ? "active" : ""}`}
                      onClick={() => setCurrentImageIndex(index)}
                      role="button"
                      tabIndex={0}
                      onKeyDown={(e) => {
                        if (e.key === "Enter" || e.key === " ") {
                          e.preventDefault();
                          setCurrentImageIndex(index);
                        }
                      }}
                      aria-label={`Go to menu image ${index + 1}`}
                    >
                      <img
                        src={image}
                        alt={`Menu item ${index + 1}`}
                        loading="lazy"
                        onError={(e) => handleImageError(e, index)}
                      />
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      </section>

      <div
        className={`lightbox ${selectedImage !== null ? "active" : ""}`}
        onClick={closeLightbox}
        role="dialog"
        aria-modal="true"
        aria-label="Image gallery lightbox"
      >
        {selectedImage !== null && (
          <div
            ref={lightboxRef}
            className="lightbox-content"
            onClick={(e) => e.stopPropagation()}
            onWheel={handleLightboxWheel}
            onTouchStart={handleLightboxTouchStart}
            onTouchMove={handleLightboxTouchMove}
            style={{
              cursor: lightboxScale > 0.8 ? 'grab' : 'zoom-in'
            }}
          >
            <img
              src={images[selectedImage]}
              srcSet={`${images[selectedImage]} 1x, ${images[selectedImage]} 2x`}
              sizes="90vw"
              alt={`Menu item ${selectedImage + 1}`}
              onError={(e) => handleImageError(e, selectedImage)}
              style={{
                transform: `scale(${lightboxScale})`,
                transition: lightboxScale === 0.8 ? 'none' : 'transform 0.3s ease',
                maxWidth: 'none',
                maxHeight: 'none',
                width: 'auto',
                height: 'auto'
              }}
            />
            <button
              className="lightbox-nav prev"
              onClick={(e) => {
                e.stopPropagation();
                navigateImage("prev");
              }}
              aria-label="Previous image"
            >
              ‹
            </button>
            <button
              className="lightbox-nav next"
              onClick={(e) => {
                e.stopPropagation();
                navigateImage("next");
              }}
              aria-label="Next image"
            >
              ›
            </button>
            {/* Zoom Controls */}
            <div className="lightbox-zoom-controls">
              <button
                className="lightbox-zoom-btn zoom-out"
                onClick={(e) => {
                  e.stopPropagation();
                  handleLightboxZoom(lightboxScale * 0.8);
                }}
                aria-label="Zoom out"
                disabled={lightboxScale <= 0.5}
              >
                −
              </button>
              <span className="zoom-level">
                {Math.round(lightboxScale * 100)}%
              </span>
              <button
                className="lightbox-zoom-btn zoom-in"
                onClick={(e) => {
                  e.stopPropagation();
                  handleLightboxZoom(lightboxScale * 1.25);
                }}
                aria-label="Zoom in"
                disabled={lightboxScale >= 3}
              >
                +
              </button>
            </div>
            
            <button
              className="lightbox-close"
              onClick={(e) => {
                e.stopPropagation();
                closeLightbox();
              }}
              aria-label="Close lightbox"
            >
              ×
            </button>
            <div className="image-counter">
              {selectedImage + 1} / {images.length}
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default MenuImageGallery;
