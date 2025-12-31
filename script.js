let cart = [];

// Toggle Cart
function toggleCart() {
  document.getElementById("cartDrawer").classList.toggle("open");
}

// Add to Cart
function addToCart(courseName, price) {
  cart.push({ course: courseName, price: price });
  updateCart();
  toggleCart();
}

// Update Cart UI
function updateCart() {
  const cartItems = document.getElementById("cartItems");
  const cartTotal = document.getElementById("cartTotal");
  const cartCount = document.getElementById("cartCount");

  cartItems.innerHTML = "";
  let total = 0;

  cart.forEach((item,index)=>{
    total+=item.price;
    cartItems.innerHTML+=`
      <div class="cart-item">
        <span>${item.course} - ৳${item.price}</span>
        <button onclick="removeItem(${index})">X</button>
      </div>
    `;
  });

  cartTotal.innerText = total;
  cartCount.innerText = cart.length;
}

// Remove item
function removeItem(index){
  cart.splice(index,1);
  updateCart();
}

// bKash Payment
function payNow(){
  if(cart.length===0){ alert("Cart is empty!"); return; }
  const totalAmount = cart.reduce((sum,item)=>sum+item.price,0);
  alert(`You will pay ৳${totalAmount} via bKash`);
  window.location.href="https://shop.bkash.com/hosenacademycom01841986933/paymentlink/default-payment";
}

// Contact Form
async function sendMessage(){
  const data = {
    name: document.getElementById("name").value,
    email: document.getElementById("email").value,
    message: document.getElementById("message").value
  };

  const res = await fetch("/contact",{
    method:"POST",
    headers:{"Content-Type":"application/json"},
    body:JSON.stringify(data)
  });

  if(res.ok){ alert("Message sent successfully!"); }
  else { alert("Error sending message"); }

  document.getElementById("contactForm").reset();
}
