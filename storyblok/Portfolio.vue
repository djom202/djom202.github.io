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
                    <ul id="portfolio-flters" role="tablist">
                        <li v-for="filter in blok.Filters" :key="filter._uid || filter.By"
                            :class="{ 'filter-active': activeFilter === normalizeFilter(filter.By) }"
                            role="tab" :aria-selected="activeFilter === normalizeFilter(filter.By)"
                            @click="activeFilter = normalizeFilter(filter.By)">
                            {{ filter.Text }}
                        </li>
                    </ul>
                </div>
            </div>

            <div class="row portfolio-container">
                <StoryblokComponent v-for="(bk, idx) in filteredProjects" :key="bk._uid" :blok="bk" data-aos="fade-up"
                    :data-aos-delay="idx * 100" />
            </div>

        </div>
    </section><!-- End Portfolio Section -->
</template>

<script setup>
const props = defineProps({ blok: Object });
const normalizeFilter = (value = '') => {
    const normalized = String(value).replace(/^\./, '').trim().toLowerCase();
    return normalized === '*' || normalized === 'all' ? '*' : normalized;
};
const activeFilter = ref(normalizeFilter(props.blok?.Filters?.[0]?.By || '*'));
const filteredProjects = computed(() => {
    if (activeFilter.value === '*') return props.blok?.Projects || [];

    return (props.blok?.Projects || []).filter((project) => {
        const filters = String(project.filterBy || '').split(/[ ,]+/).filter(Boolean);
        return filters.map(normalizeFilter).includes(activeFilter.value);
    });
});
</script>