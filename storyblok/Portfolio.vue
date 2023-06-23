<template>
    <!-- ======= Portfolio Section ======= -->
    <section id="portfolio" class="portfolio section-bg">
        <div class="container">

            <div class="section-title">
                <h2>{{ blok.Title }}</h2>
                <!-- <p>{{ blok.Description }}</p> -->
            </div>

            <div class="row" data-aos="fade-up">
                <div class="col-lg-12 d-flex justify-content-center">
                    <ul id="portfolio-flters">
                        <li v-for="(filter, idx) in blok.Filters" :data-filter="filter.By"
                            :class="{ 'filter-active': idx === 0 }">
                            {{ filter.Text }}
                        </li>
                    </ul>
                </div>
            </div>

            <div class="row portfolio-container">
                <StoryblokComponent v-for="(bk, idx) in blok.Projects" :key="bk._uid" :blok="bk" data-aos="fade-up"
                    :data-aos-delay="idx * 100" />
            </div>

        </div>
    </section><!-- End Portfolio Section -->
</template>

<script setup>
defineProps({ blok: Object });
</script>