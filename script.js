let menu = document.querySelector('#menu-bar');
let navbar = document.querySelector('.navbar');
let cartIcon = document.querySelector('#cart-icon');
let cartModal = document.querySelector('#cart-modal');
let closeCart = document.querySelector('#close-cart');
let cartContent = document.querySelector('.cart-content');
let totalPrice = document.querySelector('.total-price');
let cartCount = document.querySelector('#cart-count');
let items = JSON.parse(localStorage.getItem('cartItems')) || [];

// Authentication elements
const userMenu = document.getElementById('user-menu');
const userStatus = document.getElementById('user-status');
const authModal = document.getElementById('auth-modal');
const closeAuth = document.getElementById('close-auth');
const showLogin = document.getElementById('show-login');
const showRegister = document.getElementById('show-register');
const loginForm = document.getElementById('login-form');
const registerForm = document.getElementById('register-form');

// Payment elements
const paymentModal = document.getElementById('payment-modal');
const closePayment = document.getElementById('close-payment');
const paymentForm = document.getElementById('payment-form');

// Menu toggle
menu.onclick = () => {
    menu.classList.toggle('fa-times');
    navbar.classList.toggle('active');
};

// Scroll behavior
window.onscroll = () => {
    menu.classList.remove('fa-times');
    navbar.classList.remove('active');
    if (window.scrollY > 60) {
        document.querySelector('#scroll-top').classList.add('active');
    } else {
        document.querySelector('#scroll-top').classList.remove('active');
    }
};

// Loader
function loader() {
    document.querySelector('.loader-container').classList.add('fade-out');
}

function fadeOut() {
    setTimeout(loader, 3000);
}

window.onload = () => {
    fadeOut();
    updateCart();
    checkUser();
    animateSections();
    const savedFilter = localStorage.getItem('menuFilter') || 'all';
    document.querySelector(`.filter-btn[data-filter="${savedFilter}"]`).click();
};

// Intersection Observer for section animations
function animateSections() {
    const sections = document.querySelectorAll('.home .content, .specality .box, .popular .box, .steps .box, .gallery .box, .review .box');
    const observer = new IntersectionObserver(
        (entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                }
            });
        },
        { threshold: 0.1 }
    );
    sections.forEach(section => observer.observe(section));
}

// Cart functionality
cartIcon.onclick = () => {
    cartModal.classList.toggle('active');
};

closeCart.onclick = () => {
    cartModal.classList.remove('active');
};

// Add to cart
function addToCart(name, price, img) {
    let existingItem = items.find(item => item.name === name);
    if (existingItem) {
        existingItem.quantity++;
    } else {
        items.push({ name, price, img, quantity: 1 });
    }
    localStorage.setItem('cartItems', JSON.stringify(items));
    updateCart();
    cartCount.classList.add('updated');
    setTimeout(() => cartCount.classList.remove('updated'), 300);
}

// Update cart
function updateCart() {
    cartContent.innerHTML = '';
    let total = 0;
    items.forEach(item => {
        total += item.price * item.quantity;
        const cartBox = document.createElement('div');
        cartBox.classList.add('cart-box');
        cartBox.innerHTML = `
            <img src="${item.img}" alt="${item.name}" class="cart-img">
            <div class="detail-box">
                <div class="cart-food-title">${item.name}</div>
                <div class="price-box">
                    <div class="cart-price">$${item.price.toFixed(2)}</div>
                    <div class="cart-amt">
                        <button class="quantity-btn" onclick="changeQuantity('${item.name}', -1)">-</button>
                        <span>${item.quantity}</span>
                        <button class="quantity-btn" onclick="changeQuantity('${item.name}', 1)">+</button>
                    </div>
                </div>
            </div>
            <i class="fas fa-trash cart-remove" onclick="removeItem('${item.name}')"></i>
        `;
        cartContent.appendChild(cartBox);
        setTimeout(() => cartBox.classList.add('added'), 10);
    });
    totalPrice.innerHTML = `$${total.toFixed(2)}`;
    cartCount.innerHTML = items.reduce((sum, item) => sum + item.quantity, 0);
}

// Change quantity
function changeQuantity(name, delta) {
    let item = items.find(item => item.name === name);
    if (item) {
        item.quantity += delta;
        if (item.quantity <= 0) {
            items = items.filter(i => i.name !== name);
        }
        localStorage.setItem('cartItems', JSON.stringify(items));
        updateCart();
    }
}

