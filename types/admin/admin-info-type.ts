export type AdminInfoType = {
    id:          string;
    staffId:     string;
    username:    string;
    password:    string;
    firstName:   string;
    lastName:    string;
    email:       string;
    isVerified:  boolean;
    role?:        string;
    sessionId:   string;
    status:      string;
    dateCreated?: string;
    dateUpdated?: string;
    adminRoles:  AdminRole[];
    appUser?:     string;
}

export type AdminRole =  {
    id:       string;
    username: string;
    role:     string;
    status:   string;
    appUser:  null;
}