import 'dart:convert';

import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:mobile_flutter/model/Message.dart';
import 'package:mobile_flutter/utils/api_constants.dart';

import '../utils/secure_storage_service.dart';
import 'package:http/http.dart' as http;


final messagesProvider = StateNotifierProvider<MessagesNotifier, List<Message>>(
      (ref) => MessagesNotifier(ref),
);

class MessagesNotifier extends StateNotifier<List<Message>> {
  final Ref ref;

  MessagesNotifier(this.ref) : super([]);

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
        final messages = data.map((messageJson) => Message.fromJson(messageJson)).toList();

        state = messages;

      } else {
        throw Exception('Failed to load messages');
      }
    } catch (e) {
      print('Error fetching messages: $e');
    }
  }


}

