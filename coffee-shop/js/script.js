let cart = JSON.parse(localStorage.getItem('cart')) || [];

function updateCartCount() {
    document.getElementById('cart-count').textContent = cart.length;
}

function addToCart(name, price) {
    cart.push({ name, price: parseFloat(price) });
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartCount();
    alert(`${name} added to cart`);
}


document.querySelectorAll('.add-to-cart').forEach(button => {
    button.addEventListener('click', () => {
        const name = button.dataset.name;
        const price = button.dataset.price;
        addToCart(name, price);
    });
});


if (document.getElementById('cart-items')) {
    const cartItemsContainer = document.getElementById('cart-items');
    const totalPriceEl = document.getElementById('total-price');
    cartItemsContainer.innerHTML = '';
    let total = 0;
    cart.forEach((item, index) => {
        total += item.price;
        const div = document.createElement('div');
        div.classList.add('cart-item');
        div.innerHTML = `
            <span>${item.name} - $${item.price.toFixed(2)}</span>
            <button onclick="removeItem(${index})">Remove</button>
        `;
        cartItemsContainer.appendChild(div);
    });
    totalPriceEl.textContent = total.toFixed(2);
}

function removeItem(index) {
    cart.splice(index, 1);
    localStorage.setItem('cart', JSON.stringify(cart));
    location.reload();
}


const checkoutForm = document.getElementById('checkout-form');
if (checkoutForm) {
    checkoutForm.addEventListener('submit', (e) => {
        e.preventDefault();
        alert('Order placed successfully!');
        cart = [];
        localStorage.setItem('cart', JSON.stringify(cart));
        location.href = 'index.html';
    });
}


updateCartCount();
