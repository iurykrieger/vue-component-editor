<template>
  <Multipane id="component-editor" class="custom-resizer" layout="vertical">
    <div class="pane playground">
      <div class="background"></div>
      <div class="component">
        <component
          v-if="selectedComponent"
          :is="selectedComponent"
          v-bind="selectedComponentProps"
        />
      </div>
    </div>
    <MultipaneResizer></MultipaneResizer>
    <div class="pane editor">
      <select v-model="selectedComponent" class="component-selector">
        <option
          v-for="(component, index) in components"
          :key="index"
          :value="component.value"
        >
          {{ component.label }}
        </option>
      </select>
      <div v-if="selectedComponent" class="props">
        <ComponentPropEditor
          :component="selectedComponent"
          v-model="selectedComponentProps"
        />
      </div>
    </div>
  </Multipane>
</template>

<script>
import * as ImpulseComponents from '@linx-impulse/engage-components-vue'
import * as ImpulseAutocomplete from '@linx-impulse/engage-autocomplete-vue'
import * as ImpulseSearch from '@linx-impulse/engage-search-vue'
import { Multipane, MultipaneResizer } from 'vue-multipane'
import ComponentPropEditor from '@/components/ComponentPropEditor'

export default {
  name: 'ComponentEditor',
  components: {
    Multipane,
    MultipaneResizer,
    ComponentPropEditor
  },
  data() {
    return {
      components: [],
      selectedComponent: null,
      selectedComponentProps: {}
    }
  },
  created() {
    const components = {
      ...ImpulseComponents,
      ...ImpulseAutocomplete,
      ...ImpulseSearch
    }

    this.components = Object.keys(components).map(componentName => {
      return {
        value: components[componentName],
        label: componentName
      }
    })
  }
}
</script>

<style lang="scss" scoped>
.custom-resizer {
  width: 100%;
  height: 100%;

  & > .pane {
    text-align: left;
    overflow: hidden;
    background: #ffffff;
    border: 1px solid #ccc;
  }

  & > .multipane-resizer {
    margin: 0;
    left: 0;
    position: relative;

    &:before {
      display: block;
      content: '';
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
    width: 75%;
  }
}

.component {
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
}

.editor {
  flex-grow: 1;
}

.component-selector {
  width: 100%;
  border: none;
  border-bottom: 1px solid rgba(0, 0, 0, 0.12);
  padding: $base-size;
  background: #ffffff;
  box-shadow: $box-shadow;
}
</style>
