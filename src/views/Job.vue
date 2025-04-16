<!-- src/views/Job.vue -->
<template>
    <div>
      <h1>Item ID: {{ itemId }}</h1>
    </div>

    <div v-if="data">
      <!-- Use itemId to fetch or display data -->
      <strong>Remotive URL (Apenas para Debug): </strong> <a :href="`${data.url}`">{{ data.url }}</a><br>
      <strong>Job: </strong>{{ data.title }}<br>
      <strong>Company: </strong>{{ data.company_name }}<br>
      <strong>Category: </strong>{{ data.category }}<br>
      <strong>Type: </strong>{{ data.job_type }}<br>
      <strong>Location: </strong>{{ data.candidate_required_location }}<br>
      <strong>Salary: </strong>{{ data.salary }}<br>
      <strong>First Published: </strong>{{ data.publication_date }}<br>
      <strong>Description: </strong><div class="mx-12" v-html="data.description"></div><br>
    </div>
    <div v-else>
      Loading data...
    </div>


</template>

<script setup lang="ts">
  import { useRoute } from 'vue-router';
  import { ref, onMounted } from 'vue';
  import jsonData from '@/assets/remote-jobs.json';

  const route = useRoute();
  const itemId = route.params.id; // Obter id passado como parâmetro no URL
  const data = ref(null);

  onMounted(
  () => {
    // Procurar ID no array jsonData.jobs.
    const job = jsonData.jobs.find(job => job.id == itemId);
    if (job) {
      data.value = job;
    }
  });
</script>