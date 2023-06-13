import Team from "../models/Team.js";

// Get Teams List

export const getTeams = async (req, res) => {
  try {
    const teams = await Team.find()
      .populate("team_leader_id", "username")
      .populate("teammates", "username")
      .exec();
    if (teams) {
      res.status(200).json(teams);
      console.log("Get teams success");
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
    console.log("Error: teams not found");
  }
};

// Get Team by Id

export const getTeamById = async (req, res) => {
  try {
    const id = req.params.id;
    const team = await Team.findById(id)
      .populate("team_leader_id", "username")
      .populate("teammates", "username")
      .exec();
    if (team) {
      res.status(200).json(team);
      console.log("Get team success");
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
    console.log("Error: team not found");
  }
};

// Create new team

export const createTeam = async (req, res) => {
  try {
    const team = req.body;
    if (team) {
      const newTeam = new Team(team);
      await newTeam.save();
      res.status(201).json(newTeam);
      console.log("Create team success");
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
    console.log("Error: team not created");
  }
};

//Update Team

export const updateTeam = async (req, res) => {
  try {
    const id = req.params.id;
    const team = req.body;

    if (id && team) {
      // spread operator: ... pour récupérer les autres champs de team qui a cet _id
      // new: true pour retourner la team après l'update
      const updatedTeam = await Team.findByIdAndUpdate(
        id,
        { ...team, id },
        { new: true }
      );
      res.status(200).json(updatedTeam);
      console.log("Update team success");
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
    console.log("Error: team not updated");
  }
};

// delete team

export const deleteTeam = async (req, res) => {
  try {
    const id = req.params.id;
    if (id) {
      await Team.findByIdAndRemove(id);
      res.status(200).json({ message: "Team deleted successfully" });
      console.log("Delete team success");
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
    console.log("Error: team not deleted");
  }
};
