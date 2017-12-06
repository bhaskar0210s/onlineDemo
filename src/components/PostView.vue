<template>
  <div>
    <div class="container">
      <div class="row">
        <div class="col-md-7" id="section-to-print">
          <h1 class="display-3">Your Cart</h1><br>
          <table class="table table-hover">
            <thead>
              <tr>
                <th>Name</th>
                <th>Qty</th>
                <th>Price</th>
                <th class="text-right">Amt.</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="p in cartdisplay">
                <td>{{p.name}}</td>
                <td>{{quntityOfProduct(p.product_id)}}</td>
                <td>{{getProductPrice(p.product_id)}}</td>
                <td align="right">{{getProductPrice(p.product_id) * quntityOfProduct(p.product_id)}}.00</td>
              </tr>
              <tr>
                <th>Total</th>
                <th>{{cart.length}}</th>
                <th class="text-right" colspan="2">{{getTotal()}}.00</th>
              </tr>
            </tbody>
          </table>
        </div>
        <div class="col-md-4 col-md-offset-1">
          <h1 class="display-3">Payment Option</h1><br>
          <button type="button" class="btn btn-default">Cash on Delivery</button><br><br>
          <button type="button" class="btn btn-warning">Debit/Credit Card</button>
          <br><br>
          <router-link to="/"class="col-md-offset-8"><button type="button" class="btn btn-default" v-on:click="display = true">BACK</button></router-link>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import _ from 'lodash'
export default {
  props: ['cart'],
  data () {
    return {
      cartdisplay: []
    }
  },
  mounted () {
    console.log(this.cart)
    this.cartdisplay = _.uniqBy(this.cart, 'product_id')
  },
  methods: {
    quntityOfProduct (productID) {
      // display quantity of the item
      var t = this
      var b = null
      if (_.find(t.cart, {'product_id': productID})) {
        b = _.countBy(t.cart, 'product_id')
        return b[productID]
      }
    },
    getProductPrice (pid) {
      // get product price from product list
      var t = this
      var price = _.find(t.cart, { 'product_id': pid }).product_prices[0].price
      console.log(price)
      return price
    },
    getTotal () {
      // get product price from product list
      var t = this
      var price = 0
      price += Number(_.find(t.cart, function (item) {
        return item.product_id
      }).product_prices[0].price)
      return price
    }
  }
}
</script>
<style scoped>
</style>
