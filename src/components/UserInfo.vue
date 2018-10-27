<template>
    <div class="card">
        <div class="card-content">
            <div class="media">
                <div class="media-left">
                    <figure class="image is-48x48">
                        <img :src="avatar" alt="Placeholder image">
                    </figure>
                </div>
                <div class="media-content">
                    <p class="user-name">Anonymous <span class="user-option">>Sign In</span></p>
                    <p class="subtitle is-6 user-welcome">Huānyíng nǐ, yě bù huānyíng nǐ.</p>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                avatar:
                    "http://www.gravatar.com/avatar/c54fffec6620d02feb803fe47d462221?d=retro"
            };
        }
    };
</script>

<style scoped>
    .card {
        background-color: #fff6ed;
    }

    .user-option {
        float: right;
    }

    .user-welcome {
        font-size: 0.875em;
        color: #999999;
    }
</style>