const asyncHandler = require("express-async-handler");
const Contact = require("../models/contactModel");

const getContacts = asyncHandler(async (req, res) => {
    const contact = await Contact.find({ user_id: req.user.id });
    res.status(200).json(contact);
})

const createContact = asyncHandler(async (req, res) => {
    console.log("creating contact", req.body);
    const { name, email, phone } = req.body;
    if (!name || !email || !phone) {
        req.status(400);
        throw new error("All fields are mandatory");
    }
    const contact = await Contact.create({
        name,
        email,
        phone,
        user_id: req.user.id
    });
    res.status(201).json(contact);
});

const getContact = asyncHandler(async (req, res) => {
    const contact = await Contact.findById(req.params.id);
    if (!contact) {
        res.status(404);
        throw new Error("Contact Not Found");
    }
    res.status(200).json(contact);
});

const updateContact = asyncHandler(async (req, res) => {
    const contact = await Contact.findById(req.params.id);
    if (!contact) {
        res.status(404);
        throw new Error("Contact Not Found");
    }

    if (contact.user_id.toString() !== req.user.id) {
        res.status(403);
        throw new Error("User dont have permission to update other user contacts");
    }

    const updatedContact = await Contact.findByIdUpdate(
        req.params.id,
        req.body,
        { new: true }
    );

    res.status(200).json(updatedContact);
});

const deleteContact = asyncHandler(async (req, res) => {
    const contact = await Contact.findById(req.params.id);
    if (!contact) {
        res.status(404);
        throw new Error("Contact Not Found");
    }

    if (contact.user_id.toString() !== req.user.id) {
        res.status(403);
        throw new Error("User don't have permission to update other user contacts");
    }

    await Contact.remove({_id: req.params.id});
    res.status(200).json(contact);
});


module.exports = { getContacts, createContact, getContact, updateContact, deleteContact };