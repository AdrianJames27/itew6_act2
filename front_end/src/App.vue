<template>
  <div class="container">
    <h1 class="my-4 text-center">Movie Collection</h1>

    <!-- Add Movie Button -->
    <div class="d-flex justify-content-end mb-3">
      <button class="btn btn-primary" @click="openModal()">Add Movie</button>
    </div>

    <!-- Search Bar -->
    <SearchBar @search="handleSearch" />

    <!-- Movie List -->
    <MovieList :movies="filteredMovies" @edit="editMovie" @delete="deleteMovie" />

    <!-- Modal -->
    <div class="modal fade show" :class="{ show: showModal }" 
      :style="{ display: showModal ? 'block' : 'none' }"
      tabindex="-1" aria-label="Modal"
    >
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">{{ isEditing ? 'Edit Movie' : 'Add Movie' }}</h5>
            <button class="btn-close" @click="closeModal()" aria-label="Close"></button>
          </div>
          <div class="modal-body">
            <MovieForm 
              :form="form" 
              :isEditing="isEditing" 
              :errors="formErrors" 
              @submit="onModalSubmit"
              @reset="onModalReset" 
            />
          </div>
        </div>
      </div>
    </div>
    <div v-if="showModal" class="modal-backdrop fade" :class="{ show: showModal }"></div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import MovieList from './components/MovieList.vue';
import MovieForm from './components/MovieForm.vue';
import SearchBar from './components/SearchBar.vue';
import Dialog from '@akamine96204/jsdialog';
import movieService from './services/movieService';

// Reactive state
const movies = ref([]);
const form = ref({ 
  title: '', 
  genre: '', 
  director: '', 
  release_year: '', 
  rating: '', 
  poster: null 
});
const formErrors = ref({});
const searchQuery = ref('');
const editId = ref(null);
const showModal = ref(false);

// Computed
const filteredMovies = computed(() => {
  if (!searchQuery.value) return movies.value;

  const q = searchQuery.value.toLowerCase();

  return movies.value.filter(m => m.title.toLowerCase().includes(q) || m.genre.toLowerCase().includes(q));
});

const isEditing = computed(() => editId.value !== null);

// API
const fetchMovies = async () => {
  try {
    const response = await movieService.list();

    if (response.status === 200) {
      movies.value = response.data;
    }
  } catch (error) {
    Dialog.showMessageDialog('Error', error);
  }
}

// Handlers
const handleSearch = query => searchQuery.value = query

const openModal = () => { 
  resetForm(); 
  showModal.value = true;
}

const editMovie = movie => { 
  form.value = {...movie}; 
  editId.value = movie.id; 
  showModal.value = true;
}

const closeModal = () => showModal.value = false

const resetForm = () => {
  form.value = { 
    title: '', 
    genre: '', 
    director: '', 
    release_year: '', 
    rating: '', 
    poster: null 
  };

  formErrors.value = {};
  editId.value = null;
}

// Submit: poster optional on edit or add
const onModalSubmit = async (updatedForm) => {
  try {
    formErrors.value = {}

    const data = new FormData();

    console.log(updatedForm);

    Object.entries(updatedForm).forEach(([k, v]) => {
      if (k === 'poster') {
        if (v instanceof File) data.append(k, v)
      } else {
        data.append(k, v)
      }
    });

    const response = editId.value
      ? await movieService.update(editId.value, data)
      : await movieService.create(data);

    console.log(data);

    if (response.status === 201) {
      Dialog.showPlainDialog('Movie is added!');

      fetchMovies();
      closeModal();
      resetForm();
    } else if (response.status === 200) {
      Dialog.showPlainDialog('Movie is udpated!');

      fetchMovies();
      closeModal();
      resetForm();
    }
  } catch (error) {
    formErrors.value = error.response.data;
    Dialog.showMessageDialog('Error', error);
  }
}

const onModalReset = () => { 
  closeModal(); 
  resetForm(); 
}

const deleteMovie = async (id) => {
  try {
    const userConfirm = await Dialog.showConfirmDialog(
      'Confirm Delete', 
      'Are you sure to delete this movie?',
      {
        eventStyles: {
          '#confirmDialogBtnYes': {
            mouseover: {
              'background': '#911212'
            }
          }
        }
      }
    );

    if (userConfirm.option === Dialog.YES_OPTION) {
      const response = await movieService.delete(id);

      if (response.status === 204) {
        Dialog.showPlainDialog('Movie is deleted!');
        fetchMovies();
      }
    }
  } catch (error) {
    Dialog.showMessageDialog('Error', error);
  }
}

onMounted(fetchMovies);
</script>