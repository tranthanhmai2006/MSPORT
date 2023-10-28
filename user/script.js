let products = {
  data: [
    {
      productName: "Taurus Ergo-X Air Bike",
      category: "Bike",
      price: "$1,099.00",
      image: "../imgs/tarus1.webp",
    },
    {
      productName: "Studio Bra Ladies",
      category: "Bra",
      price: "$32.00",
      image: "../imgs/bestseller2.webp",
    },
    {
      productName: "SS500 LC Smith System",
      category: "Machine",
      price: "$1,170.00",
      image: "../imgs/bestseller3.webp",
    },
    {
      productName: "Seamless Bra Ladies",
      category: "Bra",
      price: "$18.99",
      image: "../imgs/bestseller4.webp",
    },
    {
      productName: "Rowing Machine",
      category: "Machine",
      price: "$599.00",
      image: "../imgs/bestseller5.webp",
    },
    {
      productName: "Row-X Air Rower",
      category: "Machine",
      price: "$1,199.00",
      image: "../imgs/bestseller6.webp",
    },
    {
      productName: "Pull Up Trainer",
      category: " Machine",
      price: "$199.00",
      image: "../imgs/bestseller7.webp",
    },
    {
      productName: "Machine Multi Gym",
      category: "Machine",
      price: "$999.00",
      image: "../imgs/bestseller8.webp",
    },
    {
      productName: "2 In 1 Shorts Ladies",
      category: "Shorts",
      price: "$29.00",
      image: "../imgs/short1.webp",
    },

    {
      productName: " 600i Folding Treadmill",
      category: "Treadmill",
      price: "$2,999.00",
      image: "../imgs/bestseller8.webp.",
    },
    {
      productName: "Bench, Leg Curl And Preacher",
      category: "Machine",
      price: "$599.00",
      image: "../imgs/bench-legs-preacher.webp",
    },
  ],
};

for (let i of products.data) {
  //Create Card
  let card = document.createElement("div");
  //Card should have category and should stay hidden initially
  card.classList.add("card", i.category, "hide");
  //image div
  let imgContainer = document.createElement("div");
  imgContainer.classList.add("image-container");
  //img tag
  let image = document.createElement("img");
  image.setAttribute("src", i.image);
  imgContainer.appendChild(image);
  card.appendChild(imgContainer);
  //container
  let container = document.createElement("div");
  container.classList.add("container");
  //product name
  let name = document.createElement("h5");
  name.classList.add("product-name");
  name.innerText = i.productName.toUpperCase();
  container.appendChild(name);
  //price
  let price = document.createElement("h6");
  price.innerText = "$" + i.price;
  container.appendChild(price);

  card.appendChild(container);
  document.getElementById("products").appendChild(card);
}

//parameter passed from button (Parameter same as category)
function filterProduct(value) {
  //Button class code
  let buttons = document.querySelectorAll(".button-value");
  buttons.forEach((button) => {
    //check if value equals innerText
    if (value.toUpperCase() == button.innerText.toUpperCase()) {
      button.classList.add("active");
    } else {
      button.classList.remove("active");
    }
  });

  //select all cards
  let elements = document.querySelectorAll(".card");
  //loop through all cards
  elements.forEach((element) => {
    //display all cards on 'all' button click
    if (value == "all") {
      element.classList.remove("hide");
    } else {
      //Check if element contains category class
      if (element.classList.contains(value)) {
        //display element based on category
        element.classList.remove("hide");
      } else {
        //hide other elements
        element.classList.add("hide");
      }
    }
  });
}

//Search button click
document.getElementById("search").addEventListener("click", () => {
  //initializations
  let searchInput = document.getElementById("search-input").value;
  let elements = document.querySelectorAll(".product-name");
  let cards = document.querySelectorAll(".card");

  //loop through all elements
  elements.forEach((element, index) => {
    //check if text includes the search value
    if (element.innerText.includes(searchInput.toUpperCase())) {
      //display matching card
      cards[index].classList.remove("hide");
    } else {
      //hide others
      cards[index].classList.add("hide");
    }
  });
});

//Initially display all products
window.onload = () => {
  filterProduct("all");
};
