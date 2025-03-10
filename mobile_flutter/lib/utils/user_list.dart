import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:mobile_flutter/providers/users_provider.dart';

import '../screens/messages_screen.dart';

class UsersList extends ConsumerStatefulWidget {
  @override
  _UsersListState createState() => _UsersListState();
}

class _UsersListState extends ConsumerState<UsersList> {
  @override
  void initState() {
    super.initState();
    // Automatikusan lekérjük a felhasználókat
    WidgetsBinding.instance.addPostFrameCallback((_) {
      ref.read(usersProvider.notifier).fetchUsers();
    });
  }

  @override
  Widget build(BuildContext context) {
    final usersState = ref.watch(usersProvider);

    return Container(
      decoration: const BoxDecoration(
        color: Colors.white,
      ),
      child: Column(
        children: [
          Expanded(
            child: ListView.builder(
              itemCount: usersState.users.length,
              itemBuilder: (context, index) {
                final user = usersState.users[index];

                return GestureDetector(
                  onTap: () {
                    Navigator.push(
                      context,
                      MaterialPageRoute(
                        builder: (context) => MessageScreen(user: user),
                      ),
                    );
                  },
                  child: Container(
                    margin: const EdgeInsets.symmetric(
                        vertical: 12.0, horizontal: 4.0),
                    padding: const EdgeInsets.all(16.0),
                    child: Row(
                      children: [
                        CircleAvatar(
                          radius: 40.0,
                          backgroundImage: NetworkImage(user.profilePic ?? 'https://www.example.com/default-profile-pic.png'),
                        ),
                        const SizedBox(width: 16.0),
                        Expanded(
                          child: Text(
                            user.fullName,
                            style: const TextStyle(
                              fontWeight: FontWeight.w500,
                              fontSize: 22,
                            ),
                          ),
                        ),
                        if (user.unreadMessages > 0)
                          Column(
                            mainAxisAlignment: MainAxisAlignment.center,
                            children: [
                             const Icon(
                                Icons.message,
                                color: Colors.blue,
                                size: 26,
                              ),
                              Text(
                                user.unreadMessages.toString(),
                                style: const TextStyle(color: Colors.blue, fontSize: 16),
                              ),
                            ],
                          ),
                      ],
                    ),
                  ),
                );
              },
            ),
          ),
        ],
      ),
    );
  }
}
