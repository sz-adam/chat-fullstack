import 'dart:convert';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:http/http.dart' as http;
import 'package:mobile_flutter/utils/api_constants.dart';
import 'package:mobile_flutter/utils/secure_storage_service.dart';
import '../model/User.dart';

class UsersState {
  final bool isLoading;
  final List<User> users;
  final String? errorMessage;

  UsersState({
    required this.isLoading,
    this.users = const [],
    this.errorMessage,
  });
}

final usersProvider = StateNotifierProvider<UsersNotifier, UsersState>(
  (ref) => UsersNotifier(ref),
);

class UsersNotifier extends StateNotifier<UsersState> {
  final Ref ref;
  UsersNotifier(this.ref) : super(UsersState(isLoading: true));

  // Felhasználók lekérése
  Future<void> fetchUsers() async {
    try {
      state = UsersState(isLoading: true);

      final token = await SecureStorageService.getJwtToken();
      if (token == null) {
        state = UsersState(isLoading: false, errorMessage: "No token found.");
        return;
      }

      final response = await http.get(
        Uri.parse(ApiConstants.allUser),
        headers: {
          'Content-Type': 'application/json',
          'Cookie': 'jwt=$token',
        },
      );
      if (response.statusCode == 200) {
        final List<dynamic> data = jsonDecode(response.body);

        List<User> users =
            data.map((userJson) => User.fromJson(userJson)).toList();

        state = UsersState(isLoading: false, users: users);
      } else {
        state =
            UsersState(isLoading: false, errorMessage: "Failed to load users.");
      }
    } catch (e) {
      state = UsersState(
          isLoading: false, errorMessage: "Network error: ${e.toString()}");
      print('Error: $e');
    }
  }
}
