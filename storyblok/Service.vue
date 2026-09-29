<template>
    <div class="col">
        <div class="icon-box" data-aos="fade-up" :data-aos-delay="blok.Delay">
            <div class="icon"><i :class="iconClass"></i></div>
            <h4 class="title">{{ blok.Title }}</h4>
            <p class="description">{{ blok.Text }}</p>
        </div>
    </div>
</template>

<script setup>
const props = defineProps({ blok: Object });

// The CMS has "bi bi-briefcase" on all six services; differentiate by title
// (falls back to the CMS Icon when the title is unknown).
const ICONS_BY_TITLE = {
    "External Consultant": "bi bi-person-badge",
    "Markup": "bi bi-code-slash",
    "Backend": "bi bi-server",
    "Frontend": "bi bi-display",
    "Architecture": "bi bi-diagram-3",
    "QA": "bi bi-bug",
};
const iconClass = computed(() => {
    return ICONS_BY_TITLE[String(props.blok?.Title || "").trim()] || props.blok?.Icon || "bi bi-briefcase";
});
</script>
