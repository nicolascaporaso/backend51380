import { ProductService } from '../services/product.service.js';
import SessionDTO from "../DAO/DTO/Session.DTO.js";

class ProductsController {
    async getAll(req, res) {
        try {
            let { page, limit, sort, prenda } = req.query;

            const produsctFound = await ProductService.getAll(page, limit, sort, prenda);

            return res.status(200).json({
                status: "success",
                msg: "Listado de productos obtenido con éxito",
                payload: produsctFound.docs
            });
        } catch (error) {
            console.error(error);

            return res.status(500).json({
                status: "error",
                msg: "Hubo un problema al procesar tu solicitud. Por favor, inténtalo de nuevo más tarde."
            });
        }
    }


    async getOne(req, res) {
        try {
            const producto = await ProductService.getOne(req.params.pid)
            return res.status(200).json({
                status: "success",
                msg: "usuario con id:",
                data: producto,
            });
        } catch (e) {
            console.log(e);
            return res.status(500).json({
                status: "error",
                msg: "something went wrong :(",
                data: {},
            });
        }
    }

    async createOne(req, res) {
        const dataUser = new SessionDTO(req.session);
        const { title, description, code, price, stock, status } = req.body;
        const thumbnails = "/" + req.file.filename;
        try {
            const productCreated = await ProductService.createOne(title, description, code, price, stock, status, thumbnails, dataUser )

            return res.status(201).json({
                status: "success",
                msg: "Product create",
                data: productCreated,
            });

        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'error desconocido' })
        }
    }

    async updateOne(req, res) {
        try {
            const thumbnails = "/" + req.file.filename;
            const id = req.params.id;
            let { title, description, code, price, stock, status, } = req.body;

            const productUpdated = await ProductService.updateOne(id, title, description, code, price, stock, status, thumbnails);

            return res.status(201).json({
                status: "success",
                msg: "product uptaded", 
                data: { _id: id, description, title, code, price, stock, status, thumbnails },
            });
        } catch (e) {
            console.log(e);
            return res.status(500).json({
                status: "error",
                msg: "something went wrong :(",
                data: {},
            });
        }
    }


    async delete(req, res) {
        const dataUser = new SessionDTO(req.session);
        try {
            const product = await ProductService.deleteOne(req.params.id, dataUser)

            return res.status(200).json({
                status: "success",
                msg: "product deleted",
                data: product,
            });
        } catch (e) {
            console.log(e);
            return res.status(500).json({
                status: "error",
                msg: "something went wrong :(",
                data: {},
            });
        }
    };

}

export const productsController = new ProductsController();