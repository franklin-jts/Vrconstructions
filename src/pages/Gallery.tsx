import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const galleryItems = [
  { img: 'gal-img-1.jpg', categories: ['instal', 'remod', 'inspec', 'other'], category: 'Installation', title: 'Modern Villa' },
  { img: 'gal-img-2.jpg', categories: ['plumb', 'instal', 'inspec', 'other'], category: 'Repair', title: 'Commercial Complex' },
  { img: 'gal-img-3.jpg', categories: ['plumb', 'inspec', 'other'], category: 'Inspection', title: 'Bridge Project' },
  { img: 'gal-img-4.jpg', categories: ['plumb', 'instal'], category: 'Repair', title: 'Industrial Facility' },
  { img: 'gal-img-5.jpg', categories: ['instal', 'remod', 'other'], category: 'Remodeling', title: 'Office Renovation' },
  { img: 'gal-img-6.jpg', categories: ['plumb', 'instal', 'inspec', 'other'], category: 'Installation', title: 'Warehouse' },
  { img: 'gal-img-7.jpg', categories: ['plumb', 'remod', 'inspec'], category: 'Repair', title: 'High Rise Building' },
  { img: 'gal-img-8.jpg', categories: ['plumb', 'instal', 'remod', 'other'], category: 'Installation', title: 'Shopping Mall' },
  { img: 'gal-img-9.jpg', categories: ['plumb', 'inspec', 'other'], category: 'Inspection', title: 'Public Infrastructure' },
];

const filters = [
  { label: 'All', value: '*' },
  { label: 'Construction Repair', value: 'plumb' },
  { label: 'Installation', value: 'instal' },
  { label: 'Remodeling', value: 'remod' },
  { label: 'Inspection', value: 'inspec' },
  { label: 'Others', value: 'other' },
];

const Gallery: React.FC = () => {
  const [activeFilter, setActiveFilter] = useState('*');
  const filteredItems = activeFilter === '*' ? galleryItems : galleryItems.filter(item => item.categories.includes(activeFilter));

  return (
    <>
      <div className="sub-banner">
        <div className="container">
          <h1>Gallery</h1>
          <p>We have 25 years experience in construction</p>
        </div>
        <ol className="breadcrumb">
          <li><Link to="/">Home</Link></li>
          <li className="active">Gallery</li>
        </ol>
      </div>

      <section className="section" style={{ background: 'var(--c-bg)' }}>
        <div className="container">
          <div className="gallery-filters">
            {filters.map((f) => (
              <button
                key={f.value}
                className={`filter-btn ${activeFilter === f.value ? 'active' : ''}`}
                onClick={() => setActiveFilter(f.value)}
              >
                {f.label}
              </button>
            ))}
          </div>
          <div className="gallery-grid">
            {filteredItems.map((item, idx) => (
              <div key={idx} className="gallery-item-dark">
                <img src={`/images/${item.img}`} alt={item.title} />
                <div className="gallery-overlay">
                  <div className="gallery-overlay-content">
                    <span className="gallery-cat">{item.category}</span>
                    <h5>{item.title}</h5>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default Gallery;
