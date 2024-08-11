<template>
  <div class="editor-container" ref="editorContainer">
    <Content :container="editorContainer" v-if="editorContainer"/>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { Content } from './content';

const editorContainer = ref<HTMLElement>();

</script>

<style scoped>
  .editor-container {
    width: 70%;
    margin: 0 auto;
  }
</style>
