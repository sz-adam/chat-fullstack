import 'dart:convert';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:http/http.dart' as http;
import 'package:flutter_secure_storage/flutter_secure_storage.dart';
import 'package:mobile_flutter/model/User.dart';
import 'package:mobile_flutter/utils/api_constants.dart';

final authProvider = StateNotifierProvider<AuthNotifier, AuthState>(
  (ref) {
    return AuthNotifier();
  },
);

class AuthState {
  final bool isAuthenticated;
  final String? token;
  final String? errorMessage;
  final User? user;

  AuthState(
      {required this.isAuthenticated,
      this.token,
      this.errorMessage,
      this.user});
}

class AuthNotifier extends StateNotifier<AuthState> {
  final FlutterSecureStorage _storage = const FlutterSecureStorage();

  AuthNotifier() : super(AuthState(isAuthenticated: false));

  Future<void> login(String email, String password) async {
    try {
      final response = await http.post(
        Uri.parse(ApiConstants.login),
        headers: {"Content-Type": "application/json"},
        body: jsonEncode({"email": email, "password": password}),
      );

      if (response.statusCode == 200) {
        final data = jsonDecode(response.body);
        final token = data["token"];
        final userData = data["user"];

        final user = User.fromJson(userData);

        await _storage.write(key: "jwt_token", value: token);
        state = AuthState(
          isAuthenticated: true,
          token: token,
          user: user,
          errorMessage: null,
        );
      } else {
        final errorData = jsonDecode(response.body);
        final errorMessage = errorData["error"];
        state = AuthState(isAuthenticated: false, errorMessage: errorMessage);
      }
    } catch (e) {
      state = AuthState(
        isAuthenticated: false,
        errorMessage: "Network error: ${e.toString()}",
      );
    }
  }
}