// Remove item
function removeItem(name) {
    items = items.filter(item => item.name !== name);
    localStorage.setItem('cartItems', JSON.stringify(items));
    updateCart();
}

// Proceed to payment
document.querySelector('.btn-buy').onclick = () => {
    if (items.length === 0) {
        alert('Please add items to cart first!');
        return;
    }
    if (!localStorage.getItem('foodapp_user')) {
        alert('Please login to proceed with payment.');
        authModal.classList.add('active');
        showLoginTab();
        return;
    }
    cartModal.classList.remove('active');
    paymentModal.classList.add('active');
};

// Payment form submission
paymentForm.onsubmit = (e) => {
    e.preventDefault();
    alert('Payment processed successfully! Your order is confirmed.');
    items = [];
    localStorage.setItem('cartItems', JSON.stringify(items));
    updateCart();
    paymentModal.classList.remove('active');
};

closePayment.onclick = () => {
    paymentModal.classList.remove('active');
};

// Add to cart buttons
document.querySelectorAll('.popular .box .btn, .gallery .box .btn').forEach(btn => {
    btn.onclick = (e) => {
        e.preventDefault();
        const box = btn.closest('.box');
        const name = box.querySelector('h3').textContent;
        const priceText = box.querySelector('.price')?.textContent || '$10';
        const price = parseFloat(priceText.replace('$', '').split('-')[0]) || 10;
        const img = box.querySelector('img').src;
        addToCart(name, price, img);
    };
});

// Menu filter
document.querySelectorAll('.filter-btn').forEach(btn => {
    btn.onclick = () => {
        const filter = btn.getAttribute('data-filter');
        localStorage.setItem('menuFilter', filter);
        document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        const boxes = document.querySelectorAll('.popular .box');
        boxes.forEach(box => {
            box.style.display = (filter === 'all' || box.getAttribute('data-category') === filter) ? 'block' : 'none';
            if (box.style.display === 'block') {
                box.classList.add('visible');
            } else {
                box.classList.remove('visible');
            }
        });
    };
});

// Authentication logic
function setUser(username) {
    localStorage.setItem('foodapp_user', username);
    userStatus.textContent = username;
}

function logoutUser() {
    localStorage.removeItem('foodapp_user');
    userStatus.textContent = 'Login';
}

function checkUser() {
    const user = localStorage.getItem('foodapp_user');
    if (user) {
        userStatus.textContent = user;
    } else {
        userStatus.textContent = 'Login';
    }
}

userMenu.onclick = function(e) {
    e.preventDefault();
    if (localStorage.getItem('foodapp_user')) {
        if (confirm('Logout?')) {
            logoutUser();
        }
    } else {
        authModal.classList.add('active');
        showLoginTab();
    }
};

closeAuth.onclick = function() {
    authModal.classList.remove('active');
};

window.onclick = function(event) {
    if (event.target === authModal) authModal.classList.remove('active');
    if (event.target === cartModal) cartModal.classList.remove('active');
    if (event.target === paymentModal) paymentModal.classList.remove('active');
};

function showLoginTab() {
    showLogin.classList.add('active');
    showRegister.classList.remove('active');
    loginForm.style.display = 'block';
    registerForm.style.display = 'none';
}

function showRegisterTab() {
    showRegister.classList.add('active');
    showLogin.classList.remove('active');
    loginForm.style.display = 'none';
    registerForm.style.display = 'block';
}

showLogin.onclick = showLoginTab;
showRegister.onclick = showRegisterTab;

loginForm.onsubmit = function(e) {
    e.preventDefault();
    const username = document.getElementById('login-username').value;
    const password = document.getElementById('login-password').value;
    const regUser = localStorage.getItem('foodapp_reguser_' + username);
    if (regUser && JSON.parse(regUser).password === password) {
        setUser(username);
        authModal.classList.remove('active');
        alert('Login successful!');
    } else {
        alert('Invalid credentials!');
    }
};

registerForm.onsubmit = function(e) {
    e.preventDefault();
    const username = document.getElementById('register-username').value;
    const password = document.getElementById('register-password').value;
    if (localStorage.getItem('foodapp_reguser_' + username)) {
        alert('Username already exists!');
        return;
    }
    localStorage.setItem('foodapp_reguser_' + username, JSON.stringify({ username, password }));
    alert('Registration successful! Please login.');
    showLoginTab();
};