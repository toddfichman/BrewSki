import React, { Component } from 'react';
import './Footer.css';

export default class Footer extends Component {
  render() {
    return (
      <div>
        <footer className="footer">
            <div className="footer-container">
                <span className="text-muted">Built by <a href="https://www.linkedin.com/in/todd-fichman-438a4016b/" className="name-link">Todd Fichman</a></span>
            </div>
        </footer>
      </div>
    )
  }
}
