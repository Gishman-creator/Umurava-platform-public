import { Request, Response } from 'express';
import { Model } from 'mongoose';
import BaseController from './BaseController';
import Challenge from '../models/Challenge';
import ChallengeService from '../services/ChallengeService';
import { IChallenge, ChallengeStatus } from '../types';
import logger from '../utils/logger';

interface IChallengeModel extends Model<IChallenge> {
    getChallengeStats(): Promise<{
        total: number;
        open: number;
        ongoing: number;
        completed: number;
    }>;
    getUserChallengeStats(userId: number): Promise<{
        total: number;
        open: number;
        ongoing: number;
        completed: number;
    }>;
}

export default class ChallengeController extends BaseController<IChallenge> {
    private challengeService: ChallengeService;

    constructor() {
        super(Challenge as Model<IChallenge>);
        this.challengeService = new ChallengeService();
    }

    getChallengeStats = async (req: Request, res: Response): Promise<void> => {
        try {
            const stats = await this.challengeService.getChallengeStats();
            res.status(200).json(stats);
        } catch (error) {
            logger.error('Error in getChallengeStats:', error);
            res.status(500).json({ message: 'Internal server error' });
        }
    };

    getUserChallenges = async (req: Request, res: Response): Promise<void> => {
        try {
            const userId = req.params.userId;
            const stats = await this.challengeService.getUserChallengeStats(Number(userId));
            res.status(200).json(stats);
        } catch (error) {
            logger.error('Error in getUserChallenges:', error);
            res.status(500).json({ message: 'Internal server error' });
        }
    };

    updateChallengeStatus = async (req: Request, res: Response): Promise<void> => {
        try {
            const { id } = req.params;
            const { status } = req.body;
            const challenge = await this.challengeService.updateChallengeStatus(id, status);
            res.status(200).json(challenge);
        } catch (error) {
            logger.error('Error in updateChallengeStatus:', error);
            if (error instanceof Error) {
                res.status(400).json({ message: error.message });
                return;
            }
            res.status(500).json({ message: 'Internal server error' });
        }
    };

    addParticipant = async (req: Request, res: Response): Promise<void> => {
        try {
            const challenge = await this.challengeService.addParticipant(req.params.id);
            res.status(200).json(challenge);
        } catch (error) {
            logger.error('Error in addParticipant:', error);
            if (error instanceof Error) {
                res.status(400).json({ message: error.message });
                return;
            }
            res.status(500).json({ message: 'Internal server error' });
        }
    };

    searchChallenges = async (req: Request, res: Response): Promise<void> => {
        try {
            const { query } = req.query;
            if (typeof query !== 'string') {
                res.status(400).json({ message: 'Invalid query parameter' });
                return;
            }
            const challenges = await this.challengeService.search(query);
            res.status(200).json(challenges);
        } catch (error) {
            logger.error('Error in searchChallenges:', error);
            res.status(500).json({ message: 'Internal server error' });
        }
    };
}
