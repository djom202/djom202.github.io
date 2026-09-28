<template>
    <!-- ======= Skills Section ======= -->
    <section id="skills" class="skills section-bg">
        <div class="container">
            <div class="section-title">
                <h2>{{ blok.Title }}</h2>
                <!-- <p>{{ blok.Description }}</p> -->
            </div>
            <div class="row" data-aos="fade-up">
                <div class="col-lg-12 d-flex justify-content-center">
                    <ul class="skills-tabs" role="tablist">
                        <li v-for="group in skillGroups" :key="group.title"
                            :class="{ 'filter-active': activeGroup === group.title }"
                            role="tab" :aria-selected="activeGroup === group.title"
                            @click="activeGroup = group.title">
                            {{ group.title }}
                        </li>
                    </ul>
                </div>
            </div>
            <div v-if="activeSkillGroup" class="row row-cols-1 row-cols-md-2 row-cols-lg-3 skills-content">
                <StoryblokComponent v-for="skill in activeSkillGroup.items"
                    :key="activeSkillGroup.title + skill.Text" :blok="skill" />
            </div>
        </div>
    </section><!-- End Skills Section -->
</template>

<script setup>
import { skillGroups } from "@/assets/data/skills";

defineProps({ blok: Object });

const activeGroup = ref(skillGroups[0]?.title || "");
const activeSkillGroup = computed(() => {
    return skillGroups.find((group) => group.title === activeGroup.value) || skillGroups[0];
});

// Switching tabs mounts new cards after AOS already scanned the page,
// so refresh it to attach the scroll animations to them.
watch(activeGroup, () => {
    nextTick(() => {
        if (typeof window !== "undefined" && window.AOS?.refresh) {
            window.AOS.refresh();
        }
    });
});
</script>
