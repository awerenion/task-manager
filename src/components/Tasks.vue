<template>
  <div class="tasks">
    <div
      v-for="(task, taskIndex) in tasks"
      :key="taskIndex + task._id"
      class="tasks-item"
    >
      <v-task
        :task="task"
      />
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import VTask from './Task'

export default {
  name: 'Tasks',
  components: {
    VTask
  },
  computed: {
    ...mapGetters([
      'tasks',
      'userid'
    ])
  },
  mounted () {
    this.getTasks(this.userid)
  },
  methods: {
    ...mapActions([
      'getTasks'
    ])
  }
}
</script>
