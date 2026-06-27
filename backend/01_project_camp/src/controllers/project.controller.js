import mongoose from "mongoose";
import Project from "../models/project.models";
import ProjectMember from "../models/projectmember.models";
import { AvailableUserRoles, UserRolesEnum } from "../utils/constants";

// get projects
const getProjects = async (req, res) => {
  const projects = await ProjectMember.aggregate([
    {
      $match: {
        user: new mongoose.Types.ObjectId(req.user._id),
      },
    },
    {
      $lookup: {
        from: "projects",
        localField: "projects",
        foreignField: "_id",
        as: "projects",
        pipeline: [
          {
            $lookup: {
              from: "projectmembers",
              localField: "_id",
              foreignField: "projects",
              as: "projectmembers",
            },
          },
          {
            $addFields: {
              members: {
                $size: "$projectmembers",
              },
            },
          },
        ],
      },
    },
    {
      $unwind: "$projects",
    },
    {
      $project: {
        project: {
          _id: 1,
          name: 1,
          members: 1,
          description: 1,
          createdAt: 1,
          createdBy: 1,
        },
        role: 1,
        _id: 0,
      },
    },
  ]);
  await ApiResponse.success(res, { projects }, "Projects fetched successfully");
};

// get single project
const getProjectById = async (req, res) => {
  const { projectId } = req.params;
  const project = await Project.findById(projectId);
  if (!project) {
    throw ApiError.notFound("Project not found");
  }
  await ApiResponse.success(res, { project }, "Project fetched successfully");
};
// create project
const createProject = async (req, res) => {
  const { name, description } = req.body;
  const project = await Project.create({
    name,
    description,
    createdBy: new mongoose.Types.ObjectId(req.user._id),
  });
  await ProjectMember.create({
    user: new mongoose.Types.ObjectId(req.user._id),
    project: new mongoose.Types.ObjectId(project._id),
    role: UserRolesEnum.ADMIN,
  });
  await ApiResponse.created(res, { project }, "Project created successfully");
};

// update project
const updateProject = async (req, res) => {
  const { name, description } = req.body;
  const { projectId } = req.params;
  const project = await Project.findByIdAndUpdate(
    projectId,
    { name, description },
    { new: true },
  );
  if (!project) {
    throw ApiError.notFound("Project not found");
  }
  await ApiResponse.success(res, { project }, "Project updated successfully");
};

// delete project
const deleteProject = async (req, res) => {
  const { projectId } = req.params;
  const project = await Project.findByIdAndDelete(projectId);
  if (!project) {
    throw ApiError.notFound("Project not found");
  }
  await ApiResponse.success(res, null, "Project deleted successfully");
};

// add member to project
const addMemberToProject = async (req, res) => {
  const { email, role } = req.body;
  const { projectId } = req.params;
  const user = await User.findOne({ email });
  if (!user) {
    throw ApiError.notFound("User not found");
  }
  const projectMember = await ProjectMember.findByIdAndUpdate(
    {
      users: new mongoose.Types.ObjectId(user._id),
      projects: new mongoose.Types.ObjectId(projectId),
    },
    {
      users: new mongoose.Types.ObjectId(user._id),
      projects: new mongoose.Types.ObjectId(projectId),
      role,
    },
    { new: true, upsert: true },
  );
  await ApiResponse.success(
    res,
    { projectMember },
    "Member added to project successfully",
  );
};

// get project members
const getProjectMembers = async (req, res) => {
  const { projectId } = req.params;
  const project = await Project.findById(projectId);
  if (!project) {
    throw ApiError.notFound("Project not found");
  }
  const projectMembers = await ProjectMember.aggregate([
    {
      $match: {
        projects: new mongoose.Types.ObjectId(projectId),
      },
    },
    {
      $lookup: {
        from: "users",
        localField: "users",
        foreignField: "_id",
        as: "user",
        pipeline: [
          {
            $project: {
              _id: 1,
              username: 1,
              fullName: 1,
              avatar: 1,
            },
          },
          {
            $addFields: {
              user: {
                $arrayElementAt: ["$user", 0],
              },
            },
          },
        ],
      },
    },
    {
      $project: {
        project: 1,
        user: 1,
        role: 1,
        createdAt: 1,
        updatedAt: 1,
        _id: 0,
      },
    },
  ]);
  await ApiResponse.success(
    res,
    { projectMembers },
    "Project members fetched successfully",
  );
};
const updateMemberRoleInProject = async (req, res) => {
  const { projectId, memberId } = req.params;
  const { role } = req.body;
  if (!AvailableUserRoles.includes(role)) {
    throw ApiError.badRequest("Invalid role");
  }
  const projectMember = await ProjectMember.findOneAndUpdate(
    {
      users: new mongoose.Types.ObjectId(memberId),
      projects: new mongoose.Types.ObjectId(projectId),
    },
    { role },
    { new: true },
  );
  if (!projectMember) {
    throw ApiError.notFound("Project member not found");
  }
  await ApiResponse.success(
    res,
    { projectMember },
    "Project member role updated successfully",
  );
};

const deleteMemberFromProject = async (req, res) => {
  const { projectId, memberId } = req.params;
  const projectMember = await ProjectMember.findOneAndDelete({
    users: new mongoose.Types.ObjectId(memberId),
    projects: new mongoose.Types.ObjectId(projectId),
  });
  if (!projectMember) {
    throw ApiError.notFound("Project member not found");
  }
  await ApiResponse.success(res, null, "Project member deleted successfully");
};

export {
  getProjects,
  getProjectById,
  createProject,
  updateProject,
  deleteProject,
  addMemberToProject,
  getProjectMembers,
  updateMemberRoleInProject,
  deleteMemberFromProject,
};
