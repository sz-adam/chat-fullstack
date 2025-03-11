import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:intl/intl.dart';

import '../model/User.dart';
import '../providers/messages_provider.dart';

class MessageScreen extends ConsumerWidget {
  final User user;

  MessageScreen({required this.user});

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    // Üzenetek lekérése állapotkezelőből
    final messages = ref.watch(messagesProvider);

    // üzenetek betöltése
    if (messages.isEmpty) {
      ref.read(messagesProvider.notifier).fetchMessages(user.id);
    }

    TextEditingController _messageController = TextEditingController();
    int? selectedMessageIndex;

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
          // Üzenetek listája
          Expanded(
            child: ListView.builder(
              itemCount: messages.length,
              itemBuilder: (context, index) {
                final isReceiver = messages[index].receiverId ==
                    user.id;
                // Formázott időpont
                print(messages);
                final createdAt = DateFormat('HH:mm')
                    .format(DateTime.parse(messages[index].createdAt));

                return GestureDetector(
                  onTap: () {
                    // Üzenetre való kattintás
                    selectedMessageIndex =
                        (selectedMessageIndex == index) ? null : index;
                    (context as Element).reassemble();
                  },
                  child: Align(
                    alignment: isReceiver
                        ? Alignment.centerRight
                        : Alignment.centerLeft,
                    child: Container(
                      margin: const EdgeInsets.symmetric(
                          vertical: 5, horizontal: 10),
                      padding: const EdgeInsets.symmetric(
                          vertical: 10, horizontal: 15),
                      decoration: BoxDecoration(
                        color:
                            isReceiver ? Colors.blueAccent : Colors.grey[300],
                        borderRadius: BorderRadius.circular(15),
                      ),
                      child: Column(
                        crossAxisAlignment: isReceiver
                            ? CrossAxisAlignment.end
                            : CrossAxisAlignment.start,
                        children: [
                          Text(
                            messages[index].text,
                            style: TextStyle(
                                color: isReceiver ? Colors.white : Colors.black,
                                fontSize: 20),
                          ),
                          const SizedBox(height: 5),
                          if (selectedMessageIndex == index) ...[
                            Column(
                              mainAxisAlignment: MainAxisAlignment.end,
                              children: [
                                //küldései időpont
                                Text(
                                  '$createdAt',
                                  style: TextStyle(
                                      color: isReceiver
                                          ? Colors.white70
                                          : Colors.black54,
                                      fontSize: 16),
                                ),
                                //törlés megjelenítése
                                if (isReceiver)
                                  IconButton(
                                    icon: const Icon(Icons.close,
                                        color: Colors.red),
                                    onPressed: () {
                                      ref
                                          .read(messagesProvider.notifier)
                                          .deleteMessage(messages[index].id);
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
            ),
          ),

          // Üzenetírás
          Padding(
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
                      ref
                          .read(messagesProvider.notifier)
                          .sendMessage(user.id, _messageController.text);
                      _messageController.clear();
                    }
                  },
                  color: Colors.blueAccent,
                ),
              ],
            ),
          ),
        ],
      ),
    );
  }
}
