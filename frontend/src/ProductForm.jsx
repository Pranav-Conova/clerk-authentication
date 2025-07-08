import React, { useState, useRef } from "react";
import axios from "axios";

function ProductForm() {
    const [form, setForm] = useState({
        name: "",
        description: "",
        price: "",
        category: "Men",
        subcategory: "Topwear",
        stock_details: [],
        bestseller: false,
    });
    const [images, setImages] = useState([]);
    const fileInputRef = useRef(null);

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setForm((prev) => ({
            ...prev,
            [name]: type === "checkbox" ? checked : value,
        }));
    };

    const handleImageChange = (e) => {
        const files = Array.from(e.target.files);
        if (files.length > 5) {
            alert("You can upload up to 5 images only.");
        }
        setImages(files.slice(0, 5));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();

        for (let key in form) {
            if (key === "stock_details") {
                formData.append(key, JSON.stringify(form[key]));
            } else {
                formData.append(key, form[key]);
            }
        }

        images.forEach((img) => {
            formData.append("images", img); // multiple files under same key
        });

        try {
            const res = await axios.post("http://127.0.0.1:8000/api/products/", formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });
            console.log("Success:", res.data);
            setForm({
                name: "",
                description: "",
                price: "",
                category: "Men",
                subcategory: "Topwear",
                stock_details: [],
                bestseller: false,
            });
            setImages([]);
            if (fileInputRef.current) {
                fileInputRef.current.value = null;
            }
        } catch (err) {
            console.error("Error uploading product:", err.response?.data || err.message);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <p className="mb-2">Upload Images (max 5)</p>
                <input
                    ref={fileInputRef}
                    type="file"
                    name="images"
                    multiple
                    accept="image/*"
                    onChange={handleImageChange}
                    className="mb-2"
                />
                <div className="flex gap-2 mt-2">
                    {images.map((img, idx) => (
                        <img
                            key={idx}
                            className="w-20"
                            src={URL.createObjectURL(img)}
                            alt={`preview-${idx}`}
                        />
                    ))}
                </div>
            </div>

            <div className="w-full">
                <p className="mb-2">Product Name</p>
                <input
                    name="name"
                    placeholder="Name"
                    value={form.name}
                    className="w-full max-w-[500px] px-2 py-2"
                    onChange={handleChange}
                    required
                />
            </div>
            <div className="w-full">
                <p className="mb-2">Product Description</p>
                <textarea
                    name="description"
                    placeholder="Description"
                    value={form.description}
                    className="w-full max-w-[500px] px-2 py-2"
                    onChange={handleChange}
                    required
                />
            </div>
            <div className="flex flex-col sm:flex-row gap-2 w-full sm:gap-8">
                <div>
                    <p className="mb-2">Product Category</p>
                    <select
                        name="category"
                        value={form.category}
                        className="w-full px-3 py-2"
                        onChange={handleChange}
                    >
                        <option>Men</option>
                        <option>Women</option>
                        <option>Kids</option>
                    </select>
                </div>
                <div>
                    <p className="mb-2">Product Subcategory</p>
                    <select
                        name="subcategory"
                        value={form.subcategory}
                        className="w-full px-3 py-2"
                        onChange={handleChange}
                    >
                        <option>Topwear</option>
                        <option>Bottomwear</option>
                    </select>
                </div>
                <div>
                    <p className="mb-2">Product Price</p>
                    <input
                        type="number"
                        name="price"
                        placeholder="Price"
                        value={form.price}
                        className="w-full px-3 py-2 sm:w-[120px]"
                        onChange={handleChange}
                        required
                    />
                </div>
            </div>

            <div>
                <p className="mb-2 font-medium">Stock Details</p>
                <div className="flex flex-col gap-2">
                    {form.stock_details.map((stock, idx) => (
                        <div key={idx} className="flex gap-2 items-center">
                            <select
                                value={stock.size}
                                onChange={(e) => {
                                    const updated = [...form.stock_details];
                                    updated[idx].size = e.target.value;
                                    setForm((f) => ({
                                        ...f,
                                        stock_details: updated,
                                    }));
                                }}
                                className="px-2 py-1 border"
                                required
                            >
                                <option value="">Select Size</option>
                                <option value="M">M</option>
                                <option value="L">L</option>
                                <option value="XL">XL</option>
                            </select>
                            <input
                                type="number"
                                min={0}
                                value={stock.quantity}
                                onChange={(e) => {
                                    const updated = [...form.stock_details];
                                    updated[idx].quantity = Number(e.target.value);
                                    setForm((f) => ({
                                        ...f,
                                        stock_details: updated,
                                    }));
                                }}
                                className="px-2 py-1 border w-20"
                                placeholder="Stock"
                                required
                            />
                            <button
                                type="button"
                                onClick={() => {
                                    const updated = form.stock_details.filter((_, i) => i !== idx);
                                    setForm((f) => ({
                                        ...f,
                                        stock_details: updated,
                                    }));
                                }}
                                className="text-red-500 px-2"
                            >
                                Remove
                            </button>
                        </div>
                    ))}
                    <div className="text-left">
                        <button
                            type="button"
                            onClick={() =>
                                setForm((f) => ({
                                    ...f,
                                    stock_details: [...f.stock_details, { size: "", quantity: 0 }],
                                }))
                            }
                            className="text-blue-500 mt-2"
                        >
                            + Add Size
                        </button>
                    </div>
                </div>
            </div>

            <div className="flex gap-2 mt-2">
                <input
                    name="bestseller"
                    onChange={handleChange}
                    checked={form.bestseller}
                    type="checkbox"
                    id="bestseller"
                />
                <label className="cursor-pointer" htmlFor="bestseller">
                    Add to Bestseller
                </label>
            </div>

            <button
                type="submit"
                className="w-28 py-3 mt-4 bg-black text-white"
            >
                Submit
            </button>
        </form>
    );
}

export default ProductForm;
