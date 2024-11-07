import React from 'react';

interface Project {
  title: string;
  description: string;
  technologies: string[];
  imageUrl: string;
}

const projects: Project[] = [
  {
    title: "E-commerce Platform",
    description: "A full-featured online store with cart and payment integration",
    technologies: ["React", "Node.js", "MongoDB"],
    imageUrl: "https://picsum.photos/400/300",
  },
  {
    title: "Task Management App",
    description: "Collaborative project management tool with real-time updates",
    technologies: ["TypeScript", "Express", "PostgreSQL"],
    imageUrl: "https://picsum.photos/400/301",
  },
  {
    title: "Weather Dashboard",
    description: "Real-time weather tracking with interactive maps",
    technologies: ["React", "OpenWeather API", "Leaflet"],
    imageUrl: "https://picsum.photos/400/302",
  },
];

export function Projects() {
  return (
    <section className="py-16 bg-gray-50" id="projects">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold mb-8">Projects</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <div key={index} className="bg-white rounded-lg shadow-md overflow-hidden">
              <img 
                src={project.imageUrl} 
                alt={project.title} 
                className="w-full h-48 object-cover"
              />
              <div className="p-6">
                <h3 className="text-xl font-bold mb-2">{project.title}</h3>
                <p className="text-gray-600 mb-4">{project.description}</p>
                <div className="flex flex-wrap gap-2">
                  {project.technologies.map((tech, techIndex) => (
                    <span 
                      key={techIndex}
                      className="px-3 py-1 bg-gray-100 text-gray-600 rounded-full text-sm"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}