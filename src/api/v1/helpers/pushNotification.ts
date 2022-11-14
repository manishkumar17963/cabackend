import { messaging } from "firebase-admin";
import webpush, { PushSubscription, SendResult } from "web-push";
import customerAdmin from "../../../config/firebase/customer";
import employeeAdmin from "../../../config/firebase/customer";

export async function pushWebNotification(
  subscription: PushSubscription,
  payload: any
): Promise<SendResult> {
  return webpush.sendNotification(subscription, JSON.stringify(payload));
}

export async function pushDeviceNotificationToCustomer(
  registrationToken: string,
  data: { [key: string]: any } = {
    click_action: "FLUTTER_NOTIFICATION_CLICK",
    id: "1",
    status: "done",
  },

  notification: { [key: string]: string } = {
    body: "this is a body",
    title: "this is a title",
  }
): Promise<string> {
  const message = {
    data: data,
    token: registrationToken,
    notification: notification,
  };
  return customerAdmin.messaging().send(message);
}

export async function pushDeviceNotificationToDriver(
  registrationToken: string,
  notification: { [key: string]: string } = {
    body: "this is a body",
    title: "this is a title",
  },
  data: { [key: string]: any } = {
    click_action: "FLUTTER_NOTIFICATION_CLICK",
    id: "1",
    status: "done",
  }
): Promise<string> {
  const message: messaging.Message = {
    data: { ...data, click_action: "FLUTTER_NOTIFICATION_CLICK" },
    token: registrationToken,
    notification: notification,
    android: {
      priority: "high",
    },
  };

  return employeeAdmin.messaging().send(message);
}

export async function pushDeviceNotificationToMultipleEmployee(
  registrationToken: string[],
  notification: { [key: string]: string } = {
    body: "this is a body",
    title: "this is a title",
  },
  data: { [key: string]: any } = {
    click_action: "FLUTTER_NOTIFICATION_CLICK",
    id: "1",
    status: "done",
  }
) {
  const message: messaging.MulticastMessage = {
    data: { ...data, click_action: "FLUTTER_NOTIFICATION_CLICK" },
    tokens: registrationToken,
    notification: notification,
    android: {
      priority: "high",
    },
  };
  return employeeAdmin.messaging().sendMulticast(message);
}

export async function pushDeviceNotificationToMultipleCustomer(
  registrationToken: string[],
  notification: { [key: string]: string } = {
    body: "this is a body",
    title: "this is a title",
  },
  data: { [key: string]: any } = {
    click_action: "FLUTTER_NOTIFICATION_CLICK",
    id: "1",
    status: "done",
  }
) {
  const message: messaging.MulticastMessage = {
    data: { ...data, click_action: "FLUTTER_NOTIFICATION_CLICK" },
    tokens: registrationToken,
    notification: notification,
    android: {
      priority: "high",
      notification: { channelId: "duntravel" },
    },
  };

  return customerAdmin.messaging().sendMulticast(message);
}
