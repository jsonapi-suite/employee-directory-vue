<template>
    <div class="card search">
      <h1>Employee Directory</h1>

      <table class="table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Age</th>
            <th>Position</th>
            <th>Department</th>
          </tr>
        </thead>

        <tbody>
          <tr v-for="employee in employees" :key="employee.id">
            <td>{{ employee.firstName }} {{ employee.lastName }}</td>
            <td>{{ employee.age }}</td>
            <td>{{ employee.currentPosition.title }}</td>
            <td>{{ employee.currentPosition.department.name }}</td>
          </tr>
        </tbody>
      </table>
    </div>
</template>

<script lang="ts">
import Vue from "vue"
import { Scope } from "jsorm"
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
  computed: {
    scope(): Scope<typeof Employee> {
      return Employee
        .includes({ current_position: "department" })
    }
  },
  methods: {
    async search() {
      this.employees = (await this.scope.all()).data
    }
  }
})
</script>

<style lang="scss" scoped>
</style>