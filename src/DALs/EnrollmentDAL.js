const EnrollmentModel = require('../Models/Enrollment');

const getAllEnrollments = async () => {
  return EnrollmentModel.find().populate('studentId').populate('classId');
};

const getEnrollmentById = async (enrollmentId) => {
  return EnrollmentModel.findById(enrollmentId)
    .populate('studentId')
    .populate('classId');
};

const createEnrollment = async (data) => {
  const newEnrollment = new EnrollmentModel(data);
  return newEnrollment.save();
};

const updateEnrollment = async (enrollmentId, data) => {
  return EnrollmentModel.findByIdAndUpdate(enrollmentId, data, { new: true })
    .populate('studentId')
    .populate('classId');
};

const deleteEnrollment = async (enrollmentId) => {
  return EnrollmentModel.findByIdAndDelete(enrollmentId);
};

module.exports = {
  getAllEnrollments,
  getEnrollmentById,
  createEnrollment,
  updateEnrollment,
  deleteEnrollment,
};
