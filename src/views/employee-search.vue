<template>
    <div class="card search">
      <h1>Employee Directory</h1>

      <table class="table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Age</th>
          </tr>
        </thead>

        <tbody>
          <tr v-for="employee in employees" :key="employee.id">
            <td>{{ employee.firstName }} {{ employee.lastName }}</td>
            <td>{{ employee.age }}</td>
          </tr>
        </tbody>
      </table>
    </div>
</template>

<script lang="ts">
import Vue from "vue"
import { Employee } from "@/models"

export default Vue.extend({
  data() {
    return {
      employees: [] as Employee[]
    }
  },
  created() {
    this.search()
  },
  methods: {
    async search() {
      this.employees = (await Employee.all()).data
    }
  }
})
</script>

<style lang="scss" scoped>
</style>