
export class ReimbursementForm{
    public username: string = '';
    public firstName: string = '';
    public lastName: string = '';
    public startMonth: number = 0;
    public startDate: number = 0;
    public startYear: number = 0;
    public timeHour: string = '00';
    public timeMins: string = '00';
    public timeOfDay: string = '';
    public location: string = '';
    public description: string = '';
    public cost: number = 0;
    public gradingFormat: string = '';
    public passingGrade: string = 'Default';
    public typeOfEvent: string = '';
    public workJustification: string = '';
    public processId?: number = 1;
    public eventAttachment?: any;
    public approvalAttachment?: any;
    public missedWork?: string = '';
    public appId?: number = Math.floor(Math.random() * 1000);
    public calculation?: number = 0;
    public finalAttachment?: any = '';
    public gradeDecision?: string = '';
    public reimbursed?: boolean = false;
}
