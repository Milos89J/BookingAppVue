<template>
  <div class="container">
    <ErrorPage
      :title="'You are not authenticated-please login'"
      :status="'401'"
      :navigatePage="'PageLogin'"
      :navigateText="'Navigate to login page'"
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