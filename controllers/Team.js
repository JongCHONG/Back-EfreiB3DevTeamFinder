import Team from "../models/Team.js";

export const getTeams = async (req,res) => {
    try {
        const teams = await Team.find();
        if (teams) {
            res.status(200).json(teams);
            console.log("Get teams success");
        }
    } catch (error) {
        res.status(500).json({ message: error.message })
        console.log("Error: teams not found");
    }
}

export const getTeam = async (req,res) => {
    try {
        const id = req.params.id;
        const team = await Team.findById(id);
        if (team) {
            res.status(200).json(team);
            console.log("Get team success");
        }
    } catch (error) {
        res.status(500).json({ message: error.message })
        console.log("Error: team not found");
    }
}

export const createTeam = async (req,res) => {
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
}

export const updateTeam = async (req,res) => {
    try {
        const id = req.params.id;
        const team = req.body;
        console.log(id);
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
}

export const deleteTeam = async (req,res) => {
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
}