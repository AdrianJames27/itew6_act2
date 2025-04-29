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
                <button class="btn btn-primary" @click="$emit('edit', movie)">Edit</button>
                <button class="btn btn-danger" @click="$emit('delete', movie.id)">Delete</button>
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
.movie-card {
    width: 100%; /* Ensures flexibility across screen sizes */
    max-width: 18rem; /* Prevents excessive width */
}

.img-uniform {
    width: 100%; /* Ensures the image fills the container */
    height: 250px; /* Set a fixed height for consistency */
    object-fit: cover; /* Crops and maintains aspect ratio */
    border-radius: 5px; /* Optional for styling */
}
</style>