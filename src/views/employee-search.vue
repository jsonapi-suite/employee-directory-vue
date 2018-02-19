<template>
    <div class="card search">
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

              <div class="meta">
                <div class="float-right pagination">
                  <a v-if="hasPrevPage" @click="paginate(true)">&laquo; Prev</a>
                  <a v-if="hasNextPage" @click="paginate()">Next &raquo;</a>
                </div>
                <span class="float-right total">Total: {{totalCount}}</span>
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
            <td>
              <a @click="selectEmployee(employee)">
                {{ employee.fullName }}
              </a>
            </td>
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
import EventBus from "@/event-bus"
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
      sort,
      totalCount: null as number | null,
      currentPage: 1 as number
    }
  },
  created() {
    EventBus.$on('employee_save', (employee: Employee) => {
      this.search()
    })

    this.search()
  },
  computed: {
    scope(): Scope<typeof Employee> {
      return Employee
        .where(this.query)
        .order(this.sort)
        .stats({ total: "count" })
        .page(this.currentPage)
        .per(10)
        .includes({ current_position: "department" })
    },
    hasPrevPage() : boolean {
      return this.currentPage > 1
    },
    hasNextPage() : boolean {
      return (this.currentPage * 10) < (this.totalCount || 0)
    }
  },
  methods: {
    async search() {
      let { data, meta } = await this.scope.all()
      this.employees = data
      this.totalCount = meta.stats.total.count
    },
    paginate(back: boolean = false) {
      let count = 1
      if (back) count = -1
      this.currentPage = this.currentPage + count
      this.search()
    },
    doSort(attribute: string) {
      if (this.sort[attribute] && this.sort[attribute] === "desc") {
        this.sort = {[attribute]: "asc"}
      } else {
        this.sort = {[attribute]: "desc"}
      }
      this.search()
    },
    selectEmployee(employee: Employee): void {
      EventBus.$emit('employee_selected', employee.id)
    }
  }
})
</script>

<style lang="scss" scoped>
.meta {
  margin-top: 0.5rem;
}

.total {
  color: white;
}

.pagination {
  margin-left: 1rem;

  a {
    color: #90CAF9 !important;

    &:hover {
      color: lighten(#90CAF9, 10%) !important;
    }

    &:nth-child(2) {
      margin-left: 0.5rem;
    }
  }
}
</style>