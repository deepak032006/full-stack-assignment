const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

exports.createTender = async (req, res) => {
  const { title, description, deadline, budget, companyId } = req.body;
  try {
    const tender = await prisma.tender.create({
      data: {
        title,
        description,
        deadline: new Date(deadline),
        budget,
        companyId
      }
    });
    res.status(201).json(tender);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Could not create tender' });
  }
};

exports.getAllTenders = async (req, res) => {
  try {
    const tenders = await prisma.tender.findMany({
      include: { company: true }
    });
    res.json(tenders);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch tenders' });
  }
};

exports.getCompanyTenders = async (req, res) => {
  const { companyId } = req.params;
  try {
    const tenders = await prisma.tender.findMany({
      where: { companyId: parseInt(companyId) }
    });
    res.json(tenders);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching tenders' });
  }
};
