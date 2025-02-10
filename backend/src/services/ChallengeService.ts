/**
 * @module ChallengeService
 * @description Service layer for challenge operations
 */

import { Model } from 'mongoose';
import BaseService from './BaseService';
import Challenge from '../models/Challenge';
import { IChallenge, ChallengeStatus } from '../types';
import { ValidationError } from '../utils/errorHandler';
import logger from '../utils/logger';

export default class ChallengeService extends BaseService<IChallenge> {
    /**
     * @constructor
     * @description Initialize ChallengeService with Challenge model
     */
    constructor() {
        super(Challenge as Model<IChallenge>);
    }

    async getChallengeStats() {
        try {
            return await (Challenge as any).getChallengeStats();
        } catch (error) {
            logger.error('Error getting challenge stats:', error);
            throw error;
        }
    }

    async getUserChallengeStats(userId: number) {
        try {
            return await (Challenge as any).getUserChallengeStats(userId);
        } catch (error) {
            logger.error('Error getting user challenge stats:', error);
            throw error;
        }
    }

    /**
     * @method updateChallengeStatus
     * @description Update the status of a challenge
     * @param {string} id - Challenge ID
     * @param {ChallengeStatus} status - New status
     * @throws {ValidationError} If status is invalid
     * @returns {Promise<IChallenge>} Updated challenge
     */
    async updateChallengeStatus(id: string, status: ChallengeStatus): Promise<IChallenge> {
        const challenge = await this.findById(id);
        
        if (!Object.values(ChallengeStatus).includes(status)) {
            throw new ValidationError('Invalid status');
        }

        await challenge.updateStatus(status);
        return challenge;
    }

    async addParticipant(id: string): Promise<IChallenge> {
        const challenge = await this.findById(id);

        if (!challenge.isActive()) {
            throw new ValidationError('Challenge is not active');
        }

        await challenge.addParticipant();
        return challenge;
    }

    /**
     * @method search
     * @description Search challenges by query string
     * @param {string} query - Search query
     * @returns {Promise<IChallenge[]>} Matching challenges
     */
    async search(query: string): Promise<IChallenge[]> {
        try {
            return await Challenge.find({
                $or: [
                    { Title: { $regex: query, $options: 'i' } },
                    { Brief: { $regex: query, $options: 'i' } },
                    { Project_Discription: { $regex: query, $options: 'i' } }
                ]
            });
        } catch (error) {
            logger.error('Error searching challenges:', error);
            throw error;
        }
    }
}
