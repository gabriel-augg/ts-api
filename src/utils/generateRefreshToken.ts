import { RefreshToken } from '../models/RefreshToken';
import dayjs from 'dayjs';

export const generateRefreshToken = async (userId: string) => {
    const user_id = userId;
    const expires_at = dayjs().add(15, 'second').unix();

    const refreshToken = await RefreshToken.create({ user_id, expires_at });

    return refreshToken;
};
