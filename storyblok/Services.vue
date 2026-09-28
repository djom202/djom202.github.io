<template>
    <!-- ======= Services Section ======= -->
    <section id="services" class="services">
        <div class="container">

            <div class="section-title">
                <h2>{{ blok.Title }}</h2>
                <p>{{ blok.Description }}</p>
            </div>

            <div class="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
                <StoryblokComponent v-for="bk in blok.List" :key="bk._uid" :blok="bk" />
            </div>

        </div>
    </section><!-- End Services Section -->
</template>

<script setup>
defineProps({ blok: Object });
</script>