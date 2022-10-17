<template>
  <div class="container">
    <ErrorPage
      :title="'Page don\'t exist'"
      :status="404"
      :navigatePage="'PageHome'"
      :navigateText="'Back Home'"
    />
  </div>
</template>

<script>
import ErrorPage from "@/components/ErrorPage";
export default {
  components: { ErrorPage, }
};
</script>

<style scoped>
</style>