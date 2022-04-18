<template>
  <div
    class="tasks-item"
  >
    <span>title: {{ task.title }}</span>
    <div
      v-if="task.body"
      class="tasks-item_body"
    >
      <span>body: {{ task.body }}</span>
      <p
        class="tasks-item_body-action"
        @click="clearTaskBody(task._id)"
      >
        Редактировать
      </p>
    </div>

    <div
      v-else
      class="tasks-item_body"
      @click="selectBodyTask(task._id)"
    >
      <input
        v-if="checkIdentity(task._id)"
        v-model="body"
        type="text"
        class="tasks-item_input"
        :placeholder="checkIdentity(task._id) ? 'Изменить описание' : 'У вас нет описания задачи, можете добавить, кликнув на меня!'"
      >
      <input
        v-else
        type="text"
        class="tasks-item_input"
        :placeholder="checkIdentity(task._id) ? 'Изменить описание' : 'У вас нет описания задачи, можете добавить, кликнув на меня!'"
      >
      <p
        v-show="body && checkIdentity(task._id)"
        class="tasks-item_body-action"
        @click="sendNewBody(task)"
      >
        Подтвердить
      </p>
    </div>
    <span>userId: {{ task.userid }}</span>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
  name: 'Tasks',
  props: {
    task: {
      type: Object,
      default: () => {}
    }
  },
  data () {
    return {
      body: '',
      selectedTask: ''
    }
  },
  computed: {
    ...mapGetters([
      'tasks',
      'userid'
    ])
  },
  methods: {
    ...mapActions([
      'editBodyTask'
    ]),
    checkIdentity (id) {
      return id === this.selectedTask
    },
    clearTaskBody (id) {
      const task = this.tasks.find(({ _id }) => _id === id)
      task.body = ''
      this.body = ''
      this.selectedTask = id
    },
    selectBodyTask (id) {
      this.body = ''
      this.selectedTask = id
    },
    sendNewBody (task) {
      const data = {
        userid: task.userid,
        _id: task._id,
        body: this.body
      }
      this.editBodyTask(data)
      this.body = ''
      this.selectedTask = null
    }
  }
}
</script>
