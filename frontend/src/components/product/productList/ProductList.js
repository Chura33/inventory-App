import React, { useState } from "react";
import "./ProductList.scss"
import SpinnerImg from "../../../components/loader/Loader"
import {FaEdit, FaTrashAlt} from "react-icons/fa";
import {AiOutlineEye} from "react-icons/ai";
import Search from "../../search/Search";

const ProductList = ({products, isLoading}) => {
    const [search, setSearch] = useState("");
    const shortenText = (text, n) => {
        if (text.length > n){
            const shortenedText = text.substring(0, n).concat("...");
            return shortenedText
        }
        return text;
    }
    return <div className="product-list">
        <hr />
        <div className="table">
            <div className="--flex-between --flex-dir-column">
                <span>
                    <h3>Inventory Items</h3>
                </span>
                <span>
                    <Search value={search} onChange={(e) => setSearch(e.target.value)}/>
                </span>
            </div>
            {isLoading && <SpinnerImg/>}

            <div className="table">
                {!isLoading && products.length === 0 ? (
                    <p>--  No Product found, please add a product ...</p>
                ): (
                    <table>
                        <thead>
                            <tr>
                                <th>s/n</th>
                                <th>Name</th>
                                <th>Category</th>
                                <th>Price</th>
                                <th>Quantity</th>
                                <th>Value</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                products.map((product, index)=>{
                                    const {_id, name, category, price, quantity,} = product
                                    return (
                                        <tr key={_id}>
                                            <td>{index + 1}</td>
                                            <td>{shortenText(name, 16)}</td>
                                            <td>{category}</td>
                                            <td>{"₦ "}{price}</td>
                                            <td>{quantity}</td>
                                            <td>{"₦ "}{price * quantity}</td>
                                            <td className="icons">
                                            
                                                    <AiOutlineEye size={25} color={"purple"}/>
                                                    <FaEdit size={20} color={"green"}/>
                                                    <FaTrashAlt size={20} color={"red"}/>
                                                                            </td>
                                        </tr>
                                    ) 
                                })
                            }
                        </tbody>
                    </table>
                )}
            </div>
        </div>
    </div>
}

export default ProductList;
