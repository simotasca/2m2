import { CartProduct } from "../shared/cart";

// export class LocalCart {
//   static get() {
//     const cart: CartProduct[] = JSON.parse(
//       localStorage.getItem("cart") || "[]"
//     );
//     return cart;
//   }

//   static removeProduct(p: CartProduct) {
//     let cart = this.get();
//     cart = cart.filter((c) => c.id != p.id);
//     this.save(cart);
//     return cart;
//   }

//   static addProduct(p: CartProduct) {
//     const cart = this.get();
//     if (cart.find((c) => c.id === p.id)) return cart;
//     // filtro manualmente perchè solitamente il CartProduct è un EcodatArticle completo
//     const prodOk: CartProduct = {
//       id: p.id,
//       brand: p.brand,
//       item: p.item,
//       model: p.model,
//       oeCode: p.oeCode,
//       price: p.price,
//     };
//     cart.push(prodOk);
//     this.save(cart);
//     return cart;
//   }

//   private static save(cart: CartProduct[]) {
//     localStorage.setItem("cart", JSON.stringify(cart));
//   }
// }

export class CookieCart {
  static addProduct(p: Pick<CartProduct, "id">) {
    const curr = this.get();
    curr.add(p.id.toString());
    this.set(curr);
  }

  static removeProduct(p: Pick<CartProduct, "id">) {
    const curr = this.get();
    curr.delete(p.id.toString());
    this.set(curr);
  }

  static get() {
    return new Set(
      document.cookie
        .split(";")
        .find((c) => c.split("=")[0] === " cart")
        ?.split("=")[1]
        ?.split("_") || []
    );
  }

  private static set(ids: Set<string>) {
    document.cookie = "cart=" + Array.from(ids.values()).join("_");
  }
}
