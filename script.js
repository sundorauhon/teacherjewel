const courses = [
    { id: 1, name: "Class 6: All Subjects", price: 1000 },
    { id: 2, name: "Class 7: All Subjects", price: 1200 },
    { id: 3, name: "Class 8: All Subjects", price: 1500 },
    { id: 4, name: "Class 9: General Math", price: 800 },
    { id: 5, name: "Class 10: SSC Special", price: 2000 }
];

let cart = [];

function displayCourses() {
    const container = document.getElementById('course-display');
    container.innerHTML = courses.map(course => `
        <div class="card">
            <h3>${course.name}</h3>
            <p>Full Semester Access</p>
            <p class="price">৳${course.price}</p>
            <button class="add-btn" onclick="addToCart(${course.id})">Add to Cart</button>
        </div>
    `).join('');
}

function addToCart(id) {
    const item = courses.find(c => c.id === id);
    if (!cart.find(c => c.id === id)) {
        cart.push(item);
        updateCart();
    }
}

function updateCart() {
    const cartItems = document.getElementById('cart-items');
    const totalPrice = document.getElementById('total-price');
    const cartCount = document.getElementById('cart-count');
    
    // For Form Submission
    const hiddenCourses = document.getElementById('hidden-courses');
    const hiddenTotal = document.getElementById('hidden-total');

    if (cart.length === 0) {
        cartItems.innerHTML = '<p class="empty-msg">No courses added yet.</p>';
    } else {
        cartItems.innerHTML = cart.map((item, index) => `
            <div style="display:flex; justify-content:space-between; margin-bottom:10px;">
                <span>${item.name}</span>
                <button onclick="removeItem(${index})" style="color:red; border:none; background:none; cursor:pointer;">Remove</button>
            </div>
        `).join('');
    }

    const total = cart.reduce((sum, item) => sum + item.price, 0);
    totalPrice.innerText = total;
    cartCount.innerText = cart.length;

    // Prepare data for the email form
    hiddenCourses.value = cart.map(c => c.name).join(', ');
    hiddenTotal.value = total;
}

function removeItem(index) {
    cart.splice(index, 1);
    updateCart();
}

function toggleCart() {
    document.getElementById('cart-sidebar').classList.toggle('active');
}

displayCourses();