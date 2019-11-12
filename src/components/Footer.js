import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTwitter, faGithub, faInstagram } from '@fortawesome/free-brands-svg-icons'
import { rhythm } from '../utils/typography';
import "./footer.css";

class Footer extends React.Component {
  render() {
    return (
      <footer
        style={{
          marginTop: rhythm(2.5),
          paddingTop: rhythm(1),
          color: "#777"
        }}
      >
        <div style={{ float: 'right' }}>
          <a style={{color: "#00c918"}} href="/contact" >
            contact
          </a>
        </div>
        <a
          className="iconLinks"
          href="https://mobile.twitter.com/penguindevs"
          target="_blank"
          rel="noopener noreferrer"
        ><FontAwesomeIcon icon={faTwitter} />
        </a>{' '}
        &bull;{' '}
        <a
          className="iconLinks"
          href="https://github.com/CallumHemsley"
          target="_blank"
          rel="noopener noreferrer"
        >
          <FontAwesomeIcon icon={faGithub} />
        </a>{' '}
        &bull;{' '}
        <a
          className="iconLinks"
          href="https://instagram.com/penguindevs"
          target="_blank"
          rel="noopener noreferrer"
        >
          <FontAwesomeIcon icon={faInstagram} />
        </a>
      </footer>
    );
  }
}

export default Footer;