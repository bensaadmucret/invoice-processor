import React from 'react';

export function Header() {
  return (
    <header className="bg-gray-900 text-white py-6">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold">John Doe</h1>
        <p className="text-xl mt-2 text-gray-300">Full Stack Developer</p>
      </div>
    </header>
  );
}