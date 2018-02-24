<template>
  <div>
    <div class="jumbotron">
      <div class="container">
        <h1 class="display-3">Wanheda</h1>
        <p class="lead">Using bootstrap and some.</p>
        <p>Making chanes from Vishnu</p>
        <p>To see how rebasing works</p>
        <p>Stash 1</p>
      </div>
    </div>
    <div class="page-content">
      <router-view :cart="cart"></router-view>
    </div>
  </div>
</template>
<script>
require('material-design-lite')
export default {
  name: 'app',
  data () {
    return {
      cart: [],
      cart_price: 0,
    }
  }
}
</script>

<style>
@import url('https://fonts.googleapis.com/css?family=Muli:300,600');
@import url('https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css');
@import url('http://code.ionicframework.com/ionicons/2.0.1/css/ionicons.min.css');
.container {
  font-family: 'Muli', sans-serif;
  font-size: 30px;
}
</style>
