<template>
    <!-- ======= Maintenance Mode ======= -->
    <!-- Rendered instead of the whole site when the CMS "seo" story -->
    <!-- has Maintenance enabled. Static on purpose: it must not depend -->
    <!-- on any other story, image or data. -->
    <div class="maintenance-screen">
        <div class="maintenance-card" data-aos="fade-in">
            <div class="maintenance-icon">
                <i class="bi bi-cone-striped"></i>
            </div>
            <h1>Under Maintenance</h1>
            <p>We're working on something great.<br>Please check back soon.</p>
            <div class="maintenance-bar">
                <span></span>
            </div>
        </div>
    </div><!-- End Maintenance Mode -->
</template>

<style scoped>
.maintenance-screen {
    position: fixed;
    inset: 0;
    z-index: 99999;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 24px;
    background: #171321;
    overflow-y: auto;
}

.maintenance-card {
    max-width: 520px;
    width: 100%;
    text-align: center;
    padding: 56px 40px;
    background: #fffaf5;
    border-radius: 24px;
    border-bottom: 8px solid #d6f36b;
    box-shadow: 0 24px 60px rgba(0, 0, 0, 0.35);
}

.maintenance-icon {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 88px;
    height: 88px;
    margin-bottom: 28px;
    border-radius: 50%;
    background: #d6f36b;
    color: #171321;
    font-size: 40px;
    animation: maintenance-pulse 2s ease-in-out infinite;
}

.maintenance-card h1 {
    margin: 0 0 16px;
    font-size: clamp(1.8rem, 5vw, 2.6rem);
    font-weight: 700;
    letter-spacing: -0.03em;
    color: #171321;
}

.maintenance-card p {
    margin: 0 0 32px;
    font-size: 1rem;
    line-height: 1.6;
    color: #6f687c;
}

.maintenance-bar {
    height: 10px;
    border-radius: 99px;
    background: #ece7e2;
    overflow: hidden;
}

.maintenance-bar span {
    display: block;
    height: 100%;
    width: 40%;
    border-radius: inherit;
    background: linear-gradient(90deg, #ff5c35, #7257ff);
    animation: maintenance-slide 1.6s ease-in-out infinite;
}

@keyframes maintenance-pulse {
    0%,
    100% {
        transform: scale(1);
    }
    50% {
        transform: scale(1.08);
    }
}

@keyframes maintenance-slide {
    0% {
        margin-left: -40%;
    }
    100% {
        margin-left: 100%;
    }
}

@media (max-width: 576px) {
    .maintenance-card {
        padding: 40px 24px;
    }
}
</style>
