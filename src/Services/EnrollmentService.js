const enrollmentDAL = require('../DAL/EnrollmentDAL');

const getAllEnrollmentsService = async () => {
  return enrollmentDAL.getAllEnrollments();
};

const getEnrollmentByIdService = async (enrollmentId) => {
  return enrollmentDAL.getEnrollmentById(enrollmentId);
};

const createEnrollmentService = async (data) => {
  return enrollmentDAL.createEnrollment(data);
};

const updateEnrollmentService = async (enrollmentId, data) => {
  return enrollmentDAL.updateEnrollment(enrollmentId, data);
};

const deleteEnrollmentService = async (enrollmentId) => {
  return enrollmentDAL.deleteEnrollment(enrollmentId);
};

module.exports = {
  getAllEnrollmentsService,
  getEnrollmentByIdService,
  createEnrollmentService,
  updateEnrollmentService,
  deleteEnrollmentService,
};
