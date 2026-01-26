import React, { useState } from 'react'
import { FiX, FiGift } from 'react-icons/fi'

const NotificationBar = () => {
  const [isVisible, setIsVisible] = useState(true)

  if (!isVisible) return null

  return (
    <div className="fixed top-0 left-0 right-0 z-[60] bg-primary text-white py-3 px-4 shadow-lg">
      <div className="max-w-7xl mx-auto flex items-center justify-center gap-4 relative">
        <FiGift className="text-white" size={20} />
        <p className="text-sm md:text-base font-medium text-center">
          <span className="font-bold">Limited Time:</span> Book your table today and enjoy{' '}
          <span className="font-bold">10% off</span> your first visit!
        </p>
        <button
          onClick={() => setIsVisible(false)}
          className="absolute right-0 text-cafe-dark/70 hover:text-cafe-dark transition-colors duration-300"
          aria-label="Close notification"
        >
          <FiX size={20} />
        </button>
      </div>
    </div>
  )
}

export default NotificationBar
