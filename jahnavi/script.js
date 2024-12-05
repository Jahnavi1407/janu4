let cart = JSON.parse(localStorage.getItem('cart')) || [];
let totalPrice = JSON.parse(localStorage.getItem('totalPrice')) || 0;

// Function to add items to the cart
function addToCart(itemName, price) {
    cart.push({ itemName, price });
    totalPrice += price;
    updateCart();
    saveCart();
}

// Function to remove items from the cart
function removeFromCart(index) {
    totalPrice -= cart[index].price;
    cart.splice(index, 1);
    updateCart();
    saveCart();
}

// Function to update the cart display
function updateCart() {
    // Update cart button text
    document.getElementById('cart-button').innerText = `Cart (${cart.length})`;

    // Update cart items display
    const cartItemsList = document.getElementById('cart-items');
    if (cartItemsList) {
        cartItemsList.innerHTML = ''; // Clear previous items
        cart.forEach((item, index) => {
            const li = document.createElement('li');
            li.innerHTML = `${item.itemName} - $${item.price} <button onclick="removeFromCart(${index})">Remove</button>`;
            cartItemsList.appendChild(li);
        });
    }

    // Update total price display
    document.getElementById('total-price').innerText = totalPrice;

    // Save cart and total price to localStorage
    saveCart();
}

// Save cart and total price to localStorage
function saveCart() {
    localStorage.setItem('cart', JSON.stringify(cart));
    localStorage.setItem('totalPrice', JSON.stringify(totalPrice));
}

// Function to clear the cart
function clearCart() {
    cart = [];
    totalPrice = 0;
    updateCart();
    saveCart();
}

// Function to show/hide the cart
function toggleCart() {
    const cartElement = document.getElementById('cart');
    if (cartElement.style.display === 'block') {
        cartElement.style.display = 'none';
    } else {
        cartElement.style.display = 'block';
    }
}

// Function to redirect to the checkout page
function goToCheckout() {
    if (cart.length === 0) {
        alert('Your cart is empty!');
    } else {
        window.location.href = 'checkout.html'; // Redirect to checkout page
    }
}

// Load cart data on checkout page
function loadCheckout() {
    const checkoutItems = document.getElementById('checkout-items');
    checkoutItems.innerHTML = ''; // Clear any existing items

    // Get cart data and total price from localStorage
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const totalPrice = JSON.parse(localStorage.getItem('totalPrice')) || 0;

    // Display cart items
    cart.forEach(item => {
        const li = document.createElement('li');
        li.innerHTML = `${item.itemName} - $${item.price}`;
        checkoutItems.appendChild(li);
    });

    // Display total price
    const checkoutTotal = document.getElementById('checkout-total');
    checkoutTotal.innerText = totalPrice;
}

// Handle checkout form submission (this is just for demo purposes)
document.getElementById('checkout-form')?.addEventListener('submit', (e) => {
    e.preventDefault();
    alert('Thank you for your purchase! We hope you enjoy creating beautiful art!');
    clearCart(); // Clear the cart after successful purchase
});

// Load checkout data when the page loads
window.onload = function() {
    // If we're on the checkout page, load cart data
    if (window.location.pathname === '/checkout.html') {
        loadCheckout();
    }

    // If we're on a page with the cart button, update the cart display
    if (document.getElementById('cart-button')) {
        updateCart();
    }
};
