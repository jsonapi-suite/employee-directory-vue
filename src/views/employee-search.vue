<template>
    <div class="card search">
      <h1>Employee Directory</h1>

      <div class='search-controls'>
        <form v-on:submit.prevent="search()">
          <div class="row">
            <div class="col-md-6">
              <div class='form-group'>
                <input v-model="query.first_name_prefix" type='search' class='form-control' placeholder="First Name" />
              </div>
              <div class='form-group'>
                <input v-model="query.last_name_prefix" type='search' class='form-control' placeholder="Last Name" />
              </div>
            </div>
            <div class="col-md-6">
              <div class="clearfix">
                <button class="btn btn-lg btn-primary float-right" type="submit">Search</button>
              </div>
            </div>
          </div>
        </form>
      </div>

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
import { Scope, WhereClause } from "jsorm"
import { Employee } from "@/models"

export default Vue.extend({
  data() {
    return {
      employees: [] as Employee[],
      query: {} as WhereClause
    }
  },
  created() {
    this.search()
  },
  computed: {
    scope(): Scope<typeof Employee> {
      return Employee
        .where(this.query)
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