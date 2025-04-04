export interface UserSessionDB {
	user_id: string;
	session_id: string;
	session_start: string;
	session_end: string | null;
	session_token: string;
	last_updated: string;
	is_active: boolean;
}

export interface UserSessionClient {
	userID: string;
	sessionID: string;
	sessionStart: string;
	sessionEnd: string | null;
	sessionToken: string;
	lastUpdated: string;
	isActive: boolean;
}
