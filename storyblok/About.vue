<template>
    <!-- ======= About Section ======= -->
    <section id="about" class="about">
        <div class="container">
            <div class="section-title">
                <h2>{{ blok.Title }}</h2>

                <ul>
                    <li v-for="fn in blok.Degrees" :key="fn._uid">
                        <i class="bi bi-chevron-right"></i>
                        <strong>{{ fn.Text }}</strong>
                    </li>
                </ul>

                <table data-aos="fade-right">
                    <tr v-for="tr in blok.PersonalInfo.tbody" :key="tr._uid">
                        <td v-for="dt in tr.body" :key="dt._uid">{{ dt.value }}</td>
                    </tr>
                </table>
            </div>

            <div class="row">
                <div class="col-lg-6" data-aos="fade-right">
                    <h3>{{ blok.PersonalTitle }}</h3>
                    <p>{{ blok.PersonalText }}</p>
                </div>
                <div class="col-lg-6 content" data-aos="fade-left">
                    <h3>{{ blok.ProfessionalTitle }}</h3>
                    <p>{{ blok.ProfessionalText }}</p>
                </div>
            </div>
        </div>
    </section><!-- End About Section -->
</template>

<script setup>
defineProps({ blok: Object });
</script>