import 'package:flutter_secure_storage/flutter_secure_storage.dart';

class SecureStorageService {
  static final FlutterSecureStorage _storage = const FlutterSecureStorage();

  // Token kérése a tárolóból
  static Future<String?> getJwtToken() async {
    return await _storage.read(key: "jwt_token");
  }

  // Token tárolása a tárolóba
  static Future<void> saveJwtToken(String token) async {
    await _storage.write(key: "jwt_token", value: token);
  }

  // Token törlése a tárolóból
  static Future<void> deleteJwtToken() async {
    await _storage.delete(key: "jwt_token");
  }
}

// JWT kinyerése a Set-Cookie
String? extractJwtFromCookie(String cookieHeader) {
  final cookies = cookieHeader.split(';');
  for (var cookie in cookies) {
    final parts = cookie.split('=');
    if (parts.length == 2 && parts[0].trim() == 'jwt') {
      return parts[1].trim();
    }
  }
  return null;
}
