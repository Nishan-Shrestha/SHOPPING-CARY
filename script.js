let shop = document.getElementById("shop");

let shopItemsData = [
  {
    id: "product1",
    name: "Casual Shirt",
    price: "$45",
    desc: "orem, ipsum dolor sit amet consectetur adipisicing elit. Vitae praesentium, nemo eveniet suscipit nam placeat?",
    img : "/images/img-1.jpg"
  },
  {
    id: "product2",
    name: "Office Shirt",
    price: "$75",
    desc: "orem, ipsum dolor sit amet consectetur adipisicing elit. Vitae praesentium, nemo eveniet suscipit nam placeat?",
    img : "/images/img-2.jpg"
  },
  {
    id: "product3",
    name: "T Shirt",
    price: "$15",
    desc: "orem, ipsum dolor sit amet consectetur adipisicing elit. Vitae praesentium, nemo eveniet suscipit nam placeat?",
    img : "/images/img-3.jpg"
  },
  {
    id: "product4",
    name: "Mens Suit",
    price: "$405",
    desc: "orem, ipsum dolor sit amet consectetur adipisicing elit. Vitae praesentium, nemo eveniet suscipit nam placeat?",
    img : "/images/img-4.jpg"
  },
];
let basket = JSON.parse(localStorage.getItem("data")) || [];
let generateShop = () => {
  return (shop.innerHTML = shopItemsData.map((x)=>{

    let {id,name,price,desc,img}=x;
    let search =basket.find((x)=> x.id === id)|| []
    return `
    <div id=product-id-${id} class="item">
    <img src="${img}" width="220" alt="">
    <div class="details">
        <h3>${name}</h3>
        <p>${desc}</p>
        <div class="price-quantity">
            <h2>${price}</h2>
            <div class="buttons">
                <i onclick="decrement(${id})" class="fa-solid fa-minus fa-lg"></i>
                <div class="quantity" id=${id}>
                    ${search.item === undefined? 0: search.item}
                </div>
                <i onclick="increment(${id})" class="fa-solid fa-plus fa-lg"></i>
            </div>
        </div>
    </div>
</div>`;
  }).join(" "));
};

generateShop();

let increment =(id) =>{
    let selectedItem = id;
    let search = basket.find((x)=> x.id === selectedItem.id);
    if(search === undefined){
        basket.push({
            id:selectedItem.id,
            item:1
        })
    }
    else{
        search.item +=1;
    }

    localStorage.setItem("data",JSON.stringify(basket))
    // console.log(basket);
    update(selectedItem.id);
}

let decrement =(id) =>{
    let selectedItem = id;
    let search = basket.find((x)=> x.id === selectedItem.id);
    if(search.item ===0) return;

    else{
        search.item -=1;
    }

    localStorage.setItem("data",JSON.stringify(basket))
    // console.log(basket);
    update(selectedItem.id);

}

let update =(id) =>{

    let search = basket.find((x) =>x.id === id);
    // console.log(search.item);
    document.getElementById(id).innerHTML = search.item;
    calculation();
}

let calculation =() =>{
    let cartIcon = document.getElementById("cart-amount");

    cartIcon.innerHTML =basket.map((x) => x.item).reduce((x,y) => x + y , 0);
} 
calculation();