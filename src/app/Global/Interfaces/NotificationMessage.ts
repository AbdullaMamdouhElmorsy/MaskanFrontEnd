export interface NotificationData {
    Type: string;
    Id: number;
  }
  
  export interface NotificationMessage {
    from: string;
    messageId: string;
    notification: {
      title: string;
    };
    data: NotificationData;
  }