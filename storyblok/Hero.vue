<template>
    <!-- ======= Hero Section ======= -->
    <section id="hero" class="d-flex flex-column justify-content-center align-items-center" v-editable="blok" v-bind:style="{
        background: 'url(' + blok.Background.filename + ') top center/cover fixed'
    }">
        <div class="hero-container" data-aos="fade-in">
            <h1>{{ blok.AuthorName }}</h1>
            <p>{{ blok.Prefix }} <span class="typed" :data-typed-items="blok.Tags"></span></p>
        </div>
    </section><!-- End Hero -->
</template>

<script setup>
defineProps({ blok: Object });
</script>

<!-- style="background: url('{{blok.Background.filename}}') top center;" -->