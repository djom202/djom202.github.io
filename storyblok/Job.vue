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
                <h5>{{ dateRange }}</h5>
                <p v-if="workMode" class="work-mode"><em>{{ workMode }}</em></p>
                <p><em>{{ blok.Location }}</em></p>

                <ul>
                    <li v-for="(text, idx) in functionItems" :key="idx">{{ text }}</li>
                </ul>

                <div v-if="jobProjects.length" class="resume-projects">
                    <p class="resume-projects-label">Internal Projects:</p>
                    <div v-for="(project, idx) in jobProjects" :key="idx" class="resume-project">
                        <a v-if="project.url && project.image" :href="project.url" target="_blank" rel="noopener"
                            :aria-label="project.title">
                            <img :src="project.image" :alt="project.title" loading="lazy">
                        </a>
                        <img v-else-if="project.image" :src="project.image" :alt="project.title" loading="lazy">
                        <div>
                            <h6>{{ project.title }}</h6>
                            <p>{{ project.help }}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
const props = defineProps({ blok: Object });

// Company website from the CMS Url multilink; empty when the job has no link.
const companyUrl = computed(() => String(props.blok?.Url?.url || '').trim());

const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

// "2024-05-01 00:00" -> "May 2024" (LinkedIn style, site is in English).
function formatDate(value) {
    const match = String(value || "").match(/(\d{4})-(\d{2})/);
    if (!match) return "";
    const month = MONTHS[Number(match[2]) - 1];
    return month ? `${month} ${match[1]}` : "";
}

const dateRange = computed(() => {
    const start = formatDate(props.blok?.DateStart);
    const endRaw = String(props.blok?.DateEnd || "").trim();
    const end = endRaw ? formatDate(endRaw) || endRaw : "Present";
    return [start, end].filter(Boolean).join(" - ");
});

// "Fulltime" (CMS) -> "Full-time" (LinkedIn style).
const WORK_MODES = { Fulltime: "Full-time" };
const workMode = computed(() => {
    const raw = String(props.blok?.WorkMode || "").trim();
    return WORK_MODES[raw] || raw;
});

// Per-job projects (CMS "projects" field): image left, title + help text right,
// stacked one below another under the functions.
function asText(value) {
    return typeof value === "string" ? value.trim() : "";
}

const jobProjects = computed(() => {
    const list = props.blok?.projects || props.blok?.Projects || [];
    if (!Array.isArray(list)) return [];
    return list
        .map((p) => ({
            image: p?.Image?.filename || asText(p?.image),
            title: asText(p?.Title) || asText(p?.title) || asText(p?.Name),
            help: asText(p?.HelpText) || asText(p?.help),
            url: String(p?.Url?.url || p?.url || "").trim(),
        }))
        .filter((p) => p.title || p.image || p.help);
});

// Functions may come as Function blocks ([{ Text }]), as a richtext doc
// ({ type: "doc", content: [...] }) or as plain text. Normalize to string[]
// so bullets render identically in every case.
function nodeText(node) {
    if (!node) return "";
    if (typeof node === "string") return node;
    if (Array.isArray(node)) return node.map(nodeText).join("");
    if (typeof node.text === "string") return node.text;
    return nodeText(node.content);
}

const functionItems = computed(() => {
    const fns = props.blok?.Functions;
    if (!fns) return [];
    if (typeof fns === "string") {
        return fns.split(/\n+/).map((s) => s.trim()).filter(Boolean);
    }
    if (Array.isArray(fns)) {
        return fns
            .map((fn) => (typeof fn === "string" ? fn.trim() : String(fn?.Text || "").trim()))
            .filter(Boolean);
    }
    const items = [];
    for (const block of fns.content || []) {
        if (block?.type === "bullet_list" || block?.type === "ordered_list") {
            for (const item of block.content || []) {
                const text = nodeText(item).trim();
                if (text) items.push(text);
            }
        } else {
            const text = nodeText(block).trim();
            if (text) items.push(text);
        }
    }
    return items;
});
</script>
