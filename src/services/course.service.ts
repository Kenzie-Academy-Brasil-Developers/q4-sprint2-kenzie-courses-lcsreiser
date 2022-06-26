import { Request } from "express";
import { courseRepository, userRepository } from "../repositories";
import { AssertsShape } from "yup/lib/object";
import { Course, User } from "../entities";
import { serializedAdminCoursesSchema, 
  serializedCourseSchema, 
  serializedStudentsCoursesSchema } from "../schemas";

import sendEmail from "../controllers/mailer.controller"

  class CourseService {
  createCourse = async ({ validated }: Request): Promise<AssertsShape<any>> => {
    const course = await courseRepository.save(validated as Course);
    return await serializedCourseSchema.validate(course, { stripUnknown: true });
  };

  readAllCourses = async ({decoded}: Request): Promise<AssertsShape<any>> => {
    let newList = [];
    const courses = await courseRepository.listAll();
    const loggedUser = await userRepository.retrieve({id: decoded.id})
    if (loggedUser.isAdm) {
      for (const element of courses) {
        newList.push({
          id: element.id,
          courseName: element.courseName,
          duration:element.duration,
          students: await element.students
        })
      }
      return await serializedAdminCoursesSchema.validate(newList, { stripUnknown: true });
    }
    return await serializedStudentsCoursesSchema.validate(courses, { stripUnknown: true });
  };

  updateCourse = async ({validated, params}: Request): Promise<AssertsShape<any>> => {
    const course = await courseRepository.update(params.id, {...validated as Course});
    const updatedCourse = await courseRepository.retrieve({id: params.id})
    return await serializedCourseSchema.validate(updatedCourse, { stripUnknown: true });
  };

  relationUser = async ({decoded, params}: Request) => {
    const user = await userRepository.retrieve({id: decoded.id})

    const course = await courseRepository.retrieve({id: params.id})

    if(!user) {
      return {status: 404, message: {error: "User doesn't exists."}}
    }
    if(!course) {
      return {status: 404, message: {error: "Course doesn't exists."}}
    }

    user.courses = [...user.courses, course]

    await userRepository.save(user)

    sendEmail(user, course)

    return {status: 201, message: {message: `Relation from Course ${course.courseName} made for user ${user.firstName}`}}
  }
}

export default new CourseService();
