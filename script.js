// Dishes - JSON array 
let dishes = [
    {
        'img': './img/pexels_banana_1.jpg',
        'name': 'Banana Bread',
        'detail': 'Banana bread is a type of sweet bread made from mashed bananas. It is often a moist and sweet quick bread but some recipes are yeast raised.',
        'price': 10.50,
    },
    {
        'img': './img/pexels_banana_2.jpg',
        'name': 'Banana Cake',
        'detail': 'A banana cake is a cake prepared using banana as a primary ingredient and typical cake ingredients.',
        'price': 15.50,
    },
    {
        'img': './img/pexels_banana_3.jpg',
        'name': 'Banana Milk',
        'detail': 'Korean Banana Milk. Creamy, delicious, banana flavoured milk made with just 4 ingredients!',
        'price': 5.50,
    },
    {
        'img': './img/pexels_banana_4.jpg',
        'name': 'Banana Pancake',
        'detail': 'Fluffy on the inside, crispy on the outside, and delicately flavored with bananas and vanilla',
        'price': 7.50,
    },

];


// Shopping basket - arrays
let basketDishesImages = [];
let basketDishesNames = [];
let basketDishesPrice = [];
let basketDishesAmount = [];


// Render dishes
function renderDishes() {
    let allDishes = document.getElementById('dishes');
    allDishes.innerHTML = '';   // Clear/delete everything
    for (let i = 0; i < dishes.length; i++) {   // Iteration through each element in JSON array
        const dish = dishes[i];

        allDishes.innerHTML += dishCard(i);
    }

}


// Render shopping basket 
function renderShoppingBasket() {
    let shoppingBasket = document.getElementById('shopping-basket');
    shoppingBasket.innerHTML = '';  // Clear/delete everything

    if (basketDishesNames.length == 0) {    // Render empty basket
        shoppingBasket.innerHTML = emptyShoppedDishCard();
        
    } else {
        
        for (let i = 0; i < basketDishesNames.length; i++) {    // Iteration through each element in arrays -> doesn't matter with array - all the same length
            const shoppedDish = basketDishesNames[i];
    
            shoppingBasket.innerHTML += shoppedDishCard(i);
        }
    
        let subtotalCost = calculateTotalCosts().toFixed(2).replace('.', ',');     // 2 digits after the decimal point + comma
        let finalCost = (parseFloat(subtotalCost) + 3.5).toFixed(2).replace('.', ',');
        shoppingBasket.innerHTML += /*html*/`   <div class="shopped-dishes-cost">
                                                    <div class="shopped-dishes-cost-detail">
                                                        <div class="shopped-dishes-cost-subtotal">
                                                            <p class="secondary">Subtotal</p>
                                                            <p class="secondary">${subtotalCost} €</p>
                                                        </div>
                                                        <div class="shopped-dishes-cost-delivery">
                                                            <p class="secondary">Delivery</p>
                                                            <p class="secondary">3,50 €</p>
                                                        </div>
                                                        <div class="shopped-dishes-cost-delivery">
                                                            <p>Total</p>
                                                            <p>${finalCost} €</p>
                                                        </div>
                                                    </div>
                                                    <!-- Button -->
                                                    <button class="btn">ORDER (${finalCost} €)</button>
                                                </div>`;

    }
}
  

// Add dish to shopping basket
function addToShoppingBasket(i) {
    let image = dishes[i]['img'];
    let name = dishes[i]['name'];
    let price = dishes[i]['price'];

    let index = basketDishesNames.indexOf(name);
    if (index == -1) {  // If index == -1 -> dont't exist
        basketDishesImages.push(image);
        basketDishesNames.push(name);
        basketDishesPrice.push(price);
        basketDishesAmount.push(1);
    } else {
        basketDishesAmount[index]++;   // Increase amount of amount
    }
    renderShoppingBasket();
}


// Increase amout of dish in shopping basket
function increaseAmountOfShoppingBasket(i) {
    basketDishesAmount[i]++;
    renderShoppingBasket();
}


// Decrease or remove dish from shopping basket
function decreaseAmountOfShoppingBasket(i) {
    if (basketDishesAmount[i] - 1 <= 0) {
        basketDishesNames.splice(i, 1);
        basketDishesPrice.splice(i, 1);
        basketDishesAmount.splice(i, 1);  
    } else {
        basketDishesAmount[i]--;
    }
    renderShoppingBasket();
}


/* ==============================================================================================================================================================================================================================
   Content render functions
============================================================================================================================================================================================================================== */
// Dish
function dishCard(i) {
    return /*html*/ `   <!-- Dish card -->
                        <div class="dish-card bg-dark">
                            <!-- Dish header -->
                            <div class="dish-header">
                                <div class="dish-img-h">
                                    <img class="dish-img" src="${dishes[i]['img']}" alt="Banana">
                                    <h2>${dishes[i]['name']}</h2>
                                </div>
                                <img onclick="addToShoppingBasket(${i})" class="icon-36x36" src="./img/add_FILL0_24px_white.svg" alt="Add">
                            </div>
                            <!-- Dish details -->
                            <div class="dish-details">
                                <p>${dishes[i]['detail']}</p>
                                <h6>${(dishes[i]['price']).toFixed(2).replace('.',',')} €</h6>
                            </div>
                        </div>`;
}


// Empty shopping basket 
function emptyShoppedDishCard() {
    return /*html*/ `   <h2>Basket</h2>
                        <img class="icon-36x36" src="./img/shopping_bag_FILL0_24px_white.svg" alt="Shopping bag">
                        <h6>Fill your basket</h6>
                        <p class="bottom-space">Your basket is empty</p> 
                    `;
}


// Dish in shopping basket
function shoppedDishCard(i) {
    return /*html*/ `   <!-- Shopped dish card -->
                        <div class="shopped-dish-card">
                            <div class="shopped-dish-card-header">
                                <p>${basketDishesAmount[i]}</p>
                                <img class="dish-img-basket" src="${basketDishesImages[i]}" alt="Banana">
                                <h2>${basketDishesNames[i]}</h2>
                            </div>
                            <div class="shopped-dish-card-detail">
                                <p>${(basketDishesPrice[i] * basketDishesAmount[i]).toFixed(2).replace('.', ',')} €</p>
                                <img onclick="decreaseAmountOfShoppingBasket(${i})" class="icon-36x36" src="./img/remove_FILL0_24px_white.svg" alt="Decrease amount">
                                <img onclick="increaseAmountOfShoppingBasket(${i})" class="icon-36x36" src="./img/add_FILL0_24px_white.svg" alt="Increase amount">
                            </div>
                        </div>
                        `;
}


// Calculate total costs 
function calculateTotalCosts() {
    let total = 0;
    for (let i = 0; i < basketDishesNames.length; i++) {
        total += basketDishesAmount[i] * basketDishesPrice[i];  
    }
    return total;
}


// Total sum in button
function responsiveShoppingBasketButton() {
    let shoppingBasketBtn = document.getElementById('total-sum-button');
    if (condition) {
        
    } else {
        
    }
}