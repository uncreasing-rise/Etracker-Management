import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { findAdminByEmail } from '../DALs/AdminDAL'
import { findTeacherByEmail } from '../DALs/TeacherDAL'
import { findStudentByEmail } from '../DALs/StudentDAL'
import { IAdmin } from '../Models/Admin'
import { ITeacher } from '../Models/Teacher'
import { IStudent } from '../Models/Student'

const JWT_SECRET = 'your_jwt_secret'

// Hàm đăng nhập cho Admin, Teacher và Student
export const loginUser = async (
  email: string,
  password: string
): Promise<{ token: string; userType: string } | null> => {
  try {
    // Tìm kiếm người dùng theo email trong các mô hình
    let user: IAdmin | ITeacher | IStudent | null =
      (await findAdminByEmail(email)) ||
      (await findTeacherByEmail(email)) ||
      (await findStudentByEmail(email))

    if (!user) {
      throw new Error('Invalid email or password')
    }

    // So sánh mật khẩu
    const isMatch = await bcrypt.compare(password, user.password)
    if (!isMatch) {
      throw new Error('Invalid email or password')
    }

    // Tạo token
    const token = jwt.sign(
      { userId: user.userId, userType: user.userType },
      JWT_SECRET,
      { expiresIn: '1h' }
    )

    return { token, userType: user.userType }
  } catch (error: unknown) {
    throw new Error((error as Error).message)
  }
}
