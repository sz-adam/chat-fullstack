import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:mobile_flutter/utils/user_list.dart';

import '../providers/auth_provider.dart';

class HomeScreen extends ConsumerWidget {
  @override
  Widget build(BuildContext context, WidgetRef ref) {
    final authState = ref.watch(authProvider);
    final authNotifier = ref.read(authProvider.notifier);

    return Scaffold(
      backgroundColor: Colors.blue.shade800,
      appBar: PreferredSize(
        preferredSize: const Size.fromHeight(100),
        child: AppBar(
          elevation: 0,
          title: Row(
            children: [
              // Profilkép
              CircleAvatar(
                radius: 25,
                backgroundImage: NetworkImage(authState.user!.profilePic ??
                    'https://www.example.com/default-profile-pic.png'),
              ),
              const SizedBox(width: 10),
              Text(
                authState.user!.fullName,
                style: const TextStyle(fontSize: 30),
              ),
            ],
          ),
          backgroundColor: Colors.blue.shade800,
          foregroundColor: Colors.white,
          actions: [
            IconButton(
              iconSize: 30,
              icon: const Icon(Icons.exit_to_app),
              onPressed: () async {
                await authNotifier.logout();
              },
            ),
          ],
        ),
      ),
      body: ClipRRect(
        borderRadius: const BorderRadius.only(
          topLeft: Radius.circular(40),
          topRight: Radius.circular(40),
        ),
        child: UsersList(),
      ),
    );
  }
}
