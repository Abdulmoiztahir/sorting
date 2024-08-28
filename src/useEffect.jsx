import { useEffect, useState } from "react";
import Cards from "./components/cards";
import Footer from "./components/footer";

function UseEffect() {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");
  const [priceRange, setPriceRange] = useState([0, 1000]); // Add price range state
  const [category, setCategory] = useState(""); // Add category state

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = () => {
    fetch("https://fakestoreapi.com/products")
      .then((res) => res.json())
      .then((products) => setProducts(products));
  };

  const filtered = products.filter((data) => {
    const priceFilter = data.price >= priceRange[0] && data.price <= priceRange[1];
    const categoryFilter = category === "" || data.category === category;
    const searchFilter = data.title.toLowerCase().includes(search.toLowerCase());
    return priceFilter && categoryFilter && searchFilter;
  });

  const handlePriceChange = (e) => {
    const { name, value } = e.target;
    if (name === "minPrice") {
      setPriceRange([value, priceRange[1]]);
    } else if (name === "maxPrice") {
      setPriceRange([priceRange[0], value]);
    }
  };

  const handleCategoryChange = (e) => {
    setCategory(e.target.value);
  };

  return (
    <div className="p-6  mx-auto">
      <div className="mb-6">
        <input
          type="search"
          placeholder="Search products..."
          className="border rounded-lg p-3 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>
      
      <div className="flex flex-wrap gap-4 mb-6">
        <div className="flex flex-col gap-2 w-full sm:w-1/2 lg:w-1/3">
          <label className="font-semibold">Price Range:</label>
          <div className="flex gap-4">
            <input
              type="number"
              name="minPrice"
              value={priceRange[0]}
              onChange={handlePriceChange}
              placeholder="Min Price"
              className="border rounded-lg p-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input
              type="number"
              name="maxPrice"
              value={priceRange[1]}
              onChange={handlePriceChange}
              placeholder="Max Price"
              className="border rounded-lg p-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>
        
        <div className="flex flex-col gap-2 w-full sm:w-1/2 lg:w-1/3">
          <label className="font-semibold">Category:</label>
          <select
            value={category}
            onChange={handleCategoryChange}
            className="border rounded-lg p-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">All</option>
            <option value="men's clothing">Men's Clothing</option>
            <option value="women's clothing">Women's Clothing</option>
            <option value="jewelery">Jewelery</option>
            <option value="electronics">Electronics</option>
          </select>
        </div>
      </div>
      
      <div className="cursor-pointer -m-4 flex flex-wrap">
        {filtered.length > 0 ? (
          filtered.map((product) => (
            <Cards
              key={product.id}
              title={product.title}
              image={product.image}
              price={product.price}
            />
          ))
        ) : (
          <p className="col-span-full text-center text-gray-500">No products found</p>
        )}
      </div>
      <Footer/>
    </div>
  );
}

export default UseEffect;
