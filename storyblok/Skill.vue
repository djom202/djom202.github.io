<template>
    <div class="col" data-aos="fade-up">
        <div class="progress">
            <span class="skill">{{ blok.Text }} <i class="val">{{ blok.Progress }}%</i></span>
            <div class="progress-bar-wrap">
                <div class="progress-bar" role="progressbar" :aria-valuenow="blok.Progress" aria-valuemin="0"
                    aria-valuemax="100"></div>
            </div>
        </div>
    </div>
</template>

<script setup>
defineProps({ blok: Object });
</script>