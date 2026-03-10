import React from 'react';

const About = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 py-20 text-center">
      <p className="text-[#D4AF37] text-xs uppercase tracking-[0.4em] mb-4">Our Story</p>
      <h1 className="text-4xl font-serif text-[#001F3F] mb-10">Crafting Excellence</h1>
      <div className="space-y-6 text-slate-600 leading-relaxed text-lg">
        <p>
          Founded in 2026, LUXECART began with a simple mission: to provide high-quality, 
          timeless fashion pieces that don't follow trends, but set them.
        </p>
        <p>
          Every item in our collection is hand-picked for its craftsmanship and 
          durability, ensuring that your style remains as sharp as your ambition.
        </p>
      </div>
    </div>
  );
};

export default About;