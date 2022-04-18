<template>
  <div class="container">
    <h2>Таск-менеджер</h2>
    <div class="wrapper">
      <basic-form />
      <v-tasks />
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import BasicForm from '@/components/BasicForm.vue'
import VTasks from '@/components/Tasks.vue'

export default {
  name: 'App',
  components: {
    BasicForm,
    VTasks
  },
  computed: {
    ...mapGetters(['userid'])
  },
  created () {
    if (!this.userid) {
      this.setUserID()
    }
  },
  methods: {
    ...mapActions(['setUserID'])
  }
}
</script>
