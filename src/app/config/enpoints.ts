/*** New End Points**/
export const END_POINT = {
	// Authenticate User
	AUTH_LOGIN: 'authenticate/login',
	USER_AUTH: 'authenticate/authenticateuser',
	USER_ACCESS: 'authenticate/checkuseraccess',
	AUTH_DATE: 'authenticate/getdate',
	AUTH_SESSIONS: 'authenticate/getsessions/',
	SAVE_DEVICE_TOKEN: 'authenticate/savedevicetoken',
	USER_ACTIVITIES: 'activity/useractivities',
	USER_GROUPS: 'group/usergroups',
	USER_LIKE_LIST: 'group/userlikelist',
	USER_MAILS: 'mail/usermails',
	USER_MEETINGS: 'meeting/usermeetings', 

	// Groups
	GROUP_ACTIVITIES: 'activity/groupactivities',
	GROUP_VIDEOS: 'video/groupvideos',
	GROUP_RELATED_TO: 'group/groupsrelatedto/',
	GROUP_MEETINGS: 'meeting/groupmeetings',
	GROUP_POLLS: 'polls/grouppolls',
	GROUP_POSTS: 'group/feeds',
	GROUP_NEWS: 'communications/groupnews/',
	CREATE_GROUP_NEWS: 'communications/creategroupnews',


	GROUP_MEMBERS_FULL: 'groupmembers/full',
	GROUP_MEMBERS_BASIC: 'groupmembers/basic',


	// Work Group
	WK_GROUP_APPS: 'group/workgroupapps/',
	WK_GROUP_INFO: 'group/workgroupinfo/',

	// Album/Photos
	ALBUM_LIST: 'gallery/albumlist',
	PHOTO_LIST: 'gallery/photolist',

	// Videos
	VIDEO_THUMBNAIL: 'video/thumbnail',
	VIDEO_URL: 'video/url',

	// Posts etc
	ADD_POST: 'group/addfeed',
	POST_LIKE: 'group/likefeed ',
	POST_COMMENTS: 'group/feedcomments',
	POST_ADD_COMMENT: 'group/addfeedcomment',
	
	// Mails
	MAIL_SECURE: 'mail/securemail',
	MAIL_UNREAD: 'mail/unreademails',
	MAIL_REPLY: 'mail/sendreply',
	MAIL_UPDATE: 'mail/updatereadmail',

	// Polls
	POLL_DETAILS: 'polls/polldata',
	SAVE_POLL: 'polls/savepollresults',
	OLD_SAVE_POLL: 'polls/savepollresults-old',

	// Contacts
	CONTACT_BASIC: 'contacts/getbasic/',
	CONTACT_FULL: 'contacts/getfull/',
	CONTACT_DATE: 'contacts/getdate/',
	CONTACT_Q: 'contacts/getq',
	CONTACT_SEARCH: 'contacts/searchresults',

	FAVORITES :'favorites/getfavorites',

	// Default and Pending Invites
	PENDING_INVITES: 'group/pendinginvites',
	SET_DEFAULT_GROUP: 'group/setdefault',
	DEFAULT_GROUP: 'group/default',
	
	// Up Comming Meetings
	UC_USER_MEETINGS: 'meeting/upcomingusermeetings',
	UC_GROUP_MEETINGS: 'meeting/upcominggroupmeetings', 
	
	// Files and Folders
	VCF_FILES: 'vfc/files/',
	VCF_FILES_SECURITY: 'vfc/fileswsecurity',
	VCF_FOLDERS: 'vfc/folders',
	VCF_FULL: 'vfc/full',
	VCF_IMMEDIATE_PFOLDER: 'vfc/immediateparentfolder/',
	VCF_MD_FILES: 'vfc/mydocsfiles',
	VCF_MYWK_GROUP_FILE_INDEX : 'vfc/mywkgroupfileindex',
	VCF_MYWK_GROUP_FOLDERS : 'vfc/getMyWkgrpFolders/',
	VCF_USER_FILES: 'vfc/userfiles',
	VCF_WG_SUBFOLDERS: 'vfc/wgsubfolders',
	VCF_FILE_PFD_URL: 'vfc-file/vfcfilepdfurl/',

}