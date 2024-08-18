import { Request, Response } from "express";
import { prisma } from "../server";

const defaultListId = 1;

const ensureDefaultListExists = async () => {
    const defaultList = await prisma.list.findUnique({
        where: { id: defaultListId },
    });
    if (!defaultList) {
        await prisma.list.create({
            data: { id: defaultListId },
        });
    }
};

const addElement = async (req: Request, res: Response) => {
    console.log(req.body);
    try {
        await ensureDefaultListExists();
        const { isActive, description, list } = req.body;
        console.log(isActive, description, list);
        const newElement = await prisma.element.create({
            data: {
                isActive: isActive,
                description: description,
                list: {
                    connect: { id: list || defaultListId }
                }
            },
        });
        res.status(200).json(newElement);
    } catch (e) {
        res.status(500).json({ error: e });
    }
};

const editElement = async (req: Request, res: Response) => {
    console.log(req.body);
    try {
        await ensureDefaultListExists();
        const { id } = req.params;
        const { isActive, description, list } = req.body;
        console.log(isActive, description, list);
        const editedElement = await prisma.element.update({
            where: { id: parseInt(id) },
            data: {
                isActive: isActive,
                description: description,
                list: {
                    connect: { id: list || defaultListId }
                }
            },
        });
        res.status(200).json(editedElement);
        }
    catch (e) {
        res.status(500).json({ error: e });
    }
}

const deleteElement = async (req: Request, res: Response) => {
    console.log(req.body);
    await ensureDefaultListExists();
    try {
        const { id } = req.params;
        await prisma.element.delete({
            where: { id: parseInt(id) },
        });
        res.status(200).json({ message: `Element with id ${id} was deleted` });
    }
    catch (e) {
        res.status(500).json({ error: e });
    }
}

const getElements = async (req: Request, res: Response) => {
    console.log(req.body);
    await ensureDefaultListExists();
    try {
        const elements = await prisma.element.findMany({
            where: { listId: defaultListId },
        });
        res.status(200).json(elements);
    } catch (e) {
        res.status(500).json({ error: e });
    }
}
export default { addElement, editElement, deleteElement, getElements };