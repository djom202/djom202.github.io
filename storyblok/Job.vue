<template>
    <div class="resume-item" data-aos="fade-left" data-aos-delay="100">
        <div class="resume-job-head">
            <a v-if="companyUrl && blok.CompanyImage?.filename" :href="companyUrl" target="_blank" rel="noopener"
                :aria-label="blok.Company" class="company-logo-link">
                <img :src="blok.CompanyImage.filename" :alt="blok.Company" class="company-logo" loading="lazy">
            </a>
            <img v-else-if="blok.CompanyImage?.filename" :src="blok.CompanyImage.filename" :alt="blok.Company"
                class="company-logo" loading="lazy">
            <div class="resume-job-body">
                <h4>{{ [blok.Company, blok.Title].map((v) => String(v || '').trim()).filter(Boolean).join(' - ') }}</h4>
                <h5>{{ blok.DateStart }} - {{ String(blok.DateEnd || '').trim() || 'Present' }}</h5>
                <p><em>{{ blok.Location }}</em></p>

                <ul>
                    <li v-for="fn in blok.Functions" :key="fn._uid">{{ fn.Text }}</li>
                </ul>
            </div>
        </div>
    </div>
</template>

<script setup>
const props = defineProps({ blok: Object });

// Company website from the CMS Url multilink; empty when the job has no link.
const companyUrl = computed(() => String(props.blok?.Url?.url || '').trim());
</script>
