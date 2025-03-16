import 'package:flutter/foundation.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:socket_io_client/socket_io_client.dart' as IO;
import 'package:mobile_flutter/model/Message.dart';

import 'notification_service.dart';

class SocketService extends ChangeNotifier {
  IO.Socket? socket;
  List<String> onlineUsers = [];
  Message? latestMessage;

  void connect(String userId) {
    socket = IO.io(
      'http://192.168.100.14:5001',
      IO.OptionBuilder()
          .setTransports(['websocket'])
          .setQuery({'userId': userId})
          .disableAutoConnect()
          .build(),
    );

    socket!.connect();

    socket!.onConnect((_) {
      print('Socket connected: ${socket!.id}');
    });

    socket!.on("getOnlineUsers", (userId) {
      onlineUsers = List<String>.from(userId.map((e) => e.toString()));
      print('Online users: $onlineUsers');
      notifyListeners();
    });

    socket!.on('newMessage', (messageData) {
      print('New message received: $messageData');
      latestMessage = Message.fromJson(messageData);
      notifyListeners();
      print(messageData);
      // Küldj helyi értesítést
      NotificationService.showNotification(
        'Új üzenet érkezett :',
        latestMessage!.text,
      );
    });

    socket!.onDisconnect((_) {
      print('Socket disconnected');
    });

    socket!.onError((error) {
      print('Socket error: $error');
    });
  }

  void disconnect() {
    socket?.disconnect();
    socket = null;
    notifyListeners();
  }

  Message? getLatestMessage() {
    return latestMessage;
  }

  List<String> getOnlineUsers() {
    return onlineUsers;
  }
}

final socketServiceProvider = ChangeNotifierProvider<SocketService>((ref) {
  return SocketService();
});
