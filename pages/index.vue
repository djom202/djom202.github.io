<template>
  <!-- ======= Mobile nav toggle button ======= -->
  <i class="bi bi-list mobile-nav-toggle d-xl-none"></i>

  <StoryblokComponent v-if="leftbar" :blok="leftbar.content" />
  <StoryblokComponent v-if="hero" :blok="hero.content" />

  <main id="main">
    <StoryblokComponent v-if="about" :blok="about.content" />
    <!-- <StoryblokComponent v-if="facts" :blok="facts.content" /> -->
    <StoryblokComponent v-if="skills" :blok="skills.content" />
    <StoryblokComponent v-if="resume" :blok="resume.content" />
    <StoryblokComponent v-if="portfolio" :blok="portfolio.content" />
    <StoryblokComponent v-if="services" :blok="services.content" />
    <!-- <StoryblokComponent v-if="testimonials" :blok="testimonials.content" /> -->
    <StoryblokComponent v-if="contact" :blok="contact.content" />
  </main>

  <!-- <StoryblokComponent v-if="footer" :blok="footer.content" /> -->

  <a href="#" class="back-to-top d-flex align-items-center justify-content-center">
    <i class="bi bi-arrow-up-short"></i>
  </a>
</template>

<script setup>
const leftbar = await useAsyncStoryblok('leftbar', { version: 'publish' })
const hero = await useAsyncStoryblok('hero', { version: 'publish' })
const about = await useAsyncStoryblok('main/about', { version: 'publish' })
// const facts = await useAsyncStoryblok('main/facts', { version: 'publish' })
const skills = await useAsyncStoryblok('main/skills', { version: 'publish' })
const resume = await useAsyncStoryblok('main/resume', { version: 'publish' })
const portfolio = await useAsyncStoryblok('main/portfolio', { version: 'publish' })
const services = await useAsyncStoryblok('main/services', { version: 'publish' })
// const testimonials = await useAsyncStoryblok('main/testimonials', { version: 'publish' })
const contact = await useAsyncStoryblok('main/contact', { version: 'publish' })
const seo = await useAsyncStoryblok('seo', { version: 'publish' })
// const footer = await useAsyncStoryblok('footer', { version: 'publish' })

const { AppleTouchIcon, Charset, Description, ThemeColor, MsapplicationTileColor, SafariPinnedTab, FaviconIcon, Favicon16, Favicon32, Keywords, Robots, TitlePage, Viewport, Url, Image } = seo.value.content

useHead({
  title: TitlePage ?? '',
  meta: [
    { charset: Charset ?? '' },
    { name: "viewport", content: Viewport ?? '' },
    {
      hid: "description",
      name: "description",
      content: Description ?? '',
    },
    { name: "keywords", content: Keywords ?? '' },
    { name: "robots", content: Robots ?? '' },
    { name: "cache-control", content: 'no-cache' },
    { name: "pragma", content: 'no-cache' },
    { name: "expires", content: '-1' },
    { name: "msapplication-TileColor", content: MsapplicationTileColor },
    { name: "theme-color", content: ThemeColor },
  ],
  htmlAttrs: {
    lang: "en",
  },
  link: [
    {
      rel: 'icon',
      type: 'image/x-icon',
      href: FaviconIcon.filename ?? ''
    },
    {
      rel: 'mask-icon',
      color: '#5bbad5',
      href: SafariPinnedTab.filename ?? ''
    },
    {
      rel: 'icon',
      type: 'image/png',
      sizes: '16x16',
      href: Favicon16.filename ?? ''
    },
    {
      rel: 'icon',
      type: 'image/png',
      sizes: '32x32',
      href: Favicon32.filename ?? ''
    },
    {
      rel: 'apple-touch-icon',
      type: 'image/png',
      sizes: '180x180',
      href: AppleTouchIcon.filename ?? ''
    }
  ]
})

useSeoMeta({
  ogTitle: TitlePage ?? '',
  ogDescription: Description ?? '',
  ogImage: Image.filename ?? '',
  ogUrl: Url ?? ''
})
</script>
