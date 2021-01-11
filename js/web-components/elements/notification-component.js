class NotificationElement{
    constructor(classes){
        this.classes = classes;
    }
    setContentNotification(content){
        this.content = content;
    }
    render(){
        M.toast({html: this.content, classes: this.classes});
    }
}
export default NotificationElement;