import React from 'react'
import { FiCoffee, FiHeart, FiUsers } from 'react-icons/fi'

const About = () => {
  const features = [
    {
      icon: <FiCoffee size={40} />,
      title: 'Premium Coffee',
      description: 'Sourced from the finest coffee regions, expertly roasted to perfection.',
    },
    {
      icon: <FiHeart size={40} />,
      title: 'Crafted with Love',
      description: 'Every cup is prepared with passion and attention to detail.',
    },
    {
      icon: <FiUsers size={40} />,
      title: 'Community Hub',
      description: 'A welcoming space where friends gather and memories are made.',
    },
  ]

  return (
    <section id="about" className="py-20 md:py-32 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Hero Story Section */}
        <div className="text-center mb-20">
          <span className="text-primary text-sm uppercase tracking-wider font-medium">
            Our Story
          </span>
          <h2 className="text-4xl md:text-6xl font-serif font-bold bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent mt-4 mb-6">
            A Legacy of Excellence
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-primary via-secondary to-accent mx-auto mb-8"></div>
          <div className="max-w-4xl mx-auto">
            <p className="text-xl text-neutral-dark/80 mb-8 leading-relaxed">
              HOPIN PATIO Cafe was born from a simple dream: to create a sanctuary
              where coffee lovers can escape the ordinary and indulge in the extraordinary.
              Our patio setting offers a unique blend of indoor comfort and outdoor serenity.
            </p>
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <p className="text-lg text-neutral-dark/80 mb-6 leading-relaxed">
                  We believe that great coffee is more than just a beverage—it's an experience.
                  From the moment you step into our space, you're welcomed into a world of
                  refined taste, warm hospitality, and moments of pure bliss.
                </p>
                <p className="text-lg text-neutral-dark/80 leading-relaxed">
                  Every detail, from our carefully selected beans to our elegant presentation,
                  reflects our commitment to providing you with nothing less than perfection.
                </p>
              </div>
              <div className="relative">
                <div className="absolute -inset-6 bg-gradient-to-r from-primary/20 via-secondary/20 to-accent/20 rounded-2xl transform rotate-2"></div>
                <img
                  src="https://images.unsplash.com/photo-1442512595331-e89e73853f31?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                  alt="Cafe interior"
                  className="relative rounded-2xl shadow-2xl w-full h-[300px] object-cover"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Features */}
        <div className="grid md:grid-cols-3 gap-8 lg:gap-12 mb-20">
          {features.map((feature, index) => (
            <div
              key={index}
              className="text-center p-8 glass-morphism rounded-2xl hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-3 hover:scale-105 group border border-white/20"
            >
              <div className="text-primary mb-6 flex justify-center group-hover:scale-110 transition-transform duration-300">
                {feature.icon}
              </div>
              <h3 className="text-2xl font-serif font-semibold text-neutral-dark mb-4 group-hover:text-primary transition-colors duration-300">
                {feature.title}
              </h3>
              <p className="text-neutral-dark/70 leading-relaxed group-hover:text-neutral-dark transition-colors duration-300">
                {feature.description}
              </p>
            </div>
          ))}
        </div>



        {/* Photo Gallery Preview */}
        <div className="text-center mb-12">
          <span className="text-primary text-sm uppercase tracking-wider font-medium">
            Our Space
          </span>
          <h3 className="text-3xl font-serif font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent mt-4 mb-8">
            A Visual Journey
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              'https://images.unsplash.com/photo-1501339847302-ac426a4c7c6f?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
              'https://images.unsplash.com/photo-1442512595331-e89e73853f31?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
              'https://images.unsplash.com/photo-1509042239860-f550ce710b93?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
              'https://images.unsplash.com/photo-1511920170033-83939cdc2da7?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
            ].map((url, index) => (
              <div
                key={index}
                className="relative aspect-square rounded-lg overflow-hidden group cursor-pointer shine-effect"
                onClick={() => {
                  const gallery = document.querySelector('#gallery')
                  if (gallery) {
                    gallery.scrollIntoView({ behavior: 'smooth' })
                  }
                }}
              >
                <img
                  src={url}
                  alt={`Cafe view ${index + 1}`}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300"></div>
              </div>
            ))}
          </div>
          <a
            href="#gallery"
            className="inline-block mt-8 text-cafe-teal hover:text-cafe-brown font-semibold transition-colors duration-300"
          >
            View Full Gallery →
          </a>
        </div>

        {/* Team Highlights */}
        <div className="bg-gradient-to-br from-neutral/50 via-primary/5 to-secondary/5 rounded-3xl p-12">
          <div className="text-center mb-12">
            <span className="text-primary text-sm uppercase tracking-wider font-medium">
              Our Team
            </span>
            <h3 className="text-3xl md:text-4xl font-serif font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent mt-4 mb-8">
              Meet the Experts
            </h3>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                name: 'Master Barista',
                role: 'Coffee Artisan',
                description: '15+ years of experience crafting the perfect cup',
                icon: <FiCoffee size={32} />,
              },
              {
                name: 'Head Pastry Chef',
                role: 'Culinary Artist',
                description: 'Award-winning pastry creations that delight the senses',
                icon: <FiHeart size={32} />,
              },
              {
                name: 'Hospitality Director',
                role: 'Guest Experience',
                description: 'Ensuring every visit is an exceptional experience',
                icon: <FiUsers size={32} />,
              },
            ].map((member, index) => (
              <div
                key={index}
                className="text-center p-8 glass-morphism rounded-2xl hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-3 hover:scale-105 group border border-white/20"
              >
                <div className="w-20 h-20 bg-gradient-to-r from-primary/20 to-secondary/20 rounded-full mx-auto mb-6 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <div className="text-primary">
                    {member.icon}
                  </div>
                </div>
                <h4 className="text-xl font-serif font-semibold text-neutral-dark mb-2 group-hover:text-primary transition-colors duration-300">
                  {member.name}
                </h4>
                <p className="text-secondary font-medium mb-4 group-hover:text-primary transition-colors duration-300">{member.role}</p>
                <p className="text-neutral-dark/70 text-sm group-hover:text-neutral-dark transition-colors duration-300">{member.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default About
