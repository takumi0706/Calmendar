"use server";

import {google} from "googleapis";
import {currentUser} from "@/lib/auth";

const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET;
const domain = process.env.NEXT_PUBLIC_APP_URL;
const GOOGLE_REDIRECT_URI = `${domain}/api/auth/callback/google`;

export const getGoogleOAuth = async () => {
    const user = await currentUser();
    if (!user) {
        return{error: "User not found!"};
    }

    const googleOAuth = new google.auth.OAuth2({
        clientId: GOOGLE_CLIENT_ID,
        clientSecret: GOOGLE_CLIENT_SECRET,
        redirectUri: GOOGLE_REDIRECT_URI,
    });

    //TODO: 今は毎回のリクエスト時に新しいアクセストークンを取得しているが、アクセストークンの有効期限を確認して、期限切れの場合はリフレッシュトークンを使ってアクセストークンを更新する処理をログイン時に行う。
    const refreshToken = user?.refreshToken;
    googleOAuth.setCredentials({
        refresh_token: refreshToken,
    });

    try {
        const accessTokenResponse = await googleOAuth.getAccessToken();
        const accessToken = accessTokenResponse.token;
        if (!accessToken) {
            return {error: "Access token not found!"};
        }

        googleOAuth.setCredentials({
            access_token: accessToken,
        });

        return googleOAuth;
    }catch (err){
        return {error: "Error fetching Google OAuth client!"};
    }
}

export const getEventListFromGoogleCalendar = async (results: number) => {
    try {
        const googleOAuth = await getGoogleOAuth();
        if ('error' in googleOAuth) {
            return googleOAuth;
        }

        const calendar = google.calendar({ version: "v3", auth: googleOAuth });

        const calendarResponse = await calendar.events.list({
            calendarId: "primary",
            timeMin: "2024-10-12T00:00:00+09:00", // 日本時間のタイムゾーン指定
            timeMax: "2024-10-12T23:59:59+09:00", // 同様に日本時間を明示
            timeZone: "Asia/Tokyo",
            maxResults: results,
            singleEvents: true,
        });

        return calendarResponse.data.items;
    }catch (err){
        return {error: "Error fetching Google Calendar events!"};
    }
};
