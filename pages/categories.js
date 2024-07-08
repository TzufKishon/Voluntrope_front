import Header from "@/components/Header";
import styled from "styled-components";
import Center from "@/components/Center";
import axios from "axios";
import { useState, useEffect } from "react";
import ProductsGrid from "@/components/ProductsGrid";
import Title from "@/components/Title";

const FilterContainer = styled.div`
  margin-bottom: 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #f9f9f9;
  padding: 10px 20px;
  border-radius: 5px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  flex-wrap: wrap;
`;

const Select = styled.select`
  padding: 10px;
  font-size: 1rem;
  border-radius: 5px;
  border: 1px solid #ddd;
  background-color: #fff;
  transition: border-color 0.3s;

  &:hover {
    border-color: #ccc;
  }

  &:focus {
    border-color: #aaa;
    outline: none;
  }
`;

const Label = styled.label`
  font-size: 1rem;
  font-weight: 500;
  color: #333;
  margin-right: 10px;
`;

export default function CategoriesPage() {
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedType, setSelectedType] = useState('');
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetchCategories();
  }, []); // Fetch categories only once on component mount

  useEffect(() => {
    // Fetch products when selectedCategory or selectedType changes
    fetchProducts();
  }, [selectedCategory, selectedType]);

  const fetchCategories = () => {
    axios.get('/api/categories')
      .then(result => {
        setCategories(result.data);
      })
      .catch(error => {
        console.error("Error fetching categories:", error);
      });
  };

  const fetchProducts = () => {
    const categoryQuery = selectedCategory ? `category=${selectedCategory}` : '';
    const typeQuery = selectedType ? `type=${selectedType}` : '';
    const query = [categoryQuery, typeQuery].filter(Boolean).join('&');
    const url = `/api/products${query ? `?${query}` : ''}`;
    
    axios.get(url)
      .then(result => {
        console.log(result.data);
        const formattedProducts = result.data.map(product => ({
          ...product,
          types: product.types ? product.types : '' // Assuming 'types' is a string or undefined/null
        }));

        setProducts(formattedProducts);
      })
      .catch(error => {
        console.error("Error fetching products:", error);
      });
  };

  const handleCategoryChange = (e) => {
    setSelectedCategory(e.target.value);
    // Reset selectedType when category changes to avoid conflicting filters
    setSelectedType('');
  };

  const handleTypeChange = (e) => {
    console.log("bcvbcvbcvbcb",e.target.value)
    setSelectedType(e.target.value);
  };

  return (
    <>
      <Header />
      <Center>
        <Title>All categories</Title>
        <FilterContainer>
          <div>
            <Label htmlFor="category">Filter by category:</Label>
            <Select
              id="category"
              value={selectedCategory}
              onChange={handleCategoryChange}
            >
              <option value="">All categories</option>
              {categories.map(category => (
                <option key={category._id} value={category._id}>
                  {category.name}
                </option>
              ))}
            </Select>
          </div>
          {/* <div>
            <Label htmlFor="type">Filter by type:</Label>
            <Select
              id="type"
              value={selectedType}
              onChange={handleTypeChange}
            >
              <option value="">All types</option>
              {/* Display options based on fetched products */}
              {/* {products.length > 0 && products[0].category.properties[0] && products[0].category.properties[0].values.map(
                val =>(<option key={val} value={val}>
                  {val}
                </option>)
              )
            } */}
              {/* {products.length > 0 && products.map(product => (
                product.properties && product.properties.Type in product.category.properties[0].values? (
                <option key={product.properties.Type} value={product.properties.Type}>
                  {product.properties.Type}
                </option>
                ) : null
              ))} }
            </Select>
          </div> */}
        </FilterContainer>
        <ProductsGrid products={products} />
      </Center>
    </>
  );
}
