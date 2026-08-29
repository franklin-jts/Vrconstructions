import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const blogPosts = [
  { id: 1, img: 'blog-img-1.jpg', title: 'We Provide 24 Hours Service For Our Clients', date: 'Mar 23, 2025', author: 'Admin', category: 'Repair, Installation', comments: 2, text: 'Eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.' },
  { id: 2, type: 'quote', quote: '"My job is to not be easy on people, my job is to make them better."', author: 'Steve Jobs' },
  { id: 3, img: 'blog-img-2.jpg', title: 'Quality Construction Materials And Techniques', date: 'Mar 20, 2025', author: 'Admin', category: 'Development', comments: 3, text: 'Our team uses the latest construction materials and techniques to ensure durability.' },
  { id: 4, img: 'blog-img-3.jpg', title: 'Modern Building Techniques For 2025', date: 'Mar 15, 2025', author: 'Admin', category: 'Technology', comments: 1, text: 'Staying updated with the latest building technologies helps us deliver superior solutions.' },
];

const categories = [
  { name: 'Design', count: 90 }, { name: 'Development', count: 70 },
  { name: 'Construction', count: 60 }, { name: 'Marketing', count: 40 },
];

const recentPosts = [
  { img: 'gal-img-3.jpg', title: 'Beritatis et Quasi Architecto Beatae Vitae', date: 'Jan 12, 2025' },
  { img: 'gal-img-2.jpg', title: 'Seritatis et Quasi Architecto Beatae Vitae', date: 'Jan 10, 2025' },
  { img: 'gal-img-4.jpg', title: 'Seritatis et Quasi Architecto Beatae Vitae', date: 'Jan 8, 2025' },
];

const tags = ['Repair', 'Support', 'Construction', 'Strategy', 'Engineering', 'Design'];

const Blog: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');

  return (
    <>
      <div className="sub-banner">
        <div className="container">
          <h1>Blog</h1>
          <p>We have 25 years experience in construction</p>
        </div>
        <ol className="breadcrumb">
          <li><Link to="/">Home</Link></li>
          <li className="active">Blog</li>
        </ol>
      </div>

      <section className="section" style={{ background: 'var(--c-bg)' }}>
        <div className="container">
          <div className="row">
            <div style={{ width: '66.666%', padding: '0 15px' }}>
              {blogPosts.map((post) => {
                if (post.type === 'quote') {
                  return (
                    <div key={post.id} className="blog-post" style={{ background: 'var(--c-accent)', textAlign: 'center' }}>
                      <i className="fa fa-quote-left" style={{ fontSize: '30px', color: 'var(--c-bg)', marginBottom: '15px', display: 'block' }}></i>
                      <p style={{ color: 'var(--c-bg)', fontSize: '18px', fontWeight: 600, marginBottom: '10px' }}>{post.quote}</p>
                      <a href="#" style={{ color: 'var(--c-bg)', fontWeight: 600 }}>{post.author}</a>
                    </div>
                  );
                }
                return (
                  <div key={post.id} className="blog-post">
                    <img src={`/images/${post.img}`} alt={post.title} />
                    <span className="date"><i className="fa fa-clock-o"></i> {post.date}</span>
                    <a href="#" className="title-hed">{post.title}</a>
                    <ul style={{ display: 'flex', gap: '5px', marginBottom: '15px' }}>
                      <li style={{ fontSize: '12px', color: 'var(--c-text-muted)' }}>By {post.author} / {post.category} / {post.comments} comments</li>
                    </ul>
                    <p>{post.text}</p>
                    <a href="#" className="btn btn-primary" style={{ border: 'none' }}>Read More</a>
                  </div>
                );
              })}
              <ul className="pagination">
                <li className="active"><a href="#">1</a></li>
                <li><a href="#">2</a></li>
                <li><a href="#">3</a></li>
              </ul>
            </div>
            <div style={{ width: '33.333%', padding: '0 15px' }}>
              <div className="blog-side-bar">
                <div className="search">
                  <div className="form-group">
                    <input type="search" placeholder="Search..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
                    <button className="sea-icon"><i className="fa fa-search"></i></button>
                  </div>
                </div>
                <h5>Categories</h5>
                <ul className="cate-sim">
                  {categories.map((cat) => (
                    <li key={cat.name}><a href="#">{cat.name} <span>({cat.count})</span></a></li>
                  ))}
                </ul>
                <h5 style={{ marginTop: '25px' }}>Recent Posts</h5>
                <div className="tw-widgets">
                  <ul>
                    {recentPosts.map((post, idx) => (
                      <li key={idx}>
                        <ul className="wid-in">
                          <li><a href="#"><img src={`/images/${post.img}`} alt={post.title} /></a></li>
                          <li>
                            <a href="#">{post.title}</a>
                            <span><i className="fa fa-calendar"></i> {post.date}</span>
                          </li>
                        </ul>
                      </li>
                    ))}
                  </ul>
                </div>
                <h5 style={{ marginTop: '25px' }}>Tags</h5>
                <ul className="tags">
                  {tags.map((tag) => (<li key={tag}><a href="#">{tag}</a></li>))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Blog;
