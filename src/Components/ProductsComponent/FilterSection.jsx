import React from 'react';

const FilterSection = ({ categories, onCategoryClick, onClearFilters }) => {
    // const [categories, setCategories] = useState([]);
    // const [error, setError] = useState('');

    // const { state, dispatch } = useProductContext();
    // const { categories, error, products } = state;
    // const token = sessionStorage.getItem('Token');

    // useEffect(() => {
    //     const fetchProductDetails = async () => {
    //         try {
    //             const response = await axios.get('https://localhost:7148/api/Products', {
    //                 headers: {
    //                     Authorization: `Bearer ${token}`,
    //                 }
    //             });
    //             const uniqueCategories = getUniqueCategories(response.data);
    //             setCategories(uniqueCategories);
    //         } catch (err) {
    //             setError('Error fetching inventory data');
    //             console.error(err);
    //         }
    //     };
    //     fetchProductDetails();
    // }, [token]);

    // useEffect(() => {
    //     if (products.length > 0) {
    //         const uniqueCategories = getUniqueCategories(products);
    //         dispatch(fetchCatgories(uniqueCategories));
    //     }
    // }, [dispatch, products]);

    // const getUniqueCategories = (data) => {
    //     const allCategories = data.map((product) => product.productCategory);
    //     return [...new Set(allCategories)];
    // };

    return (
        <div className="p-4 border rounded shadow-md">
            <h2 className="text-lg font-semibold text-center mb-2">Category</h2>
            <div className="flex flex-col items-center">
                {categories.map((currEle, index) => (
                    <button
                        key={index}
                        onClick={() => onCategoryClick(currEle)}
                        className="w-full text-left p-2 my-1 rounded hover:bg-gray-200"
                    >
                        {currEle}
                    </button>
                ))}
            </div>
            <div>
                <button 
                    onClick={onClearFilters}
                    className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
                >
                    Clear Filters
                </button>
            </div>
        </div>
    );
};

export default FilterSection;

