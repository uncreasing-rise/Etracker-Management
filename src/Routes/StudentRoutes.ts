import { Router } from 'express'
import {
  getAllStudentsController,
  getStudentByIdController,
  createStudentController,
  updateStudentController,
  deleteStudentController,
} from '../Controllers/StudentController'

const router = Router()

/**
 * @swagger
 * tags:
 *   name: Students
 *   description: Customer management
 */

/**
 * @swagger
 * /api/students:
 *   get:
 *     summary: Retrieve a list of all students
 *     responses:
 *       200:
 *         description: A list of students
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Student'
 */
router.get('/students', getAllStudentsController)

/**
 * @swagger
 * /api/students/{userId}:
 *   get:
 *     summary: Retrieve a student by ID
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: A student object
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Student'
 *       404:
 *         description: Student not found
 */
router.get('/students/:userId', getStudentByIdController)

/**
 * @swagger
 * /api/students:
 *   post:
 *     summary: Create a new student
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Student'
 *     responses:
 *       201:
 *         description: Student created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Student'
 */
router.post('/students', createStudentController)

/**
 * @swagger
 * /api/students/{userId}:
 *   put:
 *     summary: Update a student by ID
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Student'
 *     responses:
 *       200:
 *         description: Student updated
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Student'
 *       404:
 *         description: Student not found
 */
router.put('/students/:userId', updateStudentController)

/**
 * @swagger
 * /api/students/{userId}:
 *   delete:
 *     summary: Delete a student by ID
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Student deleted successfully
 *       404:
 *         description: Student not found
 */
router.delete('/students/:userId', deleteStudentController)

export default router
