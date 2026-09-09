<template>
    <div class="col" data-aos="fade-up">
        <div class="progress">
            <span class="skill">
                <span>{{ blok.Text }}</span>
                <i class="val">{{ progress }}%</i>
            </span>
            <div class="progress-bar-wrap">
                <div class="progress-bar" role="progressbar" :style="{ width: `${progress}%` }"
                    :aria-valuenow="progress" aria-valuemin="0" aria-valuemax="100"></div>
            </div>
        </div>
    </div>
</template>

<script setup>
const props = defineProps({ blok: Object });
const progress = computed(() => Math.min(100, Math.max(0, Number(props.blok?.Progress) || 0)));
</script>