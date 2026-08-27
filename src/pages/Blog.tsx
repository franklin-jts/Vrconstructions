import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const blogPosts = [
  { id: 1, img: 'blog-img-1.jpg', title: 'We Provide 24 Hours Service For Our Clients', date: 'Mar 23, 2025', author: 'Admin', category: 'Repair, Installation', comments: 2, text: 'Eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit.' },
  { id: 2, type: 'slider', imgs: ['blog-img-2.jpg', 'blog-img-3.jpg'], title: 'Quality Construction Materials And Techniques', date: 'Mar 23, 2025', author: 'Admin', category: 'Development', comments: 3, text: 'Our team uses the latest construction materials and techniques to ensure durability and longevity in every project we undertake.' },
  { id: 3, type: 'quote', quote: '"My job is to not be easy on people, my job is to make them better."', author: 'Steve Jobs' },
  { id: 4, img: 'blog-img-1.jpg', title: 'Modern Building Techniques For 2025', date: 'Mar 23, 2025', author: 'Admin', category: 'Technology', comments: 1, text: 'Staying updated with the latest building technologies helps us deliver superior construction solutions that stand the test of time.' },
];

const categories = [
  { name: 'Design', count: 90 },
  { name: 'Development', count: 70 },
  { name: 'Construction', count: 60 },
  { name: 'Marketing', count: 40 },
  { name: 'Engineering', count: 20 },
];

const recentPosts = [
  { img: 'gal-img-3.jpg', title: 'Beritatis et Quasi Architecto Beatae Vitae', date: 'Jan 12, 2025' },
  { img: 'gal-img-2.jpg', title: 'Seritatis et Quasi Architecto Beatae Vitae', date: 'Jan 12, 2025' },
  { img: 'gal-img-3.jpg', title: 'Seritatis et Quasi Architecto Beatae Vitae', date: 'Jan 12, 2025' },
  { img: 'gal-img-2.jpg', title: 'Seritatis et Quasi Architecto Beatae Vitae', date: 'Jan 12, 2025' },
  { img: 'gal-img-4.jpg', title: 'Seritatis et Quasi Architecto Beatae Vitae', date: 'Jan 12, 2025' },
];

const tags = ['Repair', 'Support', 'Construction', 'Strategy', 'Trouble Shooting', 'Mobile Apps', 'Drag & Drop'];

const Blog: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');

  return (
    <>
      {/* Sub Banner */}
      <div className="sub-banner">
        <div className="container">
          <h1>Blog</h1>
          <p className="exo">We have 25 years experience in construction</p>
        </div>
        <ol className="breadcrumb">
          <li><Link to="/">Home</Link></li>
          <li className="active">Blog</li>
        </ol>
      </div>

      {/* Blog */}
      <section className="blog">
        <div className="container">
          <ul className="row">
            {/* Blog Posts */}
            <li style={{ width: '66.666%', padding: '0 15px' }}>
              {blogPosts.map((post) => {
                if (post.type === 'quote') {
                  return (
                    <div key={post.id} className="blog-post post-bg">
                      <i className="fa fa-quote-left"></i>
                      <p className="exo">{post.quote}</p>
                      <a href="#">{post.author}</a>
                    </div>
                  );
                }

                if (post.type === 'slider') {
                  return (
                    <div key={post.id} className="blog-post">
                      <div className="flex-blog">
                        <ul className="slides">
                          {post.imgs?.map((img, i) => (
                            <li key={i}><img src={`/images/${img}`} alt={post.title} /></li>
                          ))}
                        </ul>
                      </div>
                      <span className="date"><i className="fa fa-clock-o"></i> {post.date}</span>
                      <a href="#" className="title-hed">{post.title}</a>
                      <ul className="small-tag">
                        <li><span>By {post.author}</span> / <span>{post.category}</span> / <span>{post.comments} comments</span></li>
                      </ul>
                      <p>{post.text}</p>
                      <a href="#" className="btn">Read More</a>
                    </div>
                  );
                }

                return (
                  <div key={post.id} className="blog-post">
                    <img className="img-responsive" src={`/images/${post.img}`} alt={post.title} />
                    <span className="date"><i className="fa fa-clock-o"></i> {post.date}</span>
                    <a href="#" className="title-hed">{post.title}</a>
                    <ul className="small-tag">
                      <li><span>By {post.author}</span> / <span>{post.category}</span> / <span>{post.comments} comments</span></li>
                    </ul>
                    <p>{post.text}</p>
                    <a href="#" className="btn">Read More</a>
                  </div>
                );
              })}

              {/* Pagination */}
              <ul className="pagination">
                <li className="active"><a href="#">1</a></li>
                <li><a href="#">2</a></li>
                <li><a href="#">3</a></li>
                <li><a href="#"><i className="fa fa-angle-double-right"></i></a></li>
              </ul>
            </li>

            {/* Sidebar */}
            <li style={{ width: '33.333%', padding: '0 15px' }}>
              <div className="blog-side-bar">
                {/* Search */}
                <div className="search">
                  <div className="form-group" style={{ display: 'flex' }}>
                    <input
                      type="search"
                      className="input"
                      placeholder="Search.."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      style={{ flex: 1, padding: '10px 15px', border: '1px solid #eee', borderRadius: '3px 0 0 3px' }}
                    />
                    <button className="sea-icon" style={{ padding: '10px 15px', background: '#e8b730', color: '#fff', border: 'none', cursor: 'pointer' }}>
                      <i className="fa fa-search"></i>
                    </button>
                  </div>
                </div>

                {/* Categories */}
                <h5>Blog Categories</h5>
                <ul className="cate-sim">
                  {categories.map((cat) => (
                    <li key={cat.name}>
                      <a href="#">{cat.name} <span>({cat.count})</span></a>
                    </li>
                  ))}
                </ul>

                {/* Text Widget */}
                <h5 style={{ marginTop: '25px' }}>Text Widget</h5>
                <p>Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt.</p>

                {/* Recent Posts */}
                <h5 style={{ marginTop: '25px' }}>Recent Posts</h5>
                <div className="tw-widgets">
                  <ul>
                    {recentPosts.map((post, idx) => (
                      <li key={idx}>
                        <ul className="wid-in">
                          <li>
                            <a href="#"><img className="img-responsive" src={`/images/${post.img}`} alt={post.title}></img></a>
                          </li>
                          <li>
                            <div className="img-side"></div>
                            <a href="#">{post.title}</a>
                            <span><i className="fa fa-calendar"></i> {post.date}</span>
                          </li>
                        </ul>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Tags */}
                <h5 style={{ marginTop: '25px' }}>Tags</h5>
                <ul className="tags">
                  {tags.map((tag) => (
                    <li key={tag}><a href="#">{tag}</a></li>
                  ))}
                </ul>

                {/* Flickr Stream */}
                <h5 style={{ marginTop: '25px' }}>Flickr Stream</h5>
                <ul className="row" style={{ display: 'flex', flexWrap: 'wrap', gap: '5px' }}>
                  {['gal-img-1.jpg', 'gal-img-2.jpg', 'gal-img-3.jpg', 'gal-img-4.jpg', 'gal-img-5.jpg', 'gal-img-6.jpg'].map((img, idx) => (
                    <li key={idx} style={{ width: 'calc(33.333% - 4px)' }}>
                      <a href="#"><img className="img-responsive" src={`/images/${img}`} alt="" style={{ borderRadius: '3px' }} /></a>
                    </li>
                  ))}
                </ul>
              </div>
            </li>
          </ul>
        </div>
      </section>
    </>
  );
};

export default Blog;
