<template>
    <!-- ======= Skills Section ======= -->
    <section id="skills" class="skills section-bg">
        <div class="container">
            <div class="section-title">
                <h2>{{ blok.Title }}</h2>
                <!-- <p>{{ blok.Description }}</p> -->
            </div>
            <div class="row row-cols-3 skills-content">
                <StoryblokComponent v-for="bk in blok.Skills" :key="bk._uid" :blok="bk" />
            </div>
        </div>
    </section><!-- End Skills Section -->
</template>

<script setup>
defineProps({ blok: Object });
</script>