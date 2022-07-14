//not used this file yet.

const { ApiFeatures } = require("../utils/apifeatures")
const express = require('express');

const categoryKeyword = (req,res,next)=>{
    const {keyword , category} = req.query;
    const apiFeature = new ApiFeatures("", req.query);

    if(keyword && category)
        apiFeature.filter("pages", "category");
    
    else if(!category)
        apiFeature.filter("pages");
    
    else if(!keyword)
        apiFeature.filter("keyword", "pages");
    
    next(apiFeature);
}

module.exports = categoryKeyword;