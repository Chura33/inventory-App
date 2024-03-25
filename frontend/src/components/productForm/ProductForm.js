import React from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import Card from "../card/Card"
import "./ProductForm.scss";
const ProductForm = ({
        product, 
        productImage,
        imagePreview,
        description,
        setDescription,
        handleInputChange,
        handleImageChange,
        saveProduct}) =>{
    return (<div className="add-product">
        <Card cardClass={"card"}>
        <form onSubmit={saveProduct}>
          <Card cardClass={"group"}>
            <label>Product Image</label>
            <code className="--color-dark">
              Supported Formats: jpg, jpeg, png
            </code>
            <input
              type="file"
              name="image"
              onChange={(e) => handleImageChange(e)}
            />

            {imagePreview != null ? (
              <div className="image-preview">
                <img src={imagePreview} alt="product" />
              </div>
            ) : (
              <p>No image set for this product.</p>
            )}
          </Card>
            </form>
        </Card>
           </div>)
}

export default ProductForm;