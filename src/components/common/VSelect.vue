<script>
import SvgArrow from '@/components/svg/arrow'

export default {
  name: 'VSelect',
  components: {
    SvgArrow
  },
  props: {
    placeholder: {
      type: String,
      default: ''
    },
    types: {
      type: Array,
      default: () => []
    }
  },
  data () {
    return {
      isOptionsVisible: false
    }
  },
  methods: {
    showOptions () {
      this.isOptionsVisible = true
    },
    onSelect (option) {
      this.$emit('selected', option)
      this.isOptionsVisible = false
    }
  }
}
</script>

<template>
  <div class="select">
    <div
      :class="isOptionsVisible ? 'placeholder-active' : 'placeholder-default'"
      class="select-placeholder"
      @click="showOptions"
    >
      <p>
        {{ placeholder }}
      </p>
      <svg-arrow
        :class="isOptionsVisible ? 'svg-active' : 'svg-default' "
        class="select-svg"
      />
    </div>
    <transition name="fade">
      <div
        v-if="isOptionsVisible"
        class="cities-shadow select-options"
      >
        <p
          v-for="(option, optionId) in types"
          :key="optionId"
          @click="onSelect(option.name)"
        >
          <span
            :class="placeholder === option.name ? 'span-active' : 'span-default'"
          >
            {{ option.name }}
          </span>
        </p>
      </div>
    </transition>
  </div>
</template>

<style scoped>
  .cities-shadow {
    box-shadow: 0px 0px 50px rgba(193, 193, 193, 0.5);
  }

  .fade-enter-active,
  .fade-leave-active {
    transition: opacity 0.2s ease;
  }

  .fade-enter-from,
  .fade-leave-to {
    opacity: 0;
  }
</style>
