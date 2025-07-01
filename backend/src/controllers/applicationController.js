const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

exports.submitApplication = async (req, res) => {
  const { proposal, tenderId, companyId } = req.body;
  try {
    const application = await prisma.application.create({
      data: {
        proposal,
        tenderId,
        companyId
      }
    });
    res.status(201).json(application);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Failed to submit application' });
  }
};

exports.getApplicationsForTender = async (req, res) => {
  const { tenderId } = req.params;
  try {
    const applications = await prisma.application.findMany({
      where: { tenderId: parseInt(tenderId) },
      include: { company: true }
    });
    res.json(applications);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch applications' });
  }
};
