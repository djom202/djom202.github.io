<template>
  <!-- ======= Header ======= -->
  <header id="header" v-editable="blok">
    <div class="d-flex flex-column">
      <div class="profile">
        <img :src="blok.AuthorPhoto.filename" alt="" class="img-fluid rounded-circle">
        <h1 class="text-light">
          <a href="index.html">{{ blok.AuthorName }}</a>
        </h1>

        <div class="social-links mt-3 text-center">
          <!-- <StoryblokComponent v-for="bk in blok.columns" :key="bk._uid" :blok="bk" /> -->
          <a v-for="link in blok.Links" :href="link.href" :class="link.name">
            <i :class="link.class"></i>
          </a>
        </div>
      </div>

      <nav id="navbar" class="nav-menu navbar">
        <ul>
          <li v-for="item in blok.MenuItems">
            <a :href="item.href" class="nav-link scrollto active">
              <i :class="item.class"></i>
              <span>{{ item.text }}</span>
            </a>
          </li>
        </ul>
      </nav><!-- .nav-menu -->
    </div>
  </header><!-- End Header -->
</template>

<script setup>
defineProps({ blok: Object });
</script>