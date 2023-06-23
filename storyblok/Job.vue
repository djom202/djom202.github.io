<template>
    <div class="resume-item" data-aos="fade-left" data-aos-delay="100">
        <h4>{{ blok.Title }}</h4>
        <h5>{{ blok.DateStart }} - {{ blok.DateEnd }}</h5>
        <p><em>{{ blok.Location }}</em></p>

        <ul>
            <li v-for="fn in blok.Functions" :key="fn._uid">{{ fn.Text }}</li>
        </ul>
    </div>
</template>

<script setup>
defineProps({ blok: Object });
</script>