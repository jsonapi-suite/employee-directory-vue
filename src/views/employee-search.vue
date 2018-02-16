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
            <th><a @click="doSort('name')">Name</a></th>
            <th><a @click="doSort('age')">Age</a></th>
            <th><a @click="doSort('title')">Position</a></th>
            <th><a @click="doSort('department_name')">Department</a></th>
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
import { Scope, WhereClause, SortScope } from "jsorm"
import { Employee } from "@/models"

export default Vue.extend({
  data() {
    let sort : SortScope = {
      created_at: 'desc'
    }

    return {
      employees: [] as Employee[],
      query: {} as WhereClause,
      sort
    }
  },
  created() {
    this.search()
  },
  computed: {
    scope(): Scope<typeof Employee> {
      return Employee
        .where(this.query)
        .order(this.sort)
        .includes({ current_position: "department" })
    }
  },
  methods: {
    async search() {
      this.employees = (await this.scope.all()).data
    },
    doSort(attribute: string) {
      if (this.sort[attribute] && this.sort[attribute] === "desc") {
        this.sort = {[attribute]: "asc"}
      } else {
        this.sort = {[attribute]: "desc"}
      }
      this.search()
    },
  }
})
</script>

<style lang="scss" scoped>
</style>