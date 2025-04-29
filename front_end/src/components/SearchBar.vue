<template>
    <div class="input-group mb-3">
        <input 
            type="text"
            class="form-control"
            placeholder="Search by title or genre"
            @input="$emit('search', $event.target.value)"
        />
    </div>
</template>