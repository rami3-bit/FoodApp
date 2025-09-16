import { menuArray } from "./data.js";

// init basket baserat på menuArray
const basket = {};
menuArray.forEach(item => basket[item.id] = 0);

// rendera menyn
const menuList = document.getElementById("menu-list");
let menuHtml = "";
menuArray.forEach(item => {
	menuHtml += `
    <li class="li-menu">
        <div>
        	<span class="icon">${item.emoji}</span>
		<div>

            <div class="menu-item">

                <strong class="name">${item.name}</strong>
			
                <p class="ingredients">${Array.isArray(item.ingredients) ? item.ingredients.join(", ") : item.ingredients}</p>
			
                <p class="price" id="price-${item.id}">${item.price} $</p>   
				
            </div>

        <div class="menu-btn">
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
		if (basket[productId] > 0) {
			basket[productId]--;
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
        <div class="order-name-wrapper">
            <span class="order-name">${item.name}</span>
        </div>
        <div class="order-qty-wrapper">
            <span class="order-qty">x${qty}</span>
        </div>
        <div class="order-price-wrapper">
            <span class="order-price">${item.price * qty} $</span>
        </div>
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

// renderar modal vid click på complete order
document.addEventListener("click", (e) => {
    if (e.target.classList.contains("complete-order")) {
        const modal = document.querySelector(".modal");
        modal.style.display = "block";
    }
});
// stänger complete order modal
const modal = document.getElementById("modal");
const closeBtn = document.getElementById("close-modal");

closeBtn.addEventListener("click", () => {
    modal.style.display = "none";
});

// visa initial state
renderTotalAmount();
