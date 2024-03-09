
import { ReportType } from "."

export type DashboardDataType = {
    totalUsers:          string;
    totalNewSignUps:     string;
    totalActiveAccounts: string;
    totalPlans:          string;
    report:              ReportType;
}