<template>
  <div id="form">
    <div class="card form clearfix">
      <h3 class="text-white">Create New Employee</h3>

      <form @submit.prevent="submit()">
        <div class="row">
          <div class="col-md-4">
            <div class="form-group">
              <input type="text" class="form-control" placeholder="First Name" />
            </div>
          </div>
          <div class="col-md-3">
            <div class="form-group">
              <input type="text" class="form-control" placeholder="Age" />
            </div>
          </div>
          <div class="col-md-5">
            <div class="form-group">
              <input type="text" class="form-control" placeholder="Last Name" />
            </div>
          </div>
        </div>

        <div class="positions">
          <div v-for="(position, index) in employee.positions" :key="position.id" class="row position">
            <div class="col-md-4">
              <div class="form-group">
                <input type="text" class="form-control" placeholder="Title" />
              </div>
            </div>
            <div class="col-md-6">
              <div class="form-group">
                <select>
                  <option disabled :value="undefined">Select a Department</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        <button type="submit" class="float-right btn btn-primary">Submit</button>
      </form>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue"
import { Employee, Position } from "@/models"

export default Vue.extend({
  data: function () {
    let employee = new Employee({
      positions: [new Position({ historicalIndex: 1 })]
    })

    return {
      employee
    }
  }
})
</script>

<style scope lang="scss">
select {
  width: 15rem;
}
</style>