<template>
  <input
    v-if="isCheckbox"
    class="impulse-input"
    type="checkbox"
    :class="{ disabled }"
    :name="name"
    :checked="value"
    :disabled="disabled"
    @change="onChange"
    @focus.capture="onFocusGain"
    @blur.capture="onFocusLoss"
  />
  <input
    v-else-if="isRadio"
    class="impulse-input"
    type="radio"
    :class="{ disabled }"
    :name="name"
    :checked="isRadioChecked"
    :value="label"
    :disabled="disabled"
    @change="onChange"
    @focus.capture="onFocusGain"
    @blur.capture="onFocusLoss"
  />
  <input
    v-else
    autocomplete="off"
    class="impulse-input"
    :class="{ disabled }"
    :type="type"
    :name="name"
    :placeholder="placeholder"
    :value="value"
    :disabled="disabled"
    @input="onInput"
    @focus.capture="onFocusGain"
    @blur.capture="onFocusLoss"
  />
</template>

<script>
export default {
  name: "TextInput",
  directives: {
    autoFocus: {
      inserted: function(el) {
        if (this.autoFocus) {
          el.focus();
        }
      }
    }
  },
  props: {
    /**
     * Set type of input
     */
    type: {
      type: String,
      default: "text"
    },
    /**
     * Set name of input
     */
    name: {
      type: String,
      required: true
    },
    /**
     * Set value of input
     */
    value: {
      type: [Number, String, Boolean]
    },
    /**
     * Set label of input-radio
     */
    label: {
      type: String
    },
    /**
     * Set description placeholder
     */
    placeholder: String,
    /**
     * Set disabled for input
     */
    disabled: {
      type: Boolean,
      default: false
    },
    /**
     * Set autofocus for input
     */
    autoFocus: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    /**
     * @vuese
     * Verify if component input is checkbox
     */
    isCheckbox() {
      return this.type === "checkbox";
    },
    /**
     * @vuese
     * Verify if component input is radio
     */
    isRadio() {
      return this.type === "radio";
    },
    /**
     * @vuese
     * Verify if component input is radio checked
     */
    isRadioChecked() {
      return this.value === this.label;
    }
  },
  methods: {
    /**
     * @vuese
     * Emit event if the component gain the focus
     */
    onFocusGain(event) {
      this.$emit("focus-gain", event);
    },
    /**
     * @vuese
     * Emit event if the component loss the focus
     */
    onFocusLoss(event) {
      this.$emit("focus-loss", event);
    },
    /**
     * @vuese
     * Emit event with value if the component not disabled
     */
    onInput(event) {
      if (!this.disabled) {
        this.$emit("input", event.target.value);
      }
    },
    /**
     * @vuese
     * Emit event with value and state if the component not disabled
     * @arg event
     */
    onChange(event) {
      if (!this.disabled) {
        /**
         * Fired when input is changed
         * @arg event
         */
        this.$emit(
          "input",
          this.isRadio ? event.target.value : event.target.checked
        );
      }
    }
  }
};
</script>

<style lang="scss">
$input-border-color: #cccccc;
$input-background: #ffffff;
$input-border-radius: 2px;

$input-padding: $base-size $base-size * 2;

$input-font: $font-size $font-family;
$input-color: #666666;

$input-hover-border: #414141;

$checkbox-selected-color: #999;

.impulse-input {
  border: 1px solid $input-border-color;
  border-radius: $input-border-radius;
  background: $input-background;
  padding: $input-padding;

  font: $input-font;
  color: $input-color;

  transition: $transition;

  &:hover,
  &:focus {
    border-color: $input-hover-border;
    outline: 0;
  }

  &.disabled {
    cursor: not-allowed;
    opacity: 0.4;
  }

  &[type="checkbox"] {
    width: 16px;
    height: 16px;

    cursor: pointer;
    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;
    -ms-appearance: none;

    &:checked {
      border-color: $checkbox-selected-color;
      background: url("../assets/checkbox.svg") $checkbox-selected-color
        no-repeat center;
      background-size: 80%;
    }
  }
}
</style>
