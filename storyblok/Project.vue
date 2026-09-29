<template>
    <div class="col-lg-4 col-md-6 portfolio-item" :class="blok.filterBy">
        <div class="portfolio-wrap">
            <img :src="blok.Image.filename" class="img-fluid" alt="">
            <div class="portfolio-links">
                <a :href="blok.Image.filename" data-gallery="portfolioGallery" class="portfolio-lightbox"
                    :title="blok.Title">
                    <i class="bx bx-search"></i>
                </a>
            </div>
        </div>
    </div>
</template>

<script setup>
defineProps({ blok: Object });
</script>