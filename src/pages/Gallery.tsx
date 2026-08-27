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

  const filteredItems = activeFilter === '*'
    ? galleryItems
    : galleryItems.filter(item => item.categories.includes(activeFilter));

  return (
    <>
      {/* Sub Banner */}
      <div className="sub-banner">
        <div className="container">
          <h1>Gallery</h1>
          <p className="exo">We have 25 years experience in construction</p>
        </div>
        <ol className="breadcrumb">
          <li><Link to="/">Home</Link></li>
          <li className="active">Gallery</li>
        </ol>
      </div>

      {/* Portfolio */}
      <section id="portfolio">
        <div className="portfolio portfolio-filter" style={{ padding: '80px 0' }}>
          <div className="portfolio-wrapper" style={{ padding: '0 15px' }}>
            <div className="container">
              <div className="nav-icon"><i className="fa fa-navicon"></i></div>

              {/* Filter */}
              <ul className="filter" style={{ display: 'flex', gap: '5px', justifyContent: 'center', marginBottom: '40px', flexWrap: 'wrap' }}>
                {filters.map((f, idx) => (
                  <li key={f.value}>
                    <a
                      className={activeFilter === f.value ? 'active' : ''}
                      onClick={() => setActiveFilter(f.value)}
                      style={{
                        cursor: 'pointer',
                        padding: '8px 20px',
                        background: activeFilter === f.value ? '#e8b730' : '#f5f5f5',
                        color: activeFilter === f.value ? '#fff' : '#666',
                        borderRadius: '3px',
                        fontFamily: "'Exo 2', sans-serif",
                        fontSize: '12px',
                        fontWeight: 600,
                        textTransform: 'uppercase',
                        transition: 'all 0.3s',
                      }}
                    >
                      {f.label}
                    </a>
                    {idx < filters.length - 1 ? ' / ' : ''}
                  </li>
                ))}
              </ul>

              {/* Items */}
              <ul className="items" style={{ display: 'flex', flexWrap: 'wrap', gap: '0' }}>
                {filteredItems.map((item, idx) => (
                  <li key={idx} style={{ width: '33.333%', padding: '5px' }}>
                    <div className="gal-item">
                      <img src={`/images/${item.img}`} alt={item.title} />
                      <div className="gallery-over">
                        <Link to="/gallery" className="link-up link">
                          <i className="fa fa-long-arrow-right"></i>
                        </Link>
                        <div className="items-text">
                          <p>{item.category}</p>
                          <h5>{item.title}</h5>
                        </div>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Gallery;
