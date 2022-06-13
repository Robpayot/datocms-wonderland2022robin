import { gql, imageFields, seoMetaTagsFields } from '~/lib/datocms'
import post from './fragments/post'

const graphQuery = gql`
  {
    site: _site {
      favicon: faviconMetaTags {
        ...seoMetaTagsFields
      }
    }

    posts: allPosts(first: 10, orderBy: _firstPublishedAt_DESC) {
      ${post}
    }
  }

  ${imageFields}
  ${seoMetaTagsFields}
`

export default graphQuery
