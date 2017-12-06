<template>
  <div>
    <div v-if="display">
      <div class="container">
        <div class="row">
          <div class="col-md-2" id="sidebar">
            <h4>Section List</h4>
            <div class="list-group">
              <div class="list-group-item" style="border:none;" v-for="(product, key) in groupedProduct" v-if=" key != 'cdcd306268ec46aa89c454768229e5fc'">
                <a a href="#" v-scroll-to="'.container'" class="sze">{{getSectionName(key)}}</a></div>
              </div>
            </div>
            <div class="col-md-10">
              <div class="row">
                <div class="col-md-12 pad"  v-for="(product, key) in groupedProduct" v-bind:id="key" v-if=" key != 'cdcd306268ec46aa89c454768229e5fc'">
                  <h4>{{getSectionName(key)}}</h4>
                  <hr align="left">
                  <div class="col-md-6" v-for="productName in product" v-if="productName.deleted == 'no'">
                    <div class="row">
                      <div class="col-md-8 col-xs-8 paddingZero list-group-item flex-column align-items-start ab">
                        <h5 style="font-weight:300;">{{productName.name}}</h5>
                        <span style="float:left;" class="fontW">${{getProductPrice(productName.product_id)}}</span>
                      </div>
                      <div class="col-md-4 col-xs-4 paddingZero">
                        <img src="./minus-square.svg" v-on:click="removeProductFromCart(productName.product_id)" style="cursor:pointer">
                        <small class="displayQuantity">{{quntityOfProduct(productName.product_id)}}</small>
                        <img src="./plus-square.svg" v-on:click="addProductToCart(productName.product_id)" style="cursor:pointer">
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div>
          <div>
            <button type="button" class="btn btn-info affix" data-toggle="modal" data-target="#myModal">Menu</button>
            <div class="modal fade" id="myModal" role="dialog" v-show="">
              <div class="modal-dialog list modal-sm">
                <div class="modal-content">
                  <div class="modal-header">
                    <div class="list-group">
                     <div class="list-group-item" style="border:none; text-align:center" v-for="(product, key) in groupedProduct" v-if=" key != 'cdcd306268ec46aa89c454768229e5fc'">
                      <a v-bind:href="goTo(key)">{{getSectionName(key)}}</a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div v-show="cart.length > 0">
          <div class="affixCart cartBar">
            <h4 class="col-md-2">{{cart.length}} Item |  ${{cartPrice}}</h4>
            <h4 class="col-md-2" style="cursor:pointer;" v-on:click="display = false">Checkout</h4>
            <h4><router-link :to="{ path: '/post/', params: { cart }}"  class="col-md-2" style="color:white" :cart='cart'>Check out</router-link></h4>
          </div>
        </div>
      </div>
    </div>
    <div v-else>
      <div class="container">
        <div class="row">
          <div class="col-md-10">
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
                      <th class="text-right" colspan="2">{{cartPrice}}.00</th>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div class="col-md-4 col-md-offset-1">
                <h1 class="display-3">Payment Option</h1><br>
                <button type="button" class="btn btn-default">Cash on Delivery</button><br><br>
                <button type="button" class="btn btn-warning">Debit/Credit Card</button>
                <br><br>
                <button type="button" class="btn btn-default" v-on:click="display = true">BACK</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import _ from 'lodash'
