<template>
  <!-- Maintenance mode overrides the entire site (design, images, data). -->
  <MaintenanceScreen v-if="isMaintenance" />
  <template v-else>
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
</template>

<script setup>
import MaintenanceScreen from "~/storyblok/Maintenance.vue";

// SEO first: it carries the Maintenance kill-switch. The remaining stories
// are only fetched when the site is actually going to render.
const seo = await useAsyncStoryblok('seo', { version: 'publish' })
// const footer = await useAsyncStoryblok('footer', { version: 'publish' })

// CMS kill-switch: when the "seo" story has Maintenance enabled,
// the whole site is replaced by the maintenance screen.
const isMaintenance = computed(() => seo.value?.content?.Maintenance === true)

const [leftbar, hero, about, skills, resume, portfolio, services, contact] = isMaintenance.value
  ? []
  : await Promise.all([
    useAsyncStoryblok('leftbar', { version: 'publish' }),
    useAsyncStoryblok('hero', { version: 'publish' }),
    useAsyncStoryblok('main/about', { version: 'publish' }),
    // useAsyncStoryblok('main/facts', { version: 'publish' }),
    useAsyncStoryblok('main/skills', { version: 'publish' }),
    useAsyncStoryblok('main/resume', { version: 'publish' }),
    useAsyncStoryblok('main/portfolio', { version: 'publish' }),
    useAsyncStoryblok('main/services', { version: 'publish' }),
    // useAsyncStoryblok('main/testimonials', { version: 'publish' }),
    useAsyncStoryblok('main/contact', { version: 'publish' }),
  ])

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

// Sections render after the async Storyblok fetch, while vendor scripts
// (AOS) initialize at page load. Refresh AOS once mounted so scroll
// animations attach to the rendered content.
onMounted(() => {
  nextTick(() => {
    if (typeof window !== 'undefined' && window.AOS?.refresh) {
      window.AOS.refresh()
    }
  })
})
</script>
