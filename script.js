let FoodOptions = [
    'Crispy Burger',
    'Cheesy Sandwich',
    'Onion-Capsicum Pizza',
    'Chinese Noodles',
    'French Fries',
    'Veggie Tacos',
    'Maxicana pizza',
    'Parantha pizza',
    'Pickles',
    'Pasta',
    'Cheese Pasta',
    'Margherita Pizza',
    'Veggie Burger',
    'Panner Rolls',
    'Garlic Bread',
    'Paneer Tikka Masala',
    'Veggie Stir Fry',
    'Mushroom Stroganoff',
    'Spinach and Ricotta Ravioli',
    'Veggie Pizza',
];

const popularResults = [
    'Crispy Burger',
    'Cheesy Sandwich',
    'Onion-Capsicum Pizza',
    'Chinese Noodles',
    'French Fries',
    'Veggie Tacos',
    'Maxicana pizza',
    'Parantha pizza',
    'Pickles',
    'Pasta',
    'Cheese Pasta',
];

const resultsBox = document.querySelector(".result-box"); 
const searchBox = document.getElementById("search");

searchBox.onkeyup = function(){
    let result = [];
    let input = searchBox.value;
    if(input.length){
        result=FoodOptions.filter((option) => {
            return option.toLowerCase().includes(input.toLowerCase());
        });
        console.log(result);
    }
    display(result);

    if(!result.length){
        resultsBox.innerHTML='';
    }
}

searchBox.onfocus = function() {
    let input = searchBox.value;
    if (!input.length) {
        display(popularResults);
    }
};

function display(result){
    const content = result.map((list) => {
        return "<li onclick=selectInput(this)>"+list+"</li>";
    });

    resultsBox.innerHTML = "<ul>"+content.join('') +"</ul>";
}

function selectInput(list){
    searchBox.value = list.innerHTML;
    resultsBox.innerHTML='';
}

document.addEventListener("click", function(e) {
    if (!searchBox.contains(e.target) && !resultsBox.contains(e.target)) {
        resultsBox.innerHTML = '';
    }
});

// Book table form validation
const fullname=document.getElementById('name');
const email=document.getElementById('mailid');
const phone=document.getElementById('contact');

const form=document.getElementById('form');
const nameError=document.getElementById('nameError');
const emailError=document.getElementById('emailError');
const phoneError=document.getElementById('phoneError');

form.addEventListener('submit', (e) => {
    let hasError = false;

    if(fullname.value.trim()===''){
        nameError.innerText='* Enter a valid name';
        nameError.style.display='block';
        hasError=true;
    }
    else{
        nameError.style.display = 'none';
    }

    if(!validateEmail(email.value)){
        emailError.innerText='* Enter a valid email';
        emailError.style.display='block';
        hasError=true;
    }
    else{
        emailError.style.display='none';
    }

    if(phone.value.length!==10){
        phoneError.innerText='* Contact number should be of 10 digits';
        phoneError.style.display='block';
        hasError=true;
    }
    else{
        phoneError.style.display='none';
    }

    if(hasError){
        e.preventDefault();
    }
});

function validateEmail(email){
    const re=/^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
}

document.addEventListener('click', (e) => {
    if (e.target!==fullname && e.target!==email && e.target!==phone){
        nameError.style.display='none';
        emailError.style.display='none';
        phoneError.style.display='none';
    }
});

fullname.addEventListener('click', () => {
    if(nameError.innerText){
        nameError.style.display='block';
    }
});

email.addEventListener('click', () => {
    if(emailError.innerText){
        emailError.style.display='block';
    }
});

phone.addEventListener('click', () => {
    if(phoneError.innerText){
        phoneError.style.display='block';
    }
});

//Add to cart functions
let cart = [];

function addtocart(item) {
    cart.push(item);
    displayCart();
    updateTotal();
}

function displayCart() {
    let cartItemContainer = document.getElementById('cartItem');
    if (cart.length == 0) {
        cartItemContainer.innerHTML = "Your cart is empty";
    } else {
        cartItemContainer.innerHTML = cart.map((item, index) => {
            return (
                `<div class='cart-item'>
                    <p style='font-size:20px;'>${item.title}</p>
                    <h2 style='font-size:15px;'>Rs. ${item.price}.00</h2>
                    <i class='fa-solid fa-trash' onclick='delElement(${index})'></i>
                </div>`
            );
        }).join('');
    }
}

function delElement(index) {
    cart.splice(index, 1);
    displayCart();
    updateTotal();
}

function updateTotal() {
    let total = cart.reduce((sum, item) => sum + parseFloat(item.price), 0);
    document.getElementById('total').innerText = `Rs. ${total.toFixed(2)}`;
}

document.querySelectorAll('.add').forEach((button) => {
    button.addEventListener('click', () => {
        let itemElement = button.closest('.items');
        let item = {
            title: itemElement.querySelector('h3').textContent,
            price: itemElement.querySelector('.item-info span').textContent.replace('Rs. ', '')
        };
        addtocart(item);
    });
});

let slideIndex=0;
const slides=document.querySelectorAll('.slide');
const dots=document.querySelectorAll('.dot');
const totalSlides=slides.length;

dots.forEach((dot,idx) => {
    dot.addEventListener('click',() => {
        slideIndex=idx;
        showSlide(slideIndex);
    });
});

function showSlide(index){
    slides.forEach((slide,idx) => {
        if(idx===index){
            slide.classList.add('active');
        }
        else{
            slide.classList.remove('active');
        }
    });

    dots.forEach((dot,idx) => {
        if(idx===index){
            dot.classList.add('active');
        }
        else{
            dot.classList.remove('active');
        }
    });

    const currSlide=slides[index];
    const h1=currSlide.querySelector('.slider-h1').textContent;
    const h3=currSlide.querySelector('.slider-h3').textContent;
    const p=currSlide.querySelector('.slider-p').textContent;

    document.querySelector('.slider-h1').textContent=h1;
    document.querySelector('.slider-h3').textContent=h3;
    document.querySelector('.slider-p').textContent=p;
}

function startSlider() {
    setInterval(() =>{
        slideIndex=(slideIndex+1)%totalSlides;
        showSlide(slideIndex);
    },5000);
}

startSlider();