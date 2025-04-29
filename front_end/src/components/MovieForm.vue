<template>
    <form @submit.prevent="handleSubmit">
        <div class="mb-3">
            <label class="form-label">Title</label>
            <input v-model="localForm.title" type="text" class="form-control" :class="{ 'is-invalid': errors.title }"
                required>
            <div v-if="errors.title" class="invalid-feedback">
                {{ errors.title[0] }}
            </div>
        </div>
        <div class="mb-3">
            <label class="form-label">Genre</label>
            <input v-model="localForm.genre" type="text" class="form-control" :class="{ 'is-invalid': errors.genre }"
                required>
            <div v-if="errors.genre" class="invalid-feedback">
                {{ errors.genre[0] }}
            </div>
        </div>
        <div class="mb-3">
            <label class="form-label">Director</label>
            <input v-model="localForm.director" type="text" class="form-control"
                :class="{ 'is-invalid': errors.director }" required>
            <div v-if="errors.director" class="invalid-feedback">
                {{ errors.director[0] }}
            </div>
        </div>
        <div class="mb-3">
            <label class="form-label">Release Year</label>
            <input v-model="localForm.release_year" type="number" class="form-control"
                :class="{ 'is-invalid': errors.release_year }" required>
            <div v-if="errors.release_year" class="invalid-feedback">
                {{ errors.release_year[0] }}
            </div>
        </div>
        <div class="mb-3">
            <label class="form-label">Rating</label>
            <input v-model="localForm.rating" type="number" step="0.1" max="10" min="1" class="form-control"
                :class="{ 'is-invalid': errors.rating }" required>
            <div v-if="errors.rating" class="invalid-feedback">
                {{ errors.rating[0] }}
            </div>
        </div>
        <div class="mb-3">
            <label class="form-label">Poster</label>
            <input ref="posterInput" @change="handleFileChange" type="file" class="form-control"
                :class="{ 'is-invalid': errors.poster }" accept="image/*">
            <div v-if="errors.poster" class="invalid-feedback">
                {{ errors.poster[0] }}
            </div>
        </div>
        <div class="modal-footer d-flex justify-content-between">
            <button type="button" class="btn btn-secondary" @click="resetLocalForm">Cancel</button>
            <button type="submit" class="btn btn-primary">{{ isEditing ? 'Update' : 'Add' }}</button>
        </div>
    </form>
</template>

<script setup>
import { reactive, watch, ref } from 'vue';

const props = defineProps({
    form: { type: Object, required: true },
    isEditing: { type: Boolean, required: true },
    errors: { type: Object, required: true }
});

const emit = defineEmits(['submit', 'reset']);

const localForm = reactive({ ...props.form });
const posterInput = ref(null);

watch(
    () => props.form,
    newForm => {
        Object.assign(localForm, newForm);
    },
    { deep: true, immediate: true }
);

function handleSubmit() {
    emit('submit', { ...localForm })
};

function handleFileChange(e) {
    const f = e.target.files[0];
    if (f) localForm.poster = f
};

function resetLocalForm() {
    emit('reset')
    if (posterInput.value) posterInput.value.value = ''
};
</script>

<style scoped>
/* Optional additional styling */
</style>