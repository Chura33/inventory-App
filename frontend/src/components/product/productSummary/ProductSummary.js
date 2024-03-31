import React from "react";
import "./ProductSummary.scss";
import {AiFillDollarCircle} from "react-icons/ai";
import {BsCart4, BsCartX} from "react-icons/bs";
import {BiCategory} from "react-icons/bi";
import InfoBox from "../../infoBox/InfoBox";

// Icons
const earningIcon = < AiFillDollarCircle size={40} color="#fff"/> 
const productIcon = <BsCart4 size={40} color="#fff"/>
const categoryIcon = <BiCategory size={40} color="#fff" />
const outOfStockIcon = <BsCartX size={40} color="#fff" />;
const ProductSummary = ({products}) => {
    return <div className="product-summary">
        <h3 className="--mt"> Inventory Stats</h3>
        <div className="info-summary">
            <InfoBox icon={productIcon} title={"Total Products"} count={products.length} bgColor="card1"/>
        </div>
    </div>
}

export default ProductSummary;