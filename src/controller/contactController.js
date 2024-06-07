const { Contact } = require("../Schema/contact");
const { Op } = require("sequelize");

const AddContact = async (req, res) => {
    const { email, phoneNumber } = req.body;

    if (!email && !phoneNumber) {
        return res.status(400).json({ error: 'Email or phoneNumber must be provided' });
    }

    try {
        let primaryContact = await Contact.findOne({
            where: {
                [Op.or]: [
                    { email: email || null },
                    { phoneNumber: phoneNumber || null }
                ],
                linkPrecedence: 'primary'
            }
        });

        const commonContacts = await Contact.findAll({
            where: {
                [Op.or]: [
                    { email: email || null },
                    { phoneNumber: phoneNumber || null }
                ]
            }
        });

        if (!primaryContact) {
            primaryContact = await Contact.create({
                email: email || null,
                phoneNumber: phoneNumber || null,
                linkPrecedence: 'primary'
            });
        } else if (commonContacts.length > 1) {
            commonContacts.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
            const oldestPrimary = commonContacts[0];
            await oldestPrimary.update({ linkPrecedence: 'primary' });

            for (let i = 1; i < commonContacts.length; i++) {
                await commonContacts[i].update({
                    linkPrecedence: 'secondary',
                    linkedId: oldestPrimary.id
                });
            }
        }

        const relatedContacts = await Contact.findAll({
            where: {
                [Op.or]: [
                    { linkedId: primaryContact.id },
                    { id: primaryContact.id }
                ]
            }
        });

        const primaryEmails = [];
        const primaryPhoneNumbers = [];
        const secondaryEmails = [];
        const secondaryPhoneNumbers = [];

        relatedContacts.forEach(contact => {
            if (contact.linkPrecedence === 'primary') {
                if (contact.email) primaryEmails.push(contact.email);
                if (contact.phoneNumber) primaryPhoneNumbers.push(contact.phoneNumber);
            } else {
                if (contact.email) secondaryEmails.push(contact.email);
                if (contact.phoneNumber) secondaryPhoneNumbers.push(contact.phoneNumber);
            }
        });

        const response = {
            contact: {
                primaryContactId: primaryContact.id,
                emails: [...new Set(primaryEmails.concat(secondaryEmails))],
                phoneNumbers: [...new Set(primaryPhoneNumbers.concat(secondaryPhoneNumbers))],
                secondaryContactIds: relatedContacts
                    .filter(contact => contact.linkPrecedence === 'secondary')
                    .map(contact => contact.id)
            }
        };

        res.status(200).json(response);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}



const getAll = async (req, res) => {
    try {
        let allContacts = await Contact.findAll();
        res.status(200).json(allContacts);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

module.exports = { AddContact, getAll };
