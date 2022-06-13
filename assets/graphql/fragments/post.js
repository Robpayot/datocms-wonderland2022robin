export default `
id
title
slug
publicationDate: _firstPublishedAt
excerpt
coverImage {
  responsiveImage(imgixParams: { fit: crop, ar: "16:9", w: 860 }) {
    ...imageFields
  }
}
author {
  name
  picture {
    responsiveImage(imgixParams: { fit: crop, ar: "1:1", w: 40 }) {
      ...imageFields
    }
  }
}`
