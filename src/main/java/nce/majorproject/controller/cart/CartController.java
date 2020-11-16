package nce.majorproject.controller.cart;


import lombok.extern.slf4j.Slf4j;
import nce.majorproject.constant.Route;
import nce.majorproject.dto.Response;
import nce.majorproject.dto.cart.*;
import nce.majorproject.entities.Cart;
import nce.majorproject.repositories.CartRepository;
import nce.majorproject.services.CartService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;

@RestController
@RequestMapping(Route.CART)
@Slf4j
public class CartController {
    private CartRepository cartRepository;
    private CartService cartService;
    @Autowired
    public CartController(CartRepository cartRepository,CartService cartService){
        this.cartRepository=cartRepository;
        this.cartService=cartService;
    }
    @PostMapping(value="/show")
    public List<ShowInCartById> showCart(@Valid @RequestBody CartRequest reqUserId){

        return cartService.showCart(reqUserId);
    }
    @PostMapping(value="/remove")
    public Response removeCart(@RequestBody CartRemove cartRemove){

        return cartService.removeFromCart(cartRemove);
    }
    @PostMapping(value="/add")
    public Response addToCart(@RequestBody CartAdd addInCart){

        return cartService.addToCart(addInCart);
    }
    @PostMapping(value="/remove-all")
    public Response removeAllFromCart(@RequestBody CartRemove cartRemove){

        return cartService.removeAllFromCart(cartRemove);
    }

    @GetMapping("/checkout-all")
    public Response checkOutFromCart(){

        log.info("Checkout from the cart");

        return cartService.checkOutAllCart();
    }
    @GetMapping("/checkout-by-id/{id}")
    public Response checkOutByCartId(@PathVariable("id")Long id){

        log.info("checkout this cart id::");

        return  cartService.checkOutByCartId(id);
    }
    @GetMapping("/checkout-list")
    public List<Cart> allCheckedOutList(){
        return  cartService.listCheckout();
    }
    @GetMapping
    public List<ShowInCartById> findPopularItem(){

        log.info("Showing most popular items");

        return cartService.findPopularProducts();
    }

}

