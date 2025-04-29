<template>
    <div class="input-group mb-3">
        <input 
            type="text"
            class="form-control"
            placeholder="Search by title or genre"
            @input="search"
            v-model="query"
        />
    </div>
</template>

<script setup>
import { ref } from 'vue';

const query = ref('');
const emit = defineEmits(['search']);

const search = () => {
    emit('search', query.value)
}
</script>

<style scoped>

</style>