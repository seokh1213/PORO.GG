import React from 'react'

function MainImage({imagePath, alt, title}) {
  return (
      <img title={title} alt={alt} src={imagePath} id="mainImage"/>
      );
}

export default MainImage
