// controllers/companyController.js
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

exports.getAllCompanies = async (req, res) => {
  try {
    const companies = await prisma.company.findMany();
    res.status(200).json(companies);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

exports.createCompany = async (req, res) => {
  const { name, industry, description, logoUrl, userId } = req.body;
  try {
    const newCompany = await prisma.company.create({
      data: {
        name,
        industry,
        description,
        logoUrl,
        userId,
      },
    });
    res.status(201).json(newCompany);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Could not create company' });
  }
};
