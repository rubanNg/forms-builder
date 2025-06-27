<script setup lang="ts">
import { FormControl, FormArray, FormGroup, AbstractControl, Validators } from 'reactive-vue-form';
import { onMounted, reactive, ref } from 'vue'

import { config } from './config';
import { ValidationFn } from 'reactive-vue-form/dist/package/types';

let form: FormGroup  = undefined;
const controlsConfig = ref([]);

function createFormGroup() {
  const controls: Record<string, AbstractControl> = {};
  config.forEach((control) => {
    let valudators: ValidationFn[] = [];
    if (control.isRequired) {
      valudators.push(Validators.required);
    }

    if (control.type === 'input' && control.input === 'email') {
      valudators.push((control: AbstractControl) => {
        if (!control.value) {
          return null;
        }

        const result = (control.value as string).toLowerCase().match(
          /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        );

        if (result?.[0]) {
          return null;
        }

        return { email: 'Email error' };
      });
    }

    if (control.type === 'input' && control.input === 'checkbox') {
      valudators.push((control: AbstractControl) => control.value === true ? null : { needAccept: 'Aceept pls!!' });
    }

    if (control.type === 'input' &&  typeof control.maxLength === 'number') {
      valudators.push(Validators.maxLength(control.maxLength));
    }

    if (control.type === 'input' &&  typeof control.minLength === 'number') {
      valudators.push(Validators.minLength(control.minLength));
    }

    controls[control.controlName] = new FormControl('', valudators);
  });

  form = new FormGroup(controls);
  console.log(controls);

  controlsConfig.value = structuredClone(config);

  console.log(form.controls)
}

onMounted(() => {
  createFormGroup();
});

</script>

<template>
  <div class="wrapper" v-if="controlsConfig">
    <div v-for="control in controlsConfig">
      <label class="control-label">
        <p>{{ control.label }}</p>

        <input
          v-if="control.type === 'input'"
          v-model="form[control.controlName].value"
          :class="{ 'error-control': form[control.controlName].dirty && form[control.controlName].invalid }" 
          :name="control.controlName"
          :type="control.input"
          class="control"
        >
        <select
          v-if="control.type === 'select'"
          v-model="form[control.controlName].value"
          :name="control.controlName"
          :class="{ 'error-control': form[control.controlName].dirty && form[control.controlName].invalid }"
          class="control"
        >
          <option v-for="option in control.options" :value="option">{{ option }}</option>
        </select>

        <!-- <p v-if="form[control.controlName].dirty" class="errors">
          <pre>{{ form[control.controlName]?.errors }}</pre>
        </p> -->
      </label>
    </div>

    <button :disabled="form?.invalid">Отправить форму</button>

    <pre>{{ form?.value }}</pre>
  </div>
</template>

<style scoped>
  .wrapper {
    width: 300px;
  }

  .control {
    width: 100%;
    height: 30px;
    border: 1px solid black;

    &[type="checkbox"] {
      width: 20px;
      height: 20px;
      border-radius: 10px;
    }
  }

  .error-control {
    border: 1px solid red;
  }
</style>
