<template>
    <div class="d-flex flex-wrap justify-content-start align-content-center gap-3">
        <MovieCard
            v-for="movie in movies"
            :key="movie.id"
            :movie="movie"
            @edit="$emit('edit', movie)"
            @delete="$emit('delete', movie.id)"
        />
    </div>
</template>

<script setup>
import MovieCard from './MovieCard.vue';

defineProps({
    movies: {
        type: Array,
        required: true
    }
});
</script>