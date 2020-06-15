import * as Permissions from "expo-permissions";
import { Notifications } from "expo";

export const askPermissions = async (callback) => {
  const { status: existingStatus } = await Permissions.getAsync(
    Permissions.NOTIFICATIONS
  );
  let finalStatus = existingStatus;
  if (existingStatus !== "granted") {
    const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);
    finalStatus = status;
  }
  if (finalStatus !== "granted") {
    if (callback) {
      callback(false);
    }
    return false;
  }
  if (callback) {
    callback(true);
  }
  return true;
};

export const sendNotificationImmediately = async (title, body, callback) => {
  if (title && body) {
    let notificationId = await Notifications.presentLocalNotificationAsync({
      title: title,
      body: body,
    });
    if (callback) {
      callback(notificationId);
    }
  } else {
    if (callback) {
      callback(false);
    }
  }
};

export const scheduleNotification = async (title, body, time, callback) => {
  if (title && body && time) {
    let notificationId = await Notifications.scheduleLocalNotificationAsync(
      {
        title: title,
        body: body,
      },
      {
        //repeat: "minute",
        time: time,
      }
    );
    if (callback) {
      callback(notificationId);
    }
  } else {
    if (callback) {
      callback(false);
    }
  }
};

export const cancelScheduledNotification = async (notificationId) => {
  Notifications.cancelScheduledNotificationAsync(notificationId);
};

export const cancelAllScheduledNotifications = async () => {
  Notifications.cancelAllScheduledNotificationsAsync();
};