import axios from 'axios'
export default {
  props: ['cart'],
  data () {
    return {
      product: [],
      sections: [],
      groupedProduct: {},
      showmenu: false,
      productModifier: [],
      addToCart: {},
      cartPrice: 0,
      display: true,
      cartdisplay: []
    }
  },
  created () {
    var vm = this
    axios.get('https://storetm.shoptreeapp.com/api/v1/product?per_page=100', {headers: {'authorization': 'Basic dmlzaG51OkJINFRBQzA4Mg=='}}).then(response => {
      vm.product = response.data.data
      vm.groupedProduct = _.groupBy(vm.product, function (item) {
        return item.section_id
      })
      console.log(vm.groupedProduct)
    })
    axios.get('https://storetm.shoptreeapp.com/api/v1/section?per_page=100', {headers: {'authorization': 'Basic dmlzaG51OkJINFRBQzA4Mg=='}}).then(response => {
      console.log(vm.sections = response.data.data)
    })
    axios.get('https://storetm.shoptreeapp.com/api/v1/productmodifier?per_page=100', {headers: {'authorization': 'Basic dmlzaG51OkJINFRBQzA4Mg=='}}).then(response => {
      console.log(vm.productModifier = response.data.data)
    })
  },
  methods: {
    getSectionName (sectionid) {
      // get section name using section id from product
      var t = this
      return _.find(t.sections, { 'section_id': sectionid }).name
    },
    getProductPrice (pid) {
      // get product price from product list
      var t = this
      return _.find(t.product, { 'product_id': pid }).product_prices[0].price
    },
    goTo (pt) {
      // id binding (menu section)
      return '#' + pt
    },
    pModifiers (productmodifierID) {
      // get product modifiers from productModifers
      var t = this
      if (productmodifierID !== null) {
        return _.find(t.productModifier, { 'modifier_set_id': productmodifierID }).name
      }
    },
    addProductToCart (productID) {
      var t = this
      var price = 0
      t.addToCart = _.find(t.product, {'product_id': productID})
      price = Number(_.find(t.product, {'product_id': productID}).product_prices[0].price)
      t.cartPrice = t.cartPrice + price
      t.cart.push(t.addToCart)
      t.cartdisplay = _.uniqBy(t.cart, 'product_id')
    },
    removeProductFromCart (productID) {
      var t = this
      var price = 0
      if (_.find(t.cart, {'product_id': productID})) {
        price = Number(_.find(t.product, {'product_id': productID}).product_prices[0].price)
        t.cartPrice = t.cartPrice - price
        // remove perticular item from cart
        t.cart.splice(_.findIndex(t.cart, {'product_id': productID}), 1)
      }
    },
    quntityOfProduct (productID) {
      // display quantity of the item
      var t = this
      var b = null
      if (_.find(t.cart, {'product_id': productID})) {
        b = _.countBy(t.cart, 'product_id')
        return b[productID]
      } else {
        return 0
      }
    }
  }
}
</script>
<style scoped>
.ab {
  margin-bottom: 1em;
  padding: 0 1em 0.8em 0;
  line-height: 1em;
  border: none;
}
hr {
  border-color: black;
}
.pad {
  margin-bottom: 1.5em;
}
.fontW {
  font-weight: 600;
  font-size: .9em;
}
.sze {
  font-size: 1.2em;
}
a {
  color: black;
}
.affix {
 position: fixed;
 bottom: 55px;
 right: 30px;
 z-index: 10 !important;
}
.affixCart {
 position: fixed;
 bottom: 0;
 z-index: 10 !important;
 width: 100%;
 border-radius: 0;
}
.cartBar {
  background-color: black;
  height:40px;
  width: 100%;
  color: white;
  padding: 5px;
  margin-top: 10px;
}
.list {
  position: fixed;
  bottom: 0;
  right: 25%;
  overflow: scroll;
  max-width: 350px;
}
.modal-header {
  max-height: 300px;
  overflow: scroll
}
.modal-content {
 font-weight: bold;
}
@media only screen and (min-width: 990px) {
  .affix {
    display: none;
  }
  .shift {
    margin-right: 3em;
  }
  hr {
    width: 93%;
  }
}
@media only screen and (max-width: 990px) {
  #sidebar {
    display: none;
  }
}
#sidebar {
  position: -webkit-sticky;
  position: sticky;
  top: 0;
}
.displayQuantity {
  border: 1px solid;
  padding: 0 3px 1px 3px;
  margin: 6px;
  border-radius: 2px;
}
img {
  margin-top: 2px;
}
h5 {
  margin-top: 4px;
  margin-bottom:3px;
}
.paddingZero {
  padding: 0;
  font-weight: 300;
  line-height: 1em;
}
@media print {
  .container {
    visibility: hidden;
  }
  #section-to-print {
    visibility: visible;
  }
  #section-to-print {
    position: absolute;
    left: 0;
    top: 0;
  }
}
</style>
