import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:mobile_flutter/providers/auth_provider.dart';
import 'package:mobile_flutter/screens/home_screen.dart';
import 'package:mobile_flutter/screens/login_screen.dart';

void main() {
  runApp(ProviderScope(child: MyApp()));
}

class MyApp extends ConsumerWidget {
  @override
  Widget build(BuildContext context, WidgetRef ref) {
    final authState = ref.watch(authProvider);
//Loadingra külön componenst és formázást
    return MaterialApp(
      title: 'My App',
      home: authState.isLoading
          ? const Scaffold(
        body: Center(child: Text("Loading")),
      )
          : (authState.isAuthenticated ? HomeScreen() : LoginScreen()),
    );
  }
}
