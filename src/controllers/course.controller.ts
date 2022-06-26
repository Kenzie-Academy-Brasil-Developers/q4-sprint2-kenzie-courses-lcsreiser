import { Request, Response } from "express";
import { courseService } from "../services";

class CourseController {
  createCourse = async (req: Request, res: Response) => {
    const course = await courseService.createCourse(req);
    return res.status(201).json(course);
  };

  readAll = async (req: Request, res: Response) => {
    const courses = await courseService.readAllCourses(req);
    return res.status(200).json(courses);
  };

  updateCourse = async (req: Request, res: Response) => {
    const course = await courseService.updateCourse(req);
    return res.status(200).json(course);
  };

  relationUser = async (req: Request, res: Response) => {
    const courseUser = await courseService.relationUser(req)

    return res.status(courseUser.status).json(courseUser.message)
  }
}

export default new CourseController();
