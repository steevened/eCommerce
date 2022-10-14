const btnCart = document.querySelector(".btnCar");
const btnCheckout = document.querySelector(".btnCheckout");
const cart = document.querySelector(".car");
const closeBtn = document.querySelector(".closeBtn");
const btnBuy = document.querySelectorAll(".btnBuy");
const emptyCart = document.querySelector(".car__content-imgEmpty");
const carContent = document.querySelector(".car__content");
const increment = document.querySelector(".increment");
const cartImg = document.querySelector(".cart-img");
const totalValue = document.querySelector(".car__total-quant");
let cartArr = JSON.parse(localStorage.getItem("items")) ?? [];
addItem();

btnCart.addEventListener("click", () => {
  cart.classList.toggle("showed");
});

closeBtn.addEventListener("click", () => {
  cart.classList.toggle("showed");
});

btnCheckout.addEventListener("click", checkout);

document.addEventListener("click", (e) => {
  if (e.target.classList.contains("btnBuy")) {
    const img =
      e.target.parentElement.parentElement.parentElement.firstElementChild
        .firstElementChild.outerHTML;
    // console.log(img);

    const price =
      e.target.parentElement.parentElement.firstElementChild.firstElementChild.textContent.split(
        " "
      );

    const name =
      e.target.parentElement.parentElement.firstElementChild.firstElementChild
        .nextSibling.nextSibling.textContent;

    const stock =
      e.target.parentElement.parentElement.firstElementChild.nextElementSibling
        .textContent;

    let amount = 1;

    verifyCart(img, name, price, amount, stock);
  }

  if (e.target.classList.contains("add")) {
    add(e.target.getAttribute("name"));
  } else if (e.target.classList.contains("subst")) {
    substract(e.target.getAttribute("name"));
  } else if (e.target.classList.contains("del")) {
    delet(e.target.getAttribute("name"));
  }

  addItem();
  localStorage.setItem("items", JSON.stringify(cartArr));
});

function verifyCart(img, name, price, amount, stock) {
  let bool = true;
  if (cartArr.length > 0) {
    for (let i of cartArr) {
      if (i.name === name && i.amount < i.stock) {
        i.amount++;
      }

      if (i.name === name) {
        bool = false;
      }
    }
  }
  if (bool) {
    cartArr.push({
      img,
      name,
      price,
      amount,
      stock: Number(stock.replace("Stock:", "")),
    });
  }
}

function addItem() {
  let price = 0;
  let total = 0;
  const items = cartArr.map((item) => {
    price = Number(item.price[0].replace("$", "")) * item.amount;
    total += price;
    console.log(price);
    totalValue.innerHTML = price ? `$${total}` : 0;

    if (cartArr.length > 0) {
      cartImg.classList.add("hide");
    } else {
      cartImg.classList.remove("hide");
    }

    increment.textContent = cartArr.length;

    return `
        
        <div class="car__content--items">
          <div class="car-item-img">
            ${item.img}
          </div>
          <div class="car-items-info">
            <h4>${item.name}</h4>
            <p>Stock: ${item.stock} | <span>${item.price}</span></p>
            <p>Subtotal:${price} </p>
            <div class="car-item-info-counters">
              <div name="${item.name}" class="counter-box subst"><p class="subst" name="${item.name}">-</p></div>
              <p>${item.amount} Units</p>
              <div name="${item.name}" class="counter-box add"><p name="${item.name}" class="add">+</p></div>
            </div>
          </div>
          <div name="${item.name}" class="del car-trash">
            <span name="${item.name}" class=" del material-symbols-outlined"> delete </span>
          </div>
        </div>`;
  });
  carContent.innerHTML = items.join("");
}

function add(e) {
  const add = cartArr.findIndex((item) => {
    return item.name === e;
  });
  if (cartArr[add].amount < cartArr[add].stock) {
    cartArr[add].amount++;
  }
}

function substract(e) {
  const subst = cartArr.findIndex((item) => {
    return item.name === e;
  });
  if (cartArr[subst].amount > 1) {
    cartArr[subst].amount--;
  }
}

function delet(e) {
  const arr = cartArr.filter((item) => {
    return item.name !== e;
  });
  cartArr = [...arr];
}

function checkout() {
  carContent.innerHTML = ``;
  cartArr = [];
  totalValue.innerHTML = 0;
}
