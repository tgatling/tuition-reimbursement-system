
export class User{
    public username: string = '';
    public password: string = '';
    public jobTitle: string = 'None';
    public processId: number = 0;
    public admin: boolean = false;
    public access: string = 'denied';
    public totalR: number = 1000;
    public availableR: number = 1000;
    public pendingR: number = 0;
    public awardedR: number = 0;

    
}