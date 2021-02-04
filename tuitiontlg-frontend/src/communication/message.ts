let curDate = new Date();
export let strDate = curDate.toString();

export class Message {
    public sender: string = '';
    public recipient: string = '';
    public body: string = '';
    public msgDate?: string = strDate;  
}

 