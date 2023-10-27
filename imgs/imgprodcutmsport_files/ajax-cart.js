typeof ShopifyAPI=="undefined"&&(ShopifyAPI={});function attributeToString(attribute){return typeof attribute!="string"&&(attribute+="",attribute==="undefined"&&(attribute="")),jQuery.trim(attribute)}ShopifyAPI.onCartUpdate=function(cart){},ShopifyAPI.updateCartNote=function(note,callback){var params={type:"POST",url:"/cart/update.js",data:"note="+attributeToString(note),dataType:"json",success:function(cart){typeof callback=="function"?callback(cart):ShopifyAPI.onCartUpdate(cart)},error:function(XMLHttpRequest2,textStatus2){ShopifyAPI.onError(XMLHttpRequest2,textStatus2)}};jQuery.ajax(params)},ShopifyAPI.onError=function(XMLHttpRequest,textStatus){var data=eval("("+XMLHttpRequest.responseText+")");data.message&&alert(data.message+"("+data.status+"): "+data.description)},ShopifyAPI.addItemFromForm=function(form,callback,errorCallback){var params={type:"POST",url:"/cart/add.js",data:jQuery(form).serialize(),dataType:"json",success:function(line_item){typeof callback=="function"?callback(line_item,form):ShopifyAPI.onItemAdded(line_item,form)},error:function(XMLHttpRequest2,textStatus2){typeof errorCallback=="function"?errorCallback(XMLHttpRequest2,textStatus2):ShopifyAPI.onError(XMLHttpRequest2,textStatus2)}};jQuery.ajax(params)},ShopifyAPI.getCart=function(callback){jQuery.getJSON("/cart.js",function(cart,textStatus2){typeof callback=="function"?callback(cart):ShopifyAPI.onCartUpdate(cart)})},ShopifyAPI.changeItem=function(line,quantity,callback){var params={type:"POST",url:"/cart/change.js",data:"quantity="+quantity+"&line="+line,dataType:"json",success:function(cart){typeof callback=="function"?callback(cart):ShopifyAPI.onCartUpdate(cart)},error:function(XMLHttpRequest2,textStatus2){ShopifyAPI.onError(XMLHttpRequest2,textStatus2)}};jQuery.ajax(params)};var ajaxCart=function(module,$){"use strict";var init,loadCart,settings,isUpdating,$body,$formContainer,$addToCart,$cartCountSelector,$cartCostSelector,$cartContainer,$drawerContainer,updateCountPrice,formOverride,itemAddedCallback,itemErrorCallback,cartUpdateCallback,buildCart,cartCallback,adjustCart,adjustCartCallback,createQtySelectors,qtySelectors,validateQty;return init=function(options){settings={formSelector:'form[action^="/cart/add"]',cartContainer:"#CartContainer",addToCartSelector:".enj-add-to-cart-btn",cartCountSelector:null,cartCostSelector:null,moneyFormat:"$",disableAjaxCart:!1,enableQtySelectors:!0},$.extend(settings,options),$formContainer=$(settings.formSelector),$cartContainer=$(settings.cartContainer),$addToCart=$formContainer.find(settings.addToCartSelector),$cartCountSelector=$(settings.cartCountSelector),$cartCostSelector=$(settings.cartCostSelector),$body=$("body"),isUpdating=!1,settings.enableQtySelectors&&qtySelectors(),!settings.disableAjaxCart&&$addToCart.length&&formOverride(),adjustCart()},loadCart=function(){$body.addClass("drawer--is-loading"),ShopifyAPI.getCart(cartUpdateCallback)},updateCountPrice=function(cart){$cartCountSelector&&($cartCountSelector.html(cart.item_count).removeClass("hidden-count"),$(".product-popup").find(".product-item-count").html(cart.item_count),cart.item_count===0&&($cartCountSelector.addClass("hidden-count"),$(".js-number-cart").removeClass("active"))),$cartCostSelector&&$cartCostSelector.html(Shopify.formatMoney(cart.total_price,settings.moneyFormat))},formOverride=function(){$formContainer.on("submit",function(evt){evt.preventDefault();var $addToCart_btn=$(this).find(settings.addToCartSelector);$addToCart_btn.removeClass("is-added").addClass("is-adding"),$addToCart_btn.find("i").replaceWith('<i class="enj-loader-add-to-cart fsz-unset"><svg xml:space="preserve" style="enable-background:new 0 0 50 50;margin-top: -1px;" viewBox="0 0 24 30" height="20px" width="21px" y="0px" x="0px" xmlns:xlink="http://www.w3.org/1999/xlink" xmlns="http://www.w3.org/2000/svg" id="Layer_1" version="1.1"><rect opacity="0.2" fill="#fff" height="8" width="3" y="10" x="0"><animate repeatCount="indefinite" dur="0.6s" begin="0s" values="0.2; 1; .2" attributeType="XML" attributeName="opacity"/><animate repeatCount="indefinite" dur="0.6s" begin="0s" values="10; 20; 10" attributeType="XML" attributeName="height"/><animate repeatCount="indefinite" dur="0.6s" begin="0s" values="10; 5; 10" attributeType="XML" attributeName="y"/></rect><rect opacity="0.2" fill="#fff" height="8" width="3" y="10" x="8">      <animate repeatCount="indefinite" dur="0.6s" begin="0.15s" values="0.2; 1; .2" attributeType="XML" attributeName="opacity"/><animate repeatCount="indefinite" dur="0.6s" begin="0.15s" values="10; 20; 10" attributeType="XML" attributeName="height"/><animate repeatCount="indefinite" dur="0.6s" begin="0.15s" values="10; 5; 10" attributeType="XML" attributeName="y"/></rect><rect opacity="0.2" fill="#fff" height="8" width="3" y="10" x="16"><animate repeatCount="indefinite" dur="0.6s" begin="0.3s" values="0.2; 1; .2" attributeType="XML" attributeName="opacity"/><animate repeatCount="indefinite" dur="0.6s" begin="0.3s" values="10; 20; 10" attributeType="XML" attributeName="height"/><animate repeatCount="indefinite" dur="0.6s" begin="0.3s" values="10; 5; 10" attributeType="XML" attributeName="y"/></rect></svg></i>'),$(".qty-error").remove(),ShopifyAPI.addItemFromForm(evt.target,itemAddedCallback,itemErrorCallback)})},itemAddedCallback=function(product,form){var $addToCart_btn=$(form).find(settings.addToCartSelector);$addToCart_btn.removeClass("is-adding").addClass("is-added"),$addToCart_btn.find(".enj-loader-add-to-cart").html('<svg xmlns:dc="http://purl.org/dc/elements/1.1/" xmlns:cc="http://creativecommons.org/ns#" xmlns:rdf="http://www.w3.org/1999/02/22-rdf-syntax-ns#" xmlns:svg="http://www.w3.org/2000/svg" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 400" height="400" width="400" xml:space="preserve" id="svg2" version="1.1"><metadata id="metadata8"><rdf:RDF><cc:Work rdf:about=""><dc:format>image/svg+xml</dc:format><dc:type rdf:resource="http://purl.org/dc/dcmitype/StillImage"/></cc:Work></rdf:RDF></metadata><defs id="defs6"/><g transform="matrix(1.3333333,0,0,-1.3333333,0,400)" id="g10"><g transform="scale(0.1)" id="g12"><path id="path14" style="/* fill:#231f20; */fill-opacity:1;fill-rule:nonzero;stroke:none;" d="M 2539.18,1385.02 C 2479.15,849.23 2004.9,434.289 1446.39,470.129 931.406,503.16 516.711,917.871 483.672,1432.85 c -38.359,597.88 439.844,1099.19 1029.878,1099.19 78.39,0 149.09,-7.24 218.27,-21.98 42.37,-9.03 86.4,4.1 116.99,34.78 v 0 c 71.82,72.04 34.9,194.92 -64.67,215.74 -88.86,18.58 -179.73,29.87 -270.59,29.87 -709.417,0 -1290.445,-581.02 -1290.445,-1290.45 0,-709.418 581.028,-1290.449 1290.445,-1290.449 661.24,0 1210.92,504.781 1282.54,1147.799 8.47,76.02 -50.73,142.65 -127.21,142.65 h -2.45 c -65.64,0 -119.94,-49.75 -127.25,-114.98 z M 894.004,1654.48 v 0 c -49.668,-49.89 -49.578,-130.58 0.207,-180.36 L 1384.35,983.98 2584.51,2184.15 c 49.87,49.87 49.87,130.71 0,180.57 l -0.23,0.23 c -49.88,49.87 -130.74,49.85 -180.6,-0.03 L 1384.35,1344.99 1074.79,1654.67 c -49.94,49.95 -130.95,49.87 -180.786,-0.19"/></g></g></svg>'),$(".product-popup").find(".product-name").html(product.title),$(".product-popup").find(".product-price").html(Shopify.formatMoney(product.price,settings.moneyFormat)),$(".product-popup").find(".product-qty").html(product.quantity),$(".product-popup").find(".product-total").html(Shopify.formatMoney(product.line_price,settings.moneyFormat)),$(".product-popup").find(".product-image img").attr("src",product.image),showPopup(".product-popup"),ShopifyAPI.getCart(cartUpdateCallback)},itemErrorCallback=function(XMLHttpRequest,textStatus){var data=eval("("+XMLHttpRequest.responseText+")");$addToCart.removeClass("is-adding is-added"),$addToCart.find(".enj-loader-add-to-cart").remove(),data.message&&data.status==422&&$formContainer.after('<div class="errors qty-error">'+data.description+"</div>")},cartUpdateCallback=function(cart){updateCountPrice(cart),buildCart(cart)},buildCart=function(cart){if($cartContainer.empty(),cart.item_count===0){$cartContainer.append("<p>Your cart is currently empty.</p>"),cartCallback(cart);return}var items=[],item={},data2={},source=$("#CartTemplate").html(),template=Handlebars.compile(source);$.each(cart.items,function(index,cartItem){if(cartItem.image!=null)var prodImg=cartItem.image.replace(/(\.[^.]*)$/,"_small$1").replace("http:","");else var prodImg="//cdn.shopify.com/s/assets/admin/no-image-medium-cc9732cb976dd349a0df1d39816fbcc7.gif";item={id:cartItem.variant_id,line:index+1,url:cartItem.url,img:prodImg,name:cartItem.product_title,variation:cartItem.variant_title,properties:cartItem.properties,itemAdd:cartItem.quantity+1,itemMinus:cartItem.quantity-1,itemQty:cartItem.quantity,price:Shopify.formatMoney(cartItem.price,settings.moneyFormat),vendor:cartItem.vendor},items.push(item)}),data2={items:items,note:cart.note,totalPrice:Shopify.formatMoney(cart.total_price,settings.moneyFormat)},$(".product-popup").find(".product-total-cart").html(Shopify.formatMoney(cart.total_price,settings.moneyFormat)),$cartContainer.append(template(data2)),cartCallback(cart),$(".js-number-cart").addClass("active")},cartCallback=function(cart){$body.removeClass("drawer--is-loading"),$body.trigger("ajaxCart.afterCartLoad",cart)},adjustCart=function(){$body.on("click",".ajaxcart__qty-adjust",function(){var $el=$(this),line=$el.data("line"),$qtySelector2=$el.siblings(".ajaxcart__qty-num"),qty=parseInt($qtySelector2.val().replace(/\D/g,"")),qty=validateQty(qty);$el.hasClass("ajaxcart__qty--plus")?qty+=1:(qty-=1,qty<=0&&(qty=0)),line?updateQuantity(line,qty):$qtySelector2.val(qty)}),$body.on("click",".remove-product",function(){var $el=$(this),line=$el.data("line"),qty=0;line?updateQuantity(line,qty):$qtySelector.val(qty)}),$body.on("submit","form.ajaxcart",function(evt){isUpdating&&evt.preventDefault()}),$body.on("focus",".ajaxcart__qty-adjust",function(){var $el=$(this);setTimeout(function(){$el.select()},50)});function updateQuantity(line,qty){isUpdating=!0;var $row=$('.ajaxcart__row[data-line="'+line+'"]').addClass("is-loading");qty===0&&$row.parent().addClass("is-removed"),setTimeout(function(){ShopifyAPI.changeItem(line,qty,adjustCartCallback)},250)}$body.on("change",'textarea[name="note"]',function(){var newNote=$(this).val();ShopifyAPI.updateCartNote(newNote,function(cart){})})},adjustCartCallback=function(cart){isUpdating=!1,updateCountPrice(cart),setTimeout(function(){ShopifyAPI.getCart(buildCart)},150)},createQtySelectors=function(){$('input[type="number"]',$cartContainer).length&&$('input[type="number"]',$cartContainer).each(function(){var $el=$(this),currentQty=$el.val(),itemAdd=currentQty+1,itemMinus=currentQty-1,itemQty=currentQty,source=$("#AjaxQty").html(),template=Handlebars.compile(source),data2={id:$el.data("id"),itemQty:itemQty,itemAdd:itemAdd,itemMinus:itemMinus};$el.after(template(data2)).remove()})},qtySelectors=function(){var numInputs=$('input[type="number"]');numInputs.length&&(numInputs.each(function(){var $el=$(this),currentQty=$el.val(),inputName=$el.attr("name"),inputId=$el.attr("id"),itemAdd=currentQty+1,itemMinus=currentQty-1,itemQty=currentQty,source=$("#JsQty").html(),template=Handlebars.compile(source),data2={id:$el.data("id"),itemQty:itemQty,itemAdd:itemAdd,itemMinus:itemMinus,inputName:inputName,inputId:inputId};$el.after(template(data2)).remove()}),$(".js-qty__adjust").on("click",function(){var $el=$(this),id=$el.data("id"),$qtySelector2=$el.siblings(".js-qty__num"),qty=parseInt($qtySelector2.val().replace(/\D/g,"")),qty=validateQty(qty);$el.hasClass("js-qty__adjust--plus")?(qty+=1,console.log(qty),updatePricingQty(qty)):(qty-=1,qty<=1&&(qty=1),updatePricingQty(qty)),$qtySelector2.val(qty)}))},validateQty=function(qty){return parseFloat(qty)==parseInt(qty)&&!isNaN(qty)||(qty=1),qty},module={init:init,load:loadCart},module}(ajaxCart||{},jQuery);
//# sourceMappingURL=/s/files/1/0570/0947/1558/t/2/assets/ajax-cart.js.map?v=72842492715963651381656899353
