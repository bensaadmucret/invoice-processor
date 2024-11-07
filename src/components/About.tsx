import React from 'react';

export function About() {
  return (
    <section className="py-16 bg-white" id="about">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold mb-8">About Me</h2>
        <div className="max-w-2xl">
          <p className="text-gray-600 mb-4">
            I'm a passionate full-stack developer with 5 years of experience building web applications.
            I specialize in React, Node.js, and TypeScript, creating scalable and maintainable solutions.
          </p>
          <p className="text-gray-600">
            When I'm not coding, you can find me contributing to open-source projects
            and writing technical articles on my blog.
          </p>
        </div>
      </div>
    </section>
  );
}