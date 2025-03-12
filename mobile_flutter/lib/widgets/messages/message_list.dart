import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:intl/intl.dart';
import 'package:mobile_flutter/model/User.dart';

import '../../providers/messages_provider.dart';

class MessageList extends ConsumerWidget {
  final User user;

  MessageList({required this.user});

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    final messages = ref.watch(messagesProvider);
    int? selectedMessageIndex;

    return ListView.builder(
      itemCount: messages.length,
      itemBuilder: (context, index) {
        final isReceiver = messages[index].receiverId == user.id;
        final createdAt = DateFormat('HH:mm')
            .format(DateTime.parse(messages[index].createdAt));

        return GestureDetector(
          onTap: () {
            selectedMessageIndex = (selectedMessageIndex == index) ? null : index;
            (context as Element).reassemble();
          },
          child: Align(
            alignment: isReceiver ? Alignment.centerRight : Alignment.centerLeft,
            child: Container(
              margin: const EdgeInsets.symmetric(vertical: 5, horizontal: 10),
              padding: const EdgeInsets.symmetric(vertical: 10, horizontal: 15),
              decoration: BoxDecoration(
                color: isReceiver ? Colors.blueAccent : Colors.grey[300],
                borderRadius: BorderRadius.circular(15),
              ),
              child: Column(
                crossAxisAlignment: isReceiver ? CrossAxisAlignment.end : CrossAxisAlignment.start,
                children: [
                  Text(
                    messages[index].text,
                    style: TextStyle(
                      color: isReceiver ? Colors.white : Colors.black,
                      fontSize: 20,
                    ),
                  ),
                  const SizedBox(height: 5),
                  if (selectedMessageIndex == index) ...[
                    Column(
                      children: [
                        Text(
                          '$createdAt',
                          style: TextStyle(
                            color: isReceiver ? Colors.white70 : Colors.black54,
                            fontSize: 16,
                          ),
                        ),
                        if (isReceiver)
                          IconButton(
                            icon: const Icon(Icons.close, color: Colors.red),
                            onPressed: () {
                              ref.read(messagesProvider.notifier).deleteMessage(messages[index].id);
                            },
                          ),
                      ],
                    ),
                  ],
                ],
              ),
            ),
          ),
        );
      },
    );
  }
}