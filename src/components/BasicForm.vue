<template>
  <div class="form">
    <div
      v-for="(task, taskIndex) in form.items"
      :key="taskIndex"
      class="form-item"
    >
      <component
        :is="task.component"
        v-model="task.value"
        :class="[task.isValid ? '' : 'form-item_error', task.type === 'input' ? 'form-item_input' : '']"
        :types="task.types"
        :placeholder="task.placeholder"
        :input-type="task.inputType"
        @selected="changeOptionName"
      />
      <span
        v-if="!task.isValid"
        class="error"
      >Обязательное поле</span>
    </div>
    <div>
      <p
        class="form-description"
        @click="switchShowDiscription"
      >
        {{ descriptionText }}
      </p>
    </div>
    <v-area
      v-if="descriptionIsShowed"
      v-model="form.body.value"
      class="form-area"
      :placeholder="form.body.placeholder"
    />
    <button
      class="form-button"
      @click="sendNewTask"
    >
      Создать задачу
    </button>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import VSelect from '@/components/common/VSelect'
import VInput from '@/components/common/VInput'
import VArea from '@/components/common/VArea'
import TASK_TYPES from '@/constants/task-types'

export default {
  name: 'BasicForm',
  components: {
    VSelect,
    VInput,
    VArea
  },
  data () {
    return {
      form: {
        items: [
          {
            type: 'select',
            value: '',
            isValid: true,
            component: VSelect,
            types: TASK_TYPES,
            placeholder: 'Введите тип задачи'
          },
          {
            type: 'input',
            value: '',
            isValid: true,
            component: VInput,
            inputType: 'date'
          },
          {
            type: 'input',
            value: '',
            isValid: true,
            component: VInput,
            inputType: 'text',
            placeholder: 'Название задачи'
          }
        ],
        body: {
          value: '',
          placeholder: 'Описание задачи'
        }
      },
      itemsMapping: {
        taskType: 0,
        taskDate: 1,
        taskName: 2
      },
      descriptionIsShowed: false
    }
  },
  computed: {
    ...mapGetters(['userid']),
    titleFirstToWatch () {
      return this.form.items[this.itemsMapping.taskType].value
    },
    titleSecondToWatch () {
      return this.form.items[this.itemsMapping.taskDate].value
    },
    titleThirdToWatch () {
      return this.form.items[this.itemsMapping.taskName].value
    },
    descriptionText () {
      return this.descriptionIsShowed ? 'Скрыть описание' : 'Добавить описание'
    }
  },
  watch: {
    titleFirstToWatch (newVal) {
      const titleItem = this.form.items[this.itemsMapping.taskType]
      if (titleItem.value) {
        titleItem.isValid = true
      }
    },
    titleSecondToWatch (newVal) {
      const titleItem = this.form.items[this.itemsMapping.taskDate]
      if (titleItem.value) {
        titleItem.isValid = true
      }
    },
    titleThirdToWatch (newVal) {
      const titleItem = this.form.items[this.itemsMapping.taskName]
      if (titleItem.value) {
        titleItem.isValid = true
      }
    }
  },
  methods: {
    ...mapActions(['createNewTask']),
    switchShowDiscription () {
      this.descriptionIsShowed = !this.descriptionIsShowed
    },
    changeOptionName (val) {
      this.form.items[this.itemsMapping.taskType].value = val
      this.form.items[this.itemsMapping.taskType].placeholder = val
    },
    clearForm () {
      this.form.items.forEach((_, index) => {
        const item = this.form.items[index]
        item.value = ''
        if (item.placeholder && index === this.itemsMapping.taskType) {
          item.placeholder = 'Выберите тип задачи'
        }
      })
      this.form.body.value = ''
    },
    sendNewTask () {
      const taskItems = this.form.items
      const rightDate = new Date(taskItems[this.itemsMapping.taskDate].value).toLocaleDateString()
      const task = {
        title: `${taskItems[this.itemsMapping.taskType].value} - ${rightDate} - ${taskItems[this.itemsMapping.taskName].value}`,
        body: this.form.body.value,
        userid: this.userid
      }
      taskItems.forEach((_, index) => {
        if (taskItems[index].value) {
          taskItems[index].isValid = true
        } else {
          taskItems[index].isValid = false
        }
      })
      if (!taskItems.find(({ isValid }) => !isValid)) {
        this.createNewTask(task)
        this.clearForm()
      }
    }
  }
}
</script>
