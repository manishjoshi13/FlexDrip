import { Product } from "../models/product.model.js";
import { asyncHandler } from "../utils/asyncWrapper.js";

import {imageKit} from "../services/imageKit.js";


const createProduct = asyncHandler(async (req, res, next) => {
    const {title,description,priceAmount,priceCurrency} = req.body
    const uploadedImages = await Promise.all(req.files.map((file)=>{
        return imageKit.files.upload({
            file:file.buffer.toString("base64"),
            fileName:file.originalname,
            folder:"snitch/products"
        })
    }))
    const images = uploadedImages.map(img => ({
        url: img.url,
        fileId: img.fileId
    }))
    const product = new Product({
        title,
        description,
        price:{amount:priceAmount,currency:priceCurrency},
        images,
        seller:req.user.id
    })
    await product.save()
    res.status(201).json({message:"Product created successfully",product})
})

const getMyProducts = asyncHandler(async(req,res,next)=>{
    const products = await Product.find({seller:req.user.id})
    res.status(200).json({message:"Products fetched successfully",products})
})

const getProductById = asyncHandler(async (req, res, next) => {
    const product = await Product.findById(req.params.id);
    if (!product) {
        return res.status(404).json({ message: "Product not found" });
    }
    res.status(200).json({ success: true, product });
})

const updateProduct = asyncHandler(async (req, res, next) => {
    const product = await Product.findById(req.params.id);
    if (!product) {
        return res.status(404).json({ message: "Product not found" });
    }
    
    // Check ownership
    if (product.seller.toString() !== req.user.id.toString()) {
        return res.status(403).json({ message: "You are not authorized to update this product" });
    }

    const { title, description, priceAmount, priceCurrency, existingImages } = req.body;

    // Parse existing images remaining
    let parsedExistingImages = [];
    if (existingImages) {
        try {
            parsedExistingImages = JSON.parse(existingImages);
        } catch (e) {
            return res.status(400).json({ message: "Invalid existingImages format" });
        }
    }

    // Determine removed images and delete them from ImageKit
    const existingUrls = parsedExistingImages.map(img => img.url);
    const removedImages = product.images.filter(img => !existingUrls.includes(img.url));

    await Promise.all(removedImages.map(async (img) => {
        if (img.fileId) {
            try {
                await imageKit.files.delete(img.fileId);
            } catch (err) {
                console.error(`Failed to delete file ${img.fileId} from ImageKit:`, err);
            }
        }
    }));

    // Upload new images if any
    let newUploadedImages = [];
    if (req.files && req.files.length > 0) {
        const uploads = await Promise.all(req.files.map((file) => {
            return imageKit.files.upload({
                file: file.buffer.toString("base64"),
                fileName: file.originalname,
                folder: "snitch/products"
            });
        }));
        newUploadedImages = uploads.map(img => ({
            url: img.url,
            fileId: img.fileId
        }));
    }

    const finalImages = [...parsedExistingImages, ...newUploadedImages];
    if (finalImages.length === 0) {
        return res.status(400).json({ message: "At least one product image is required" });
    }

    product.title = title;
    product.description = description;
    product.price = { amount: priceAmount, currency: priceCurrency };
    product.images = finalImages;

    await product.save();

    res.status(200).json({ message: "Product updated successfully", product });
})

const deleteProduct = asyncHandler(async (req, res, next) => {
    const product = await Product.findById(req.params.id);
    if (!product) {
        return res.status(404).json({ message: "Product not found" });
    }

    // Check ownership
    if (product.seller.toString() !== req.user.id.toString()) {
        return res.status(403).json({ message: "You are not authorized to delete this product" });
    }

    // Delete files from ImageKit
    if (product.images && product.images.length > 0) {
        await Promise.all(product.images.map(async (img) => {
            if (img.fileId) {
                try {
                    await imageKit.files.delete(img.fileId);
                } catch (err) {
                    console.error(`Failed to delete file ${img.fileId} from ImageKit:`, err);
                }
            }
        }));
    }

    await Product.findByIdAndDelete(req.params.id);

    res.status(200).json({ message: "Product deleted successfully" });
})

export { createProduct, getMyProducts, getProductById, updateProduct, deleteProduct }