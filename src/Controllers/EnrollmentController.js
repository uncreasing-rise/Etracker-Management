// src/Controllers/EnrollmentController.js

const enrollmentService = require('../Services/EnrollmentService');

const getAllEnrollmentsController = async (req, res) => {
  try {
    const enrollments = await enrollmentService.getAllEnrollmentsService();
    res.json(enrollments);
  } catch (error) {
    res
      .status(500)
      .json({ message: 'Error retrieving enrollments', error: error.message });
  }
};

const getEnrollmentByIdController = async (req, res) => {
  const { enrollmentId } = req.params;
  try {
    const enrollment =
      await enrollmentService.getEnrollmentByIdService(enrollmentId);
    if (enrollment) {
      res.json(enrollment);
    } else {
      res.status(404).json({ message: 'Enrollment not found' });
    }
  } catch (error) {
    res
      .status(500)
      .json({ message: 'Error retrieving enrollment', error: error.message });
  }
};

const createEnrollmentController = async (req, res) => {
  try {
    const enrollment = await enrollmentService.createEnrollmentService(
      req.body
    );
    res.status(201).json(enrollment);
  } catch (error) {
    res
      .status(400)
      .json({ message: 'Error creating enrollment', error: error.message });
  }
};

const updateEnrollmentController = async (req, res) => {
  const { enrollmentId } = req.params;
  try {
    const updatedEnrollment = await enrollmentService.updateEnrollmentService(
      enrollmentId,
      req.body
    );
    if (updatedEnrollment) {
      res.json(updatedEnrollment);
    } else {
      res.status(404).json({ message: 'Enrollment not found' });
    }
  } catch (error) {
    res
      .status(400)
      .json({ message: 'Error updating enrollment', error: error.message });
  }
};

const deleteEnrollmentController = async (req, res) => {
  const { enrollmentId } = req.params;
  try {
    const deletedEnrollment =
      await enrollmentService.deleteEnrollmentService(enrollmentId);
    if (deletedEnrollment) {
      res.json({ message: 'Enrollment deleted successfully' });
    } else {
      res.status(404).json({ message: 'Enrollment not found' });
    }
  } catch (error) {
    res
      .status(500)
      .json({ message: 'Error deleting enrollment', error: error.message });
  }
};

module.exports = {
  getAllEnrollmentsController,
  getEnrollmentByIdController,
  createEnrollmentController,
  updateEnrollmentController,
  deleteEnrollmentController,
};
