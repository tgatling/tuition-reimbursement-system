let curDate = new Date();
export let strDate = curDate.toString();

console.log(strDate);

export class Message {
    public sender: string = '';
    public recipient: string = '';
    public body: string = '';
    public msgDate?: string = strDate;  
}

 