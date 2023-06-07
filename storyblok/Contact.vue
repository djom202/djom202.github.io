<template>
    <!-- ======= Contact Section ======= -->
    <section id="contact" class="contact">
        <div class="container">

            <div class="section-title">
                <h2>{{ blok.Title }}</h2>
            </div>

            <div class="row" data-aos="fade-in">
                <div class="col-lg-5 d-flex align-items-stretch">
                    <div class="info">
                        <div v-for="info in blok.Info" :class="info.Class">
                            <i :class="info.Icon"></i>
                            <h4>{{ info.Title }}</h4>
                            <p>{{ info.Text }}</p>
                        </div>

                        <iframe :src="blok.MapUrl" frameborder="0" allowfullscreen></iframe>
                    </div>

                </div>

                <div class="col-lg-7 mt-5 mt-lg-0 d-flex align-items-stretch">
                    <form role="form" class="php-email-form">
                        <div class="row">
                            <div class="form-group col-md-6">
                                <label for="name">Your Name</label>
                                <input v-model="name" type="text" name="name" class="form-control" id="name" required>
                            </div>
                            <div class="form-group col-md-6">
                                <label for="name">Your Email</label>
                                <input v-model="from" type="email" class="form-control" name="email" id="email" required>
                            </div>
                        </div>
                        <div class="form-group">
                            <label for="name">Subject</label>
                            <input v-model="subject" type="text" class="form-control" name="subject" id="subject" required>
                        </div>
                        <div class="form-group">
                            <label for="name">Message</label>
                            <textarea v-model="text" class="form-control" name="message" rows="10" required></textarea>
                        </div>
                        <div class="my-3">
                            <div v-show="hasError" class="error-message">Fill all the fields</div>
                            <div v-show="isSend" class="sent-message">Your message has been sent. Thank you!</div>
                        </div>
                        <div class="text-center">
                            <button @click.prevent="sendMessage">Send Message</button>
                        </div>
                    </form>
                </div>
            </div>

        </div>
    </section><!-- End Contact Section -->
</template>

<script setup>
defineProps({ blok: Object });

const name = ref('')
const from = ref('')
const subject = ref('')
const text = ref('')
const isSend = ref(false)
const hasError = ref(false)

function validateFields() {
    if (name.value === '' || from.value === '' || subject.value === '' || text.value === '') return false

    return true
}

function setAction(obj) {
    obj.value = true

    setTimeout(() => {
        obj.value = false
    }, 3000)
}

function sendMessage() {
    if (validateFields()) {
        const mail = useMail()

        mail.send({
            from: from.value,
            subject: subject.value,
            text: text.value,
            sender: {
                name: name.value,
                email: from.value
            }
        })

        setAction(isSend)
    } else {
        setAction(hasError)
    }
}
</script>