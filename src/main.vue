<template>
  <div id="app">
    <div class="container-fluid">
      <h1>Employee Directory</h1>

      <div class="row">
        <div class="col-md-6">
          <employee-search />
        </div>
        <div class="col-md-6">
          <employee-form />
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue, { VueConstructor } from "vue"
import EmployeeSearch from "@/views/employee-search.vue"
import EmployeeForm from "@/views/employee-form.vue"

export default Vue.extend({
  components: {
    EmployeeSearch,
    EmployeeForm
  },
  data() {
    return { }
  }
})
</script>

<style lang="scss">
@import '~bootstrap/scss/bootstrap.scss';

#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
h1 {
  color: #444;
  margin: 0 0 3rem 0;
}
body {
  background: darken(grey, 25%);
  padding: 50px;
}
h1, .btn-primary {
  color: white;
  font-weight: 700;
  font-family: 'Rubik', sans-serif;
  text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.9);
}
a {
  color: #90CAF9;
  cursor: pointer;
  &:hover {
    color: lighten(#90CAF9, 10%);
  }
}
select {
  -webkit-appearance: button;
  -webkit-border-radius: 2px;
  -webkit-box-shadow: 0px 1px 3px rgba(0, 0, 0, 0.1);
  -webkit-padding-end: 20px;
  -webkit-padding-start: 2px;
  -webkit-user-select: none;
  background-image: url(http://i62.tinypic.com/15xvbd5.png), -webkit-linear-gradient(#FAFAFA, #F4F4F4 40%, #E5E5E5);
  background-position: 97% center;
  background-repeat: no-repeat;
  border: 1px solid #AAA;
  color: #555;
  font-size: inherit;
  overflow: hidden;
  padding: 6px 10px;
  text-overflow: ellipsis;
  white-space: nowrap;
  width: 100%;
}
.form {
  .positions {
    border-radius: 5px;
    background-color: darken( grey, 20%);
    padding: 15px 15px 0px 15px;
    margin-bottom: 10px;
    .position {
      position: relative;
    }
  }
  .form-group {
    .error {
      color: lighten(red, 7%);
    }
    .has-error {
      border-color: lighten(red, 7%);
    }
  }
  .btn-add {
    position: absolute;
    right: 15px;
    top: 5px;
    font-size: 140%;
    line-height: 0.7;
    font-weight: 400;
    padding-bottom: 5px;
  }
}
.table {
  font-family: 'Josefin Sans', sans-serif;
  font-size: 130%;
  color: white;
}
p {
  font-family: 'Roboto', sans-serif;
  font-weight: 400;
  font-size: 110%;
  color: white;
  margin-top: 5px;
}
.card {
  background: url("https://www.toptal.com/designers/subtlepatterns/patterns/classy_fabric.png");
  border-radius: 5px;
  border: 1px solid black;
  box-shadow: -2px 2px 6px 2px rgba(0,0,0,0.4);
  padding: 20px;
}
.btn.btn-primary {
  border: none;
  background-color: orange;
}
.btn-lg {
  font-size: 200%;
  letter-spacing: 1px;
}
</style>
