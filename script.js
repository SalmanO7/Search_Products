(async () => {
  const productContainerEl = document.getElementById("productContainer");
  const searchInputEl = document.getElementById("searchInput");

  const url = `https://fakestoreapi.com/products`;
  const fetchProducts = async () => {
    try {
      const res = await fetch(url);
      return await res.json();
    } catch (error) {
      console.log("error", error);
      return error;
    }
  };

  const products = await fetchProducts();
  const generateProducts = (product) => {
    return `
  <div class="product-card">
            <div class="img-container">
                <img src="${product.image}" alt="">
            </div>
            <div class="product-content">
                <h2>${product.title}</h2>
                <p>${product.description.split(" ").slice(0, 20).join(" ")}</p>

                <button>${product.price}$</button>
            </div>
        </div> 
`;
  };
  const renderProducts = (products) => {
    productContainerEl.innerHTML = "";
    products.forEach((product) => {
      productContainerEl.innerHTML += generateProducts(product);
    });
  };
  const checkTextContain = (text, searchText) => {
    return text.toString().toLowerCase().includes(searchText);
  };

  const filterHandler = (event) => {
    const searchText = event.target.value.toLowerCase();
    const filteredProducts = products.filter((product) => {
      return (
        checkTextContain(product.title, searchText),
        checkTextContain(product.description, searchText),
        checkTextContain(product.price, searchText)
      );
    });
    renderProducts(filteredProducts);
  };
  searchInputEl.addEventListener("keyup", filterHandler);

  renderProducts(products);
})();
