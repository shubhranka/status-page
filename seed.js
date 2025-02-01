// seed.js

import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();
import bcryptjs from 'bcryptjs';

const { hash } = bcryptjs;

async function main() {
  // Hash passwords for security
  const passwordHash1 = await hash('adminPassword1', 10);
  const passwordHash2 = await hash('userPassword2', 10);
  const passwordHash3 = await hash('userPassword3', 10);
  const passwordHash4 = await hash('adminPassword4', 10);
  const passwordHash5 = await hash('userPassword5', 10);
  const passwordHash6 = await hash('userPassword6', 10);
  const passwordHash7 = await hash('adminPassword7', 10);
  const passwordHash8 = await hash('userPassword8', 10);

  // Create multiple organizations
  const organization1 = await prisma.organization.create({
    data: {
      name: 'Tech Innovators Inc.',
    },
  });

  const organization2 = await prisma.organization.create({
    data: {
      name: 'Global Solutions LLC',
    },
  });

  const organization3 = await prisma.organization.create({
    data: {
      name: 'NextGen Software Co.',
    },
  });

  // Create users for organization1
  const org1Admin = await prisma.user.create({
    data: {
      organizationId: organization1.id,
      email: 'admin1@techinnovators.com',
      password: passwordHash1,
      role: 'ADMIN',
    },
  });

  const org1User1 = await prisma.user.create({
    data: {
      organizationId: organization1.id,
      email: 'user1@techinnovators.com',
      password: passwordHash2,
      role: 'USER',
    },
  });

  const org1User2 = await prisma.user.create({
    data: {
      organizationId: organization1.id,
      email: 'user2@techinnovators.com',
      password: passwordHash3,
      role: 'USER',
    },
  });

  // Create users for organization2
  const org2Admin = await prisma.user.create({
    data: {
      organizationId: organization2.id,
      email: 'admin2@globalsolutions.com',
      password: passwordHash4,
      role: 'ADMIN',
    },
  });

  const org2User1 = await prisma.user.create({
    data: {
      organizationId: organization2.id,
      email: 'user1@globalsolutions.com',
      password: passwordHash5,
      role: 'USER',
    },
  });

  // Create users for organization3
  const org3Admin = await prisma.user.create({
    data: {
      organizationId: organization3.id,
      email: 'admin@nextgensoftware.com',
      password: passwordHash7,
      role: 'ADMIN',
    },
  });

  const org3User1 = await prisma.user.create({
    data: {
      organizationId: organization3.id,
      email: 'user@nextgensoftware.com',
      password: passwordHash8,
      role: 'USER',
    },
  });

  // Create services for organization1
  const org1Service1 = await prisma.service.create({
    data: {
      organizationId: organization1.id,
      name: 'Authentication Service',
      description: 'Handles user authentication and authorization.',
      status: 'OPERATIONAL',
    },
  });

  const org1Service2 = await prisma.service.create({
    data: {
      organizationId: organization1.id,
      name: 'Data Processing API',
      description: 'Processes and analyzes data input.',
      status: 'DEGRADED_PERFORMANCE',
    },
  });

  // Create services for organization2
  const org2Service1 = await prisma.service.create({
    data: {
      organizationId: organization2.id,
      name: 'Payment Gateway',
      description: 'Processes payment transactions securely.',
      status: 'OPERATIONAL',
    },
  });

  const org2Service2 = await prisma.service.create({
    data: {
      organizationId: organization2.id,
      name: 'Notification Service',
      description: 'Sends out system notifications and alerts.',
      status: 'MAJOR_OUTAGE',
    },
  });

  // Create services for organization3
  const org3Service1 = await prisma.service.create({
    data: {
      organizationId: organization3.id,
      name: 'AI Analytics',
      description: 'Provides AI-driven analytics insights.',
      status: 'PARTIAL_OUTAGE',
    },
  });

  // Create incidents for organization1 services
  const org1Incident1 = await prisma.incident.create({
    data: {
      serviceId: org1Service2.id,
      reporterId: org1User1.id,
      title: 'Slow Data Processing',
      description: 'Data processing times have increased significantly.',
      status: 'INVESTIGATING',
      impact: 'MAJOR',
    },
  });

  await prisma.incidentUpdate.create({
    data: {
      incidentId: org1Incident1.id,
      updaterId: org1User1.id,
      status: 'INVESTIGATING',
      message: 'Investigating the cause of the slowdown.',
    },
  });

  // Create incidents for organization2 services
  const org2Incident1 = await prisma.incident.create({
    data: {
      serviceId: org2Service2.id,
      reporterId: org2User1.id,
      title: 'Notification Service Outage',
      description: 'Users are not receiving notifications.',
      status: 'IDENTIFIED',
      impact: 'CRITICAL',
    },
  });

  await prisma.incidentUpdate.createMany({
    data: [
      {
        incidentId: org2Incident1.id,
        updaterId: org2Admin.id,
        status: 'IDENTIFIED',
        message: 'Issue identified with the message queue.',
      },
      {
        incidentId: org2Incident1.id,
        updaterId: org2Admin.id,
        status: 'RESOLVED',
        message: 'Service restored after restarting the message queue.',
      },
    ],
  });

  // Create incidents for organization3 services
  const org3Incident1 = await prisma.incident.create({
    data: {
      serviceId: org3Service1.id,
      reporterId: org3User1.id,
      title: 'AI Analytics Partial Outage',
      description: 'Some analytics reports are not generating.',
      status: 'INVESTIGATING',
      impact: 'MINOR',
    },
  });

  await prisma.incidentUpdate.create({
    data: {
      incidentId: org3Incident1.id,
      updaterId: org3Admin.id,
      status: 'IDENTIFIED',
      message: 'Issue traced to data ingestion pipeline.',
    },
  });

  // Create maintenance events for organization1 services
  const org1Maintenance1 = await prisma.maintenance.create({
    data: {
      serviceId: org1Service1.id,
      creatorId: org1Admin.id,
      title: 'Authentication Service Database Upgrade',
      description: 'Upgrading the database to improve performance.',
      status: 'SCHEDULED',
      scheduledStartTime: new Date(Date.now() + 86400000), // 24 hours from now
      scheduledEndTime: new Date(Date.now() + 90000000),   // 25 hours from now
    },
  });

  await prisma.maintenanceUpdate.create({
    data: {
      maintenanceId: org1Maintenance1.id,
      updaterId: org1Admin.id,
      status: 'SCHEDULED',
      message: 'Maintenance scheduled for tomorrow.',
    },
  });

  // Create maintenance events for organization2 services
  const org2Maintenance1 = await prisma.maintenance.create({
    data: {
      serviceId: org2Service1.id,
      creatorId: org2User1.id,
      title: 'Payment Gateway Security Patches',
      description: 'Applying critical security patches.',
      status: 'IN_PROGRESS',
      scheduledStartTime: new Date(Date.now() - 3600000), // Started 1 hour ago
      scheduledEndTime: new Date(Date.now() + 3600000),   // Ends in 1 hour
    },
  });

  await prisma.maintenanceUpdate.createMany({
    data: [
      {
        maintenanceId: org2Maintenance1.id,
        updaterId: org2User1.id,
        status: 'IN_PROGRESS',
        message: 'Maintenance started.',
      },
      {
        maintenanceId: org2Maintenance1.id,
        updaterId: org2User1.id,
        status: 'COMPLETED',
        message: 'Maintenance completed successfully.',
      },
    ],
  });

  // Create maintenance events for organization3 services
  const org3Maintenance1 = await prisma.maintenance.create({
    data: {
      serviceId: org3Service1.id,
      creatorId: org3Admin.id,
      title: 'Scaling AI Analytics Servers',
      description: 'Adding more servers to handle increased load.',
      status: 'SCHEDULED',
      scheduledStartTime: new Date(Date.now() + 43200000), // 12 hours from now
      scheduledEndTime: new Date(Date.now() + 46800000),   // 13 hours from now
    },
  });

  await prisma.maintenanceUpdate.create({
    data: {
      maintenanceId: org3Maintenance1.id,
      updaterId: org3Admin.id,
      status: 'SCHEDULED',
      message: 'Maintenance scheduled for later today.',
    },
  });

  console.log('Database has been seeded with extended data.');
}

main()
  .catch((e) => {
    console.error('Error seeding database:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });