import React from 'react';

export function Navigation() {
  return (
    <nav className="bg-gray-900 text-white py-4 sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center">
          <a href="#" className="text-xl font-bold">Portfolio</a>
          <div className="space-x-6">
            <a href="#about" className="hover:text-blue-400 transition-colors">About</a>
            <a href="#projects" className="hover:text-blue-400 transition-colors">Projects</a>
            <a href="#contact" className="hover:text-blue-400 transition-colors">Contact</a>
          </div>
        </div>
      </div>
    </nav>
  );
}