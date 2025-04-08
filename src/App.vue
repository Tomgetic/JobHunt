<script setup lang="ts">
/*import { RouterLink, RouterView } from 'vue-router'*/
/*import HelloWorld from './components/HelloWorld.vue'*/
import NavBar from './components/NavBar.vue'
</script>

<template>
  <header>
    <NavBar/>
    <img/>

    <div class="wrapper">

      <nav>
        <!-- <RouterLink </RouterLink>
        <RouterLink </RouterLink> -->
      </nav>
    </div>
  </header>

  <RouterView />
</template>

<style scoped>
header {
  line-height: 1.5;
  max-height: 100vh;
  padding-top: 8rem;
}

.logo {
  display: block;
  margin: 0 auto 2rem;
}

nav {
  width: 100%;
  font-size: 12px;
  text-align: center;
  margin-top: 2rem;
}

nav a.router-link-exact-active {
  color: var(--color-text);
}

nav a.router-link-exact-active:hover {
  background-color: transparent;
}

nav a {
  display: inline-block;
  padding: 0 1rem;
  border-left: 1px solid var(--color-border);
}

nav a:first-of-type {
  border: 0;
}

@media (min-width: 1024px) {
  header {
    display: block;
    place-items: center;
    padding-right: 0;
  }

  .logo {
    margin: 0 auto 2rem;
  }

  header .wrapper {
    display: block;
    place-items: center;
    flex-wrap: nowrap;
  }

  nav {
    text-align: center;
    margin-left: 0;
    font-size: 1rem;
    padding: 0;
    margin-top: 0;
  }
}
</style>
