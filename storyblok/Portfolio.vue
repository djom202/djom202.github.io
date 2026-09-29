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
                        <li v-for="filter in visibleFilters" :key="filter._uid || filter.By"
                            :class="{ 'filter-active': activeFilter === normalizeFilter(filter.By) }"
                            role="tab" tabindex="0" :aria-selected="activeFilter === normalizeFilter(filter.By)"
                            @click="activeFilter = normalizeFilter(filter.By)"
                            @keydown.enter="activeFilter = normalizeFilter(filter.By)"
                            @keydown.space.prevent="activeFilter = normalizeFilter(filter.By)">
                            {{ filter.Text }}
                        </li>
                    </ul>
                </div>
            </div>

            <div class="row portfolio-container">
                <StoryblokComponent v-for="(bk, idx) in filteredProjects" :key="bk._uid" :blok="bk" data-aos="fade-up"
                    :data-aos-delay="idx * 100" />
            </div>
            <p v-if="!filteredProjects.length" class="text-center text-muted mt-3">
                No projects in this category yet.
            </p>

        </div>
    </section><!-- End Portfolio Section -->
</template>

<script setup>
import GLightbox from "glightbox";

const props = defineProps({ blok: Object });
const normalizeFilter = (value = '') => {
    const normalized = String(value).replace(/^\./, '').trim().toLowerCase();
    return normalized === '*' || normalized === 'all' ? '*' : normalized;
};
const matchesFilter = (project, active) => {
    if (active === '*') return true;
    const filters = String(project?.filterBy || '').split(/[ ,]+/).filter(Boolean);
    return filters.map(normalizeFilter).includes(active);
};
const activeFilter = ref(normalizeFilter(props.blok?.Filters?.[0]?.By || '*'));
const filteredProjects = computed(() => {
    return (props.blok?.Projects || []).filter((project) => matchesFilter(project, activeFilter.value));
});
// Hide filters that would show an empty grid (the "All" filter always stays).
const visibleFilters = computed(() => {
    return (props.blok?.Filters || []).filter((filter) => {
        const normalized = normalizeFilter(filter.By);
        if (normalized === '*') return true;
        return (props.blok?.Projects || []).some((project) => matchesFilter(project, normalized));
    });
});
// GLightbox is owned here (not in main.js): items render after the async
// Storyblok fetch, so initializing at page load would find no elements.
let lightbox = null;
onMounted(() => {
    nextTick(() => {
        lightbox = GLightbox({ selector: ".portfolio-lightbox" });
    });
});
onBeforeUnmount(() => lightbox?.destroy());
</script>
