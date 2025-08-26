import { menuArray } from "./data.js";

// init basket baserat på menuArray
const basket = {};
menuArray.forEach(item => basket[item.id] = 0);

// rendera menyn
const menuList = document.getElementById("menu-list");
let menuHtml = "";
menuArray.forEach(item => {
	menuHtml += `
		<li class="items">
			<div class="menu-row">
				<span class="icon">${item.emoji}</span>
				<div class="menu-info">
					<strong class="name">${item.name}</strong>
					<p class="ingredients">${Array.isArray(item.ingredients) ? item.ingredients.join(", ") : item.ingredients}</p>
					<p class="price" id="price-${item.id}">${item.price} $</p>
				</div>
			</div>
			<div class="buttons">
				<button class="addfood-btn" data-id="${item.id}">+</button>
				<button class="removefood-btn" data-id="${item.id}">-</button>
			</div>
		</li>
		<hr class="menu-hr">
	`;
});
menuList.innerHTML = menuHtml;



// lägger till varor i kundvagn
const addFoodBtn = document.querySelectorAll(".addfood-btn");

addFoodBtn.forEach(addBtn => {
    addBtn.addEventListener("click", (e) => {
        const productId = Number(e.currentTarget.dataset.id);
        basket[productId] = (basket[productId] || 0) + 1;
        const amountEl = document.getElementById(`amount-${productId}`);
        if (amountEl) amountEl.textContent = `(${basket[productId]})`;
        renderTotalAmount();
    });
});


// tar bort varor från kundvagn
const removefoodBtn = document.querySelectorAll(".removefood-btn")

removefoodBtn.forEach(removeBtn => {
	
	removeBtn.addEventListener("click", (e) => {
		const productId = Number(e.currentTarget.dataset.id);
		const amountEl = document.getElementById(`amount-${productId}`);
		if (basket[productId] > 0) {
			basket[productId]--;
			amountEl.textContent = `(${basket[productId]})`
			
			if (amountEl) amountEl.textContent = `(${basket[productId]})`;
				basket[productId]--
		}
		renderTotalAmount();
		
	})
});


// Korg, visar totala tillagda varor
function renderTotalAmount() {
    let total = 0;
    let hasItems = false;
    let orderHtml = `<h2>Your order</h2><ul>`;

    menuArray.forEach(item => {
        const qty = basket[item.id] || 0;
        if (qty > 0) {
            hasItems = true;
            orderHtml += `
			<li class="item-amount">
				<span class="order-name">${item.name}</span>
				<span class="order-qty">x${qty}</span>
				<span class="order-price">${item.price * qty} $</span>
			</li>`;
            total += qty * item.price;
        }
    });

    orderHtml += `<hr class="order-hr">
	<div class="order">
		<div>
			<p id="total-amount">Total price: ${total} $</p>
		</div>
		<div>
			<button class="complete-order">Complete order</button>
		</div>
	</div>	`;
	

    const orderDiv = document.querySelector(".order");
    if (orderDiv) orderDiv.innerHTML = hasItems ? orderHtml : "";
}

// renderar modal



// visa initial state
renderTotalAmount();
