const getTasks = async (req, res) => {};

const getTaskById = async (req, res) => {};

const createTask = async (req, res) => {
  const { title, description, status, assignedTo } = req.body;
  const { projectId } = req.params;
  const project = await Project.findById(projectId);
  if (!project) {
    throw ApiError.notFound("Project not found");
  }
  const files = req.files || [];
  files.map((file) => {
    return {
      url: `${process.env.SERVER_URL}/public/images/${file.filename}`,
    };
  });
};

const updateTask = async (req, res) => {};

const deleteTask = async (req, res) => {};

const createSubtask = async (req, res) => {};

const updateSubtask = async (req, res) => {};

const deleteSubtask = async (req, res) => {};

export {
  getTasks,
  getTaskById,
  createTask,
  updateTask,
  deleteTask,
  createSubtask,
  updateSubtask,
  deleteSubtask,
};
