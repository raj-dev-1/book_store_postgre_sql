import { Request, Response } from "express";
import {Book} from "../models/book.model";
import { msg } from "../config/msg";
import { Op } from "sequelize";
import { User } from "../models/user.model";

const create = async (
  req: Request | any,
  res: Response
) => {
  try {
    if (!req.body)
      return res
        .status(400)
        .json({ message: msg.bookMessage.error.fillDetails });
    const { userId = req.user.id, ...bookData } = req.body;

    const newBook = await Book.create({ userId, ...bookData });
    if (!newBook)
      return res.status(404).json({ message: msg.bookMessage.error.add });
    return res.status(201).json({ message: msg.bookMessage.success.add });
  } catch (error: any) {
    if (error.name === "SequelizeValidationError") {
      const errors = Object.values(error.errors).map((err: any) => err.message);
      return res.status(400).json({ errors });
    }
    return res
      .status(500)
      .json({ message: msg.bookMessage.error.genericError });
  }
};

const list = async (
    req: Request | any, 
    res: Response
) => {
  try {
    const { page, bookName, limit } = req.query;
    if (bookName && bookName.trim()) {
      const searchBook = await Book.findAll({
        where: { bookName: { [Op.iLike]: `%${bookName}%` } },
      });
      return res.status(200).json({
        message: msg.bookMessage.success.fetch,
        books: searchBook,
      });
    }
    const pageCount:number = page || 1;
    const limitDoc:number = limit || 10;
    const totalBook: any = await Book.count({ where: { status: true } });
    const maxPage = totalBook <= limitDoc ? 1 : Math.ceil(totalBook / limitDoc);
    if (pageCount > maxPage)
      return res
        .status(400)
        .json({ message: `There are only ${maxPage} page` });
    const skip = (pageCount - 1) * limitDoc;

    const bookList = await Book.findAll({
      where: { status: true },
      limit: limitDoc,
      offset: skip,
    });

    return res.status(200).json({
      message: msg.bookMessage.success.fetch,
      bookList: bookList,
    });
  } catch (error) {
    return res
      .status(500)
      .json({ message: msg.bookMessage.error.genericError });
  }
};

const bookDetails = async (
  req: Request | any,
  res: Response
) => {
  try {
    const { id } = req.params;
    const bookDetails = await Book.findOne({
      where: { id: Number(id) },
      include: {
        model: User,
        attributes: ["name"],
      },
    });

    if (!bookDetails)
      return res.status(404).json({ message: msg.bookMessage.error.notFound });

    return res.status(200).json({
      message: msg.bookMessage.success.fetch,
      bookDetails,
    });
  } catch (error) {
    return res
      .status(500)
      .json({ message: msg.bookMessage.error.genericError });
  }
};

const update = async (
  req: Request | any,
  res: Response
) => {
  try {
    const { id } = req.params;

    const [editBookCount] = await Book.update(req.body, {
      where: { id },
      individualHooks: true,
      returning: true,
    });

    if (editBookCount === 0)
      return res.status(404).json({ message: msg.bookMessage.error.update });

    return res.status(200).json({
      message: msg.bookMessage.success.update,
      editBookCount,
    });
  } catch (error: any) {
    if (error.name === "ValidationError") {
      const errors = Object.values(error.errors).map((err: any) => err.message);
      return res.status(400).json({ errors });
    }
    return res
      .status(500)
      .json({ message: msg.bookMessage.error.genericError });
  }
};

const remove = async (
    req: Request | any,
    res: Response
) => {
  try {
    const { id } = req.params;
    const deleteBook = await Book.destroy({
      where: { id },
    });
    if (!deleteBook) {
      return res.status(404).json({ message: msg.bookMessage.error.delete });
    }
    return res.status(200).json({
      message: msg.bookMessage.success.delete,
      deleteBook,
    });
  } catch (error) {
    return res.status(500).json({ message: msg.bookMessage.error.genericError });
  }
};

export { create, list, bookDetails, update, remove };
