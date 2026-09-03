import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

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
  const pageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!pageRef.current) return;
    const reveals = pageRef.current.querySelectorAll('.gsap-reveal');
    reveals.forEach((el) => {
      gsap.fromTo(el,
        { opacity: 0, y: 40 },
        {
          opacity: 1, y: 0, duration: 0.8, ease: 'power3.out',
          scrollTrigger: { trigger: el, start: 'top 88%', toggleActions: 'play none none none' },
        }
      );
    });
    return () => { ScrollTrigger.getAll().forEach((t) => t.kill()); };
  }, []);

  return (
    <div ref={pageRef}>
      {/* Sub Banner */}
      <div className="sub-banner">
        <div className="container">
          <h1>Blog</h1>
          <p>Latest news, insights, and construction tips from our team</p>
        </div>
        <ol className="breadcrumb">
          <li><Link to="/">Home</Link></li>
          <li className="active">Blog</li>
        </ol>
      </div>

      {/* Blog Content */}
      <section className="blog-page-section">
        <div className="container">
          <div className="blog-page-grid">

            {/* Main Content */}
            <div className="blog-main">
              {blogPosts.map((post) => {
                if (post.type === 'quote') {
                  return (
                    <div key={post.id} className="blog-quote-card">
                      <i className="fa fa-quote-left"></i>
                      <p>{post.quote}</p>
                      <span>— {post.author}</span>
                    </div>
                  );
                }
                return (
                  <div key={post.id} className="blog-post-card">
                    <div className="blog-post-img">
                      <img src={`/images/${post.img}`} alt={post.title} />
                      <span className="blog-post-date">{post.date}</span>
                    </div>
                    <div className="blog-post-content">
                      <div className="blog-post-meta">
                        <span><i className="fa fa-user"></i> {post.author}</span>
                        <span><i className="fa fa-folder"></i> {post.category}</span>
                        <span><i className="fa fa-comments"></i> {post.comments} comments</span>
                      </div>
                      <h3><a href="#">{post.title}</a></h3>
                      <p>{post.text}</p>
                      <a href="#" className="blog-read-more">Read More <i className="fa fa-arrow-right"></i></a>
                    </div>
                  </div>
                );
              })}

              {/* Pagination */}
              <div className="blog-pagination">
                <a href="#" className="blog-page-btn active">1</a>
                <a href="#" className="blog-page-btn">2</a>
                <a href="#" className="blog-page-btn">3</a>
                <a href="#" className="blog-page-btn next"><i className="fa fa-arrow-right"></i></a>
              </div>
            </div>

            {/* Sidebar */}
            <div className="blog-sidebar">
              {/* Search */}
              <div className="blog-widget">
                <h5>Search</h5>
                <div className="blog-search">
                  <input type="search" placeholder="Search articles..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
                  <button><i className="fa fa-search"></i></button>
                </div>
              </div>

              {/* Categories */}
              <div className="blog-widget">
                <h5>Categories</h5>
                <ul className="blog-categories">
                  {categories.map((cat) => (
                    <li key={cat.name}>
                      <a href="#"><span>{cat.name}</span><span className="blog-cat-count">{cat.count}</span></a>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Recent Posts */}
              <div className="blog-widget">
                <h5>Recent Posts</h5>
                <div className="blog-recent-posts">
                  {recentPosts.map((post, idx) => (
                    <a key={idx} href="#" className="blog-recent-item">
                      <img src={`/images/${post.img}`} alt={post.title} />
                      <div>
                        <span className="blog-recent-title">{post.title}</span>
                        <span className="blog-recent-date"><i className="fa fa-calendar"></i> {post.date}</span>
                      </div>
                    </a>
                  ))}
                </div>
              </div>

              {/* Tags */}
              <div className="blog-widget">
                <h5>Tags</h5>
                <div className="blog-tags">
                  {tags.map((tag) => (
                    <a key={tag} href="#" className="blog-tag">{tag}</a>
                  ))}
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>
    </div>
  );
};

export default Blog;
