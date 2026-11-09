
const foods = [
    {
        name: "Cheese Pizza",
        category: "Pizza",
        price: 899,
        image: "https://images.unsplash.com/photo-1571407970349-bc81e7e96d47?w=600",
        description: "Delicious cheesy homemade pizza."
    },
    {
        name: "Zinger Burger",
        category: "Burger",
        price: 499,
        image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=600",
        description: "Crispy chicken with special sauce."
    },
    {
        name: "Chicken Roll",
        category: "Rolls",
        price: 250,
        image: "https://images.unsplash.com/photo-1626700051175-6818013e1d4f?w=600",
        description: "Fresh and spicy chicken roll."
    },
    {
        name: "Masala Fries",
        category: "Fries",
        price: 220,
        image: "https://images.unsplash.com/photo-1573080496219-bb080dd4f877?w=600",
        description: "Crispy fries with chatpata masala."
    },
    {
        name: "Cold Drink",
        category: "Drinks",
        price: 100,
        image: "https://images.unsplash.com/photo-1544145945-f90425340c7e?w=600",
        description: "Refreshing chilled drink."
    },
    {
        name: "Beef Burger",
        category: "Burger",
        price: 599,
        image: "https://images.unsplash.com/photo-1550547660-d9450f859349?w=600",
        description: "Juicy burger with fresh toppings."
    }
];

let cart = [];

const foodGrid = document.getElementById("foodGrid");

function displayFoods() {
    foodGrid.innerHTML = foods.map((food, index) => `
        <div class="food-card">
            <img src="${food.image}" alt="${food.name}">
            <h3>${food.name}</h3>
            <p>${food.description}</p>
            <h4>Rs. ${food.price}</h4>
            <button onclick="addToCart(${index})">
                Add To Cart +
            </button>
        </div>
    `).join("");
}

function addToCart(index) {
    const food = foods[index];
    const existing = cart.find(item => item.name === food.name);

    if (existing) {
        existing.quantity++;
    } else {
        cart.push({...food, quantity: 1});
    }

    updateCart();
}

function updateCart() {
    let count = 0;
    let total = 0;

    document.getElementById("cartItems").innerHTML =
        cart.map((item, index) => {
            count += item.quantity;
            total += item.price * item.quantity;

            return `
                <div class="cart-item">
                    <span>
                        ${item.name} x ${item.quantity}
                    </span>
                    <span>
                        Rs. ${item.price * item.quantity}
                        <button onclick="removeItem(${index})">✖</button>
                    </span>
                </div>
            `;
        }).join("");

    document.getElementById("count").innerText = count;
    document.getElementById("total").innerText = total;
}

function removeItem(index) {
    cart.splice(index, 1);
    updateCart();
}

function showCart() {
    document.getElementById("cartBox").classList.add("show");
}

function closeCart() {
    document.getElementById("cartBox").classList.remove("show");
}

function toggleMenu() {
    document.getElementById("navLinks").classList.toggle("active");
}

function copyOrder() {
    if (cart.length === 0) {
        alert("Your cart is empty!");
        return;
    }

    let order = "Food To Go Order\n";

    cart.forEach(item => {
        order += `${item.name} x ${item.quantity} = Rs. ${item.price * item.quantity}\n`;
    });

    const total = cart.reduce(
        (sum, item) => sum + item.price * item.quantity, 0
    );

    order += `Total: Rs. ${total}\n`;
    order += "Address: Alkaram Apsara Apartment, Liaquatabad No. 10, Karachi";

    navigator.clipboard.writeText(order)
        .then(() => alert("Order copied! Share it with us to confirm."))
        .catch(() => alert(order));
}

displayFoods();
