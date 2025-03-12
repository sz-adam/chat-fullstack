import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:mobile_flutter/widgets/messages/message_input.dart';
import 'package:mobile_flutter/widgets/messages/message_list.dart';

import '../model/User.dart';
import '../providers/messages_provider.dart';

class MessageScreen extends ConsumerWidget {
  final User user;

  MessageScreen({required this.user});

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    final messages = ref.watch(messagesProvider);

    if (messages.isEmpty) {
      ref.read(messagesProvider.notifier).fetchMessages(user.id);
    }

    return Scaffold(
      appBar: AppBar(
        title: Row(
          children: [
            CircleAvatar(
              radius: 25,
              backgroundImage: NetworkImage(user.profilePic ??
                  'https://www.example.com/default-profile-pic.png'),
            ),
            const SizedBox(width: 10),
            Text(" ${user.fullName}"),
          ],
        ),
      ),
      body: Column(
        children: [
          Expanded(child: MessageList(user: user)),
          MessageInput(user: user),
        ],
      ),
    );
  }
}
