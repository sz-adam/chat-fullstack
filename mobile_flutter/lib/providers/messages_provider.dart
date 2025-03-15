import 'dart:convert';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:mobile_flutter/model/Message.dart';
import 'package:mobile_flutter/utils/api_constants.dart';
import 'package:mobile_flutter/utils/secure_storage_service.dart';
import 'package:http/http.dart' as http;

import '../socketIo/socket_service.dart';

final messagesProvider = StateNotifierProvider<MessagesNotifier, List<Message>>(
  (ref) => MessagesNotifier(ref),
);

class MessagesNotifier extends StateNotifier<List<Message>> {
  final Ref ref;

  MessagesNotifier(this.ref) : super([]) {
    listenForNewMessages();
  }

  void listenForNewMessages() {
    final socketService = ref.read(socketServiceProvider);
    socketService.addListener(() {
      final newMessage = socketService.getLatestMessage();
      if (newMessage != null) {
        state = [...state, newMessage];
      }
    });
  }

  // Üzenetek lekérése
  Future<void> fetchMessages(int partnerId) async {
    try {
      final token = await SecureStorageService.getJwtToken();
      if (token == null) {
        throw Exception('User not authenticated');
      }

      final url = ApiConstants.getMessages(partnerId);
      final response = await http.get(
        Uri.parse(url),
        headers: {
          'Content-Type': 'application/json',
          'Cookie': 'jwt=$token',
        },
      );

      if (response.statusCode == 200) {
        final List<dynamic> data = jsonDecode(response.body);
        final messages =
            data.map((messageJson) => Message.fromJson(messageJson)).toList();
        state = messages;
      } else {
        throw Exception('Failed to load messages');
      }
    } catch (e) {
      print('Error fetching messages: $e');
    }
  }

  //üzenet küldése
  Future<void> sendMessage(int partnerId, String messageText) async {
    try {
      final token = await SecureStorageService.getJwtToken();
      if (token == null) {
        throw Exception('User not authenticated');
      }

      final url = ApiConstants.sendMessage(partnerId);
      final response = await http.post(
        Uri.parse(url),
        headers: {
          'Content-Type': 'application/json',
          'Cookie': 'jwt=$token',
        },
        body: jsonEncode({'text': messageText}),
      );

      if (response.statusCode == 201) {
        final message = Message.fromJson(jsonDecode(response.body));
        state = [...state, message];
      } else {
        throw Exception('Failed to send message');
      }
    } catch (e) {
      print('Error sending message: $e');
    }
  }

  //üzenet törlése
  Future<void> deleteMessage(int messageId) async {
    try {
      final token = await SecureStorageService.getJwtToken();
      if (token == null) {
        throw Exception('User not authenticated');
      }

      final url = ApiConstants.deleteMessage(messageId);
      final response = await http.delete(
        Uri.parse(url),
        headers: {
          'Content-Type': 'application/json',
          'Cookie': 'jwt=$token',
        },
      );

      if (response.statusCode == 200) {
        state = state.where((msg) => msg.id != messageId).toList();
      } else {
        throw Exception('Failed to delete message');
      }
    } catch (e) {
      print('Error deleting message: $e');
    }
  }
}
