export class Application{
    public appId: number = 0;
    public employee: string = '';
    public submitMonth: number = 0;
    public submitDate: number = 0;
    public submitYear: number = 0;
    public status: string = 'pending';
    public processId: number = 1;
    public approval: Approval = new Approval;
    public amountGranted?: number = 0;
}

export class Approval{
    directSupervisor: string = 'pending';
    departmentHead: string = 'pending';
    benefitCoordinator: string = 'pending';

}