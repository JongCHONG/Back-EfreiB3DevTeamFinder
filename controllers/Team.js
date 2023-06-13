import mongoose from "mongoose";
import Team from "../models/Team.js";
import express from "express";

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

// à corriger
export const getTeam = async (req,res) => {
    try {
        const { id } = req.params.id;
        console.log(id)
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
        console.log(team)
        if (team) {
            const newTeam = new Team(team);
            console.log(newTeam)
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
        const { id } = req.params.id;
        const team = req.body;
        if (team) {

        }
    } catch (error) {
        res.status(400).json({ message: error.message });
        console.log("Error: team not updated");
    }
}

export const deleteTeam = async (req,res) => {
    
}