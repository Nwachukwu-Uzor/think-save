export type AccountInfoType = {
    Id:                      number;
    UserId:                  string;
    Username:                string;
    Email:                   string;
    Password?:               string;
    IsVerified:              boolean;
    RoleId?:                 string;
    TransactionPin?:          string;
    TransactionPinStatus?:   string;
    SessionId?:               string;
    Status:                  string;
    DateCreated:             string;
    DateUpdated:            string;
    DeviceId?:                string;
    DeviceName?:              string;
    DeviceToken?:             string;
    OS?:                      string;
    OSVersion:               string;
    IpAddress?:               string;
    NoOfFailedLoginAttempts?: number;
    NoOfFailedPinAttempts?:   string;
}