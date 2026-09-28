<template>
    <!-- ======= Hero Section ======= -->
    <section id="hero" class="d-flex flex-column justify-content-center align-items-center" v-editable="blok" v-bind:style="{
        background: 'url(' + blok.Background.filename + ') top center/cover'
    }">
        <div class="hero-container" data-aos="fade-in">
            <h1>{{ blok.AuthorName }}</h1>
            <p>{{ blok.Prefix }} <span ref="typedEl" class="typed"></span></p>
        </div>
    </section><!-- End Hero -->
</template>

<script setup>
import Typed from "typed.js";

const props = defineProps({ blok: Object });
const typedEl = ref(null);
let typed = null;

function initTyped() {
    if (!typedEl.value) return;
    const strings = String(props.blok?.Tags || "")
        .split(",")
        .map((s) => s.trim())
        .filter(Boolean);
    if (!strings.length) return;
    typed?.destroy();
    typed = new Typed(typedEl.value, {
        strings,
        loop: true,
        typeSpeed: 100,
        backSpeed: 50,
        backDelay: 2000,
    });
}

onMounted(initTyped);
watch(() => props.blok?.Tags, initTyped);
onBeforeUnmount(() => typed?.destroy());
</script>

<!-- style="background: url('{{blok.Background.filename}}') top center;" -->