import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:mobile_flutter/model/User.dart';

import '../../providers/messages_provider.dart';

class MessageInput extends ConsumerWidget {
  final User user;

  MessageInput({required this.user});

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    TextEditingController _messageController = TextEditingController();

    return Padding(
      padding: const EdgeInsets.all(8.0),
      child: Row(
        children: [
          Expanded(
            child: TextField(
              controller: _messageController,
              decoration: InputDecoration(
                hintText: "Write a message...",
                border: OutlineInputBorder(
                  borderRadius: BorderRadius.circular(30),
                ),
                filled: true,
                fillColor: Colors.white,
              ),
              maxLines: 1,
              style: const TextStyle(fontSize: 16),
            ),
          ),
          //üzenet küldése
          IconButton(
            icon: const Icon(Icons.send),
            onPressed: () {
              if (_messageController.text.isNotEmpty) {
                ref.read(messagesProvider.notifier).sendMessage(user.id, _messageController.text);
                _messageController.clear();
              }
            },
            color: Colors.blueAccent,
          ),
        ],
      ),
    );
  }
}
