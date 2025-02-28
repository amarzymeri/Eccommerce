import React, { useEffect, useMemo, useState } from "react";
import { useParams } from "react-router-dom";

function Product() {
    const [product, setProduct] = useState(null);
    const [allCategories, setAllCategories] = useState([]);

    const { id } = useParams();

    useEffect(() => {
        fetch(`/ecommerce/api/products/${id}.json`)
            .then(res => res.json())
            .then(res => setProduct(res))
            .catch(error => console.error("Error fetching product:", error));
    }, [id]);

    useEffect(() => {
        fetch(`/ecommerce/api/categories.json`)
            .then(res => res.json())
            .then(res => setAllCategories(res))
            .catch(error => console.error("Error fetching categories:", error));
    }, []);

    const categories = useMemo(() => {
        if (!product || !allCategories.length) return [];

        let categoriesList = [];
        let currentId = product.categoryId;

        while (currentId !== null) {
            let category = allCategories.find(c => c.id === currentId);
            if (category) {
                categoriesList.push(category);
                currentId = category.parentId;
            } else {
                break;
            }
        }

        return categoriesList;
    }, [product, allCategories]);


    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6">
            <div className="flex items-center justify-center p-4 relative">
                <img
                    className="w-full max-w-sm md:max-w-md object-cover rounded-lg"
                    src={`/ecommerce/images/${product?.imageUrl}`}
                    alt={product?.name}
                />
                <span className="absolute bottom-4 right-4 text-red-500 text-xl font-bold">
                    {product?.price}€
                </span>
            </div>

            <div className="p-4 flex flex-col gap-4">
                <h1 className="text-3xl font-bold">{product?.name}</h1>
                <p className="text-gray-700">{product?.description}</p>

                <div className="flex flex-wrap gap-2">
                    {categories.map(category => (
                        <span key={category.id} className="bg-red-500 px-3 py-1 rounded-full text-white text-sm">
                            {category.name}
                        </span>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default Product;
