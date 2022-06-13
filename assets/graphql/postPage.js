import { gql, imageFields, seoMetaTagsFields } from '~/lib/datocms'
import post from './fragments/post'

const graphQuery = gql`
  query BlogPostQuery($slug: String!) {
    site: _site {
      favicon: faviconMetaTags {
        ...seoMetaTagsFields
      }
    }

    post(filter: { slug: { eq: $slug } }) {
      seo: _seoMetaTags {
        ...seoMetaTagsFields
      }
      id
      title
      slug
      publicationDate: _firstPublishedAt
      content {
        value
        blocks {
          __typename
          ... on ImageBlockRecord {
            id
            image {
              responsiveImage(
                imgixParams: { fm: jpg, fit: crop, w: 2000, h: 1000 }
              ) {
                ...imageFields
              }
            }
          }
        }
      }
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
      }
    }
  }

  ${imageFields}
  ${seoMetaTagsFields}
`

export default graphQuery
