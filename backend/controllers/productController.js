const {addNewProduct, searchProduct, searchProductByPriceRangeKey, deleteReviewFromProduct, addReviewToProduct, findProduct, deleteProduct, updateProduct} = require('../services/productService');
const result2 = "Product Not found!";

const getProductByIdController = async (req, res, next) =>{
    const {id} = req.query;
    const result = await findProduct(id);
    if(!result)
        return res.status(404).json({'message':result2});
    return res.status(200).json({'message':result});
}

const createNewProductController = async (req, res) =>{
    const {product} = req.body;
    const result = await addNewProduct(product, req.user._id);
    if(!result)
        return res.status(400).json({'message':result2});
    console.log("Product added in database.");
    return res.status(201).json({'message':result});
}

const deleteProductController = async (req, res, next) =>{
    const {id} = req.params;
    const result = await deleteProduct(id);
    if(!result)
        return res.status(404).json({'message':result2});
    console.log("Product deleted from database.");
    return res.status(204).json({'message':result}); 
}

const getProductByKeywordController = async (req, res, next) =>{
    const {key} = req.query;
    const page = Number(req.query.page);
    const result = await searchProduct(key, page);
    if(!result)
        return res.status(404).json({'message':result2});
    return res.status(200).json({'message':result});
}

const getProductByPriceRangeKeyController = async (req, res, next) =>{
    const {lt} = req.query;
    const {gt} = req.query;
    const {key} = req.query;
    const page = Number(req.query.page);
    const result = await searchProductByPriceRangeKey(key, gt, lt, page);
    if(!result)
        return res.status(404).json({'message':result2});
    return res.status(200).json({'message':result});
}

const updateProductController = async (req, res, next) =>{
    const {id} = req.params;
    const {updates} = req.body;
    const result = await updateProduct(id, updates);
    if(!result)
        return res.status(404).json({'message':result2});
    console.log("Product updated in database.");
    return res.status(204).json({'message':result});
}

const addReviewController = async (req, res) =>{
    const customer = req.user._id;
    const customerName = req.user.name;
    const { comment } = req.body;
    const rating = Number( req.body.rating);
    const product = req.query.pid;
    const review = {
        customerId: customer,
        name: customerName,
        rating: Number(rating),
        comment: comment
    }

    const result = await addReviewToProduct(product, review);
    if(!result)
        return res.status(404).json({'message':result2});
    return res.status(200).json({'message':result});
}

const deleteReviewController = async (req, res) =>{
    const customer = req.user._id;
    const product = req.query.pid
    const result = await deleteReviewFromProduct(product, customer);
    if(result){
        return res.status(200).json({'message': "Review deleted Successfully!"});
    }
    return res.status(404).json({'message':"Unable to delete the review!"});
}

const getProductReviewsController = async (req, res) =>{
    const pid = req.query.pid;
    const productReviews = await findProduct(pid);

    if(!productReviews){
        return res.status(404).json({'message':result2});
    }
    return res.status(201).json({'message':productReviews});
}

module.exports.getProductReviewsController = getProductReviewsController;
module.exports.deleteReviewController = deleteReviewController;
module.exports.addReviewController = addReviewController;
module.exports.createNewProductController = createNewProductController;
module.exports.getProductByIdController = getProductByIdController;
module.exports.getProductByKeywordController = getProductByKeywordController
module.exports.getProductByPriceRangeKeyController = getProductByPriceRangeKeyController;
module.exports.updateProductController = updateProductController;
module.exports.deleteProductController = deleteProductController;