const express =  require('express');
class ApiFeatures{
    constructor(query, queryStr){
        this.query = query;
        this.queryStr = queryStr;
    }

    search(value){
        const field = value;
        if(field === "1"){
            const keyword = this.queryStr.keyword ? {           //if keyword is defined
                name: {
                    $regex: this.queryStr.keyword,
                    $options: "i"
                }
            }:{                                                 
                //if keyword is not defined
            }
            this.query = this.query.find({...keyword});
        }
        else if(field === "0"){
            const category = this.queryStr.category ? {           
                category: {
                    $regex: this.queryStr.category,
                    $options: "i"
                } 
            }:{                                                 
                //if category is not defined
            }
            this.query = this.query.find({...category});
        }
        return this;
    }

    filter(removeFieldsList){
        const queryCopy = { ...this.queryStr};
        removeFieldsList.forEach(element => delete queryCopy[element]);
        this.query = this.query.find({queryCopy});
        return this;
    }
}

module.exports.ApiFeatures = ApiFeatures;