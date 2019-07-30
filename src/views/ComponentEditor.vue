<template>
  <Multipane id="component-editor" class="custom-resizer" layout="vertical">
    <div class="pane playground">
      <div class="background"></div>
      <div class="component">
        <component
          v-if="selectedComponent"
          :is="selectedComponent"
          v-bind="currentPropsValues"
        />
      </div>
    </div>
    <multipane-resizer></multipane-resizer>
    <div class="pane editor">
      <select v-model="selectedComponent">
        <option
          v-for="(item, index) in components"
          :key="index"
          :value="item.component"
          >{{ item.label }}</option
        >
      </select>
      <div v-if="selectedComponent" class="props">
        <div v-for="prop in selectedComponentMetadata.props" :key="prop.name">
          <div
            v-if="isString(prop.type) || isURL(prop.type)"
            class="string-prop"
          >
            <label :for="prop.name">{{ prop.name }}</label>
            <TextInput :name="prop.name" v-model.trim="prop.currentValue" />
          </div>
          <div v-else-if="isNumber(prop.type)" class="number-prop">
            <label :for="prop.name">{{ prop.name }}</label>
            <TextInput
              type="number"
              :name="prop.name"
              v-model.number="prop.currentValue"
            />
          </div>
          <div v-else-if="isBoolean(prop.type)" class="boolean-prop">
            <label :for="prop.name">{{ prop.name }}</label>
            <Toggle :name="prop.name" v-model="prop.currentValue" />
          </div>
          <div v-else-if="isObject(prop.type)" class="object-prop">
            <label :for="prop.name">{{ prop.name }}</label>
            <textarea :name="prop.name" v-model="prop.currentValue" />
          </div>
        </div>
      </div>
    </div>
  </Multipane>
</template>

<script>
import { Multipane, MultipaneResizer } from 'vue-multipane';
import TextInput from '@/components/TextInput'
import Toggle from '@/components/Toggle'
import { URL } from 'url'

export default {
  name: 'ComponentEditor',
  components: {
    TextInput,
    Toggle,
    Multipane,
    MultipaneResizer
  },
  data() {
    return {
      components: require
        .context('@/components', true, /\.vue$/i)
        .keys()
        .map(fileName => {
          const componentName = /\w+/.exec(fileName).pop()
          return {
            component: () => import(`@/components/${componentName}`),
            props: [],
            label: componentName
          }
        }),
      selectedComponent: null
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
  computed: {
    currentPropsValues() {
      return this.selectedComponentMetadata.props.reduce((props, prop) => {
        props[prop.name] = prop.currentValue
        return props
      }, {})
    },
    selectedComponentMetadata() {
      return this.components.find(
        ({ component }) => component === this.selectedComponent
      )
    }
  },
  watch: {
    async selectedComponent(selectedComponent) {
      const {
        default: { props = {} }
      } = await selectedComponent()
      this.selectedComponentMetadata.props = Object.keys(props).map(prop => ({
        name: prop,
        default: props[prop].default,
        type: props[prop].type,
        validator: props[prop].validator,
        currentValue:
          props[prop].default || this.getDefaultValueByType(props[prop].type)
      }))
    }
  }
}
</script>

<style lang="scss" scoped>
.custom-resizer {
  width: 100%;
  height: 100%;

  & > .pane {
    text-align: left;
    padding: 15px;
    overflow: hidden;
    background: #FFFFFF;
    border: 1px solid #ccc;
  }

  & > .multipane-resizer {
    margin: 0; left: 0;
    position: relative;

    &:before {
      display: block;
      content: "";
      width: 3px;
      height: 40px;
      position: absolute;
      top: 50%;
      left: 50%;
      margin-top: -20px;
      margin-left: -1.5px;
      border-left: 1px solid #ccc;
      border-right: 1px solid #ccc;
    }

    &:hover {
      &:before {
        border-color: #999;
      }
    }
  }

  .playground {
    background-image: url("data:image/svg+xml,<svg width='100%25' height='100%25' xmlns='http://www.w3.org/2000/svg'><defs><pattern id='smallGrid' width='10' height='10' patternUnits='userSpaceOnUse'><path d='M 10 0 L 0 0 0 10' fill='none' stroke='gray' stroke-width='0.5'/></pattern><pattern id='grid' width='100' height='100' patternUnits='userSpaceOnUse'><rect width='100' height='100' fill='url(%23smallGrid)'/><path d='M 100 0 L 0 0 0 100' fill='none' stroke='gray' stroke-width='1'/></pattern></defs><rect width='100%25' height='100%25' fill='url(%23grid)' /></svg>");
    background-size: 100px 100px, 100px 100px, 20px 20px, 20px 20px;
    mix-blend-mode: difference;
    background-position: -2px -2px;
    width: 60%;
  }
}

.component {
  position: absolute;
  width: 85%;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
}

.editor {
  flex-grow: 1;
}
</style>
