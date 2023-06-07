<template>
    <div class="row">
        <div class="col icon-box" data-aos="fade-up" :data-aos-delay="blok.Delay">
            <div class="icon"><i :class="blok.Icon"></i></div>
            <h4 class="title"><a href="">{{ blok.Title }}</a></h4>
            <p class="description">{{ blok.Text }}</p>
        </div>
    </div>
</template>

<script setup>
defineProps({ blok: Object });
</script>