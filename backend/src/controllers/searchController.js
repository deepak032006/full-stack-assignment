const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

exports.searchCompanies = async (req, res) => {
  const { name, industry, service } = req.query;

  try {
    const companies = await prisma.company.findMany({
      where: {
        AND: [
          name ? { name: { contains: name, mode: 'insensitive' } } : {},
          industry ? { industry: { contains: industry, mode: 'insensitive' } } : {},
          service
            ? {
                services: {
                  some: {
                    name: { contains: service, mode: 'insensitive' }
                  }
                }
              }
            : {}
        ]
      },
      include: {
        services: true
      }
    });

    res.json(companies);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Search failed' });
  }
};
