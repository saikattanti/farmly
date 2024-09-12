import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { clearErrors, getProduct } from "../../actions/ProductActions";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Footer from "../../Footer";
import Header from "../Home/Header";
import Loading from "../../more/Loader";
import ProductCard from "./ProductCard";
import Pagination from "react-js-pagination";
import MetaData from "../../more/Metadata";
import BottomTab from "../../more/BottomTab";
import "./Product.css";

const categories = [
  {
    name: "Grains",
    subcategories: ["Rice", "Wheat", "Corn", "Oats", "Barley"]
  },
  {
    name: "Fruits",
    subcategories: ["Apples", "Bananas", "Oranges", "Berries", "Melons"]
  },
  {
    name: "Vegetables",
    subcategories: ["Leafy Greens", "Root Vegetables", "Cruciferous", "Alliums", "Squashes"]
  },
  {
    name: "Spices",
    subcategories: ["Pepper", "Cinnamon", "Turmeric", "Cumin", "Paprika"]
  },
  {
    name: "Stem Crops",
    subcategories: ["Asparagus", "Celery", "Rhubarb", "Bamboo Shoots", "Kohlrabi"]
  },
  {
    name: "Seasonal",
    subcategories: ["Spring", "Summer", "Autumn", "Winter"]
  },
  {
    name: "Others",
    subcategories: ["Nuts", "Seeds", "Dried Fruits", "Legumes", "Mushrooms"]
  }
];

const Products = ({ match }) => {
  const dispatch = useDispatch();

  const [currentPage, setCurrentPage] = useState(1);
  const [category, setCategory] = useState("");
  const [subcategory, setSubcategory] = useState("");
  const [expandedCategory, setExpandedCategory] = useState("");

  const { products, loading, error, productsCount, resultPerPage } =
    useSelector((state) => state.products);

  const keyword = match.params.keyword;

  const setCurrentPageNo = (e) => {
    setCurrentPage(e);
  };

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearErrors());
    }
    dispatch(getProduct(keyword, currentPage, category, subcategory));
  }, [dispatch, keyword, currentPage, category, subcategory, error]);

  const handleCategoryClick = (catName) => {
    if (expandedCategory === catName) {
      setExpandedCategory("");
      setCategory("");
    } else {
      setExpandedCategory(catName);
      setCategory(catName);
    }
    setSubcategory("");
  };

  const handleSubcategoryClick = (subcat) => {
    setSubcategory(subcat);
  };

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <>
          <MetaData title="Products" />
          <Header />
          <div className="products-page">
            <aside className="category-sidebar">
              <h3 className="sidebar-title">Categories</h3>
              <ul className="category-list">
                {categories.map((cat) => (
                  <li key={cat.name} className="category-item">
                    <button
                      className={`category-button ${expandedCategory === cat.name ? 'active' : ''}`}
                      onClick={() => handleCategoryClick(cat.name)}
                    >
                      {cat.name}
                    </button>
                    {expandedCategory === cat.name && (
                      <ul className="subcategory-list">
                        {cat.subcategories.map((subcat) => (
                          <li key={subcat} className="subcategory-item">
                            <button
                              className={`subcategory-button ${subcategory === subcat ? 'active' : ''}`}
                              onClick={() => handleSubcategoryClick(subcat)}
                            >
                              {subcat}
                            </button>
                          </li>
                        ))}
                      </ul>
                    )}
                  </li>
                ))}
              </ul>
            </aside>
            <main className="products-main">
              <h2 className="products-title">Featured Products</h2>
              {products && products.length === 0 ? (
                <p className="no-products">No products found.</p>
              ) : (
                <div className="products-grid">
                  {products &&
                    products.map((product) => (
                      <ProductCard key={product.id} product={product} />
                    ))}
                </div>
              )}
              {resultPerPage < productsCount && (
                <Pagination
                  activePage={currentPage}
                  itemsCountPerPage={resultPerPage}
                  totalItemsCount={productsCount}
                  onChange={setCurrentPageNo}
                  nextPageText="Next"
                  prevPageText="Prev"
                  firstPageText="First"
                  lastPageText="Last"
                  itemClass="page-item"
                  linkClass="page-link"
                  activeClass="pageItemActive"
                  activeLinkClass="pageLinkActive"
                />
              )}
            </main>
          </div>
          <Footer />
          <BottomTab />
        </>
      )}
    </>
  );
};

export default Products;