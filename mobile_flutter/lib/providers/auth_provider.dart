import 'dart:convert';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:http/http.dart' as http;
import 'package:mobile_flutter/model/User.dart';
import 'package:mobile_flutter/utils/api_constants.dart';
import 'package:mobile_flutter/utils/secure_storage_service.dart';

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
  final bool isLoading;

  AuthState(
      {required this.isAuthenticated,
      this.token,
      this.errorMessage,
      this.user,
      this.isLoading = false});
}

class AuthNotifier extends StateNotifier<AuthState> {
  AuthNotifier() : super(AuthState(isAuthenticated: false, isLoading: true)) {
    checkAuth();
  }
  //bejelentkezés
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

        await SecureStorageService.saveJwtToken(token);
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

  //automatikus beléptetés token alapján
  Future<void> checkAuth() async {
    try {
      state = AuthState(isAuthenticated: false, isLoading: true);
      final token = await SecureStorageService.getJwtToken();
      if (token == null) {
        state = AuthState(isAuthenticated: false, isLoading: false);
        return;
      }

      final response = await http.get(
        Uri.parse(ApiConstants.checkAuth),
        headers: {
          'Content-Type': 'application/json',
          'Cookie': 'jwt=$token',
        },
      );

      if (response.statusCode == 200) {
        try {
          // A válasz JSON dekódolása
          final data = jsonDecode(response.body);

          if (data is Map<String, dynamic>) {
            // Felhasználói adatokat kinyerése
            final user = User.fromJson(data);

            state = AuthState(
              isLoading: false,
              isAuthenticated: true,
              token: token,
              user: user,
              errorMessage: null,
            );
          } else {
            state = AuthState(
                isAuthenticated: false,
                isLoading: false,
                errorMessage: 'Authentication failed');
          }
        } catch (e) {
          print("Error decoding JSON: $e");
          state = AuthState(
            isAuthenticated: false,
            isLoading: false,
          );
        }
      } else {
        state = AuthState(
          isAuthenticated: false,
          isLoading: false,
        );
      }
    } catch (error) {
      print("Error during authentication check: $error");
      state = AuthState(
        isAuthenticated: false,
        isLoading: false,
      );
    }
  }

  //kijelentkezés
  Future<void> logout() async {
    try {
      final response = await http.post(
        Uri.parse(ApiConstants.logout),
        headers: {
          'Content-Type': 'application/json',
          'Cookie': 'jwt=${await SecureStorageService.getJwtToken()}',
        },
      );
      //Ha a backend törölte a tokent akkor töröljük a SecureStorage-ból is
      if (response.statusCode == 200) {
        await SecureStorageService.deleteJwtToken();

        state = AuthState(isAuthenticated: false);

        print("User logged out successfully.");
      } else {
        print("Failed to logout from server.");
        state =
            AuthState(isAuthenticated: true, errorMessage: "Logout failed.");
      }
    } catch (e) {
      print("Error during logout: $e");
      state = AuthState(isAuthenticated: true, errorMessage: "Logout failed.");
    }
  }
}
