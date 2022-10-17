<template>
  <div>
    <AppMeet />
    <div v-if="dataLoad_dataLoaded" class="container">
      <section class="section">
        <div class="m-b-lg">
          <h1 class="title is-inline">Featured Meet in "Location"</h1>
          <AppDropdown />
          <button class="button is-primary is-pulled-right m-r-sm">
            Create Meetups
          </button>
          <router-link
            :to="{ name: 'PageFind' }"
            class="button is-primary is-pulled-right m-r-sm"
            >All</router-link
          >
        </div>
        <div class="row columns is-multiline">
          <MeetItem
            v-for="meetup in meetups"
            :key="meetup._id"
            :meetup="meetup"
          />
        </div>
      </section>
      <section class="section">
        <div>
          <h1 class="title">Categories</h1>
          <div class="columns cover is-multiline is-mobile">
            <CategoryItem
              v-for="category in categories"
              :key="category._id"
              :category="category"
            />
          </div>
        </div>
      </section>
    </div>
    <div class="container" v-else>
      <AppSpinner />
    </div>
  </div>
</template>

<script>
import CategoryItem from "@/components/CategoryItem";
import MeetItem from "@/components/MeetItem";
import { mapActions, mapState } from "vuex";
import dataLoad from '@/mixins/dataLoad';
export default {
  components: {
    CategoryItem,
    MeetItem,
  },
  mixins: [dataLoad],
  computed: {
    ...mapState({
      meetups: (state) => state.meetups.items,
      categories: (state) => state.categories.items,
    }),
  },

  created() {
     Promise.all([this.fetchMeetups(), this.fetchCategories()])
    .then(() => this.dataLoad_resolveData ())
    .catch((error) => {
      console.log(error)
      this.dataLoad_resolveData ()
    })
  },
  methods: {
    ...mapActions("meetups", ["fetchMeetups"]),
    ...mapActions("categories", ["fetchCategories"]),
  },
};
</script>

<style scoped>
</style>