let cart = [];

function addToCart(course, price) {
  cart.push({ course, price });
  renderCart();
}

function renderCart() {
  const list = document.getElementById("cartItems");
  list.innerHTML = "";
  cart.forEach(item => {
    list.innerHTML += `<li>${item.course} - ৳${item.price}</li>`;
  });
}

function payNow() {
  window.location.href = "https://shop.bkash.com/hosenacademycom01841986933/paymentlink/default-payment";
}

async function sendMessage() {
  const data = {
    name: document.getElementById("name").value,
    email: document.getElementById("email").value,
    message: document.getElementById("message").value
  };

  const res = await fetch("/contact", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data)
  });

  if (res.ok) {
    alert("Message sent successfully!");
  } else {
    alert("Error sending message");
  }
}
