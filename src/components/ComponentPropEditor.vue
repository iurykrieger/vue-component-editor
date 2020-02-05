<template>
  <div class="component-prop-editor">
    <div v-for="prop in propsMetadata" :key="prop.name">
      <div v-if="isString(prop.type) || isURL(prop.type)" class="string-prop">
        <label :for="prop.name">{{ prop.name }}</label>
        <ImpulseInput :name="prop.name" v-model.trim="propsValues[prop.name]" />
      </div>
      <div v-else-if="isNumber(prop.type)" class="number-prop">
        <label :for="prop.name">{{ prop.name }}</label>
        <ImpulseInput
          type="number"
          :name="prop.name"
          v-model.number="propsValues[prop.name]"
        />
      </div>
      <div v-else-if="isBoolean(prop.type)" class="boolean-prop">
        <label :for="prop.name">{{ prop.name }}</label>
        <Toggle :name="prop.name" v-model="propsValues[prop.name]" />
      </div>
      <div v-else-if="isObject(prop.type)" class="object-prop">
        <label :for="prop.name">{{ prop.name }}</label>
        <textarea :name="prop.name" v-model="propsValues[prop.name]" />
      </div>
    </div>
  </div>
</template>

<script>
import { ImpulseInput } from '@linx-impulse/engage-components-vue'
import { VueConstructor } from 'vue'
import { URL } from 'url'
import Toggle from '@/components/Toggle'

export default {
  data() {
    return {
      propsValues: {}
    }
  },
  components: {
    ImpulseInput,
    Toggle
  },
  model: {
    prop: 'componentProps',
    event: 'component-props-changed'
  },
  props: {
    component: {
      type: VueConstructor,
      required: true
    },
    componentProps: {
      type: Object,
      required: true
    }
  },
  computed: {
    propsMetadata() {
      const { props = {} } = this.component
      return Object.keys(props).map(prop => ({
        name: prop,
        default: props[prop].default,
        type: props[prop].type,
        validator: props[prop].validator
      }))
    },
    defaultPropsValues() {
      return this.propsMetadata.reduce(
        (props, prop) => ({
          ...props,
          [prop.name]: prop.default || this.getDefaultValueByType(prop.type)
        }),
        {}
      )
    }
  },
  methods: {
    isString(type) {
      return type === String
    },
    isObject(type) {
      return type === Object
    },
    isBoolean(type) {
      return type === Boolean
    },
    isNumber(type) {
      return type === Number
    },
    isURL(type) {
      return type === URL
    },
    getDefaultValueByType(type) {
      switch (type) {
        case Number:
          return 0
        case Object:
          return {}
        case Boolean:
          return false
        default:
          return ''
      }
    }
  },
  watch: {
    propsValues(propsValues) {
      this.$emit('component-props-changed', propsValues)
    },
    defaultPropsValues(component) {
      this.propsValues = {
        ...this.defaultPropsValues,
        ...this.componentProps
      }
    }
  },
  created() {
    this.propsValues = {
      ...this.defaultPropsValues,
      ...this.componentProps
    }
  }
}
</script>

<style></style>
