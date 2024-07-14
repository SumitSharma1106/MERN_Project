import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import productCategory from '../ImagerHelper/ProductCategory'; // Ensure correct import path
import CategoryWiseProduct from './CategoryWiseProduct'; // Ensure correct import path
import SummaryApi from '../../Common'; // Ensure correct import path

const CategoryProduct = () => {
  const { category } = useParams(); // Get the category from the URL
  const [data, setData] = useState([]);
  const [selectCategory, setSelectCategory] = useState({});
  const [filterCategoryList, setFilterCategoryList] = useState([]);

  useEffect(() => {
    if (category) {
      setFilterCategoryList([category]);
    }
  }, [category]);

  useEffect(() => {
    fetchData();
  }, [filterCategoryList]);

  const fetchData = async () => {
    try {
      const response = await fetch(SummaryApi.filterProduct.url, {
        method: SummaryApi.filterProduct.method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          category: filterCategoryList,
        }),
      });
      const dataResponse = await response.json();
      setData(dataResponse.data || []);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const handleSelectorCategory = (e) => {
    const { value, checked } = e.target;
    setSelectCategory((prev) => ({
      ...prev,
      [value]: checked,
    }));
  };

  useEffect(() => {
    const selectedCategories = Object.keys(selectCategory).filter((key) => selectCategory[key]);
    setFilterCategoryList(selectedCategories);
  }, [selectCategory]);

  return (
    <div className="container mx-auto p-2">
      <div className="flex w-full gap-8 h-[89vh]">
        {/* Left */}
        <div className="w-[30vw] bg-white rounded shadow-md p-4">
          <div className="p-2 text-lg">
            <h2 className="text-2xl text-slate-400 border-b-2 border-gray-500 my-2 uppercase">Category</h2>
            <div>
              <form className="text-base flex flex-col gap-2 py-2 p-4">
                {productCategory.map((categoryName, index) => (
                  <div className="flex items-center gap-3" key={index}>
                    <input
                      type="checkbox"
                      name="category"
                      checked={selectCategory[categoryName.value] || false}
                      id={categoryName.value}
                      className="checkbox-container"
                      value={categoryName.value}
                      onChange={handleSelectorCategory}
                    />
                
                    <label htmlFor={categoryName.value} className="cursor-pointer hover:text-red-600">{categoryName.label}</label>
                  </div>
                ))}
              </form>
            </div>
          </div>
        </div>
        {/* Right */}
        <div className="w-[70vw] h-[88vh] overflow-y-auto">
          {data.length !== 0 && (
            <CategoryWiseProduct category={filterCategoryList} heading={`Selected Product: ${data.length}`} />
          )}
        </div>
      </div>
    </div>
  );
};

export default CategoryProduct;
