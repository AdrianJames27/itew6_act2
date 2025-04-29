<template>
    <div class="card" style="width: 18rem;">
        <img :src="movie.poster" class="card-img-top img-uniform" alt="Poster">
        <div class="card-body">
            <h5 class="card-title">{{ movie.title }}</h5>
            <div class="card-text my-2">
                <p class="m-0">Genre: {{ movie.genre }}</p>
                <p class="m-0">Director: {{ movie.director }}</p>
                <p class="m-0">Year: {{ movie.release_year }}</p>
                <p class="m-0">Rating: {{ movie.rating }}</p>
            </div>
            <div class="d-flex justify-content-start gap-2">
                <button class="btn btn-primary" @click="$emit('edit')">Edit</button>
                <button class="btn btn-danger" @click="$emit('delete')">Delete</button>
            </div>
        </div>
    </div>
</template>

<script setup>
defineProps({
    movie: {
        type: Object,
        required: true
    }
});
</script>

<style scoped>
.card-body {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
}

.card-body,
.card-title,
.card-text {
    flex-grow: 1;
}

.img-uniform {
    width: 100%;
    height: 250px;
    object-fit: cover;
    border-radius: 5px;
}
</style>