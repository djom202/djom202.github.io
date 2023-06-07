<template>
    <!-- ======= Resume Section ======= -->
    <section id="resume" class="resume">
        <div class="container">

            <div class="section-title">
                <h2>{{ blok.Title }}</h2>
                <!-- <p>{{ blok.Description }}</p> -->
            </div>

            <div class="row">
                <div class="col" data-aos="fade-up" data-aos-delay="100">
                    <h3 class="resume-title">{{ blok.SubTitle }}</h3>
                    <StoryblokComponent v-for="bk in blok.List" :key="bk._uid" :blok="bk" />
                </div>
            </div>

        </div>
    </section><!-- End Resume Section -->
</template>

<script setup>
defineProps({ blok: Object });
</script>