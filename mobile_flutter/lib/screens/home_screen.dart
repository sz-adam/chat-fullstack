import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';

import '../providers/auth_provider.dart';

class HomeScreen extends ConsumerWidget {
  @override
  Widget build(BuildContext context, WidgetRef ref) {
    final authState = ref.watch(authProvider);
    final authNotifier = ref.read(authProvider.notifier);

    return Scaffold(
      appBar: AppBar(
        title: Text("Home Screen"),
        actions: [
          IconButton(
            icon: Icon(Icons.exit_to_app),
            onPressed: ()  {
             authNotifier.logout();
            },
          ),
        ],
      ),
      body: Center(
        child: Text("Welcome ${authState.user?.fullName ?? ''}!"),
      ),
    );
  }
}
