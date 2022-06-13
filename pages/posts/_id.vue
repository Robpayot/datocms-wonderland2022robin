<template>
  <section class="hero">
    <div class="hero-body">
      <div class="container">
        <div class="columns">
          <div class="column is-8 is-offset-2">
            <figure class="image">
              <datocms-image :data="post.coverImage.responsiveImage" />
            </figure>
          </div>
        </div>

        <section class="section">
          <div class="columns">
            <div class="column is-8 is-offset-2">
              <div class="content is-medium">
                <h2 class="subtitle is-4">
                  {{ formatDate(post.publicationDate) }}
                </h2>
                <h1 class="title">
                  <nuxt-link :to="`/posts/${post.slug}`">{{
                    post.title
                  }}</nuxt-link>
                </h1>
                <datocms-structured-text
                  :data="post.content"
                  :renderBlock="renderBlock"
                />
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  </section>
</template>

<script>
import { request } from '~/lib/datocms'
import { toHead } from 'vue-datocms'
import format from 'date-fns/format'
import parseISO from 'date-fns/parseISO'
import Vue from 'vue'
import Component from 'vue-class-component'
import QUERY from '~/assets/graphql/postPage'

@Component({
  async asyncData({ params }) {
    const data = await request({
      query: QUERY,
      variables: {
        slug: params.id
      }
    })

    return { ready: !!data, ...data }
  }
})
export default class PostPage extends Vue {
  formatDate(date) {
    return format(parseISO(date), 'PPP')
  }

  renderBlock = ({ record, h }) => {
    if (record.__typename === 'ImageBlockRecord') {
      return h('div', { class: 'mb-5' }, [
        h('datocms-image', { props: { data: record.image.responsiveImage } })
      ])
    }

    return h('div', {}, [
      h('p', {}, "Don't know how to render a block!"),
      h('pre', {}, JSON.stringify(record, null, 2))
    ])
  }

  head() {
    if (!this.ready) {
      return
    }

    return toHead(this.post.seo, this.site.favicon)
  }
}
</script>
