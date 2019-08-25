import React from 'react';
import LazyLoad from 'vanilla-lazyload';
import lazyloadConfig from './lazyload';

// Only initialize it one time for the entire application
if (!document.lazyLoadInstance) {
  document.lazyLoadInstance = new LazyLoad(lazyloadConfig);
}

export class LazyImage extends React.Component {
  // Update lazyLoad after first rendering of every image
  componentDidMount() {
    document.lazyLoadInstance.update();
  }

  // Update lazyLoad after rerendering of every image
  componentDidUpdate() {
    document.lazyLoadInstance.update();
  }

  // Just render the image with data-src
  render() {
    const {
      alt,
      classes,
      src,
      srcset,
      sizes,
      width,
      height,
      testName,
    } = this.props;
    return (
      <img
        alt={alt}
        className={`lazy, ${classes}`}
        data-src={src}
        data-srcset={srcset}
        data-sizes={sizes}
        width={width}
        height={height}
        data-testid={`${testName}`}
      />
    );
  }
}

export default LazyImage;
