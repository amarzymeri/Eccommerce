import React, { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';

function Products() {
    const [products, setProducts] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const pageSize = 5;

    useEffect(() => {
        fetch(`/api/products.json`)
            .then(res => res.json())
            .then(json => setProducts(json));
    }, []);

    const filteredProducts = useMemo(() => {
        return products.slice((currentPage - 1) * pageSize, currentPage * pageSize);
    }, [currentPage, products, pageSize]);

    const numberOfPages = useMemo(() => {
        return Math.ceil(products.length / pageSize);
    }, [products, pageSize]);

    return (
        <div className='flex flex-col items-center p-4'>
            {/* Product List */}
            <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 w-full max-w-4xl'>
                {filteredProducts.map(p => (
                    <Link key={p.id} to={`/product/${p.id}`}>
                        <div className='bg-white shadow-md rounded-lg p-4 hover:shadow-lg transition cursor-pointer'>
                            <img src={`/images/${p.imageUrl}`} alt={p.name} className='w-full h-40 object-cover rounded-md' />
                            <span className='block mt-2 text-lg font-semibold text-gray-800'>{p.name}</span>
                        </div>
                    </Link>
                ))}
            </div>

            {/* Pagination */}
            <div className='mt-6 flex space-x-2'>
                {Array.from({ length: numberOfPages }, (_, i) => (
                    <button
                        key={i}
                        onClick={() => setCurrentPage(i + 1)}
                        className={`px-3 py-1 rounded-md border transition ${currentPage === i + 1
                            ? 'bg-blue-500 text-white'
                            : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-200'
                            }`}
                    >
                        {i + 1}
                    </button>
                ))}
            </div>
        </div>
    );
}

export default Products;
