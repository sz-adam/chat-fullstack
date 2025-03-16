import 'package:flutter_local_notifications/flutter_local_notifications.dart';
import 'package:permission_handler/permission_handler.dart';

class NotificationService {
  static final FlutterLocalNotificationsPlugin flutterLocalNotificationsPlugin =
  FlutterLocalNotificationsPlugin();

  static Future<void> initialize() async {
    // Engedély kérés
    await _requestPermission();

    const AndroidInitializationSettings initializationSettingsAndroid =
    AndroidInitializationSettings('@mipmap/ic_launcher'); // alap flutter icon

    const InitializationSettings initializationSettings = InitializationSettings(
      android: initializationSettingsAndroid,
    );

    await flutterLocalNotificationsPlugin.initialize(initializationSettings);
  }

  static Future<void> _requestPermission() async {
    // Kérj engedélyt
    PermissionStatus status = await Permission.notification.request();
    if (status.isDenied) {
      print("Notification permission denied.");
    }
  }

  static Future<void> showNotification(String title, String body) async {
    const AndroidNotificationDetails androidDetails = AndroidNotificationDetails(
      'your_channel_id',
      'your_channel_name',
      channelDescription: 'Your channel description',
      importance: Importance.high,
      priority: Priority.high,

      //ha szeretnék icont itt megtehetjük a beállítást
    );

    const NotificationDetails platformDetails = NotificationDetails(
      android: androidDetails,
    );

    await flutterLocalNotificationsPlugin.show(
      0,
      title,
      body,
      platformDetails,
      payload: 'new_message',
    );
  }
}
