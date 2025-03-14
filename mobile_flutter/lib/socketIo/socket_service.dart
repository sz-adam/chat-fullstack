import 'package:flutter/foundation.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:socket_io_client/socket_io_client.dart' as IO;

class SocketService extends ChangeNotifier {
  IO.Socket? socket;
  List<String> onlineUsers = [];

  void connect(String userId) {
    socket = IO.io(
      'http://192.168.100.14:5001',
      IO.OptionBuilder()
          .setTransports(['websocket'])
          .setQuery({'userId': userId}) // userId küldése a backendnek
          .disableAutoConnect()
          .build(),
    );

    socket!.connect();

    socket!.onConnect((_) {
      print('Socket connected: ${socket!.id}');
    });

    socket!.on("getOnlineUsers", (userId) {
      // stringgé alakítjuk az id-t
      onlineUsers = List<String>.from(userId.map((e) => e.toString()));
      print('Online users: $onlineUsers');
      notifyListeners();
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

  List<String> getOnlineUsers() {
    return onlineUsers;
  }
}

final socketServiceProvider = ChangeNotifierProvider<SocketService>((ref) {
  return SocketService();
});
