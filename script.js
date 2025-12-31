const courses = [
    { id: 1, name: "Class 6: All Subjects", price: 1000 },
    { id: 2, name: "Class 7: All Subjects", price: 1200 },
    { id: 3, name: "Class 8: All Subjects", price: 1500 },
    { id: 4, name: "Class 9: Science Batch", price: 2000 },
    { id: 5, name: "Class 10: SSC Batch", price: 2500 }
];

let cart = [];

// Load courses into HTML
function renderCourses() {
    const list = document.getElementById('course-list');
    list.innerHTML = courses.map(c => `
        <div class="card">
            <h3>${c.name}</h3>
            <span class="price-tag">৳${c.price}</span>
            <button class="add-btn" onclick="addToCart(${c.id})">Add to Cart</button>
        </div>
    `).join('');
}

function addToCart(id) {
    const product = courses.find(c => c.id === id);
    if (!cart.find(c => c.id === id)) {
        cart.push(product);
        updateCart();
        // Automatically open cart on mobile when item added
        if(window.innerWidth < 992) toggleCart();
    }
}

function updateCart() {
    const cartList = document.getElementById('cart-items-list');
    const totalText = document.getElementById('total-price');
    const countText = document.getElementById('cart-count');
    const hiddenCourses = document.getElementById('hidden-courses');
    const hiddenTotal = document.getElementById('hidden-total');

    if (cart.length === 0) {
        cartList.innerHTML = '<p class="empty-text">Your cart is empty</p>';
    } else {
        cartList.innerHTML = cart.map((item, index) => `
            <div style="display:flex; justify-content:space-between; padding: 10px 0; border-bottom: 1px solid #eee;">
                <span>${item.name}</span>
                <button onclick="removeItem(${index})" style="color:red; border:none; background:none; cursor:pointer;">Remove</button>
            </div>
        `).join('');
    }

    const total = cart.reduce((sum, item) => sum + item.price, 0);
    totalText.innerText = total;
    countText.innerText = cart.length;

    // Fill the hidden fields for Formspree
    hiddenCourses.value = cart.map(c => c.name).join(', ');
    hiddenTotal.value = '৳' + total;
}

function removeItem(index) {
    cart.splice(index, 1);
    updateCart();
}

function toggleCart() {
    document.getElementById('sidebar').classList.toggle('active');
}

// Initial Run
renderCourses();