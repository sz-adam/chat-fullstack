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
