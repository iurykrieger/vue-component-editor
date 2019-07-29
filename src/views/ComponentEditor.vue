<template>
  <section id="component-editor">
    <div class="playground">
      <component v-if="selectedComponent" :is="selectedComponent" v-bind="currentPropsValues" />
    </div>
    <div class="editor">
      <select v-model="selectedComponent">
        <option v-for="(item, index) in components" :key="index" :value="item.component">{{ item.label }}</option>
      </select>
      <div v-if="selectedComponent" class="props">
        <div v-for="prop in selectedComponentMetadata.props" :key="prop.name">
          <div v-if="isString(prop.type)" class="string-prop">
            <label :for="prop.name">{{ prop.name }}</label>
            <TextInput :name="prop.name" v-model.trim="prop.currentValue" />
          </div>
          <div v-else-if="isNumber(prop.type)" class="number-prop">
            <label :for="prop.name">{{ prop.name }}</label>
            <TextInput type="number" :name="prop.name" v-model.number="prop.currentValue" />
          </div>
          <div v-else-if="isBoolean(prop.type)" class="boolean-prop">
            <label :for="prop.name">{{ prop.name }}</label>
            <TextInput type="checkbox" :name="prop.name" v-model="prop.currentValue" />
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import TextInput from '@/components/TextInput'

export default {
  name: "ComponentEditor",
  components: {
    TextInput
  },
  data () {
    return {
      components: [
        {
          component: () => import('@/components/Widget'),
          props: [],
          label: 'Widget'
        },
        {
          component: () => import ('@/components/Number'),
          props: [],
          label: 'Number'
        }
      ],
      selectedComponent: null
    }
  },
  methods: {
    isString (type) {
      return type === String
    },
    isObject (type) {
      return type === Object
    },
    isBoolean (type) {
      return type === Boolean
    },
    isNumber (type) {
      return type === Number
    },
    getDefaultValueByType (type) {
      switch (type) {
        case Number:
          return 0;
        case Object:
          return {};
        case Boolean:
          return false;
        default:
          return '';
      }
    }
  },
  computed: {
    currentPropsValues () {
      return this.selectedComponentMetadata.props.reduce((props, prop) => {
        props[prop.name] = prop.currentValue
        return props
      }, {})
    },
    selectedComponentMetadata () {
      return this.components.find(({ component }) => component === this.selectedComponent)
    }
  },
  watch: {
    async selectedComponent (selectedComponent) {
      const { default: { props = {} } } = await selectedComponent()
      this.selectedComponentMetadata.props = Object.keys(props).map(prop => ({
        name: prop,
        default: props[prop].default,
        type: props[prop].type,
        validator: props[prop].validator,
        currentValue: props[prop].default || this.getDefaultValueByType(props[prop].type)
      }))
    }
  }
};
</script>

<style lang="scss" scoped>
.editor {
  background-color: #FFFFFF;
  position: fixed!important;
  z-index: 1;
  overflow: auto;
  height: 100%;
  width: 20%;
  right: 0;
  box-shadow: $box-shadow;
}

.playground {
  margin-right: 20%;
  position: fixed;
}
</style>
