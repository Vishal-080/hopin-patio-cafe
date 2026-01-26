import React, { useState } from 'react'
import { FiX, FiChevronLeft, FiChevronRight } from 'react-icons/fi'

const Gallery = () => {
  const [lightboxOpen, setLightboxOpen] = useState(false)
  const [selectedImage, setSelectedImage] = useState(0)

  const images = [
    {
      url: 'public/images/hopin_front.jpg',
      alt: 'Evening ambiance',
    },
    {
      url: 'public/images/hopin_outer.jpg',
      alt: 'Cafe exterior with patio seating',
    },
    {
      url: 'public/images/hopin_outer3.jpg',
      alt: 'Cafe exterior with patio seating',
    },
    {
      url: 'public/images/hopin_food4.jpg',
      alt: 'Food preparation',
    },
    {
      url: 'public/images/hopin_interior1.jpg',
      alt: 'Interior dining area',
    },
    {
      url: 'public/images/hopin_interior2.jpg',
      alt: 'Interior dining area',
    },
    {
      url: 'public/images/hopin_food1.jpg',
      alt: 'Food preparation',
    },
    {
      url: 'public/images/hopin_food2.jpg',
      alt: 'Food preparation',
    },
    {
      url: 'public/images/hopin_food5.jpg',
      alt: 'Food preparation',
    },
    {
      url: 'public/images/hopin_outer2.jpg',
      alt: 'Patio seating area',
    },
    {
      url: 'public/images/hopin_outer3.jpg',
      alt: 'Patio seating area',
    },
    {
      url: 'public/images/hopin_food2.jpg',
      alt: 'Yum display',
    }
  ]

  const openLightbox = (index) => {
    setSelectedImage(index)
    setLightboxOpen(true)
    document.body.style.overflow = 'hidden'
  }

  const closeLightbox = () => {
    setLightboxOpen(false)
    document.body.style.overflow = 'unset'
  }

  const nextImage = () => {
    setSelectedImage((prev) => (prev + 1) % images.length)
  }

  const prevImage = () => {
    setSelectedImage((prev) => (prev - 1 + images.length) % images.length)
  }

  return (
    <>
      <section id="gallery" className="py-20 md:py-32 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="text-center mb-16">
            <span className="text-cafe-gold text-sm uppercase tracking-wider font-medium">
              Gallery
            </span>
            <h2 className="text-4xl md:text-5xl font-serif font-bold text-cafe-dark mt-4 mb-6">
              Experience Our Ambiance
            </h2>
            <div className="w-20 h-1 bg-cafe-teal mx-auto mb-6"></div>
            <p className="text-lg text-cafe-dark/70 max-w-2xl mx-auto">
              Step into our world of luxury and elegance. Every corner of HOPIN PATIO Cafe
              is designed to create unforgettable moments.
            </p>
          </div>

          {/* Image Grid */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {images.map((image, index) => (
              <div
                key={index}
                className="relative group cursor-pointer overflow-hidden rounded-lg aspect-square"
                onClick={() => openLightbox(index)}
              >
                <img
                  src={image.url}
                  alt={image.alt}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-all duration-300 flex items-center justify-center">
                  <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full text-white font-medium">
                      View Full Size
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Lightbox */}
      {lightboxOpen && (
        <div
          className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center p-4"
          onClick={closeLightbox}
        >
          <button
            onClick={closeLightbox}
            className="absolute top-4 right-4 text-white hover:text-cafe-teal transition-colors duration-300 z-10"
            aria-label="Close lightbox"
          >
            <FiX size={32} />
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation()
              prevImage()
            }}
            className="absolute left-4 text-white hover:text-cafe-teal transition-colors duration-300 z-10"
            aria-label="Previous image"
          >
            <FiChevronLeft size={40} />
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation()
              nextImage()
            }}
            className="absolute right-4 text-white hover:text-cafe-teal transition-colors duration-300 z-10"
            aria-label="Next image"
          >
            <FiChevronRight size={40} />
          </button>
          <div
            className="max-w-6xl max-h-[90vh]"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={images[selectedImage].url}
              alt={images[selectedImage].alt}
              className="max-w-full max-h-[90vh] object-contain rounded-lg"
            />
            <p className="text-white text-center mt-4">{images[selectedImage].alt}</p>
            <p className="text-white/70 text-center text-sm mt-2">
              {selectedImage + 1} / {images.length}
            </p>
          </div>
        </div>
      )}
    </>
  )
}

export default Gallery
